import { useEffect, useRef } from 'react';

type Rgb = [number, number, number];

interface GraphBackdropProps {
    className?: string;
}

interface GraphNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
}

/** Radius (px) inside which the cursor pushes the nodes away. */
const POINTER_RADIUS = 140;
/** How hard the cursor pushes them. */
const POINTER_FORCE = 1500;
const MAX_DPR = 1.5;
const NODE_DENSITY = 26000;

const toRgb = (raw: string, fallback: Rgb): Rgb => {
    const parts = raw.trim().split(/\s+/).map(Number);
    if (parts.length === 3 && parts.every((value) => Number.isFinite(value))) {
        return [parts[0], parts[1], parts[2]];
    }
    return fallback;
};

const rgba = (color: Rgb, alpha: number) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

/**
 * Animated graph network painted on a canvas: the nodes drift, links appear
 * and break as distances change — the University of Havana (MatCom) portal
 * look — and the cursor pushes nearby nodes away. It pauses when off-screen
 * and degrades to a single static frame with reduced motion.
 */
export const GraphBackdrop = ({ className }: GraphBackdropProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width = 0;
        let height = 0;
        let nodes: GraphNode[] = [];
        let accent: Rgb = [99, 102, 241];
        let raf = 0;
        let visible = false;
        let previous = 0;
        let lastScroll = window.scrollY;
        /** Scroll energy injected into the nodes, so the graph reacts to the page. */
        let impulse = 0;
        const pointer = { x: 0, y: 0, active: false };

        const readTheme = () => {
            const styles = getComputedStyle(document.documentElement);
            accent = toRgb(styles.getPropertyValue('--accent-rgb'), accent);
        };

        const seed = () => {
            const count = Math.round(
                Math.min(64, Math.max(16, (width * height) / NODE_DENSITY))
            );
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 16,
                r: 1.1 + Math.random() * 1.7,
            }));
        };

        const step = (dt: number) => {
            const energy = impulse;
            impulse *= 1 - Math.min(1, 6 * dt);

            for (const node of nodes) {
                node.x += node.vx * dt;
                node.y += node.vy * dt;

                // Scrolling pushes the whole network along with the page.
                node.vy += energy * 150 * dt;
                node.vx += energy * 26 * dt;

                if (pointer.active) {
                    const dx = node.x - pointer.x;
                    const dy = node.y - pointer.y;
                    const distance = Math.hypot(dx, dy);
                    if (distance > 0.001 && distance < POINTER_RADIUS) {
                        const push = (1 - distance / POINTER_RADIUS) * POINTER_FORCE * dt;
                        node.vx += (dx / distance) * push;
                        node.vy += (dy / distance) * push;
                    }
                }

                // Slow drag, so a push decays back into a calm drift.
                node.vx *= 1 - 0.7 * dt;
                node.vy *= 1 - 0.7 * dt;

                const speed = Math.hypot(node.vx, node.vy);
                if (speed < 8) {
                    node.vx += (Math.random() - 0.5) * 12 * dt;
                    node.vy += (Math.random() - 0.5) * 12 * dt;
                } else if (speed > 120) {
                    node.vx = (node.vx / speed) * 120;
                    node.vy = (node.vy / speed) * 120;
                }

                if (node.x < 0) {
                    node.x = 0;
                    node.vx = Math.abs(node.vx);
                } else if (node.x > width) {
                    node.x = width;
                    node.vx = -Math.abs(node.vx);
                }
                if (node.y < 0) {
                    node.y = 0;
                    node.vy = Math.abs(node.vy);
                } else if (node.y > height) {
                    node.y = height;
                    node.vy = -Math.abs(node.vy);
                }
            }
        };

        const paint = () => {
            context.clearRect(0, 0, width, height);
            const reach = Math.min(200, Math.max(120, width / 7));

            // Links first, so the nodes always sit on top of them.
            context.lineWidth = 1;
            for (let i = 0; i < nodes.length; i += 1) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const b = nodes[j];
                    const distance = Math.hypot(a.x - b.x, a.y - b.y);
                    if (distance > reach) continue;
                    context.strokeStyle = rgba(accent, (1 - distance / reach) * 0.45);
                    context.beginPath();
                    context.moveTo(a.x, a.y);
                    context.lineTo(b.x, b.y);
                    context.stroke();
                }
            }

            for (const node of nodes) {
                context.beginPath();
                context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                context.fillStyle = rgba(accent, 0.7);
                context.fill();
            }
        };

        const loop = (time: number) => {
            const dt = previous ? Math.min((time - previous) / 1000, 0.05) : 0.016;
            previous = time;
            step(dt);
            paint();
            raf = window.requestAnimationFrame(loop);
        };

        const play = () => {
            if (reduced || !visible || raf) return;
            previous = 0;
            raf = window.requestAnimationFrame(loop);
        };

        const pause = () => {
            if (!raf) return;
            window.cancelAnimationFrame(raf);
            raf = 0;
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            context.setTransform(dpr, 0, 0, dpr, 0, 0);
            seed();
            if (reduced) paint();
        };

        const onPointerMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.active = true;
        };

        const onPointerLeave = () => {
            pointer.active = false;
        };

        const onScroll = () => {
            const y = window.scrollY;
            impulse = Math.max(-1.6, Math.min(1.6, impulse + (y - lastScroll) / 90));
            lastScroll = y;
        };

        const intersection = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible) play();
                else pause();
            },
            { rootMargin: '160px' }
        );

        const resizeObserver = new ResizeObserver(resize);

        const themeObserver = new MutationObserver(() => {
            readTheme();
            if (reduced) paint();
        });

        readTheme();
        resizeObserver.observe(canvas);
        intersection.observe(canvas);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerleave', onPointerLeave);
        window.addEventListener('blur', onPointerLeave);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            pause();
            intersection.disconnect();
            resizeObserver.disconnect();
            themeObserver.disconnect();
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerleave', onPointerLeave);
            window.removeEventListener('blur', onPointerLeave);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`graph-backdrop pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`}
        />
    );
};
