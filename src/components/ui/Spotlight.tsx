import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Cursor-following accent glow (brittanychiang.com style).
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export const Spotlight = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [enabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!enabled || reduceMotion) return;

        const onMove = (e: PointerEvent) => {
            const el = ref.current;
            if (!el) return;
            el.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)`;
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, [reduceMotion, enabled]);

    if (!enabled) return null;

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        />
    );
};
