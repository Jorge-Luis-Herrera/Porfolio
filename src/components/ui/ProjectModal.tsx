import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Terminal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        chapter: string;
        title: string;
        description: string;
        tech: string[];
        link: string;
        liveLink?: string;
        essay?: {
            problem: string;
            solution: string;
            outcome: string;
        };
    } | null;
}

export const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
    const { t } = useLanguage();
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/95 backdrop-blur-md cursor-zoom-out"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl max-h-full cursor-default overflow-hidden flex flex-col border border-dashed border-white-soft/20 bg-paper shadow-2xl"
                    >
                        {/* Blueprint Corner Accents - Solid to 'complete' corners */}
                        <div className="absolute top-[-1px] left-[-1px] w-6 h-6 border-t-2 border-l-2 border-white-soft/60 pointer-events-none" />
                        <div className="absolute top-[-1px] right-[-1px] w-6 h-6 border-t-2 border-r-2 border-white-soft/60 pointer-events-none" />
                        <div className="absolute bottom-[-1px] left-[-1px] w-6 h-6 border-b-2 border-l-2 border-white-soft/60 pointer-events-none" />
                        <div className="absolute bottom-[-1px] right-[-1px] w-6 h-6 border-b-2 border-r-2 border-white-soft/60 pointer-events-none" />
                        {/* Header */}
                        <div className="flex-shrink-0 p-5 border-b border-dashed border-white-soft/10 flex justify-between items-center bg-background/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <Terminal className="w-4 h-4 text-accent" />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white-soft/40">
                                    {t('modal.essayTitle')} // {project.chapter}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white-soft/10 rounded-full transition-all text-white-soft/60 hover:text-white-soft hover:rotate-90"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-16 md:py-12 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                            <h2 className="text-3xl md:text-5xl font-serif text-white-soft mb-10 leading-tight italic">
                                {project.title}
                            </h2>

                            <div className="space-y-16 max-w-3xl">
                                <section>
                                    <h3 className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-4 opacity-80">{t('modal.conflict')}</h3>
                                    <p className="text-white-soft/70 font-sans leading-relaxed text-lg">
                                        {project.essay?.problem || project.description}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-6 opacity-80">{t('modal.architecture')}</h3>
                                    <div className="bg-background/40 border border-white-soft/10 p-6 md:p-8 rounded-lg mb-6 font-mono text-sm text-technical/90 shadow-inner overflow-x-auto">
                                        <pre className="whitespace-pre">
                                            {`[ Client ] ───( HTTPS/gRPC )───> [ API Gateway ]\n                                     │\n                                     ▼\n[ Worker Pool ] <───( Message Queue )─── [ Orchestrator ]\n      │                              │\n      └────> [ Persistence (SQLite) ] <──┘`}
                                        </pre>
                                    </div>
                                    <p className="text-white-soft/70 font-sans leading-relaxed text-lg">
                                        {project.essay?.solution || "Implementación de patrones de diseño avanzados centrados en la eficiencia y escalabilidad distributiva."}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-4 opacity-80">{t('modal.technicalEpilogue')}</h3>
                                    <p className="text-white-soft/70 font-sans leading-relaxed text-lg">
                                        {project.essay?.outcome || "Un sistema resiliente capaz de manejar cargas de trabajo críticas con latencia mínima y consistencia absoluta."}
                                    </p>
                                </section>

                                <div className="flex flex-wrap gap-2 pt-8 opacity-60">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-[9px] font-mono px-2.5 py-1 bg-white-soft/5 border border-white-soft/10 rounded uppercase tracking-widest text-technical">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex-shrink-0 p-6 border-t border-dashed border-white-soft/10 bg-background/50 flex justify-end gap-6 shadow-sm">
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-accent hover:text-accent/80 transition-colors"
                                >
                                    {t('modal.liveProject') || 'Live Project'} <ExternalLink className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            )}
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white-soft/40 hover:text-accent transition-colors"
                            >
                                Repo <ExternalLink className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
