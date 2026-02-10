import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="group relative flex items-center gap-2 px-4 py-2 border border-white-soft/10 hover:border-accent/50 rounded-full transition-all text-white-soft/60 hover:text-accent font-mono text-[10px] uppercase tracking-widest overflow-hidden"
        >
            {/* Paintbrush Stroke Animation */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-accent/10 pointer-events-none"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                    }}
                />
            </AnimatePresence>

            <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                <Palette className="w-4 h-4" />
            </motion.div>

            <span className="relative z-10">
                {theme === 'dark' ? 'Dark Academia' : 'Light Academia'}
            </span>

            {/* Micro-sparkle on hover */}
            <motion.div
                className="absolute top-0 right-0 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100"
                animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            />
        </button>
    );
};
