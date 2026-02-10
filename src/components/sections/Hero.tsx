import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { ProfileImage } from '../ui/ProfileImage';

export const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-40 md:pt-48 pb-24 text-center">
            <ProfileImage />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
            >
                <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">
                    {t('hero.badge')}
                </span>
                <h1 className="text-5xl md:text-7xl font-serif text-white-soft mb-6 leading-tight">
                    {t('hero.title')} <br />
                    <span className="italic">{t('hero.title.ink')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-white-soft/70 font-sans max-w-2xl mx-auto leading-relaxed">
                    {t('hero.description')}
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-12"
                >
                    <div className="w-px h-24 bg-gradient-to-b from-accent to-transparent mx-auto"></div>
                </motion.div>
            </motion.div>
        </section>
    );
};
