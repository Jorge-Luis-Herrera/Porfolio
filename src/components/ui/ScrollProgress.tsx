import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin reading-progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-accent z-[60]"
        />
    );
};
