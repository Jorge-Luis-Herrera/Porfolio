import { useRef, useState } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion, useSpring, useReducedMotion } from 'framer-motion';

type TiltCardProps = Omit<HTMLMotionProps<'div'>, 'style'> & {
    /** Maximum tilt in degrees. */
    max?: number;
};

/**
 * 3D tilt that follows the pointer, plus an accent glow emitted from the
 * cursor position (driven by CSS custom properties on the card itself).
 * Only active for fine pointers without reduced motion.
 */
export const TiltCard = ({ max = 6, className, children, ...rest }: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [enabled] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const active = enabled && !reduceMotion;

    const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
    const [hovered, setHovered] = useState(false);

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const el = cardRef.current;
        if (!el || !active) return;

        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        el.style.setProperty('--gx', `${(px * 100).toFixed(2)}%`);
        el.style.setProperty('--gy', `${(py * 100).toFixed(2)}%`);

        rotateY.set((px - 0.5) * max * 2);
        rotateX.set(-(py - 0.5) * max * 2);
    };

    const handlePointerEnter = () => {
        setHovered(true);
    };

    const handlePointerLeave = () => {
        setHovered(false);
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            {...rest}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            style={
                active
                    ? { rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }
                    : undefined
            }
            className={`glow-follow relative ${className ?? ''}`}
            data-tilted={hovered ? 'true' : undefined}
        >
            {children}
        </motion.div>
    );
};
