import { motion } from 'framer-motion';
import { Book, FileCode, User, Binary, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SideNav = () => {
    const { t } = useLanguage();

    const navItems = [
        { icon: <Book className="w-5 h-5" />, label: t('nav.projects'), href: "#proyectos" },
        { icon: <FileCode className="w-5 h-5" />, label: t('nav.docs'), href: "https://github.com/Jorge-Luis-Herrera?tab=repositories" },
        { icon: <User className="w-5 h-5" />, label: t('nav.personal'), href: "#personal" },
        { icon: <Binary className="w-5 h-5" />, label: t('nav.blueprint'), href: "#blueprint" },
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed left-0 top-0 h-screen w-20 hidden lg:flex flex-col items-center justify-between py-12 border-r border-white-soft/5 bg-background/50 backdrop-blur-xl z-50"
        >
            {/* Brand Icon or Initial */}
            <div className="text-accent font-serif text-2xl italic select-none">J.</div>

            {/* Main Nav Items */}
            <nav className="flex flex-col gap-10">
                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="group relative flex items-center justify-center p-3 text-white-soft/40 hover:text-accent transition-all duration-300"
                        title={item.label}
                    >
                        {item.icon}
                        {/* Tooltip */}
                        <span className="absolute left-full ml-4 px-3 py-1 bg-paper border border-white-soft/10 text-[10px] uppercase tracking-widest text-white-soft opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                            {item.label}
                        </span>
                    </a>
                ))}
            </nav>

            {/* Bottom Social Shortcuts */}
            <div className="flex flex-col gap-6 opacity-30">
                <a href="https://github.com/Jorge-Luis-Herrera" target="_blank" className="hover:text-accent transition-colors"><Github className="w-4 h-4" /></a>
                <a href="https://linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/" target="_blank" className="hover:text-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
            </div>
        </motion.aside>
    );
};
