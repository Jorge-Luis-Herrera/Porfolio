import { useMemo, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import {
    ArrowRight,
    Bot,
    ChevronLeft,
    ChevronRight,
    FileCode2,
    FolderOpen,
    Github,
    GraduationCap,
    HardDrive,
    Home,
    Rocket,
    Server,
    Star,
    Wifi,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProjectModal } from '../../context/ProjectModalContext';
import { categoryOrder, projects, type Project, type ProjectCategory } from '../../data/projects';
import { BlurText } from '../ui/BlurText';
import { FolderIcon } from '../ui/FolderIcon';
import { TiltCard } from '../ui/TiltCard';

/** Files shown per page inside an open folder. */
const PAGE_SIZE = 4;
/** How long the folder takes to open before its contents slide in. */
const OPEN_DELAY = 220;

const CATEGORY_ICONS: Record<ProjectCategory, LucideIcon> = {
    featured: Rocket,
    backend: Server,
    automation: Bot,
    academic: GraduationCap,
};

const CATEGORY_KEYS: Record<ProjectCategory, string> = {
    featured: 'explorer.category.featured',
    backend: 'explorer.category.backend',
    automation: 'explorer.category.automation',
    academic: 'explorer.category.academic',
};

/** Small fan tilt so the row of folders reads as a 3D desk row. */
const FAN_TILT = ['-4deg', '-1.4deg', '1.4deg', '4deg'];

interface FileTileProps {
    project: Project;
    index: number;
    animate: boolean;
    /** Tells the section which project the floating preview should show. */
    onPeek: (project: Project | null) => void;
}

const FileTile = ({ project, index, animate, onPeek }: FileTileProps) => {
    const { t, language } = useLanguage();
    const { openProject } = useProjectModal();

    return (
        <motion.button
            type="button"
            onClick={() => openProject(project)}
            onPointerEnter={() => onPeek(project)}
            onPointerLeave={() => onPeek(null)}
            onFocus={() => onPeek(project)}
            onBlur={() => onPeek(null)}
            data-cursor={t('cursor.view')}
            initial={animate ? { opacity: 0, y: 10 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="border-animated group flex w-full cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface-2/40 p-3 text-left transition-colors hover:border-accent/40 hover:bg-surface-2"
        >
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line bg-surface text-accent">
                <FileCode2 className="h-4 w-4" />
            </span>

            <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium text-ink">{project.title}</span>
                    {project.liveLink && (
                        <Wifi
                            role="img"
                            aria-label={t('projects.inProduction')}
                            className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                        />
                    )}
                    {project.starred && (
                        <Star
                            role="img"
                            aria-label={t('modal.featured')}
                            className="h-3.5 w-3.5 shrink-0 text-accent"
                            fill="currentColor"
                        />
                    )}
                </span>

                <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">
                    {project.description[language]}
                </span>

                <span className="mt-2 flex flex-wrap items-center gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="font-mono text-[10px] text-muted">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </span>
            </span>

            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
        </motion.button>
    );
};

/**
 * Linux file-manager window (Nautilus/Adwaita look) used to browse every
 * project: category folders open with a 3D flap, their files are paged and
 * every file opens the full project dialog.
 */
export const ProjectExplorer = () => {
    const { t, language } = useLanguage();
    const reduceMotion = useReducedMotion();

    const [openCategory, setOpenCategory] = useState<ProjectCategory | null>(null);
    const [openingCategory, setOpeningCategory] = useState<ProjectCategory | null>(null);
    const [page, setPage] = useState(0);

    // Floating preview that trails the cursor while browsing files.
    const [peek, setPeek] = useState<Project | null>(null);
    const [peekSide, setPeekSide] = useState<'right' | 'left'>('right');
    const [finePointer] = useState(
        () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
    );
    const peekX = useMotionValue(0);
    const peekY = useMotionValue(0);
    const followX = useSpring(peekX, { stiffness: 320, damping: 30, mass: 0.4 });
    const followY = useSpring(peekY, { stiffness: 320, damping: 30, mass: 0.4 });

    const handleSectionPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
        if (!finePointer) return;
        peekX.set(event.clientX);
        peekY.set(event.clientY);
        setPeekSide(event.clientX > window.innerWidth - 360 ? 'left' : 'right');
    };

    const folders = useMemo(
        () =>
            categoryOrder.map((category) => ({
                category,
                items: projects.filter((project) => project.category === category),
            })),
        []
    );

    const files = useMemo(
        () => projects.filter((project) => project.category === openCategory),
        [openCategory]
    );

    const pageCount = Math.max(1, Math.ceil(files.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount - 1);
    const visibleFiles = files.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE);

    const places = [
        { id: 'root' as const, label: t('explorer.home'), Icon: Home },
        ...categoryOrder.map((category) => ({
            id: category,
            label: t(CATEGORY_KEYS[category]),
            Icon: CATEGORY_ICONS[category],
        })),
    ];

    const isActive = (id: ProjectCategory | 'root') =>
        id === 'root' ? openCategory === null : openCategory === id;

    const openFolder = (category: ProjectCategory) => {
        if (openCategory === category) return;
        setOpeningCategory(category);

        if (reduceMotion) {
            setOpenCategory(category);
            setPage(0);
            return;
        }

        // Let the flap swing open before swapping the view.
        window.setTimeout(() => {
            setOpenCategory(category);
            setPage(0);
        }, OPEN_DELAY);
    };

    const goRoot = () => {
        setOpenCategory(null);
        setOpeningCategory(null);
        setPage(0);
    };

    const goTo = (id: ProjectCategory | 'root') => {
        if (id === 'root') goRoot();
        else openFolder(id);
    };

    const changePage = (delta: number) => {
        setPage((current) => Math.min(pageCount - 1, Math.max(0, current + delta)));
    };

    return (
        <section
            id="projects"
            onPointerMove={handleSectionPointerMove}
            className="scroll-mt-20 border-t border-line py-20 sm:py-28"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <header className="mb-8 sm:mb-10">
                    <BlurText as="h2" className="section-title" text={t('explorer.title')} />
                    <p className="mt-2 text-sm text-muted sm:text-base">{t('explorer.subtitle')}</p>
                </header>

                <motion.div
                    initial={reduceMotion ? undefined : { opacity: 0, y: 26 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <TiltCard
                        max={3}
                        className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-45px_rgba(15,23,42,0.6)]"
                    >
                        {/* Window title bar with breadcrumb */}
                        <div className="flex items-center gap-3 border-b border-line bg-surface-2/70 px-3 py-2.5 sm:px-4">
                            <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                            </span>

                            <nav
                                aria-label={t('explorer.places')}
                                className="flex min-w-0 flex-1 items-center gap-1 font-mono text-[11px] sm:text-xs"
                            >
                                <button
                                    type="button"
                                    onClick={goRoot}
                                    disabled={!openCategory}
                                    className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                                        openCategory
                                            ? 'text-muted hover:bg-surface-2 hover:text-ink'
                                            : 'text-ink'
                                    }`}
                                >
                                    <Home className="h-3.5 w-3.5" />
                                    {t('explorer.home')}
                                </button>

                                {openCategory && (
                                    <>
                                        <span className="text-muted/50" aria-hidden="true">
                                            /
                                        </span>
                                        <span className="truncate px-2 py-1 text-ink">
                                            {t(CATEGORY_KEYS[openCategory])}
                                        </span>
                                    </>
                                )}
                            </nav>

                            <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted md:inline-flex">
                                <FolderOpen className="h-3.5 w-3.5" />
                                {t('explorer.window')}
                            </span>
                        </div>

                        {/* Places, as a horizontal row on phones */}
                        <div className="flex gap-2 overflow-x-auto border-b border-line px-3 py-2 [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
                            {places.map(({ id, label, Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => goTo(id)}
                                    aria-current={isActive(id) ? 'true' : undefined}
                                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                        isActive(id)
                                            ? 'border-accent/40 bg-accent/10 text-accent'
                                            : 'border-line bg-surface text-muted'
                                    }`}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="flex">
                            {/* Sidebar */}
                            <nav
                                aria-label={t('explorer.places')}
                                className="hidden w-52 shrink-0 flex-col gap-1 border-r border-line bg-surface-2/40 p-3 sm:flex"
                            >
                                <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                                    {t('explorer.places')}
                                </p>

                                {places.map(({ id, label, Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => goTo(id)}
                                        aria-current={isActive(id) ? 'true' : undefined}
                                        className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                                            isActive(id)
                                                ? 'bg-accent/10 text-accent'
                                                : 'text-muted hover:bg-surface-2 hover:text-ink'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span className="truncate">{label}</span>
                                    </button>
                                ))}

                                <a
                                    href="https://github.com/Jorge-Luis-Herrera?tab=repositories"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                                >
                                    <Github className="h-4 w-4 shrink-0" />
                                    <span className="truncate">{t('explorer.repos')}</span>
                                </a>
                            </nav>

                            <div className="flex min-w-0 flex-1 flex-col">
                                <div
                                    data-lenis-prevent
                                    className="min-h-[19rem] flex-1 p-4 sm:min-h-[20rem] sm:p-5"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {openCategory === null ? (
                                            <motion.div
                                                key="folders"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.22 }}
                                            >
                                                <p className="mb-4 text-xs text-muted sm:text-sm">
                                                    {t('explorer.hint')}
                                                </p>

                                                <ul className="explorer-fan grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
                                                    {folders.map(({ category, items }, index) => {
                                                        const Icon = CATEGORY_ICONS[category];

                                                        return (
                                                            <motion.li
                                                            key={category}
                                                            className="explorer-fan__item list-none"
                                                            initial={
                                                                reduceMotion
                                                                    ? undefined
                                                                    : { opacity: 0, y: 18 }
                                                            }
                                                            animate={
                                                                reduceMotion
                                                                    ? undefined
                                                                    : { opacity: 1, y: 0 }
                                                            }
                                                            transition={{
                                                                duration: 0.45,
                                                                delay: index * 0.07,
                                                                ease: [0.22, 1, 0.36, 1],
                                                            }}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => openFolder(category)}
                                                                aria-expanded={openCategory === category}
                                                                className="folder3d-host group flex w-full flex-col items-center gap-2 rounded-xl px-2 pb-3 pt-5 text-center transition-colors hover:bg-surface-2/60"
                                                            >
                                                                <span
                                                                    className="explorer-fan__icon relative block h-16 w-20 sm:h-[4.5rem] sm:w-24"
                                                                    style={
                                                                        {
                                                                            '--fan-tilt':
                                                                                FAN_TILT[
                                                                                    index %
                                                                                        FAN_TILT.length
                                                                                ],
                                                                        } as CSSProperties
                                                                    }
                                                                >
                                                                    <FolderIcon
                                                                        open={
                                                                            openingCategory ===
                                                                            category
                                                                        }
                                                                    />
                                                                </span>

                                                                <span className="mt-1 flex flex-col items-center gap-0.5">
                                                                    <span className="text-xs font-medium text-ink sm:text-sm">
                                                                        {t(CATEGORY_KEYS[category])}
                                                                    </span>
                                                                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted">
                                                                        <Icon className="h-3 w-3" />
                                                                        {items.length}{' '}
                                                                        {items.length === 1
                                                                            ? t('explorer.item')
                                                                            : t('explorer.items')}
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </motion.li>
                                                        );
                                                    })}
                                                </ul>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={openCategory}
                                                initial={{ opacity: 0, y: 14 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                {visibleFiles.length === 0 ? (
                                                    <p className="py-10 text-center text-sm text-muted">
                                                        {t('explorer.empty')}
                                                    </p>
                                                ) : (
                                                    <ul className="grid gap-2.5 sm:grid-cols-2">
                                                        {visibleFiles.map((project, index) => (
                                                            <li key={project.id} className="list-none">
                                                                <FileTile
                                                                    project={project}
                                                                    index={index}
                                                                    animate={!reduceMotion}
                                                                    onPeek={setPeek}
                                                                />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Status bar */}
                                <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2/40 px-3 py-2 sm:px-4">
                                    <span className="inline-flex min-w-0 items-center gap-2 font-mono text-[10px] text-muted sm:text-[11px]">
                                        <HardDrive className="h-3.5 w-3.5 shrink-0" />
                                        <span className="truncate">
                                            {openCategory
                                                ? `${files.length} ${
                                                      files.length === 1
                                                          ? t('explorer.item')
                                                          : t('explorer.items')
                                                  } · ${t(CATEGORY_KEYS[openCategory])}`
                                                : `${projects.length} ${t('explorer.items')} · ${folders.length} ${t('explorer.folders')}`}
                                        </span>
                                    </span>

                                    {openCategory && pageCount > 1 && (
                                        <span className="inline-flex shrink-0 items-center gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => changePage(-1)}
                                                disabled={currentPage === 0}
                                                aria-label={t('explorer.prev')}
                                                className="grid h-6 w-6 place-items-center rounded-md border border-line bg-surface text-muted transition-colors hover:text-ink disabled:opacity-40"
                                            >
                                                <ChevronLeft className="h-3.5 w-3.5" />
                                            </button>
                                            <span
                                                aria-live="polite"
                                                className="font-mono text-[10px] text-muted sm:text-[11px]"
                                            >
                                                {t('explorer.page')} {currentPage + 1}/{pageCount}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => changePage(1)}
                                                disabled={currentPage >= pageCount - 1}
                                                aria-label={t('explorer.next')}
                                                className="grid h-6 w-6 place-items-center rounded-md border border-line bg-surface text-muted transition-colors hover:text-ink disabled:opacity-40"
                                            >
                                                <ChevronRight className="h-3.5 w-3.5" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TiltCard>
                </motion.div>
            </div>

            {/* Floating preview: shows the first highlight, which the file tile does not. */}
            <AnimatePresence>
                {peek && finePointer && !reduceMotion && (
                    <motion.div
                        key="project-peek"
                        style={{ x: followX, y: followY }}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-none fixed left-0 top-0 z-[68] hidden sm:block"
                    >
                        <div
                            className={`peek-window w-72 rounded-xl border border-line bg-surface/95 p-3.5 shadow-[0_28px_70px_-35px_rgba(15,23,42,0.7)] backdrop-blur-md ${
                                peekSide === 'right'
                                    ? 'translate-x-6 -translate-y-1/2'
                                    : '-translate-x-[calc(100%+1.5rem)] -translate-y-1/2'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                                    {t(`explorer.category.${peek.category}`)}
                                </span>
                                {peek.liveLink && (
                                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-500">
                                        <Wifi className="h-3 w-3" />
                                        {t('projects.inProduction')}
                                    </span>
                                )}
                            </div>

                            <p className="mt-2 font-display text-sm text-ink">{peek.title}</p>

                            <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted">
                                {peek.highlights?.[language]?.[0] ?? peek.description[language]}
                            </p>

                            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                                {t('explorer.detail')} →
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
