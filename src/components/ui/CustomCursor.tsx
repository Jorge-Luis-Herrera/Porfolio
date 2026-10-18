import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary';

/**
 * Two-part custom cursor: a precise dot plus a lagging ring that grows over
 * interactive elements. Desktop pointers only, and skipped for reduced motion.
 */
export const CustomCursor = () => {
    const reduceMotion = useReducedMotion();
    const [enabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);

    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.5 });

    useEffect(() => {
        if (!enabled || reduceMotion) return;

        const root = document.documentElement;
        root.classList.add('has-custom-cursor');

        const onPointerMove = (event: PointerEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setVisible(true);

            const target = event.target as Element | null;
            setHovering(Boolean(target?.closest(INTERACTIVE)));
        };

        const onPointerLeave = () => setVisible(false);

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('mouseleave', onPointerLeave);

        return () => {
            root.classList.remove('has-custom-cursor');
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('mouseleave', onPointerLeave);
        };
    }, [enabled, reduceMotion, x, y]);

    if (!enabled || reduceMotion) return null;

    return (
        <>
            <motion.div
                aria-hidden="true"
                style={{ x, y }}
                className="pointer-events-none fixed top-0 left-0 z-[95] mix-blend-difference"
            >
                <div className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </motion.div>

            <motion.div
                aria-hidden="true"
                style={{ x: ringX, y: ringY }}
                className="pointer-events-none fixed top-0 left-0 z-[95] mix-blend-difference"
            >
                <motion.div
                    animate={{
                        width: hovering ? 56 : 26,
                        height: hovering ? 56 : 26,
                        opacity: visible ? 1 : 0,
                    }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                />
            </motion.div>
        </>
    );
};
