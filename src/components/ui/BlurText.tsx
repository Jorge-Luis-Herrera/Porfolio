import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType } from 'react';

interface BlurTextProps {
    text: string;
    as?: ElementType;
    className?: string;
    delay?: number;
    stagger?: number;
}

/**
 * Words fade in from a blur while scrolling into view.
 * Based on the ReactBits "BlurText" pattern.
 */
export const BlurText = ({
    text,
    as: Tag = 'h2',
    className,
    delay = 0,
    stagger = 0.045,
}: BlurTextProps) => {
    const reduceMotion = useReducedMotion();
    const words = text.split(' ');

    return (
        <Tag className={className}>
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    className="inline-block"
                    initial={reduceMotion ? undefined : { opacity: 0, y: 14, filter: 'blur(10px)' }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                        duration: 0.6,
                        delay: delay + index * stagger,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {word}
                </motion.span>
            )).flatMap((node, index) =>
                index < words.length - 1 ? [node, ' '] : [node]
            )}
        </Tag>
    );
};
