import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary';
/** Elements opting into a labelled cursor state: data-cursor="Ver". */
const LABELLED = '[data-cursor]';

/**
 * Two-part custom cursor: a precise dot plus a lagging ring that grows over
 * interactive elements and turns into a labelled bubble when the target
 * declares one with `data-cursor`. Desktop pointers only, skipped for reduced
 * motion.
 */
export const CustomCursor = () => {
    const reduceMotion = useReducedMotion();
    const [enabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const [hovering, setHovering] = useState(false);
    const [label, setLabel] = useState<string | null>(null);
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

            const labelled = target?.closest(LABELLED) as HTMLElement | null;
            setLabel(labelled?.dataset.cursor?.trim() || null);
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
                <motion.div
                    animate={{ scale: label ? 0 : 1, opacity: visible ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                />
            </motion.div>

            <motion.div
                aria-hidden="true"
                style={{ x: ringX, y: ringY }}
                className="pointer-events-none fixed top-0 left-0 z-[95] mix-blend-difference"
            >
                <motion.div
                    animate={{
                        width: label ? 78 : hovering ? 56 : 26,
                        height: label ? 78 : hovering ? 56 : 26,
                        opacity: visible ? 1 : 0,
                    }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white"
                >
                    <motion.span
                        animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.7 }}
                        transition={{ duration: 0.18 }}
                        className="cursor-label select-none text-center leading-none text-white"
                    >
                        {label}
                    </motion.span>
                </motion.div>
            </motion.div>
        </>
    );
};
