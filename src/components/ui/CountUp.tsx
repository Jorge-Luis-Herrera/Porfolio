import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountUpProps {
    to: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

/** Animated number that counts up when scrolled into view. */
export const CountUp = ({ to, duration = 1600, suffix = '', prefix = '', className }: CountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);
    const started = useRef(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el || reduceMotion) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting || started.current) return;
                started.current = true;

                const start = performance.now();
                const tick = (now: number) => {
                    const progress = Math.min((now - start) / duration, 1);
                    // easeOutExpo for a snappy but smooth finish
                    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                    setValue(Math.round(eased * to));
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [to, duration, reduceMotion]);

    const display = reduceMotion ? to : value;

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display}
            {suffix}
        </span>
    );
};
