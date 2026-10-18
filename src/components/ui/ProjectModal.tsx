import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Wifi, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { Project } from '../../data/projects';
import { LetterReveal } from './LetterReveal';

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

const STAGGER = 11;
const DESC_DELAY = 180;

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const { t, language } = useLanguage();

    useEffect(() => {
        if (!project) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        const previousOverflow = document.body.style.overflow;

        document.addEventListener('keydown', onKeyDown);
        // Lock background scroll while the dialog is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [project, onClose]);

    const description = project?.description[language] ?? '';
    const highlights = project?.highlights?.[language] ?? [];

    // Sequential letter timing: the description reveals first, then every bullet.
    const baseCursor = DESC_DELAY + description.length * STAGGER + 260;
    const bulletDelays = highlights.map((_, index) =>
        highlights
            .slice(0, index)
            .reduce((sum, item) => sum + item.length * STAGGER + 220, baseCursor)
    );

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key="project-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="project-modal-title"
                    className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                >
                    <button
                        type="button"
                        aria-label={t('modal.close')}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 48, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 32, scale: 0.98 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full sm:max-w-3xl max-h-[92svh] sm:max-h-[86svh] flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-line bg-surface shadow-2xl"
                    >
                        <div className="h-1.5 shrink-0 bg-gradient-to-r from-accent via-accent/70 to-accent/10" aria-hidden="true" />

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={t('modal.close')}
                            className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-full border border-line bg-surface-2/80 text-muted hover:text-ink hover:border-accent/40 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="modal-scroll overflow-y-auto px-5 sm:px-8 py-6 sm:py-8">
                            <div className="flex flex-wrap items-center gap-2 pr-12">
                                <span className="chip">{t(`modal.scope.${project.category}`)}</span>
                                {project.liveLink && (
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-500">
                                        <Wifi className="w-3 h-3" />
                                        {t('projects.inProduction')}
                                    </span>
                                )}
                                {project.starred && (
                                    <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-mono text-accent">
                                        <Star className="w-3 h-3" fill="currentColor" />
                                        {t('modal.featured')}
                                    </span>
                                )}
                            </div>

                            <h2
                                id="project-modal-title"
                                className="mt-4 font-display text-2xl sm:text-3xl text-ink"
                            >
                                {project.title}
                            </h2>

                            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
                                <LetterReveal text={description} delay={DESC_DELAY} stagger={STAGGER} />
                            </p>

                            {highlights.length > 0 && (
                                <section className="mt-7">
                                    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                                        {t('modal.highlights')}
                                    </h3>
                                    <ul className="mt-3 space-y-2.5">
                                        {highlights.map((item, index) => (
                                            <li key={item} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                                                <span
                                                    className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-accent/70"
                                                    aria-hidden="true"
                                                />
                                                <LetterReveal
                                                    text={item}
                                                    delay={bulletDelays[index]}
                                                    stagger={STAGGER}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            <section className="mt-7">
                                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                                    {t('modal.stack')}
                                </h3>
                                <ul className="mt-3 flex flex-wrap gap-1.5">
                                    {project.tech.map((tech, index) => (
                                        <motion.li
                                            key={tech}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                                            className="chip"
                                        >
                                            {tech}
                                        </motion.li>
                                    ))}
                                </ul>
                            </section>

                            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center gap-3">
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-strong transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {t('projects.viewLive')}
                                    </a>
                                )}
                                <a
                                    href={project.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:text-accent hover:border-accent/40 transition-colors"
                                >
                                    <Github className="w-4 h-4" />
                                    {t('projects.viewRepo')}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
