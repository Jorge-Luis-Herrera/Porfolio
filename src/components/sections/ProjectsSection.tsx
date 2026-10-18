import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProjectModal } from '../../context/ProjectModalContext';
import { otherProjects, categoryOrder, type ProjectCategory } from '../../data/projects';

type Filter = 'all' | ProjectCategory;

export const ProjectsSection = () => {
    const { t, language } = useLanguage();
    const { openProject } = useProjectModal();
    const [filter, setFilter] = useState<Filter>('all');

    const filters: { id: Filter; label: string }[] = useMemo(
        () => [
            { id: 'all', label: t('projects.filter.all') },
            ...categoryOrder.map((c) => ({ id: c as Filter, label: t(`projects.filter.${c}`) })),
        ],
        [t]
    );

    const visible = useMemo(
        () => (filter === 'all' ? otherProjects : otherProjects.filter((p) => p.category === filter)),
        [filter]
    );

    return (
        <section className="py-20 sm:py-28 border-t border-line">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-10">
                    <h2 className="section-title">{t('projects.more.title')}</h2>
                    <p className="mt-2 text-muted text-sm sm:text-base">{t('projects.more.subtitle')}</p>
                </header>

                <div
                    role="tablist"
                    aria-label={t('projects.more.title')}
                    className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            role="tab"
                            aria-selected={filter === f.id}
                            onClick={() => setFilter(f.id)}
                            className={`shrink-0 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors ${
                                filter === f.id
                                    ? 'bg-accent text-white border-accent'
                                    : 'bg-surface text-muted border-line hover:text-ink hover:border-accent/40'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                <motion.ul layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    <AnimatePresence mode="popLayout">
                        {visible.map((p) => (
                            <motion.li
                                key={p.id}
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.3 }}
                                role="button"
                                tabIndex={0}
                                aria-label={`${p.title} — ${t('projects.viewDetails')}`}
                                onClick={() => openProject(p)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        openProject(p);
                                    }
                                }}
                                className="card border-animated group p-5 sm:p-6 flex flex-col cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="font-display font-medium text-lg text-ink">
                                        {p.title}
                                    </h3>
                                    {p.starred && (
                                        <Star
                                            className="w-4 h-4 text-accent shrink-0 mt-1"
                                            fill="currentColor"
                                            aria-label="Featured"
                                        />
                                    )}
                                </div>

                                <p className="mt-3 text-sm text-muted leading-relaxed flex-1">
                                    {p.description[language]}
                                </p>

                                <ul className="mt-4 flex flex-wrap gap-1.5">
                                    {p.tech.map((tech) => (
                                        <li key={tech} className="chip">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-5 pt-4 border-t border-line flex items-center gap-4">
                                    <a
                                        href={p.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(event) => event.stopPropagation()}
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors"
                                    >
                                        <Github className="w-4 h-4" />
                                        {t('projects.viewRepo')}
                                    </a>
                                    {p.liveLink && (
                                        <a
                                            href={p.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(event) => event.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-strong transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {t('projects.viewLive')}
                                        </a>
                                    )}
                                    <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                                        {t('projects.viewDetails')}
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>

                {visible.length === 0 && (
                    <p className="text-center text-muted text-sm py-16">{t('projects.empty')}</p>
                )}
            </div>
        </section>
    );
};
