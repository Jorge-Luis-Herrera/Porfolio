import { motion } from 'framer-motion';
import { FileText, Cpu, Layers, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BlueprintDoc = () => {
    const { t } = useLanguage();

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 py-32 border-t border-white-soft/5"
        >
            <div className="text-center mb-20">
                <h2 className="text-4xl font-serif italic text-white-soft mb-4">{t('blueprint.title')}</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                    {t('blueprint.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Cpu className="w-5 h-5 text-technical" />
                        <h3 className="font-serif text-xl border-b border-white-soft/10 pb-2">{t('blueprint.motor.title')}</h3>
                    </div>
                    <p className="text-white-soft/60 text-sm leading-relaxed">
                        {t('blueprint.motor.desc')}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Layers className="w-5 h-5 text-technical" />
                        <h3 className="font-serif text-xl border-b border-white-soft/10 pb-2">{t('blueprint.style.title')}</h3>
                    </div>
                    <p className="text-white-soft/60 text-sm leading-relaxed">
                        {t('blueprint.style.desc')}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Zap className="w-5 h-5 text-technical" />
                        <h3 className="font-serif text-xl border-b border-white-soft/10 pb-2">{t('blueprint.motion.title')}</h3>
                    </div>
                    <p className="text-white-soft/60 text-sm leading-relaxed">
                        {t('blueprint.motion.desc')}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <FileText className="w-5 h-5 text-technical" />
                        <h3 className="font-serif text-xl border-b border-white-soft/10 pb-2">{t('blueprint.data.title')}</h3>
                    </div>
                    <p className="text-white-soft/60 text-sm leading-relaxed">
                        {t('blueprint.data.desc')}
                    </p>
                </div>
            </div>

            <div className="mt-20 flex justify-center">
                <a
                    href="https://github.com/Jorge-Luis-Herrera/PortFolio/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border border-white-soft/10 rounded-full font-mono text-[10px] uppercase tracking-widest text-white-soft/40 hover:text-accent hover:border-accent/50 transition-all text-center"
                >
                    {t('blueprint.download')}
                </a>
            </div>
        </motion.section>
    );
};
