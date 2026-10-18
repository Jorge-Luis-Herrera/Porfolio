import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Send, MessageCircle, Mail, Building2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import profileImg from '../../assets/profile.jpg';

const COMPANY_URL = 'https://cubit-tech.com';

export const Hero = () => {
    const { t, language } = useLanguage();
    const cvHref = `${import.meta.env.BASE_URL}${language === 'es' ? 'cv.html' : 'cv-en.html'}`;

    return (
        <section
            id="home"
            className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
                <div className="grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="justify-self-center md:justify-self-start"
                    >
                        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden ring-1 ring-line shadow-lg">
                            <img
                                src={profileImg}
                                alt="Jorge Luis Herrera"
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center md:text-left"
                    >
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                            <p className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-accent px-3 py-1 rounded-full border border-accent/30 bg-accent/5">
                                {t('hero.badge')}
                            </p>
                            <a
                                href={COMPANY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-muted px-3 py-1 rounded-full border border-line bg-surface hover:text-accent hover:border-accent/40 transition-colors"
                            >
                                <Building2 className="w-3.5 h-3.5" />
                                {t('hero.company')}
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight">
                            {t('hero.title.pre')}{' '}
                            <span className="text-accent">{t('hero.title.highlight')}</span>
                        </h1>
                        <p className="mt-5 max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-muted leading-relaxed">
                            {t('hero.description')}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-strong transition-colors shadow-sm"
                            >
                                {t('hero.cta.projects')}
                                <ArrowDown className="w-4 h-4" />
                            </a>
                            <a
                                href={cvHref}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                {t('hero.cta.cv')}
                            </a>
                            <div className="flex items-center gap-1 sm:ml-2">
                                {[
                                    { href: 'https://github.com/Jorge-Luis-Herrera', icon: Github, label: 'GitHub' },
                                    { href: 'https://www.linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/', icon: Linkedin, label: 'LinkedIn' },
                                    { href: 'https://t.me/Jorge_Lhc', icon: Send, label: 'Telegram' },
                                    { href: 'https://wa.me/5350722776', icon: MessageCircle, label: 'WhatsApp' },
                                    { href: 'mailto:herreraceciliajorgeluis@gmail.com', icon: Mail, label: 'Email' },
                                ].map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={label}
                                        className="p-2.5 rounded-lg text-muted hover:text-accent hover:bg-surface-2 transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
