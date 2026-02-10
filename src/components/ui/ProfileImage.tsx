import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import profileImg from '../../assets/profile.jpg';
import { useLanguage } from '../../context/LanguageContext';

export const ProfileImage = () => {
    const { t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);

    // Rotating text for the circular path
    const circularText = t('hero.author').toUpperCase() + " • ";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-24 group cursor-pointer"
            onClick={() => setIsExpanded(true)}
        >
            {/* Rotating Circular Text - Cleaner SVG and theme-aware color */}
            <motion.div
                className="absolute -inset-12 z-0 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                        />
                    </defs>
                    <text className="fill-white-soft/80 md:fill-white-soft/40 font-mono text-[5px] uppercase tracking-[0.3em]">
                        <textPath xlinkHref="#circlePath">
                            {circularText}
                        </textPath>
                    </text>
                </svg>
            </motion.div>

            {/* Decorative Rings */}
            <div className="absolute inset-0 rounded-full border border-accent/20 scale-105 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 rounded-full border border-white-soft/5 scale-115 group-hover:scale-125 transition-transform duration-1000" />

            {/* The Image Container */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-accent/30 shadow-2xl relative z-10 bg-paper">
                <img
                    src={profileImg}
                    alt="Jorge Luis Herrera"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Grain Overlay on photo */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            </div>


            {/* Expansion Modal */}
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-zoom-out"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl aspect-square rounded-full overflow-hidden border-2 border-accent/30 shadow-2xl z-10 bg-paper"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={profileImg}
                                alt="Jorge Luis Herrera"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-6 right-6 p-2 bg-background/50 hover:bg-accent/20 rounded-full transition-all text-white-soft backdrop-blur-md border border-white-soft/10 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
