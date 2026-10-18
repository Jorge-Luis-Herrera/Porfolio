import { Binary, Dumbbell, Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BlurText } from '../ui/BlurText';
import { CalisthenicsFigure } from '../ui/CalisthenicsFigure';
import { GraphBackdrop } from '../ui/GraphBackdrop';
import { Reveal } from '../ui/Reveal';
import { SortingVisualizer } from '../ui/SortingVisualizer';

const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const CARD =
    'card border-animated relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface/80 p-6 backdrop-blur-md sm:p-7';

export const HobbiesSection = () => {
    const { t } = useLanguage();

    const calisthenicsSkills = [
        t('hobbies.calisthenics.skill1'),
        t('hobbies.calisthenics.skill2'),
        t('hobbies.calisthenics.skill3'),
        t('hobbies.calisthenics.skill4'),
    ];

    const competitiveTags = [
        t('hobbies.competitive.tag1'),
        t('hobbies.competitive.tag2'),
        t('hobbies.competitive.tag3'),
        t('hobbies.competitive.tag4'),
    ];

    return (
        <section
            id="hobbies"
            className="relative scroll-mt-20 overflow-hidden border-t border-line py-20 sm:py-28"
        >
            {/* Moving graph network behind every card, MatCom portal style. */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-base via-surface-2/25 to-base"
                aria-hidden="true"
            />
            <GraphBackdrop className="opacity-60" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-10 max-w-2xl">
                    <BlurText as="h2" className="section-title" text={t('hobbies.title')} />
                    <p className="mt-3 text-sm text-muted sm:text-base">{t('hobbies.subtitle')}</p>
                </header>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
                    {/* Calisthenics — includes the animated figure */}
                    <Reveal className="lg:col-span-7" from="up">
                        <article className={CARD}>
                            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                                <div className="min-w-0 flex-1">
                                    <span className="chip mb-3">
                                        <Dumbbell className="h-3.5 w-3.5 text-accent" />
                                        {t('hobbies.calisthenics.kicker')}
                                    </span>
                                    <h3 className="font-display text-xl text-ink sm:text-2xl">
                                        {t('hobbies.calisthenics.title')}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted">
                                        {t('hobbies.calisthenics.desc')}
                                    </p>
                                    <ul className="mt-5 flex flex-wrap gap-1.5">
                                        {calisthenicsSkills.map((skill) => (
                                            <li key={skill} className="chip">
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <CalisthenicsFigure
                                    className="mx-auto w-full max-w-[15rem] shrink-0 sm:mx-0 sm:w-52"
                                    label={t('hobbies.figureLabel')}
                                    repsLabel={t('hobbies.calisthenics.reps')}
                                />
                            </div>
                        </article>
                    </Reveal>

                    {/* Languages — English B2 front and centre */}
                    <Reveal className="lg:col-span-5" from="up" delay={0.08}>
                        <article className={CARD}>
                            <span className="chip mb-3">
                                <Languages className="h-3.5 w-3.5 text-accent" />
                                {t('hobbies.languages.title')}
                            </span>

                            <div className="flex items-center gap-4 rounded-lg border border-line bg-surface-2/60 p-4">
                                <span className="font-display text-3xl leading-none text-accent">B2</span>
                                <span className="min-w-0">
                                    <span className="block text-sm font-medium text-ink">
                                        {t('hobbies.languages.english')}
                                    </span>
                                    <span className="block font-mono text-[11px] text-muted">
                                        {t('hobbies.level.b2')}
                                    </span>
                                </span>
                            </div>

                            <ul className="mt-3 flex items-center gap-1.5">
                                {CEFR.map((level) => (
                                    <li
                                        key={level}
                                        className={`flex-1 rounded-full px-1 py-1 text-center font-mono text-[10px] ${
                                            level === 'B2'
                                                ? 'bg-accent font-medium text-white'
                                                : 'bg-surface-2 text-muted/70'
                                        }`}
                                    >
                                        {level}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-4 text-sm leading-relaxed text-muted">
                                {t('hobbies.languages.desc')}
                            </p>

                            <p className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
                                <span className="font-medium text-ink">
                                    {t('hobbies.languages.spanish')}
                                </span>
                                <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                                    {t('hobbies.level.native')}
                                </span>
                            </p>
                        </article>
                    </Reveal>

                    {/* Competitive programming — with the algorithm visual */}
                    <Reveal className="md:col-span-2 lg:col-span-12" from="up" delay={0.12}>
                        <article className={CARD}>
                            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
                                <div className="min-w-0 flex-1">
                                    <span className="chip mb-3">
                                        <Binary className="h-3.5 w-3.5 text-accent" />
                                        {t('hobbies.competitive.kicker')}
                                    </span>
                                    <h3 className="font-display text-xl text-ink sm:text-2xl">
                                        {t('hobbies.competitive.title')}
                                    </h3>
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                                        {t('hobbies.competitive.desc')}
                                    </p>
                                    <ul className="mt-5 flex flex-wrap gap-1.5">
                                        {competitiveTags.map((tag) => (
                                            <li key={tag} className="chip">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full shrink-0 flex-col gap-2 sm:w-72">
                                    <div className="h-24 w-full rounded-lg border border-line bg-surface-2/50 p-2 sm:h-32">
                                        <SortingVisualizer className="h-full" />
                                    </div>
                                    <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                        {t('hobbies.competitive.caption')}
                                    </p>
                                </div>
                            </div>
                        </article>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
