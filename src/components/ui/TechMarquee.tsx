import { useRef } from 'react';
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';

const TECHNOLOGIES = [
    'TypeScript', 'React', 'Next.js', 'Rust', 'Python', 'C#', 'Node.js',
    'NestJS', 'Axum', 'PostgreSQL', 'SQLite', 'Tailwind CSS', 'Framer Motion',
    'Docker', 'Azure', 'GitHub Actions', 'Selenium', 'Linux',
];

/** The row holds four copies, so shifting it by 25% loops seamlessly. */
const COPIES = 4;
const LOOP = 100 / COPIES;

const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};

/**
 * Technology marquee that reacts to the scroll: it drifts on its own, speeds
 * up while the page moves and reverses direction when you scroll back up.
 * With reduced motion it falls back to a plain CSS loop.
 */
export const TechMarquee = () => {
    const reduceMotion = useReducedMotion();
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4.5], { clamp: false });
    const directionFactor = useRef(1);
    const x = useTransform(baseX, (value) => `${wrap(-LOOP, 0, value)}%`);

    useAnimationFrame((_, delta) => {
        if (reduceMotion) return;

        // Base drift, in percentage of the row width per second.
        let moveBy = directionFactor.current * -3.2 * (delta / 1000);

        const factor = velocityFactor.get();
        if (factor < 0) directionFactor.current = -1;
        else if (factor > 0) directionFactor.current = 1;

        moveBy += directionFactor.current * moveBy * factor;
        baseX.set(baseX.get() + moveBy);
    });

    const items = Array.from({ length: COPIES }, () => TECHNOLOGIES).flat();

    return (
        <div
            className="marquee-mask overflow-hidden py-3 border-y border-line bg-surface-2/30"
            aria-label="Technologies"
        >
            <motion.div
                style={reduceMotion ? undefined : { x }}
                className={`flex w-max items-center gap-10 pr-10 ${
                    reduceMotion ? 'animate-marquee' : ''
                }`}
            >
                {items.map((tech, i) => (
                    <span
                        key={`${tech}-${i}`}
                        className="font-mono text-xs sm:text-sm uppercase tracking-wider text-muted whitespace-nowrap"
                        aria-hidden={i >= TECHNOLOGIES.length}
                    >
                        {tech}
                        <span className="ml-10 text-accent/50">/</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
