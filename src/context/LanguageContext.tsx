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
        'nav.hobbies': 'Hobbies',
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
        'hero.description': 'Diseño, desarrollo y despliego: la interfaz, la API, la base de datos y la nube. Prefiero proyectos que se quedan funcionando, no demos.',
        'hero.cta.projects': 'Ver proyectos',
        'hero.cta.cv': 'Descargar CV',
        'hero.cta.contact': 'Contactar',

        'projects.inProduction': 'En producción',
        'projects.viewRepo': 'Repositorio',
        'projects.viewLive': 'Ver en vivo',
        'projects.viewDetails': 'Ver detalles',

        'explorer.title': 'Proyectos',
        'explorer.subtitle': 'Todo mi trabajo real en carpetas, como en un escritorio de Linux: abre una y mira los archivos.',
        'explorer.window': 'proyectos',
        'explorer.places': 'Lugares',
        'explorer.home': 'Inicio',
        'explorer.repos': 'Todos los repositorios',
        'explorer.folders': 'carpetas',
        'explorer.item': 'elemento',
        'explorer.items': 'elementos',
        'explorer.hint': 'Abre una carpeta y después un archivo para ver la ficha completa de cada proyecto.',
        'explorer.page': 'Página',
        'explorer.prev': 'Página anterior',
        'explorer.next': 'Página siguiente',
        'explorer.empty': 'Esta carpeta está vacía.',
        'explorer.detail': 'Ver detalle',
        'cursor.view': 'Ver',
        'cursor.open': 'Abrir',
        'explorer.category.featured': 'En producción',
        'explorer.category.backend': 'Backend y sistemas',
        'explorer.category.automation': 'IA y automatización',
        'explorer.category.academic': 'Académico',

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
        'about.p1': 'Soy desarrollador full-stack freelance y CTO en CubiTech.',
        'about.p2': 'Vengo de MatCom y trabajo como se trabaja la matemática: entender bien el problema antes de escribir la primera línea y buscar la solución más simple.',

        'contact.title': '¿Trabajamos juntos?',
        'contact.description': 'Escríbeme por el canal que prefieras y te respondo con una propuesta concreta: alcance, tiempos y siguiente paso.',
        'contact.email': 'Email',
        'footer.availability': 'Disponible para proyectos y prácticas',
        'footer.about': 'Trabajo en remoto desde La Habana (GMT-5), en productos propios y para clientes de cualquier parte.',
        'footer.cta.email': 'Enviar un correo',
        'footer.nav.title': 'Navegación',
        'footer.contact.title': 'Contacto',
        'footer.resources.title': 'Recursos',
        'footer.link.cv': 'Curriculum Vitae',
        'footer.link.cover': 'Carta de presentación',
        'footer.link.repos': 'Todos los repositorios',
        'footer.link.top': 'Volver arriba',
        'footer.author': 'Autor:',

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
        'experience.cto.desc': 'Lidero la tecnología de una agencia freelance: definición del stack, arquitectura de las soluciones, revisión de código y entrega de los productos digitales.',
        'experience.freelance.period': 'Freelance',
        'experience.freelance.title': 'Desarrollador Full-Stack',
        'experience.freelance.desc': 'Trabajo directo con clientes: entender la necesidad, diseñar la solución, implementarla y acompañar su puesta en marcha.',
        'experience.production.period': 'En producción',
        'experience.production.title': 'Sistemas desplegados',
        'experience.production.desc': 'Mantengo aplicaciones vivas en Azure App Service con contenedores Docker, integración continua en GitHub Actions y monitoreo de salud de cada servicio.',
        'experience.education.period': 'MatCom · Universidad de La Habana',
        'experience.education.title': 'Ciencias de la Computación',
        'experience.education.desc': 'Cursando Ciencias de la Computación en la Facultad de Matemática y Computación (MatCom), la facultad de referencia de la Universidad de La Habana —la universidad más antigua de Cuba (1728)— para Ciencias de la Computación, Matemática y Ciencia de Datos. Formación en algoritmos, estructuras de datos, matemática discreta, optimización, bases de datos y programación, aplicada en proyectos publicados en GitHub.',
        'experience.courses.period': 'Proyectos académicos',
        'experience.courses.title': 'Ejercicios de carrera aplicados',
        'experience.courses.desc': 'Repositorios de estructuras de datos, matemática discreta, optimización y bases de datos que escribí durante la carrera: la base teórica que sostiene mi trabajo de ingeniería.',

        'hobbies.title': 'Hobbies y habilidades externas',
        'hobbies.subtitle': 'Lo que entreno fuera del código: idiomas, fuerza y algoritmia por gusto.',
        'hobbies.languages.title': 'Idiomas',
        'hobbies.languages.english': 'Inglés',
        'hobbies.languages.spanish': 'Español',
        'hobbies.languages.desc': 'Trabajo a diario con documentación técnica en inglés: la leo sin ayuda, escribo documentación y me comunico con normalidad en equipos remotos.',
        'hobbies.level.b2': 'MCER · nivel B2',
        'hobbies.level.native': 'Nativo',
        'hobbies.calisthenics.kicker': 'Entrenador',
        'hobbies.calisthenics.title': 'Gimnasio y calistenia',
        'hobbies.calisthenics.desc': 'Entreno y enseño gimnasio y, sobre todo, calistenia: fuerza con el peso del cuerpo, progresiones y técnica. La misma lógica que aplico al código — progresión medible, constancia y respeto por la técnica.',
        'hobbies.calisthenics.skill1': 'Fuerza con peso corporal',
        'hobbies.calisthenics.skill2': 'Progresiones y rutinas',
        'hobbies.calisthenics.skill3': 'Movilidad y técnica',
        'hobbies.calisthenics.skill4': 'Prevención de lesiones',
        'hobbies.calisthenics.reps': 'Reps',
        'hobbies.figureLabel': 'Animación de una dominada al pecho',
        'hobbies.competitive.kicker': 'Hobby',
        'hobbies.competitive.title': 'Programación competitiva',
        'hobbies.competitive.desc': 'Resuelvo problemas de algoritmia y estructuras de datos por diversión: grafos, programación dinámica, teoría de números y optimización. Es donde entreno la corrección y la complejidad antes de llevarlas a producción.',
        'hobbies.competitive.tag1': 'Grafos',
        'hobbies.competitive.tag2': 'Programación dinámica',
        'hobbies.competitive.tag3': 'Estructuras de datos',
        'hobbies.competitive.tag4': 'Teoría de números',
        'hobbies.competitive.caption': 'Bubble sort · O(n²) → O(n log n)',
    },
    en: {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.hobbies': 'Hobbies',
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
        'hero.description': 'I design, build, and ship: the interface, the API, the database, and the cloud. I prefer projects that keep running, not demos.',
        'hero.cta.projects': 'View projects',
        'hero.cta.cv': 'Download CV',
        'hero.cta.contact': 'Get in touch',

        'projects.inProduction': 'In production',
        'projects.viewRepo': 'Repository',
        'projects.viewLive': 'Live demo',
        'projects.viewDetails': 'View details',

        'explorer.title': 'Projects',
        'explorer.subtitle': 'All of my real work in folders, like a Linux desktop: open one and browse the files.',
        'explorer.window': 'projects',
        'explorer.places': 'Places',
        'explorer.home': 'Home',
        'explorer.repos': 'All repositories',
        'explorer.folders': 'folders',
        'explorer.item': 'item',
        'explorer.items': 'items',
        'explorer.hint': 'Open a folder and then a file to see the full write-up of each project.',
        'explorer.page': 'Page',
        'explorer.prev': 'Previous page',
        'explorer.next': 'Next page',
        'explorer.empty': 'This folder is empty.',
        'explorer.detail': 'View details',
        'cursor.view': 'View',
        'cursor.open': 'Open',
        'explorer.category.featured': 'In production',
        'explorer.category.backend': 'Backend & systems',
        'explorer.category.automation': 'AI & automation',
        'explorer.category.academic': 'Academic',

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
        'about.p1': "I'm a freelance full-stack developer and CTO at CubiTech.",
        'about.p2': 'I come from MatCom and I work the way mathematics is done: understand the problem properly before writing the first line, and look for the simplest solution.',

        'contact.title': "Let's work together",
        'contact.description': 'Reach out through your favorite channel and I will answer with a concrete proposal: scope, timing, and next step.',
        'contact.email': 'Email',
        'footer.availability': 'Available for projects and internships',
        'footer.about': 'I work remotely from Havana (GMT-5), on my own products and for clients anywhere.',
        'footer.cta.email': 'Send an email',
        'footer.nav.title': 'Navigation',
        'footer.contact.title': 'Contact',
        'footer.resources.title': 'Resources',
        'footer.link.cv': 'Resume',
        'footer.link.cover': 'Cover letter',
        'footer.link.repos': 'All repositories',
        'footer.link.top': 'Back to top',
        'footer.author': 'Author:',

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
        'experience.cto.desc': 'I lead technology at a freelance agency: stack definition, solution architecture, code review, and delivery of digital products.',
        'experience.freelance.period': 'Freelance',
        'experience.freelance.title': 'Full-Stack Developer',
        'experience.freelance.desc': 'I work directly with clients: understand the need, design the solution, build it, and stay close through launch.',
        'experience.production.period': 'In production',
        'experience.production.title': 'Deployed systems',
        'experience.production.desc': 'I keep applications running on Azure App Service with Docker containers, CI on GitHub Actions, and health monitoring for every service.',
        'experience.education.period': 'MatCom · University of Havana',
        'experience.education.title': 'Computer Science',
        'experience.education.desc': 'Currently studying Computer Science at the Faculty of Mathematics and Computer Science (MatCom), the reference faculty of the University of Havana — Cuba’s oldest university (1728) — for Computer Science, Mathematics, and Data Science. Training in algorithms, data structures, discrete mathematics, optimization, databases, and programming, applied in projects published on GitHub.',
        'experience.courses.period': 'Academic',
        'experience.courses.title': 'Applied coursework',
        'experience.courses.desc': 'Repositories on data structures, discrete mathematics, optimization, and databases that I wrote during my degree: the theoretical foundation behind my engineering work.',

        'hobbies.title': 'Hobbies and skills beyond code',
        'hobbies.subtitle': 'What I train away from the code: languages, strength, and algorithms for fun.',
        'hobbies.languages.title': 'Languages',
        'hobbies.languages.english': 'English',
        'hobbies.languages.spanish': 'Spanish',
        'hobbies.languages.desc': 'I work with technical English documentation every day: I read it unaided, write documentation, and communicate comfortably in remote teams.',
        'hobbies.level.b2': 'CEFR · B2 level',
        'hobbies.level.native': 'Native',
        'hobbies.calisthenics.kicker': 'Coach',
        'hobbies.calisthenics.title': 'Gym and calisthenics',
        'hobbies.calisthenics.desc': 'I coach at the gym and, above all, calisthenics: bodyweight strength, progressions, and technique. The same logic I apply to code — measurable progression, consistency, and respect for technique.',
        'hobbies.calisthenics.skill1': 'Bodyweight strength',
        'hobbies.calisthenics.skill2': 'Progressions and routines',
        'hobbies.calisthenics.skill3': 'Mobility and technique',
        'hobbies.calisthenics.skill4': 'Injury prevention',
        'hobbies.calisthenics.reps': 'Reps',
        'hobbies.figureLabel': 'Animation of a chest-to-bar pull-up',
        'hobbies.competitive.kicker': 'Hobby',
        'hobbies.competitive.title': 'Competitive programming',
        'hobbies.competitive.desc': 'I solve algorithm and data structure problems for fun: graphs, dynamic programming, number theory, and optimization. It is where I train correctness and complexity before bringing them to production.',
        'hobbies.competitive.tag1': 'Graphs',
        'hobbies.competitive.tag2': 'Dynamic programming',
        'hobbies.competitive.tag3': 'Data structures',
        'hobbies.competitive.tag4': 'Number theory',
        'hobbies.competitive.caption': 'Bubble sort · O(n²) → O(n log n)',
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
