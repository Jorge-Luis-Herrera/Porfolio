import { motion } from 'framer-motion';
import {
    Building2,
    Code2,
    Rocket,
    GraduationCap,
    FlaskConical,
    ExternalLink,
    Linkedin,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CUBITECH, LINKEDIN, UNIVERSITY } from '../../data/tech';

interface TimelineItem {
    icon: LucideIcon;
    period: string;
    title: string;
    org?: { name: string; url: string };
    description: string;
    tech: string[];
    current?: boolean;
    links?: { label: string; href: string }[];
}

export const Experience = () => {
    const { t, language } = useLanguage();

    const repo = (name: string) => `https://github.com/Jorge-Luis-Herrera/${name}`;

    const work: TimelineItem[] = [
        {
            icon: Building2,
            period: t('experience.cto.period'),
            title: t('experience.cto.title'),
            org: { name: CUBITECH.name, url: CUBITECH.url },
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

    const education: TimelineItem[] = [
        {
            icon: GraduationCap,
            period: t('experience.education.period'),
            title: t('experience.education.title'),
            org: { name: UNIVERSITY.name, url: UNIVERSITY.url },
            description: t('experience.education.desc'),
            tech:
                language === 'es'
                    ? [
                          'Algoritmos',
                          'Estructuras de Datos',
                          'Matemática Discreta',
                          'Optimización',
                          'Bases de Datos',
                          'Computación Científica',
                      ]
                    : [
                          'Algorithms',
                          'Data Structures',
                          'Discrete Mathematics',
                          'Optimization',
                          'Databases',
                          'Scientific Computing',
                      ],
        },
        {
            icon: FlaskConical,
            period: t('experience.courses.period'),
            title: t('experience.courses.title'),
            description: t('experience.courses.desc'),
            tech: ['C#', 'Python', 'LaTeX', 'SQL'],
            links: [
                { label: 'EDA Course', href: repo('EDA_Course') },
                { label: 'Discrete Math', href: repo('Discrete_Math') },
                { label: 'Optimization Models', href: repo('Optimization_Models') },
                { label: 'DB Final Test', href: repo('DB-Final-Test') },
            ],
        },
    ];

    const groups: { key: string; label: string; items: TimelineItem[] }[] = [
        { key: 'work', label: t('experience.group.work'), items: work },
        { key: 'education', label: t('experience.group.education'), items: education },
    ];

    return (
        <section id="experience" className="scroll-mt-20 py-20 sm:py-28 border-t border-line">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="section-title">{t('experience.title')}</h2>
                        <p className="mt-2 text-muted text-sm sm:text-base">{t('experience.subtitle')}</p>
                    </div>
                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:text-accent hover:border-accent/40 transition-colors"
                    >
                        <Linkedin className="w-4 h-4" />
                        {t('experience.linkedin')}
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                </header>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-14">
                    {groups.map((group, groupIndex) => (
                        <div key={group.key}>
                            <h3 className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                                {group.label}
                            </h3>

                            <ol className="relative border-l border-line ml-3 sm:ml-4">
                                {group.items.map((item, i) => (
                                    <motion.li
                                        key={item.title}
                                        initial={{ opacity: 0, x: -18 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{
                                            duration: 0.5,
                                            delay: (groupIndex * group.items.length + i) * 0.1,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="relative pl-8 sm:pl-10 pb-10 last:pb-0"
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

                                        <h4 className="mt-2 font-display text-lg text-ink">
                                            {item.title}
                                            {item.org && (
                                                <>
                                                    {' · '}
                                                    <a
                                                        href={item.org.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-accent hover:text-accent-strong transition-colors"
                                                    >
                                                        {item.org.name}
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </>
                                            )}
                                        </h4>

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

                                        {item.links && (
                                            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                                                {item.links.map((link) => (
                                                    <li key={link.label}>
                                                        <a
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent transition-colors"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            {link.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
