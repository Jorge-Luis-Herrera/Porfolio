import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';
import { registerLenis } from '../../lib/lenis';
import 'lenis/dist/lenis.css';

/**
 * Premium inertia scrolling (Lenis) driven by the rAF loop.
 * Disabled when the visitor prefers reduced motion.
 */
export const SmoothScroll = () => {
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;

        const lenis = new Lenis({
            duration: 1.05,
            // Anchor links stop 80px earlier so the fixed header never covers them
            anchors: { offset: -80 },
            smoothWheel: true,
        });
        registerLenis(lenis);

        let frame = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            registerLenis(null);
            lenis.destroy();
        };
    }, [reduceMotion]);

    return null;
};
