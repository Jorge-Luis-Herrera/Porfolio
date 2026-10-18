import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticProps {
    children: ReactNode;
    className?: string;
    /** How strongly the element follows the pointer (0.1 – 0.5 works best). */
    strength?: number;
}

/**
 * Magnetic hover: the element drifts towards the pointer and springs back.
 */
export const Magnetic = ({ children, className, strength = 0.32 }: MagneticProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const reduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

    const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
        const el = ref.current;
        if (!el || reduceMotion) return;

        const rect = el.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            style={{ x: springX, y: springY }}
            onPointerMove={handleMove}
            onPointerLeave={reset}
            className={`inline-block ${className ?? ''}`}
        >
            {children}
        </motion.span>
    );
};
