type Listener = () => void;

const listeners = new Set<Listener>();

/** Notifies every subscriber that the intro curtain is gone. */
export const markPreloaderDone = () => {
    listeners.forEach((listener) => listener());
};

export const onPreloaderDone = (listener: Listener) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};
