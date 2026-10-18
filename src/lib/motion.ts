/**
 * Firefox paints any element with a `filter` in its own layer and drops
 * subpixel antialiasing there, so the text inside ends up looking bold while
 * it stays normal on mobile.
 *
 * Framer Motion keeps the final `blur(0px)` of an entrance animation as an
 * inline style, so the blur has to be cleared once the animation has finished.
 */
export const clearResidualFilter = (node: HTMLElement | null) => {
    if (node) node.style.filter = '';
};
