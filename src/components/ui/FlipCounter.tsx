import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';

interface FlipCounterProps {
    /** Final value. */
    to: number;
    className?: string;
    /** Extra delay before the digits start rolling, in seconds. */
    delay?: number;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Mechanical split-flap counter: each digit is a strip of 0–9 that rolls to
 * its value, one digit after the other, the first time the number scrolls into
 * view. The strip is moved with a CSS variable so the browser interpolates the
 * `em` unit itself (no per-frame JavaScript).
 */
export const FlipCounter = ({ to, className, delay = 0 }: FlipCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(false);

    useEffect(() => {
        if (reduceMotion) return;

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                setRun(true);
                observer.disconnect();
            },
            { threshold: 0.4 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [reduceMotion]);

    const digits = String(to).split('').map(Number);

    return (
        <span ref={ref} className={`inline-flex tabular-nums ${className ?? ''}`}>
            {digits.map((digit, index) => (
                <span key={`${index}-${digit}`} className="flip-window" aria-hidden="true">
                    <span
                        className="flip-strip"
                        data-run={run ? 'true' : undefined}
                        style={
                            {
                                '--digit': digit,
                                transitionDelay: `${(delay + index * 0.09).toFixed(2)}s`,
                            } as CSSProperties
                        }
                    >
                        {DIGITS.map((value) => (
                            <span key={value} className="flip-cell">
                                {value}
                            </span>
                        ))}
                    </span>
                </span>
            ))}
            <span className="sr-only">{to}</span>
        </span>
    );
};
