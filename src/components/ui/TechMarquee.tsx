const TECHNOLOGIES = [
    'TypeScript', 'React', 'Next.js', 'Rust', 'Python', 'C#', 'Node.js',
    'NestJS', 'Axum', 'PostgreSQL', 'SQLite', 'Tailwind CSS', 'Framer Motion',
    'Docker', 'Azure', 'GitHub Actions', 'Selenium', 'Linux',
];

/**
 * Infinite technology marquee. The list is duplicated so the loop is seamless.
 */
export const TechMarquee = () => {
    return (
        <div
            className="marquee-mask overflow-hidden py-3 border-y border-line bg-surface-2/30"
            aria-label="Technologies"
        >
            <ul className="animate-marquee flex w-max items-center gap-10 pr-10">
                {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
                    <li
                        key={`${tech}-${i}`}
                        className="font-mono text-xs sm:text-sm uppercase tracking-wider text-muted whitespace-nowrap"
                        aria-hidden={i >= TECHNOLOGIES.length}
                    >
                        {tech}
                        <span className="ml-10 text-accent/50">/</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
