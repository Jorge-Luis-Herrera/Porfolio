import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Layers } from 'lucide-react';
import type { ProjectData } from '../sections/ProjectGallery';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectStackModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    projects: ProjectData[];
    onSelectProject: (project: ProjectData) => void;
}

export const ProjectStackModal = ({ isOpen, onClose, category, projects, onSelectProject }: ProjectStackModalProps) => {
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-end p-0 md:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/60 backdrop-blur-sm cursor-zoom-out"
                    />

                    {/* Stack Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-xl h-full bg-paper border-l border-white-soft/10 shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 p-8 border-b border-dashed border-white-soft/10 flex justify-between items-center bg-background/50">
                            <div className="flex items-center gap-4">
                                <Layers className="w-5 h-5 text-accent" />
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-white-soft/30">{t('pillars.viewStack')}</span>
                                    <h2 className="text-xl font-serif italic text-white-soft">{category}</h2>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white-soft/10 rounded-full transition-all text-white-soft/60 hover:text-white-soft"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Project List */}
                        <div className="flex-1 overflow-y-auto px-8 py-12 space-y-8 scrollbar-thin scrollbar-thumb-accent/20">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => onSelectProject(project)}
                                    className="group relative p-6 cursor-pointer transition-all border border-dashed border-white-soft/10 hover:border-accent/30 bg-white-soft/[0.02] hover:bg-white-soft/[0.05] hover:-translate-y-1"
                                >
                                    {/* Technical Corner Accents - Solid to 'complete' the dashed border */}
                                    <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t border-l border-white-soft/40 group-hover:border-accent transition-colors" />
                                    <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t border-r border-white-soft/40 group-hover:border-accent transition-colors" />
                                    <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b border-l border-white-soft/40 group-hover:border-accent transition-colors" />
                                    <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b border-r border-white-soft/40 group-hover:border-accent transition-colors" />

                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/60 group-hover:text-accent transition-colors">
                                            {project.chapter}
                                        </span>
                                        <BookOpen className="w-4 h-4 text-white-soft/20 group-hover:text-accent transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-serif text-white-soft mb-2 group-hover:translate-x-1 transition-transform">{project.title}</h3>
                                    <p className="text-white-soft/50 text-sm leading-relaxed mb-6 group-hover:text-white-soft/70 transition-colors">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[9px] font-mono px-2 py-0.5 bg-background border border-white-soft/10 rounded uppercase tracking-tighter text-technical/80">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="text-[9px] font-mono px-2 py-0.5 text-white-soft/30">+ {project.tech.length - 3}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
