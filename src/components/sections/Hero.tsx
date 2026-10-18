import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Send, MessageCircle, Mail, Building2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CUBITECH } from '../../data/tech';
import { useIntroReady } from '../../hooks/useIntroReady';
import { MaskText } from '../ui/MaskText';
import { Magnetic } from '../ui/Magnetic';
import profileImg from '../../assets/profile.jpg';

export const Hero = () => {
    const { t, language } = useLanguage();
    const reduceMotion = useReducedMotion();
    const introReady = useIntroReady();
    const cvHref = `${import.meta.env.BASE_URL}${language === 'es' ? 'cv.html' : 'cv-en.html'}`;

    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const portraitY = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

    // Portrait drifts a few pixels against the cursor (desktop, fine pointers).
    const [finePointer] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const parallaxX = useSpring(0, { stiffness: 110, damping: 18, mass: 0.6 });
    const parallaxY = useSpring(0, { stiffness: 110, damping: 18, mass: 0.6 });
    const showParallax = finePointer && !reduceMotion;

    const handleParallax = (event: React.PointerEvent<HTMLElement>) => {
        if (!showParallax) return;
        const offsetX = event.clientX / window.innerWidth - 0.5;
        const offsetY = event.clientY / window.innerHeight - 0.5;
        parallaxX.set(offsetX * 20);
        parallaxY.set(offsetY * 20);
    };

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

    const titlePre = t('hero.title.pre');
    const highlightDelay = 0.15 + titlePre.split(' ').length * 0.055;

    return (
        <section
            id="home"
            ref={sectionRef}
            onPointerMove={handleParallax}
            className="relative min-h-[100svh] flex flex-col justify-center pt-24 pb-16"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
                <div className="grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-16">
                    <motion.div
                        style={
                            reduceMotion
                                ? undefined
                                : showParallax
                                  ? { y: portraitY, x: parallaxX }
                                  : { y: portraitY }
                        }
                        className="justify-self-center md:justify-self-start relative"
                    >
                        {/* Rotating conic aura */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute -inset-6 rounded-[2.5rem] blur-2xl opacity-40"
                            style={{
                                background:
                                    'conic-gradient(from 0deg, var(--accent), transparent 35%, var(--accent) 65%, transparent)',
                            }}
                            animate={reduceMotion ? undefined : { rotate: 360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                            animate={introReady ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden ring-1 ring-line shadow-lg"
                        >
                            <img
                                src={profileImg}
                                alt="Jorge Luis Herrera"
                                className="w-full h-full object-cover"
                                loading="eager"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={reduceMotion ? undefined : { y: titleY, opacity: fade }}
                        className="text-center md:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={introReady ? { opacity: 1, y: 0 } : undefined}
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

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight">
                            <MaskText text={titlePre} delay={0.15} start={introReady} />
                            {' '}
                            <MaskText
                                text={t('hero.title.highlight')}
                                delay={highlightDelay}
                                className="text-accent"
                                wordClassName="text-gradient-live"
                                start={introReady}
                            />
                        </h1>

                        {/* Rotating specialisation */}
                        <div className="mt-5 h-6 flex items-center justify-center md:justify-start gap-1.5 font-mono text-sm text-muted overflow-hidden">
                            <span className="text-accent/60">{'<'}</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.32 }}
                                    className="text-ink"
                                >
                                    {roles[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                            <span className="text-accent/60">{'/>'}</span>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={introReady ? { opacity: 1 } : undefined}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="mt-5 max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-muted leading-relaxed"
                        >
                            {t('hero.description')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={introReady ? { opacity: 1, y: 0 } : undefined}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3"
                        >
                            <Magnetic>
                                <a
                                    href="#projects"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-strong transition-colors shadow-sm"
                                >
                                    {t('hero.cta.projects')}
                                    <ArrowDown className="w-4 h-4" />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href={cvHref}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-line bg-surface text-sm font-medium text-ink hover:border-accent/40 hover:text-accent transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    {t('hero.cta.cv')}
                                </a>
                            </Magnetic>

                            <div className="flex items-center gap-1 sm:ml-2">
                                {[
                                    { href: 'https://github.com/Jorge-Luis-Herrera', icon: Github, label: 'GitHub' },
                                    { href: 'https://www.linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/', icon: Linkedin, label: 'LinkedIn' },
                                    { href: 'https://t.me/Jorge_Lhc', icon: Send, label: 'Telegram' },
                                    { href: 'https://wa.me/5350722776', icon: MessageCircle, label: 'WhatsApp' },
                                    { href: 'mailto:herreraceciliajorgeluis@gmail.com', icon: Mail, label: 'Email' },
                                ].map(({ href, icon: Icon, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        aria-label={label}
                                        data-cursor={t('cursor.open')}
                                        whileHover={{ y: -3, scale: 1.08 }}
                                        transition={{ duration: 0.15 }}
                                        className="p-2.5 rounded-lg text-muted hover:text-accent hover:bg-surface-2 transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
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
