import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { getLenis } from '../../lib/lenis';
import { Signature } from './Signature';

const SECTIONS = ['home', 'projects', 'skills', 'hobbies', 'about', 'contact'] as const;

export const Navbar = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(
        () => typeof window !== 'undefined' && window.scrollY > 24
    );
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState<string>('home');

    useEffect(() => {
        let lastY = typeof window !== 'undefined' ? window.scrollY : 0;

        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 24);
            // Hide going down, reveal going up (never when near the top).
            setHidden(y > lastY && y > 220);
            lastY = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Track the section crossing the middle of the viewport, so the pill
    // under the nav follows the reader.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );

        SECTIONS.forEach((id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const lenis = getLenis();

        if (open) {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
        } else {
            lenis?.start();
            document.body.style.overflow = '';
        }

        return () => {
            lenis?.start();
            document.body.style.overflow = '';
        };
    }, [open]);

    const labels: Record<string, string> = {
        home: t('nav.home'),
        projects: t('nav.projects'),
        skills: t('nav.skills'),
        hobbies: t('nav.hobbies'),
        about: t('nav.about'),
        contact: t('nav.contact'),
    };

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${
                    hidden && !open ? '-translate-y-full' : 'translate-y-0'
                }`}
            >
                <div className="mx-auto px-3 sm:px-4">
                    {/* Notch: the bar tightens into a floating pill once you scroll */}
                    <div
                        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            scrolled
                                ? 'mt-2.5 h-14 max-w-4xl rounded-2xl border border-line bg-base/75 px-3 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.75)] backdrop-blur-xl'
                                : 'mt-0 h-16 max-w-6xl rounded-2xl border border-transparent px-1 sm:px-2'
                        }`}
                    >
                        <a href="#home" className="shrink-0" aria-label={t('nav.home')}>
                            <Signature />
                        </a>

                        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
                            {SECTIONS.map((s) => (
                                <a
                                    key={s}
                                    href={`#${s}`}
                                    aria-current={active === s ? 'true' : undefined}
                                    className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                                        active === s
                                            ? 'text-ink'
                                            : 'text-muted hover:text-ink hover:bg-surface-2'
                                    }`}
                                >
                                    {active === s && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            aria-hidden="true"
                                            className="absolute inset-0 rounded-lg border border-line bg-surface-2"
                                            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                                        />
                                    )}
                                    <span className="relative">{labels[s]}</span>
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={toggleLanguage}
                                aria-label="Switch language"
                                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-mono text-muted hover:text-ink hover:bg-surface-2 transition-colors uppercase"
                            >
                                <Globe className="w-4 h-4" />
                                {language === 'es' ? 'EN' : 'ES'}
                            </button>
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="p-2 rounded-lg text-muted hover:text-ink hover:bg-surface-2 transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setOpen(true)}
                                aria-label={t('nav.menu')}
                                className="md:hidden p-2 rounded-lg text-muted hover:text-ink hover:bg-surface-2 transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                            onClick={() => setOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed right-0 top-0 z-50 h-full w-72 max-w-[85vw] bg-base border-l border-line p-6 flex flex-col md:hidden"
                            aria-label="Mobile navigation"
                            data-lenis-prevent
                        >
                            <div className="flex items-center justify-between mb-10">
                                <Signature />
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label={t('nav.close')}
                                    className="p-2 rounded-lg text-muted hover:text-ink hover:bg-surface-2"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-1">
                                {SECTIONS.map((s, i) => (
                                    <motion.a
                                        key={s}
                                        href={`#${s}`}
                                        onClick={() => setOpen(false)}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * i }}
                                        aria-current={active === s ? 'true' : undefined}
                                        className={`px-3 py-3 rounded-lg text-base transition-colors ${
                                            active === s
                                                ? 'bg-surface-2 text-ink'
                                                : 'text-muted hover:text-ink hover:bg-surface-2'
                                        }`}
                                    >
                                        {labels[s]}
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 border-t border-line flex items-center gap-3">
                                <a
                                    href="https://github.com/Jorge-Luis-Herrera"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="p-2 rounded-lg text-muted hover:text-ink hover:bg-surface-2"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="p-2 rounded-lg text-muted hover:text-ink hover:bg-surface-2"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="mailto:herreraceciliajorgeluis@gmail.com"
                                    aria-label={t('contact.email')}
                                    className="p-2 rounded-lg text-muted hover:text-ink hover:bg-surface-2"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
