import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getLenis } from '../../lib/lenis';

/**
 * Floating "back to top" control with a reading-progress ring. It appears once
 * the reader has left the first screen, and rides on Lenis when available.
 */
export const BackToTop = () => {
    const { t } = useLanguage();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const toTop = () => {
        const lenis = getLenis();

        if (lenis) {
            lenis.scrollTo(0, { duration: 1.1 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    onClick={toTop}
                    initial={{ opacity: 0, y: 18, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 18, scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    aria-label={t('nav.top')}
                    data-cursor={t('nav.top')}
                    className="fixed bottom-5 right-5 z-[60] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/85 text-ink shadow-[0_18px_40px_-24px_rgba(15,23,42,0.7)] backdrop-blur-md transition-colors hover:border-accent/40"
                >
                    <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90" aria-hidden="true">
                        <circle
                            cx="22"
                            cy="22"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-line"
                        />
                        <motion.circle
                            cx="22"
                            cy="22"
                            r="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="text-accent"
                            style={{ pathLength: progress }}
                        />
                    </svg>
                    <ArrowUp className="relative h-4 w-4" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
