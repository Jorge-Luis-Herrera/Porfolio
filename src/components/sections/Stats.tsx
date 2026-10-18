import { FlipCounter } from '../ui/FlipCounter';
import { Reveal } from '../ui/Reveal';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import { TECHNOLOGIES, SPOKEN_LANGUAGES } from '../../data/tech';

export const Stats = () => {
    const { t } = useLanguage();

    const inProduction = projects.filter((p) => p.liveLink).length;

    const stats = [
        { value: projects.length, suffix: '', label: t('stats.projects') },
        { value: inProduction, suffix: '', label: t('stats.production') },
        { value: SPOKEN_LANGUAGES, suffix: '', label: t('stats.languages') },
        { value: TECHNOLOGIES.length, suffix: '', label: t('stats.tech') },
    ];

    return (
        <section className="border-y border-line bg-surface-2/30">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
                <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {stats.map((s, i) => (
                        <Reveal key={s.label} delay={i * 0.08} className="text-center lg:text-left">
                            <dt className="sr-only">{s.label}</dt>
                            <dd>
                                <FlipCounter
                                    to={s.value}
                                    delay={i * 0.12}
                                    className="font-display font-bold text-3xl sm:text-4xl text-ink"
                                />
                                <span className="mt-2 block font-mono text-[11px] sm:text-xs uppercase tracking-wider text-muted">
                                    {s.label}
                                </span>
                            </dd>
                        </Reveal>
                    ))}
                </dl>
            </div>
        </section>
    );
};
