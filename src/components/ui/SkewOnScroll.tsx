import type { ReactNode } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';

/**
 * Gives the page a little physical weight: while you scroll fast the content
 * skews a hair in the direction of travel and springs back to square when you
 * stop. Off for reduced motion.
 */
export const SkewOnScroll = ({ children }: { children: ReactNode }) => {
    const reduceMotion = useReducedMotion();
    const { scrollY } = useScroll();
    const velocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 380 });
    const skewTarget = useTransform(smoothVelocity, [-2400, 0, 2400], [-1.1, 0, 1.1], {
        clamp: true,
    });
    const skewY = useSpring(skewTarget, { damping: 40, stiffness: 320 });

    if (reduceMotion) return <main>{children}</main>;

    return (
        <motion.main style={{ skewY }} className="origin-center">
            {children}
        </motion.main>
    );
};
