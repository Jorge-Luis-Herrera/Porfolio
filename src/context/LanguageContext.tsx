import React, { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        'nav.projects': 'Antología de Proyectos',
        'nav.docs': 'Documentaciones & Cursos',
        'nav.personal': 'Información Personal',
        'nav.blueprint': 'The Blueprint',
        'nav.contact': 'Epílogo: Contacto',
        'hero.badge': '01 // Introducción',
        'hero.title': 'Donde el bit se convierte',
        'hero.title.ink': 'en tinta.',
        'hero.description': 'Estudiante de ciencias de la computación forjando arquitecturas distribuidas con la elegancia narrativa de un escritor y el rigor implacable de un compilador. Especializado en sistemas de alto rendimiento y soluciones de IA con propósito.',
        'gallery.title': 'Antología de Proyectos',
        'gallery.readEssay': 'Leer Ensayo',
        'tech.title': 'Índice de Materias',
        'tech.subtitle': 'Capacidades Nucleares',
        'footer.epilogue': 'El Epílogo',
        'footer.description': 'Cada sistema es una historia que merece ser bien contada. Si tienes un desafío técnico que requiera una narrativa arquitectónica sólida, hablemos.',
        'footer.copy': 'Escrito en código por Jorge • © 2026',
        'modal.essayTitle': 'Ensayo Técnico',
        'modal.chapter': 'Capítulo',
        'modal.conflict': 'I. El Conflicto',
        'modal.architecture': 'II. La Arquitectura',
        'modal.technicalEpilogue': 'III. El Epílogo Técnico',
        'modal.repo': 'Ver Repositorio',
        'pillars.fullstack': 'Arquitectura FullStack',
        'pillars.android': 'Sistemas Mobile (Android)',
        'pillars.devops': 'Infraestructura & DevOps',
        'pillars.ai': 'IA & Automatizaciones',
        'pillars.viewStack': 'Explorar Volúmenes',
        'hero.author': 'Si puedes imaginarlo, puedes programarlo',
        'library.title': 'Índice de Materias',
        'library.subtitle': 'Capacidades Nucleares',
        'library.infra': 'Sistemas & Infraestructura',
        'library.ai': 'Inteligencia & Datos',
        'library.backend': 'Arquitectura & Backend',
        'library.security': 'Seguridad & Integridad',
        'blueprint.title': 'El Plano (The Blueprint)',
        'blueprint.subtitle': 'Documentación Científica',
        'blueprint.motor.title': 'I. El Motor (React + Vite)',
        'blueprint.motor.desc': 'Elegí Vite por su entorno de desarrollo instantáneo. La reactividad de React permite manejar estados complejos como la traducción y ensayos modales.',
        'blueprint.style.title': 'II. Estética & Capas (Tailwind)',
        'blueprint.style.desc': 'Tailwind CSS proporciona el control atómico para la estética Dark Academia, permitiendo paletas sofisticadas sin librerías pesadas.',
        'blueprint.motion.title': 'III. Narrativa Fluida (Framer)',
        'blueprint.motion.desc': 'Framer Motion orquestra la narrativa visual, emulando la fluidez de un ensayo científico bien estructurado.',
        'blueprint.data.title': 'IV. Arquitectura del Dato (Context)',
        'blueprint.data.desc': 'Implementé un LanguageContext personalizado para asegurar que la "voz del autor" sea coherente en todos los volúmenes.',
        'blueprint.download': 'Descargar Paper Técnico (PDF próximamente)',
    },
    en: {
        'nav.projects': 'Project Anthology',
        'nav.docs': 'Documentation & Courses',
        'nav.personal': 'Personal Information',
        'nav.blueprint': 'The Blueprint',
        'nav.contact': 'Epilogue: Contact',
        'hero.badge': '01 // Introduction',
        'hero.title': 'Where the bit turns',
        'hero.title.ink': 'into ink.',
        'hero.description': 'Computer science student forging distributed architectures with a writer\'s narrative elegance and a compiler\'s implacable rigor. Specialized in high-performance systems and purposeful AI solutions.',
        'gallery.title': 'Project Anthology',
        'gallery.readEssay': 'Read Essay',
        'tech.title': 'Table of Contents',
        'tech.subtitle': 'Core Capabilities',
        'footer.epilogue': 'The Epilogue',
        'footer.description': 'Every system is a story that deserves to be well told. If you have a technical challenge that requires a solid architectural narrative, let\'s talk.',
        'footer.copy': 'Written in code by Jorge • © 2026',
        'modal.essayTitle': 'Technical Essay',
        'modal.chapter': 'Chapter',
        'modal.conflict': 'I. The Conflict',
        'modal.architecture': 'II. The Architecture',
        'modal.technicalEpilogue': 'III. The Technical Epilogue',
        'modal.repo': 'View Repository',
        'pillars.fullstack': 'FullStack Architecture',
        'pillars.android': 'Mobile Systems (Android)',
        'pillars.devops': 'Infrastructure & DevOps',
        'pillars.ai': 'AI & Automations',
        'pillars.viewStack': 'Explore Volumes',
        'hero.author': 'If you can imagine it, you can program it',
        'library.title': 'Table of Contents',
        'library.subtitle': 'Core Capabilities',
        'library.infra': 'Systems & Infrastructure',
        'library.ai': 'Intelligence & Data',
        'library.backend': 'Architecture & Backend',
        'library.security': 'Security & Integrity',
        'blueprint.title': 'The Blueprint',
        'blueprint.subtitle': 'Scientific Documentation',
        'blueprint.motor.title': 'I. The Engine (React + Vite)',
        'blueprint.motor.desc': 'I chose Vite for its instant development environment. React\'s reactivity allows for managing complex states like translation and modal essays.',
        'blueprint.style.title': 'II. Aesthetics & Layers (Tailwind)',
        'blueprint.style.desc': 'Tailwind CSS provides the atomic control for the Dark Academia aesthetic, allowing for sophisticated palettes without heavy libraries.',
        'blueprint.motion.title': 'III. Fluid Narrative (Framer)',
        'blueprint.motion.desc': 'Framer Motion orchestrates the visual narrative, emulating the fluidity of a well-structured scientific essay.',
        'blueprint.data.title': 'IV. Data Architecture (Context)',
        'blueprint.data.desc': 'I implemented a custom LanguageContext to ensure the "author\'s voice" is consistent across all volumes.',
        'blueprint.download': 'Download Technical Paper (PDF Coming Soon)',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('es');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
