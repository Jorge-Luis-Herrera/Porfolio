import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Diameter of the glow. It is placed with transforms, so this is free. */
const SIZE = 1400;

/**
 * Cursor-following accent glow (brittanychiang.com style).
 *
 * Performance: the glow is a single fixed-size layer whose position is updated
 * with `translate3d` — a composited transform, no repaint. Rewriting a
 * `background` string on a full-screen element (the naive approach) repaints
 * the entire viewport on every pointer event.
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export const Spotlight = () => {
    const glowRef = useRef<HTMLDivElement>(null);
    const [enabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!enabled || reduceMotion) return;

        const el = glowRef.current;
        if (!el) return;

        let frame = 0;
        let next: PointerEvent | null = null;
        let visible = false;

        const flush = () => {
            frame = 0;
            const event = next;
            next = null;
            if (!event) return;

            el.style.transform = `translate3d(${(event.clientX - SIZE / 2).toFixed(1)}px, ${(
                event.clientY - SIZE / 2
            ).toFixed(1)}px, 0)`;

            // Fade in on first movement, stay on until cleanup otherwise.
            if (!visible) {
                visible = true;
                el.style.opacity = '1';
            }
        };

        const onMove = (event: PointerEvent) => {
            next = event;
            if (!frame) frame = requestAnimationFrame(flush);
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerleave', onMove, { passive: true });

        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerleave', onMove);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [reduceMotion, enabled]);

    if (!enabled) return null;

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div
                ref={glowRef}
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    width: SIZE,
                    height: SIZE,
                    borderRadius: '9999px',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    background:
                        'radial-gradient(circle at center, color-mix(in srgb, var(--accent) 12%, transparent), transparent 62%)',
                }}
            />
        </div>
    );
};
