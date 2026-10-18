import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        'nav.home': 'Inicio',
        'nav.projects': 'Proyectos',
        'nav.skills': 'Habilidades',
        'nav.about': 'Sobre mí',
        'nav.contact': 'Contacto',
        'nav.menu': 'Menú',
        'nav.close': 'Cerrar',

        'hero.badge': 'Estudiante de Ciencias de la Computación',
        'hero.title.pre': 'Construyo software',
        'hero.title.highlight': 'que funciona.',
        'hero.description': 'Full-stack, sistemas y automatización. Me enfoco en proyectos reales: tiendas en línea desplegadas en la nube, herramientas de datos y agentes locales con IA.',
        'hero.cta.projects': 'Ver proyectos',
        'hero.cta.cv': 'Descargar CV',
        'hero.cta.contact': 'Contactar',

        'projects.title': 'Proyectos',
        'projects.subtitle': 'Selección de trabajo real en GitHub',
        'projects.filter.all': 'Todos',
        'projects.filter.featured': 'Destacados · Full-stack',
        'projects.filter.backend': 'Backend & Sistemas',
        'projects.filter.automation': 'IA & Automatización',
        'projects.filter.academic': 'Académico',
        'projects.viewRepo': 'Repositorio',
        'projects.viewLive': 'Ver en vivo',
        'projects.empty': 'No hay proyectos en esta categoría aún.',

        'skills.title': 'Habilidades',
        'skills.subtitle': 'Tecnologías que uso en proyectos reales',
        'skills.languages': 'Lenguajes',
        'skills.frontend': 'Frontend',
        'skills.backend': 'Backend & Datos',
        'skills.tools': 'Herramientas & DevOps',

        'about.title': 'Sobre mí',
        'about.p1': 'Soy estudiante de Ciencias de la Computación. Empecé programando por curiosidad y hoy desarrollo proyectos full-stack completos: desde el diseño del frontend hasta el backend, la base de datos y el despliegue en la nube.',
        'about.p2': 'Me interesa el desarrollo de sistemas: automatizar procesos, extraer datos y construir herramientas útiles. Cada proyecto de mi GitHub resuelve un problema concreto.',
        'about.soft.title': 'Habilidades blandas',
        'about.soft.leadership': 'Liderazgo (CTO en equipos académicos)',
        'about.soft.speed': 'Aprendizaje y entrega rápida',
        'about.soft.creativity': 'Creatividad aplicada al producto',
        'about.soft.understanding': 'Comprensión profunda de problemas',
        'about.soft.docs': 'Documentación rigorosa',
        'about.soft.predictions': 'Pensamiento analítico y predicción',

        'contact.title': '¿Trabajamos juntos?',
        'contact.description': 'Estoy abierto a pasantías, proyectos freelance y colaboraciones. Escríbeme por el canal que prefieras.',
        'contact.email': 'Email',
        'footer.copy': '© 2026 Jorge Luis Herrera — Construido con React + Vite',
    },
    en: {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.menu': 'Menu',
        'nav.close': 'Close',

        'hero.badge': 'Computer Science Student',
        'hero.title.pre': 'I build software',
        'hero.title.highlight': 'that works.',
        'hero.description': 'Full-stack, systems, and automation. I focus on real projects: online stores deployed to the cloud, data tools, and local AI agents.',
        'hero.cta.projects': 'View projects',
        'hero.cta.cv': 'Download CV',
        'hero.cta.contact': 'Get in touch',

        'projects.title': 'Projects',
        'projects.subtitle': 'A selection of real work on GitHub',
        'projects.filter.all': 'All',
        'projects.filter.featured': 'Featured · Full-stack',
        'projects.filter.backend': 'Backend & Systems',
        'projects.filter.automation': 'AI & Automation',
        'projects.filter.academic': 'Academic',
        'projects.viewRepo': 'Repository',
        'projects.viewLive': 'Live demo',
        'projects.empty': 'No projects in this category yet.',

        'skills.title': 'Skills',
        'skills.subtitle': 'Technologies I actually use in shipped projects',
        'skills.languages': 'Languages',
        'skills.frontend': 'Frontend',
        'skills.backend': 'Backend & Data',
        'skills.tools': 'Tools & DevOps',

        'about.title': 'About me',
        'about.p1': "I'm a Computer Science student. I started coding out of curiosity and today I build complete full-stack projects: from frontend design to backend, database, and cloud deployment.",
        'about.p2': "I'm interested in systems development: automating processes, extracting data, and building useful tools. Every project on my GitHub solves a concrete problem.",
        'about.soft.title': 'Soft skills',
        'about.soft.leadership': 'Leadership (CTO in academic teams)',
        'about.soft.speed': 'Fast learning and delivery',
        'about.soft.creativity': 'Product-driven creativity',
        'about.soft.understanding': 'Deep problem understanding',
        'about.soft.docs': 'Rigorous documentation',
        'about.soft.predictions': 'Analytical thinking and forecasting',

        'contact.title': "Let's work together",
        'contact.description': "I'm open to internships, freelance projects, and collaborations. Reach out through your favorite channel.",
        'contact.email': 'Email',
        'footer.copy': '© 2026 Jorge Luis Herrera — Built with React + Vite',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    const t = (key: string) => {
        return (translations[language] as Record<string, string>)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
