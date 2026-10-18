import { useEffect, useRef } from 'react';

interface CalisthenicsFigureProps {
    className?: string;
    /** Accessible description passed down from the section. */
    label: string;
    /** Text shown before the repetition counter. */
    repsLabel: string;
}

/* ---- Scene geometry (viewBox 240 × 200, y grows downwards) ---- */
const BAR_Y = 30;
const BAR_LEFT = 36;
const BAR_RIGHT = 204;
const CENTER_X = 120;
const HAND_LEFT = 104;
const HAND_RIGHT = 136;
const SHOULDER_DX = 17;
const UPPER_ARM = 24;
const FOREARM = 20;
const TORSO = 46;
const THIGH = 34;
const SHIN = 32;
/** Fully extended hang (straight arms) and chin-at-bar (folded arms). */
const HANG_Y = BAR_Y + UPPER_ARM + FOREARM;
const TOP_Y = BAR_Y + 8;
const CYCLE = 3.4;

const round = (value: number) => Number(value.toFixed(2));

/** Two-bone IK: places the elbow so the arm bends outwards from the body. */
const solveElbow = (sx: number, sy: number, hx: number, hy: number, side: 1 | -1) => {
    const dx = hx - sx;
    const dy = hy - sy;
    const raw = Math.hypot(dx, dy);
    const min = Math.abs(UPPER_ARM - FOREARM) + 0.01;
    const max = UPPER_ARM + FOREARM - 0.01;
    const distance = Math.min(max, Math.max(min, raw));
    const a = (UPPER_ARM * UPPER_ARM - FOREARM * FOREARM + distance * distance) / (2 * distance);
    const height = Math.sqrt(Math.max(0, UPPER_ARM * UPPER_ARM - a * a));
    const ux = dx / distance;
    const uy = dy / distance;
    return {
        x: round(sx + ux * a - uy * height * side),
        y: round(sy + uy * a + ux * height * side),
    };
};

/** Builds the three stroke paths for a given pull (0 = hang, 1 = chin at bar). */
const poseAt = (pull: number, swing: number, tuck: number) => {
    const shoulderY = HANG_Y + (TOP_Y - HANG_Y) * pull;
    const left = solveElbow(CENTER_X - SHOULDER_DX, shoulderY, HAND_LEFT, BAR_Y, -1);
    const right = solveElbow(CENTER_X + SHOULDER_DX, shoulderY, HAND_RIGHT, BAR_Y, 1);

    const hipY = shoulderY + TORSO;
    // When the athlete tucks, the knees rise and the shin foreshortens.
    const kneeY = hipY + THIGH - tuck * 14;
    const shin = SHIN * (1 - tuck * 0.72);
    const kneeSpread = 7 + tuck * 5;

    const arms = [
        `M ${HAND_LEFT} ${BAR_Y}`, `L ${left.x} ${left.y}`, `L ${round(CENTER_X - SHOULDER_DX)} ${round(shoulderY)}`,
        `M ${HAND_RIGHT} ${BAR_Y}`, `L ${right.x} ${right.y}`, `L ${round(CENTER_X + SHOULDER_DX)} ${round(shoulderY)}`,
    ].join(' ');

    const torso = [
        `M ${round(CENTER_X - SHOULDER_DX)} ${round(shoulderY)}`,
        `L ${round(CENTER_X + SHOULDER_DX)} ${round(shoulderY)}`,
        `M ${CENTER_X} ${round(shoulderY)}`,
        `L ${CENTER_X} ${round(hipY)}`,
    ].join(' ');

    const legs = [
        `M ${CENTER_X - 4} ${round(hipY)}`,
        `L ${round(CENTER_X - kneeSpread + swing * 0.5)} ${round(kneeY)}`,
        `L ${round(CENTER_X - kneeSpread + 2 + swing)} ${round(kneeY + shin)}`,
        `M ${CENTER_X + 4} ${round(hipY)}`,
        `L ${round(CENTER_X + kneeSpread + swing * 0.5)} ${round(kneeY)}`,
        `L ${round(CENTER_X + kneeSpread - 2 + swing)} ${round(kneeY + shin)}`,
    ].join(' ');

    return {
        arms,
        torso,
        legs,
        head: { x: CENTER_X, y: round(shoulderY - 17) },
    };
};

/**
 * A calisthenics athlete looping a chest-to-bar pull-up, drawn as SVG strokes
 * and driven imperatively from a rAF loop (no re-renders). The bar fills up as
 * the repetition completes and a counter ticks with every rep.
 */
export const CalisthenicsFigure = ({ className, label, repsLabel }: CalisthenicsFigureProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const armsRef = useRef<SVGPathElement>(null);
    const torsoRef = useRef<SVGPathElement>(null);
    const legsRef = useRef<SVGPathElement>(null);
    const headRef = useRef<SVGCircleElement>(null);
    const barFillRef = useRef<SVGLineElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);
    const repsRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const arms = armsRef.current;
        const torso = torsoRef.current;
        const legs = legsRef.current;
        const head = headRef.current;
        const barFill = barFillRef.current;
        const progress = progressRef.current;
        const reps = repsRef.current;
        const host = hostRef.current;
        if (!arms || !torso || !legs || !head || !barFill || !progress || !reps || !host) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const paint = (pull: number) => {
            const tuck = Math.max(0, pull - 0.5) / 0.5;
            const phase = poseAt(pull, 0, Math.min(1, tuck));

            arms.setAttribute('d', phase.arms);
            torso.setAttribute('d', phase.torso);
            legs.setAttribute('d', phase.legs);
            head.setAttribute('cx', String(phase.head.x));
            head.setAttribute('cy', String(phase.head.y));
            barFill.setAttribute('x2', String(round(BAR_LEFT + (BAR_RIGHT - BAR_LEFT) * pull)));
            progress.style.transform = `scaleX(${pull})`;
        };

        if (reduced) {
            paint(0.65);
            reps.textContent = '01';
            return;
        }

        let raf = 0;
        let previous = 0;
        let total = 0;
        let visible = false;

        const loop = (time: number) => {
            total += previous ? (time - previous) / 1000 : 0.016;
            previous = time;

            const p = (total % CYCLE) / CYCLE;
            let pull: number;
            if (p < 0.55) {
                const t = p / 0.55;
                pull = t * t * (3 - 2 * t);
            } else if (p < 0.74) {
                pull = 1;
            } else {
                const t = (p - 0.74) / 0.26;
                const eased = t * t * (3 - 2 * t);
                pull = 1 - eased;
            }

            const tuck = Math.max(0, pull - 0.5) / 0.5;
            const swing = Math.sin(p * Math.PI * 2) * 6 * (1 - Math.min(1, tuck));
            const phase = poseAt(pull, swing, Math.min(1, tuck));

            arms.setAttribute('d', phase.arms);
            torso.setAttribute('d', phase.torso);
            legs.setAttribute('d', phase.legs);
            head.setAttribute('cx', String(phase.head.x));
            head.setAttribute('cy', String(phase.head.y));
            barFill.setAttribute('x2', String(round(BAR_LEFT + (BAR_RIGHT - BAR_LEFT) * pull)));
            progress.style.transform = `scaleX(${pull})`;

            const rep = String((Math.floor(total / CYCLE) % 12) + 1).padStart(2, '0');
            if (reps.textContent !== rep) reps.textContent = rep;

            raf = window.requestAnimationFrame(loop);
        };

        const play = () => {
            if (!visible || raf) return;
            previous = 0;
            raf = window.requestAnimationFrame(loop);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible) play();
                else if (raf) {
                    window.cancelAnimationFrame(raf);
                    raf = 0;
                }
            },
            { rootMargin: '120px' }
        );

        observer.observe(host);

        return () => {
            if (raf) window.cancelAnimationFrame(raf);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={hostRef} className={`relative flex flex-col items-center gap-3 ${className ?? ''}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur-sm">
                {repsLabel}
                <span className="text-xs font-medium text-accent" ref={repsRef}>
                    01
                </span>
            </span>

            <svg
                viewBox="0 0 240 200"
                role="img"
                aria-label={label}
                className="calisthenics-figure h-44 w-full"
            >
                {/* Bar and uprights */}
                <g className="fill-none stroke-line" strokeWidth={2.5} strokeLinecap="round">
                    <line x1={BAR_LEFT} y1={BAR_Y} x2={BAR_RIGHT} y2={BAR_Y} />
                    <line x1={BAR_LEFT + 6} y1={BAR_Y} x2={BAR_LEFT + 6} y2={BAR_Y + 34} />
                    <line x1={BAR_RIGHT - 6} y1={BAR_Y} x2={BAR_RIGHT - 6} y2={BAR_Y + 34} />
                </g>

                {/* Accent charge that fills the bar once per repetition */}
                <line
                    ref={barFillRef}
                    x1={BAR_LEFT}
                    y1={BAR_Y}
                    x2={BAR_LEFT}
                    y2={BAR_Y}
                    className="stroke-accent"
                    strokeWidth={3}
                    strokeLinecap="round"
                />

                <g
                    className="fill-none stroke-accent"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path ref={legsRef} d={poseAt(0, 0, 0).legs} />
                    <path ref={torsoRef} d={poseAt(0, 0, 0).torso} />
                    <path ref={armsRef} d={poseAt(0, 0, 0).arms} />
                </g>

                <circle
                    ref={headRef}
                    cx={CENTER_X}
                    cy={round(HANG_Y - 17)}
                    r={9.5}
                    className="fill-accent/15 stroke-accent"
                    strokeWidth={2.6}
                />

                <line
                    x1={BAR_LEFT}
                    y1={BAR_Y + 52}
                    x2={BAR_RIGHT}
                    y2={BAR_Y + 52}
                    className="stroke-line"
                    strokeWidth={1}
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                />
            </svg>

            <span className="block h-1 w-full max-w-[12rem] overflow-hidden rounded-full bg-surface-2">
                <span
                    ref={progressRef}
                    className="block h-full origin-left scale-x-0 rounded-full bg-accent"
                    style={{ transform: 'scaleX(0)' }}
                />
            </span>
        </div>
    );
};
