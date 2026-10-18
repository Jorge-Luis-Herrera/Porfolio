import { motion } from 'framer-motion';
import { Code2, Layout, Server, Wrench } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BlurText } from '../ui/BlurText';
import { ScrambleText } from '../ui/ScrambleText';
import { TiltCard } from '../ui/TiltCard';

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
                    <BlurText as="h2" className="section-title" text={t('skills.title')} />
                    <p className="mt-2 text-muted text-sm sm:text-base">{t('skills.subtitle')}</p>
                </header>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {groups.map((g, i) => (
                        <TiltCard
                            key={g.title}
                            max={2.5}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="card p-5 sm:p-6"
                        >
                            <div className="flex items-center gap-2.5 mb-4 text-accent">
                                <g.icon className="w-4 h-4" />
                                <ScrambleText as="h3" className="font-display text-sm font-medium text-ink" text={g.title} />
                            </div>
                            <ul className="flex flex-wrap gap-1.5">
                                {g.items.map((item, index) => (
                                    <motion.li
                                        key={item}
                                        className="chip"
                                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.35,
                                            delay: i * 0.05 + index * 0.03,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
