import type Lenis from 'lenis';

let instance: Lenis | null = null;

/** Keeps a single module-level reference so any component can pause scrolling. */
export const registerLenis = (lenis: Lenis | null) => {
    instance = lenis;
};

export const getLenis = () => instance;
