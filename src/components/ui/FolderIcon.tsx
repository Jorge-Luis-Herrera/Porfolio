interface FolderIconProps {
    /** Opens the front flap, revealing the documents kept inside. */
    open?: boolean;
    className?: string;
}

/**
 * Linux file-manager folder (Adwaita/Nautilus style) rebuilt with CSS 3D:
 * a tabbed back plate, two sheets of paper and a front flap that swings open.
 * Purely decorative — labels and interactions live on the host element.
 */
export const FolderIcon = ({ open = false, className }: FolderIconProps) => (
    <span
        aria-hidden="true"
        className={`folder3d ${open ? 'is-open' : ''} ${className ?? ''}`}
    >
        <span className="folder3d__shadow" />
        <span className="folder3d__tab" />
        <span className="folder3d__back" />
        <span className="folder3d__paper folder3d__paper--a" />
        <span className="folder3d__paper folder3d__paper--b" />
        <span className="folder3d__front" />
    </span>
);
