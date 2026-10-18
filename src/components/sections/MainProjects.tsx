import { motion } from 'framer-motion';
import { Github, ExternalLink, Wifi } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mainProjects } from '../../data/projects';

export const MainProjects = () => {
    const { t, language } = useLanguage();

    return (
        <section id="projects" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-10">
                    <h2 className="section-title">{t('projects.main.title')}</h2>
                    <p className="mt-2 text-muted text-sm sm:text-base">{t('projects.main.subtitle')}</p>
                </header>

                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mainProjects.map((p, i) => (
                        <motion.li
                            key={p.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="card border-animated overflow-hidden flex flex-col"
                        >
                            <div className="h-1.5 bg-gradient-to-r from-accent to-accent/30" aria-hidden="true" />

                            <div className="p-5 sm:p-6 flex flex-col flex-1">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <span className="font-mono text-xs text-muted">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500">
                                        <Wifi className="w-3.5 h-3.5" />
                                        {t('projects.inProduction')}
                                    </span>
                                </div>

                                <h3 className="font-display font-medium text-lg text-ink">
                                    {p.title}
                                </h3>

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

                                <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center gap-3">
                                    {p.liveLink && (
                                        <a
                                            href={p.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent-strong transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            {t('projects.viewLive')}
                                        </a>
                                    )}
                                    <a
                                        href={p.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line bg-surface text-xs font-medium text-muted hover:text-accent hover:border-accent/40 transition-colors"
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                        {t('projects.viewRepo')}
                                    </a>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
