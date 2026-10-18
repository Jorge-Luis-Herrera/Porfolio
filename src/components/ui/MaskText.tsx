import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ElementType } from 'react';

interface MaskTextProps {
    text: string;
    /** Element used to render the text. Defaults to a span. */
    as?: ElementType;
    className?: string;
    /** Seconds before the first word starts moving. */
    delay?: number;
    /** Seconds between words. */
    stagger?: number;
    /** When false the words stay hidden, waiting for the intro to finish. */
    start?: boolean;
}

/**
 * Masked line reveal: every word slides up from behind its own clip.
 * A signature move on award-winning portfolios.
 */
export const MaskText = ({
    text,
    as: Tag = 'span',
    className,
    delay = 0,
    stagger = 0.055,
    start = true,
}: MaskTextProps) => {
    const reduceMotion = useReducedMotion();
    const words = text.split(' ');

    if (reduceMotion) {
        return <Tag className={className}>{text}</Tag>;
    }

    return (
        <Tag className={className}>
            {words.map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                    <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                        <motion.span
                            className="inline-block"
                            initial={{ y: '115%' }}
                            animate={{ y: start ? 0 : '115%' }}
                            transition={{
                                duration: 0.8,
                                delay: delay + index * stagger,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            {word}
                        </motion.span>
                    </span>
                    {index < words.length - 1 ? ' ' : null}
                </Fragment>
            ))}
        </Tag>
    );
};
