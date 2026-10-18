import { useEffect, useState } from 'react';

/**
 * Small matchMedia hook. The first value is resolved synchronously so effects
 * never have to call setState during the initial render pass.
 */
export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(
        () => typeof window !== 'undefined' && window.matchMedia(query).matches
    );

    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, [query]);

    return matches;
};
