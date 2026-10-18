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

        /*
         * In-page links glide with Lenis instead of jumping. This also keeps
         * "#projects" out of the address bar, so reloading always lands on the
         * hero instead of half way down the page.
         * The default is only prevented once the target has been resolved, so a
         * broken selector can never leave a dead link behind.
         */
        const onAnchorClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
            const hash = link?.getAttribute('href');
            if (!hash || hash === '#') return;

            let target: Element | null = null;
            try {
                target = document.querySelector(hash);
            } catch {
                return;
            }
            if (!(target instanceof HTMLElement)) return;

            event.preventDefault();
            lenis.scrollTo(target, { offset: -80 });
        };

        document.addEventListener('click', onAnchorClick, { capture: true });

        return () => {
            document.removeEventListener('click', onAnchorClick, { capture: true });
            cancelAnimationFrame(frame);
            registerLenis(null);
            lenis.destroy();
        };
    }, [reduceMotion]);

    return null;
};
