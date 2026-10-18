import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    /** Stagger delay in seconds. */
    delay?: number;
    /** Direction the content travels from. */
    from?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
}

const offsets: Record<NonNullable<RevealProps['from']>, { x: number; y: number }> = {
    up: { x: 0, y: 22 },
    down: { x: 0, y: -22 },
    left: { x: -22, y: 0 },
    right: { x: 22, y: 0 },
    none: { x: 0, y: 0 },
};

/** Scroll-triggered entrance animation wrapper. */
export const Reveal = ({ children, delay = 0, from = 'up', className }: RevealProps) => {
    const reduceMotion = useReducedMotion();
    const offset = offsets[from];

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? undefined : { opacity: 0, ...offset }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
};
