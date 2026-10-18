import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { getLenis } from '../../lib/lenis';
import { markPreloaderDone } from '../../lib/preloader';

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const DURATION = 1500;
const STORAGE_KEY = 'jorge-preloader-shown';

/**
 * Award-show style intro: a counter runs from 000 to 100 and the whole
 * curtain lifts away. It only plays once per browser session and never
 * for visitors with reduced-motion enabled.
 */
export const Preloader = () => {
    const reduceMotion = useReducedMotion();
    const [alreadyShown] = useState(
        () => typeof window !== 'undefined' && window.sessionStorage.getItem(STORAGE_KEY) === '1'
    );
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);

    const skip = Boolean(reduceMotion) || alreadyShown;

    useEffect(() => {
        if (skip || done) return;

        const lenis = getLenis();
        lenis?.stop();

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const startedAt = performance.now();
        const frame = requestAnimationFrame(function tick(now: number) {
            const ratio = Math.min((now - startedAt) / DURATION, 1);
            // easeOutCubic keeps the counter snappy at the start
            const eased = 1 - Math.pow(1 - ratio, 3);
            setProgress(Math.round(eased * 100));

            if (ratio < 1) {
                requestAnimationFrame(tick);
            } else {
                window.sessionStorage.setItem(STORAGE_KEY, '1');
                markPreloaderDone();
                setDone(true);
            }
        });

        return () => {
            cancelAnimationFrame(frame);
            document.body.style.overflow = previousOverflow;
            lenis?.start();
        };
    }, [skip, done]);

    if (skip) return null;

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="preloader"
                    aria-hidden="true"
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.85, ease: CURTAIN_EASE }}
                >
                    <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

                    <span className="relative font-display text-5xl sm:text-7xl font-bold text-ink tabular-nums">
                        {String(progress).padStart(3, '0')}
                    </span>

                    <span className="relative mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-muted">
                        Cargando · Loading
                    </span>

                    <div className="relative mt-8 h-px w-44 sm:w-64 overflow-hidden bg-line">
                        <div
                            className="h-full bg-accent transition-[width] duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
