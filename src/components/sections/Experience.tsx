import { motion } from 'framer-motion';
import { Building2, Rocket, Code2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CUBITECH } from '../../data/tech';

export const Experience = () => {
    const { t } = useLanguage();

    const items = [
        {
            icon: Building2,
            period: t('experience.cto.period'),
            title: t('experience.cto.title'),
            org: CUBITECH.name,
            orgUrl: CUBITECH.url,
            description: t('experience.cto.desc'),
            tech: ['React', 'Next.js', 'TypeScript', 'Arquitectura', 'Code Review'],
            current: true,
        },
        {
            icon: Code2,
            period: t('experience.freelance.period'),
            title: t('experience.freelance.title'),
            description: t('experience.freelance.desc'),
            tech: ['Rust', 'Axum', 'Node.js', 'NestJS', 'PostgreSQL', 'Azure'],
        },
        {
            icon: Rocket,
            period: t('experience.production.period'),
            title: t('experience.production.title'),
            description: t('experience.production.desc'),
            tech: ['Docker', 'Azure App Service', 'GitHub Actions'],
        },
    ];

    return (
        <section id="experience" className="scroll-mt-20 py-20 sm:py-28 border-t border-line">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-12">
                    <h2 className="section-title">{t('experience.title')}</h2>
                    <p className="mt-2 text-muted text-sm sm:text-base">{t('experience.subtitle')}</p>
                </header>

                <ol className="relative border-l border-line ml-3 sm:ml-4">
                    {items.map((item, i) => (
                        <motion.li
                            key={item.title}
                            initial={{ opacity: 0, x: -18 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className="relative pl-8 sm:pl-10 pb-12 last:pb-0"
                        >
                            <span
                                className={`absolute -left-[13px] top-1 grid place-items-center w-6 h-6 rounded-full border ${
                                    item.current
                                        ? 'bg-accent border-accent text-white'
                                        : 'bg-surface border-line text-muted'
                                }`}
                                aria-hidden="true"
                            >
                                <item.icon className="w-3 h-3" />
                            </span>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                                    {item.period}
                                </span>
                                {item.current && (
                                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {t('experience.current')}
                                    </span>
                                )}
                            </div>

                            <h3 className="mt-2 font-display text-lg text-ink">
                                {item.title}
                                {item.org && (
                                    <>
                                        {' · '}
                                        <a
                                            href={item.orgUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-accent hover:text-accent-strong transition-colors"
                                        >
                                            {item.org}
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </>
                                )}
                            </h3>

                            <p className="mt-2 text-sm text-muted leading-relaxed max-w-2xl">
                                {item.description}
                            </p>

                            <ul className="mt-3 flex flex-wrap gap-1.5">
                                {item.tech.map((tech) => (
                                    <li key={tech} className="chip">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </motion.li>
                    ))}
                </ol>
            </div>
        </section>
    );
};
