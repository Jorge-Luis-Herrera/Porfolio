import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Project } from '../data/projects';
import { ProjectModal } from '../components/ui/ProjectModal';

interface ProjectModalContextValue {
    /** Opens the detail dialog for a project. */
    openProject: (project: Project) => void;
    closeProject: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextValue | undefined>(undefined);

export const ProjectModalProvider = ({ children }: { children: ReactNode }) => {
    const [project, setProject] = useState<Project | null>(null);

    const openProject = useCallback((next: Project) => setProject(next), []);
    const closeProject = useCallback(() => setProject(null), []);

    return (
        <ProjectModalContext.Provider value={{ openProject, closeProject }}>
            {children}
            <ProjectModal project={project} onClose={closeProject} />
        </ProjectModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProjectModal = () => {
    const context = useContext(ProjectModalContext);
    if (context === undefined) {
        throw new Error('useProjectModal must be used within a ProjectModalProvider');
    }
    return context;
};
