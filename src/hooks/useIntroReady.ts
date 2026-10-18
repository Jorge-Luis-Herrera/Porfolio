import { useEffect, useState } from 'react';
import { onPreloaderDone } from '../lib/preloader';

const STORAGE_KEY = 'jorge-preloader-shown';

/**
 * True once the intro curtain is gone (or immediately when it is skipped,
 * because the visitor already saw it or prefers reduced motion).
 */
export const useIntroReady = () => {
    const [ready, setReady] = useState(
        () =>
            typeof window === 'undefined' ||
            window.sessionStorage.getItem(STORAGE_KEY) === '1' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => onPreloaderDone(() => setReady(true)), []);

    return ready;
};
