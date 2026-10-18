import { useReducedMotion } from 'framer-motion';

interface LetterRevealProps {
    text: string;
    /** Milliseconds before the first letter appears. */
    delay?: number;
    /** Milliseconds between letters. */
    stagger?: number;
    className?: string;
}

/**
 * Reveals text letter by letter with a blur/fade entrance.
 * The render is aria-hidden and a plain copy is offered to screen readers.
 */
export const LetterReveal = ({ text, delay = 0, stagger = 12, className }: LetterRevealProps) => {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <span className={className}>{text}</span>;
    }

    const words = text.split(' ');
    let index = 0;

    return (
        <span className={className}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {words.map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block">
                        {Array.from(word).map((char, charIndex) => {
                            const letterDelay = delay + index * stagger;
                            index += 1;
                            return (
                                <span
                                    key={charIndex}
                                    className="letter"
                                    style={{ animationDelay: `${letterDelay}ms` }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                        {wordIndex < words.length - 1 && (
                            <span
                                className="letter"
                                style={{ animationDelay: `${delay + index * stagger}ms` }}
                            >
                                {' '}
                            </span>
                        )}
                    </span>
                ))}
            </span>
        </span>
    );
};
