import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#0123456789';

interface ScrambleTextProps {
    text: string;
    as?: ElementType;
    className?: string;
    /** Total decode time in milliseconds. */
    duration?: number;
}

/**
 * Decodes the text with random glyphs when it enters the viewport.
 * Replays on hover for a nice micro-interaction.
 */
export const ScrambleText = ({ text, as: Tag = 'span', className, duration = 900 }: ScrambleTextProps) => {
    const reduceMotion = useReducedMotion();
    const [output, setOutput] = useState(() =>
        reduceMotion ? text : text.replace(/[^ ]/g, ' ')
    );
    const running = useRef(false);

    const start = useCallback(() => {
        if (reduceMotion || running.current) {
            setOutput(text);
            return;
        }

        running.current = true;
        const characters = Array.from(text);
        const startedAt = performance.now();

        const tick = (now: number) => {
            const ratio = Math.min((now - startedAt) / duration, 1);
            const revealed = Math.floor(ratio * characters.length);

            setOutput(
                characters
                    .map((char, index) => {
                        if (index < revealed || char === ' ') return char;
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    })
                    .join('')
            );

            if (ratio < 1) {
                requestAnimationFrame(tick);
            } else {
                running.current = false;
            }
        };

        requestAnimationFrame(tick);
    }, [duration, reduceMotion, text]);

    return (
        <Tag className={className} onMouseEnter={start}>
            <motion.span
                className="inline-block"
                onViewportEnter={start}
                viewport={{ once: true, margin: '-40px' }}
            >
                {output}
            </motion.span>
        </Tag>
    );
};
