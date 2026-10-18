import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Send, MessageCircle, Mail, Building2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CUBITECH } from '../../data/tech';
import profileImg from '../../assets/profile.jpg';

export const Hero = () => {
    const { t, language } = useLanguage();
    const reduceMotion = useReducedMotion();
    const cvHref = `${import.meta.env.BASE_URL}${language === 'es' ? 'cv.html' : 'cv-en.html'}`;

    const roles = [
        t('hero.role.fullstack'),
        t('hero.role.rust'),
        t('hero.role.automation'),
        t('hero.role.data'),
    ];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
        return () => clearInterval(id);
    }, [reduceMotion, roles.length]);

    return (
        <section id="home" className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
                <div className="grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="justify-self-center md:justify-self-start relative"
                    >
                        <div className="absolute -inset-3 rounded-3xl bg-accent/10 blur-2xl" aria-hidden="true" />
                        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden ring-1 ring-line shadow-lg">
                            <img
                                src={profileImg}
                                alt="Jorge Luis Herrera"
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </div>
                    </motion.div>

                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4"
                        >
                            <a
                                href="https://github.com/Jorge-Luis-Herrera"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub — Jorge Luis Herrera"
                                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-accent px-3 py-1 rounded-full border border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/60 transition-colors"
                            >
                                <Github className="w-3.5 h-3.5" />
                                {t('hero.badge')}
                            </a>
                            <a
                                href={CUBITECH.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-muted px-3 py-1 rounded-full border border-line bg-surface hover:text-accent hover:border-accent/40 transition-colors"
                            >
                                <Building2 className="w-3.5 h-3.5" />
                                {t('hero.company')}
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight"
                        >
                            {t('hero.title.pre')}{' '}
                            <span className="text-accent">{t('hero.title.highlight')}</span>
                        </motion.h1>

                        {/* Rotating specialisation */}
                        <div className="mt-5 h-6 flex items-center justify-center md:justify-start gap-1.5 font-mono text-sm text-muted overflow-hidden">
                            <span className="text-accent/60">{'<'}</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-ink"
                                >
                                    {roles[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-accent/60">{'/>'}</span>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-5 max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-muted leading-relaxed"
                        >
                            {t('hero.description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3"
                        >
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
                                ].map(({ href, icon: Icon, label }, i) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={label}
                                        whileHover={{ y: -3 }}
                                        transition={{ duration: 0.15 }}
                                        className="p-2.5 rounded-lg text-muted hover:text-accent hover:bg-surface-2 transition-colors"
                                        style={{ animationDelay: `${i * 80}ms` }}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <a
                href="#projects"
                aria-label={t('hero.cta.projects')}
                className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <span className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent relative overflow-hidden">
                    <span className="absolute inset-x-0 top-0 h-3 bg-accent animate-scroll-hint" />
                </span>
            </a>
        </section>
    );
};
