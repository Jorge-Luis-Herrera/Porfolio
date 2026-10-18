import { motion } from 'framer-motion';
import { Code2, Layout, Server, Wrench } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SkillsSection = () => {
    const { t } = useLanguage();

    const groups = [
        {
            title: t('skills.languages'),
            icon: Code2,
            items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'C', 'Rust', 'SQL', 'Bash'],
        },
        {
            title: t('skills.frontend'),
            icon: Layout,
            items: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Vite'],
        },
        {
            title: t('skills.backend'),
            icon: Server,
            items: ['Node.js', 'Express', 'NestJS', '.NET', 'PostgreSQL', 'SQLite', 'REST APIs'],
        },
        {
            title: t('skills.tools'),
            icon: Wrench,
            items: ['Git & GitHub', 'GitHub Actions', 'Azure App Service', 'Docker', 'Linux', 'Selenium'],
        },
    ];

    return (
        <section id="skills" className="scroll-mt-20 py-20 sm:py-28 border-t border-line">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-10">
                    <h2 className="section-title">{t('skills.title')}</h2>
                    <p className="mt-2 text-muted text-sm sm:text-base">{t('skills.subtitle')}</p>
                </header>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {groups.map((g, i) => (
                        <motion.div
                            key={g.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="card p-5 sm:p-6"
                        >
                            <div className="flex items-center gap-2.5 mb-4 text-accent">
                                <g.icon className="w-4 h-4" />
                                <h3 className="font-display text-sm font-medium text-ink">{g.title}</h3>
                            </div>
                            <ul className="flex flex-wrap gap-1.5">
                                {g.items.map((item) => (
                                    <li key={item} className="chip">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
