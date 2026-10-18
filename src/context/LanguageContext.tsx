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

        'hero.badge': 'Desarrollador Full-Stack Freelance',
        'hero.company': 'CTO en CubiTech',
        'hero.role.fullstack': 'desarrollador full-stack',
        'hero.role.rust': 'Rust, TypeScript y Node.js',
        'hero.role.automation': 'automatización y extracción de datos',
        'hero.role.data': 'análisis de datos',
        'hero.title.pre': 'Si puedes imaginarlo,',
        'hero.title.highlight': 'puedes programarlo.',
        'hero.description': 'Diseño, desarrollo y despliego aplicaciones web completas, herramientas de datos y agentes de automatización. Trabajo como freelance y lidero la tecnología en CubiTech, con foco en código mantenible y resultados en producción.',
        'hero.cta.projects': 'Ver proyectos',
        'hero.cta.cv': 'Descargar CV',
        'hero.cta.contact': 'Contactar',

        'projects.title': 'Proyectos',
        'projects.subtitle': 'Selección de trabajo real en GitHub',
        'projects.main.title': 'Proyectos principales',
        'projects.main.subtitle': 'Sistemas en producción, con enlace en vivo',
        'projects.inProduction': 'En producción',
        'projects.more.title': 'Más proyectos',
        'projects.more.subtitle': 'Explora el resto del trabajo por categoría',
        'projects.filter.all': 'Todos',
        'projects.filter.featured': 'Destacados · Full-stack',
        'projects.filter.backend': 'Backend & Sistemas',
        'projects.filter.automation': 'IA & Automatización',
        'projects.filter.academic': 'Académico',
        'projects.viewRepo': 'Repositorio',
        'projects.viewLive': 'Ver en vivo',
        'projects.empty': 'No hay proyectos en esta categoría aún.',
        'projects.viewDetails': 'Ver detalles',

        'modal.close': 'Cerrar',
        'modal.featured': 'Destacado',
        'modal.highlights': 'Puntos clave',
        'modal.stack': 'Stack técnico',
        'modal.scope.featured': 'Aplicación web full-stack',
        'modal.scope.backend': 'Backend y sistemas',
        'modal.scope.automation': 'IA y automatización',
        'modal.scope.academic': 'Fundamentos académicos',

        'skills.title': 'Habilidades',
        'skills.subtitle': 'Tecnologías que uso en proyectos reales',
        'skills.languages': 'Lenguajes',
        'skills.frontend': 'Frontend',
        'skills.backend': 'Backend & Datos',
        'skills.tools': 'Herramientas & DevOps',

        'about.title': 'Sobre mí',
        'about.p1': 'Soy desarrollador full-stack freelance y CTO en CubiTech. Construyo productos completos de extremo a extremo: interfaz, backend, bases de datos y despliegue en la nube.',
        'about.p2': 'Mi trabajo se centra en el desarrollo de sistemas: automatizar procesos, extraer y estructurar datos, y construir herramientas que resuelven problemas concretos. Cada proyecto de mi GitHub responde a una necesidad real.',
        'about.soft.title': 'Competencias',
        'about.soft.leadership': 'Liderazgo técnico (CTO en CubiTech)',
        'about.soft.speed': 'Entrega ágil y aprendizaje continuo',
        'about.soft.creativity': 'Creatividad aplicada al producto',
        'about.soft.understanding': 'Comprensión profunda del problema',
        'about.soft.docs': 'Documentación rigurosa',
        'about.soft.predictions': 'Análisis y proyección técnica',

        'contact.title': '¿Trabajamos juntos?',
        'contact.description': 'Estoy abierto a pasantías, proyectos freelance y colaboraciones. Escríbeme por el canal que prefieras.',
        'contact.email': 'Email',
        'footer.availability': 'Disponible para proyectos y prácticas',
        'footer.about': 'Desarrollador full-stack freelance y CTO en CubiTech. Construyo, despliego y mantengo productos web con foco en resultados.',
        'footer.cta.email': 'Enviar un correo',
        'footer.nav.title': 'Navegación',
        'footer.contact.title': 'Contacto',
        'footer.resources.title': 'Recursos',
        'footer.link.cv': 'Curriculum Vitae',
        'footer.link.cover': 'Carta de presentación',
        'footer.link.repos': 'Todos los repositorios',
        'footer.link.top': 'Volver arriba',
        'footer.signatureLine': 'Full-stack · Sistemas · Automatización',

        'stats.projects': 'Proyectos en GitHub',
        'stats.production': 'Apps en producción',
        'stats.languages': 'Lenguajes de programación',
        'stats.tech': 'Tecnologías en uso',

        'experience.title': 'Experiencia',
        'experience.subtitle': 'Trayectoria profesional y formación universitaria',
        'experience.linkedin': 'Ver perfil completo en LinkedIn',
        'experience.group.work': 'Experiencia profesional',
        'experience.group.education': 'Formación académica',
        'experience.current': 'Actual',
        'experience.cto.period': 'Actual',
        'experience.cto.title': 'CTO',
        'experience.cto.desc': 'Lidero la tecnología de una agencia freelance: definición de stack, arquitectura de soluciones, revisión de código y entrega de productos digitales para clientes en Cuba y en remoto.',
        'experience.freelance.period': 'Freelance',
        'experience.freelance.title': 'Desarrollador Full-Stack',
        'experience.freelance.desc': 'Desarrollo aplicaciones web completas: interfaz, API, base de datos y despliegue. Trabajo con Rust/Axum, Node.js/NestJS, React/Next.js y PostgreSQL.',
        'experience.production.period': 'En producción',
        'experience.production.title': 'Sistemas desplegados',
        'experience.production.desc': 'Mantengo aplicaciones vivas en Azure App Service con contenedores Docker, integración continua en GitHub Actions y monitoreo de salud de cada servicio.',
        'experience.education.period': 'MatCom · Universidad de La Habana',
        'experience.education.title': 'Ciencias de la Computación',
        'experience.education.desc': 'Cursé Ciencias de la Computación en la Facultad de Matemática y Computación (MatCom), la facultad de referencia de la Universidad de La Habana —la universidad más antigua de Cuba (1728)— para Ciencias de la Computación, Matemática y Ciencia de Datos. Formación en algoritmos, estructuras de datos, matemática discreta, optimización, bases de datos y computación científica, aplicada en proyectos publicados en GitHub.',
        'experience.courses.period': 'Proyectos académicos',
        'experience.courses.title': 'Ejercicios de carrera aplicados',
        'experience.courses.desc': 'Repositorios de estructuras de datos, matemática discreta, optimización y bases de datos que escribí durante la carrera: la base teórica que sostiene mi trabajo de ingeniería.',
    },
    en: {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.menu': 'Menu',
        'nav.close': 'Close',

        'hero.badge': 'Freelance Full-Stack Developer',
        'hero.company': 'CTO at CubiTech',
        'hero.role.fullstack': 'full-stack developer',
        'hero.role.rust': 'Rust, TypeScript and Node.js',
        'hero.role.automation': 'automation and data extraction',
        'hero.role.data': 'data analysis',
        'hero.title.pre': 'If you can imagine it,',
        'hero.title.highlight': 'you can program it.',
        'hero.description': 'I design, develop, and ship complete web applications, data tools, and automation agents. I work as a freelancer and lead technology at CubiTech, with a focus on maintainable code and production results.',
        'hero.cta.projects': 'View projects',
        'hero.cta.cv': 'Download CV',
        'hero.cta.contact': 'Get in touch',

        'projects.title': 'Projects',
        'projects.subtitle': 'A selection of real work on GitHub',
        'projects.main.title': 'Main projects',
        'projects.main.subtitle': 'Systems in production, with live links',
        'projects.inProduction': 'In production',
        'projects.more.title': 'More projects',
        'projects.more.subtitle': 'Explore the rest of the work by category',
        'projects.filter.all': 'All',
        'projects.filter.featured': 'Featured · Full-stack',
        'projects.filter.backend': 'Backend & Systems',
        'projects.filter.automation': 'AI & Automation',
        'projects.filter.academic': 'Academic',
        'projects.viewRepo': 'Repository',
        'projects.viewLive': 'Live demo',
        'projects.empty': 'No projects in this category yet.',
        'projects.viewDetails': 'View details',

        'modal.close': 'Close',
        'modal.featured': 'Featured',
        'modal.highlights': 'Key points',
        'modal.stack': 'Tech stack',
        'modal.scope.featured': 'Full-stack web application',
        'modal.scope.backend': 'Backend and systems',
        'modal.scope.automation': 'AI and automation',
        'modal.scope.academic': 'Computer science foundations',

        'skills.title': 'Skills',
        'skills.subtitle': 'Technologies I actually use in shipped projects',
        'skills.languages': 'Languages',
        'skills.frontend': 'Frontend',
        'skills.backend': 'Backend & Data',
        'skills.tools': 'Tools & DevOps',

        'about.title': 'About me',
        'about.p1': "I'm a freelance full-stack developer and CTO at CubiTech. I build complete products end to end: interface, backend, databases, and cloud deployment.",
        'about.p2': 'My work focuses on systems development: automating processes, extracting and structuring data, and building tools that solve concrete problems. Every project on my GitHub answers a real need.',
        'about.soft.title': 'Competencies',
        'about.soft.leadership': 'Technical leadership (CTO at CubiTech)',
        'about.soft.speed': 'Agile delivery and continuous learning',
        'about.soft.creativity': 'Product-driven creativity',
        'about.soft.understanding': 'Deep understanding of the problem',
        'about.soft.docs': 'Rigorous documentation',
        'about.soft.predictions': 'Technical analysis and forecasting',

        'contact.title': "Let's work together",
        'contact.description': "I'm open to internships, freelance projects, and collaborations. Reach out through your favorite channel.",
        'contact.email': 'Email',
        'footer.availability': 'Available for projects and internships',
        'footer.about': 'Freelance full-stack developer and CTO at CubiTech. I build, ship, and maintain web products with a results-driven focus.',
        'footer.cta.email': 'Send an email',
        'footer.nav.title': 'Navigation',
        'footer.contact.title': 'Contact',
        'footer.resources.title': 'Resources',
        'footer.link.cv': 'Resume',
        'footer.link.cover': 'Cover letter',
        'footer.link.repos': 'All repositories',
        'footer.link.top': 'Back to top',
        'footer.signatureLine': 'Full-stack · Systems · Automation',

        'stats.projects': 'Projects on GitHub',
        'stats.production': 'Apps in production',
        'stats.languages': 'Programming languages',
        'stats.tech': 'Technologies in use',

        'experience.title': 'Experience',
        'experience.subtitle': 'Professional career and university education',
        'experience.linkedin': 'View full profile on LinkedIn',
        'experience.group.work': 'Professional experience',
        'experience.group.education': 'Education',
        'experience.current': 'Current',
        'experience.cto.period': 'Current',
        'experience.cto.title': 'CTO',
        'experience.cto.desc': 'I lead technology at a freelance agency: stack definition, solution architecture, code review, and delivery of digital products for clients in Cuba and remotely.',
        'experience.freelance.period': 'Freelance',
        'experience.freelance.title': 'Full-Stack Developer',
        'experience.freelance.desc': 'I build complete web applications: interface, API, database, and deployment. I work with Rust/Axum, Node.js/NestJS, React/Next.js, and PostgreSQL.',
        'experience.production.period': 'In production',
        'experience.production.title': 'Deployed systems',
        'experience.production.desc': 'I keep applications running on Azure App Service with Docker containers, CI on GitHub Actions, and health monitoring for every service.',
        'experience.education.period': 'MatCom · University of Havana',
        'experience.education.title': 'Computer Science',
        'experience.education.desc': 'I studied Computer Science at the Faculty of Mathematics and Computer Science (MatCom), the reference faculty of the University of Havana — Cuba’s oldest university (1728) — for Computer Science, Mathematics, and Data Science. Training in algorithms, data structures, discrete mathematics, optimization, databases, and scientific computing, applied in projects published on GitHub.',
        'experience.courses.period': 'Academic',
        'experience.courses.title': 'Applied coursework',
        'experience.courses.desc': 'Repositories on data structures, discrete mathematics, optimization, and databases that I wrote during my degree: the theoretical foundation behind my engineering work.',
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
