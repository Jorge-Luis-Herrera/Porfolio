import { motion, useReducedMotion } from 'framer-motion';

/**
 * Signature mark — handwritten-style wordmark for the site header.
 * The accent swash draws itself in on load.
 */
export const Signature = ({ className = '' }: { className?: string }) => {
    const reduceMotion = useReducedMotion();

    return (
        <span
            className={`relative inline-flex flex-col leading-none ${className}`}
            aria-label="Jorge Luis Herrera Cecilia"
            role="img"
        >
            <span className="font-signature text-[1.35rem] sm:text-[1.6rem] leading-[1.35] text-ink whitespace-nowrap">
                Jorge Luis Herrera
            </span>
            <svg
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full h-2.5 text-accent/70"
                preserveAspectRatio="none"
            >
                <motion.path
                    d="M2 7.5C38 2.5 74 2 110 4.5c36 2.5 72 3 106 -0.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                    transition={{
                        pathLength: { duration: 1.1, delay: 0.35, ease: 'easeInOut' },
                        opacity: { duration: 0.3, delay: 0.35 },
                    }}
                />
            </svg>
        </span>
    );
};
