import { motion } from 'framer-motion';
import { Trophy, Zap, Cpu, Binary, FileText, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import profileImg from '../../assets/profile.jpg';

export const AboutSection = () => {
    const { t } = useLanguage();

    const softSkills = [
        { label: t('about.soft.leadership'), icon: Trophy },
        { label: t('about.soft.speed'), icon: Zap },
        { label: t('about.soft.creativity'), icon: Cpu },
        { label: t('about.soft.understanding'), icon: Binary },
        { label: t('about.soft.docs'), icon: FileText },
        { label: t('about.soft.predictions'), icon: Layers },
    ];

    return (
        <section id="about" className="scroll-mt-20 py-20 sm:py-28 border-t border-line">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-14 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="justify-self-center md:justify-self-start md:sticky md:top-24"
                    >
                        <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden ring-1 ring-line">
                            <img src={profileImg} alt="Jorge Luis Herrera" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    </motion.div>

                    <div>
                        <h2 className="section-title mb-6">{t('about.title')}</h2>
                        <div className="space-y-4 text-muted leading-relaxed max-w-2xl">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                        </div>

                        <h3 className="mt-10 mb-4 font-display text-sm uppercase tracking-wider text-muted">
                            {t('about.soft.title')}
                        </h3>
                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {softSkills.map((s, i) => (
                                <motion.li
                                    key={s.label}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-2 border border-line text-sm text-muted"
                                >
                                    <s.icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                    <span>{s.label}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-strong transition-colors"
                            >
                                {t('hero.cta.contact')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
