import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const SECTIONS = ['home', 'projects', 'skills', 'about', 'contact'] as const;

export const Navbar = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const labels: Record<string, string> = {
        home: t('nav.home'),
        projects: t('nav.projects'),
        skills: t('nav.skills'),
        about: t('nav.about'),
        contact: t('nav.contact'),
    };

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-base/80 backdrop-blur-md border-b border-line'
                        : 'bg-transparent border-b border-transparent'
                }`}
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
                    <a href="#home" className="font-display font-bold text-lg text-ink">
                        Jorge<span className="text-accent">.</span>Herrera
                    </a>

                    <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
                        {SECTIONS.map((s) => (
                            <a
                                key={s}
                                href={`#${s}`}
                                className="px-3 py-2 rounded-lg text-sm text-muted hover:text-ink hover:bg-surface-2 transition-colors"
                            >
                                {labels[s]}
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
                        >
                            <div className="flex items-center justify-between mb-10">
                                <span className="font-display font-bold text-ink">
                                    Jorge<span className="text-accent">.</span>Herrera
                                </span>
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
                                        className="px-3 py-3 rounded-lg text-base text-muted hover:text-ink hover:bg-surface-2 transition-colors"
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
                                    href="https://linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/"
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
