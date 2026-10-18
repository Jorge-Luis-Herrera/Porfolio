import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { BlurText } from '../ui/BlurText';
import profileImg from '../../assets/profile.jpg';

export const AboutSection = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="scroll-mt-20 py-20 sm:py-28 border-t border-line">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-14 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:block justify-self-center md:justify-self-start md:sticky md:top-24"
                    >
                        <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden ring-1 ring-line">
                            <img src={profileImg} alt="Jorge Luis Herrera" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                    </motion.div>

                    <div>
                        <BlurText as="h2" className="section-title mb-6" text={t('about.title')} />
                        <div className="space-y-4 text-muted leading-relaxed max-w-2xl">
                            <p>{t('about.p1')}</p>
                            <p>{t('about.p2')}</p>
                        </div>

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
