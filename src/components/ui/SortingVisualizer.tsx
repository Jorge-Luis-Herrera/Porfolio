import { useEffect, useRef, useState } from 'react';

interface SortingVisualizerProps {
    className?: string;
}

interface SortStep {
    values: number[];
    /** Indices being compared / swapped, or -1 when idle. */
    a: number;
    b: number;
}

const STEP_MS = 330;
const START = [64, 22, 88, 41, 76, 15, 53];

/** Every comparison and swap of a bubble sort run, precomputed once. */
const buildSteps = () => {
    const values = [...START];
    const steps: SortStep[] = [{ values: [...values], a: -1, b: -1 }];

    for (let i = 0; i < values.length - 1; i += 1) {
        for (let j = 0; j < values.length - 1 - i; j += 1) {
            steps.push({ values: [...values], a: j, b: j + 1 });
            if (values[j] > values[j + 1]) {
                const swap = values[j];
                values[j] = values[j + 1];
                values[j + 1] = swap;
                steps.push({ values: [...values], a: j, b: j + 1 });
            }
        }
    }

    steps.push({ values: [...values], a: -1, b: -1 });
    return steps;
};

const STEPS = buildSteps();
const MAX_VALUE = Math.max(...START);

/**
 * A tiny bubble-sort animation: the classic "visual algorithm" made of bars.
 * Only advances while it is on screen and stays frozen (sorted) with reduced
 * motion.
 */
export const SortingVisualizer = ({ className }: SortingVisualizerProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const visibleRef = useRef(true);
    const [step, setStep] = useState(0);
    const [reduced] = useState(
        () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        const host = hostRef.current;
        if (!host || reduced) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = entry.isIntersecting;
            },
            { rootMargin: '80px' }
        );

        const interval = window.setInterval(() => {
            if (!visibleRef.current) return;
            setStep((current) => (current + 1) % STEPS.length);
        }, STEP_MS);

        observer.observe(host);

        return () => {
            window.clearInterval(interval);
            observer.disconnect();
        };
    }, [reduced]);

    const current = reduced ? STEPS[STEPS.length - 1] : STEPS[step];

    return (
        <div
            ref={hostRef}
            aria-hidden="true"
            className={`flex h-full items-end gap-1.5 ${className ?? ''}`}
        >
            {current.values.map((value, index) => {
                const comparing = index === current.a || index === current.b;
                return (
                    <span
                        key={index}
                        style={{ height: `${Math.round((value / MAX_VALUE) * 100)}%` }}
                        className={`w-full rounded-t-[3px] transition-[height,background-color] duration-300 ease-out ${
                            comparing ? 'bg-accent' : 'bg-accent/25'
                        }`}
                    />
                );
            })}
        </div>
    );
};
