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
    /* Dead zone below ±700 px/s, so slow scrolling stays perfectly square and
       only fast flings get a (small) skew. Skewing <main> re-rasterises the
       page while scrolling, so keeping it rare and tiny protects frame time. */
    const skewTarget = useTransform(
        smoothVelocity,
        [-2600, -700, 700, 2600],
        [-0.7, 0, 0, 0.7],
        { clamp: true }
    );
    const skewY = useSpring(skewTarget, { damping: 40, stiffness: 320 });

    if (reduceMotion) return <main>{children}</main>;

    return (
        <motion.main style={{ skewY }} className="origin-center">
            {children}
        </motion.main>
    );
};
