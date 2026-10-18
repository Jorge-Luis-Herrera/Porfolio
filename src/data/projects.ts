export type ProjectCategory = 'featured' | 'backend' | 'automation' | 'academic';

export interface Project {
    id: string;
    category: ProjectCategory;
    title: string;
    description: { es: string; en: string };
    tech: string[];
    repo: string;
    liveLink?: string;
    starred?: boolean;
}

const GH = 'https://github.com/Jorge-Luis-Herrera';

export const projects: Project[] = [
    // ⭐ DESTACADOS / FULL-STACK
    {
        id: 'cloth-sell',
        category: 'featured',
        title: 'Cloth-Sell',
        description: {
            es: 'Tienda de ropa en línea con catálogo dinámico y experiencia de compra orientada a conversión.',
            en: 'Online clothing store with a dynamic catalog and conversion-focused shopping experience.',
        },
        tech: ['React', 'TypeScript', 'Tailwind CSS'],
        repo: `${GH}/Cloth-Sell`,
        starred: true,
    },
    {
        id: 'enchanted-vanity',
        category: 'featured',
        title: 'B&V Cosméticos',
        description: {
            es: 'Catálogo premium de belleza con panel de administración, inventario, subida de imágenes y pedidos por WhatsApp.',
            en: 'Premium beauty catalog with admin panel, inventory, image uploads, and WhatsApp ordering.',
        },
        tech: ['React', 'NestJS', 'SQLite', 'Azure'],
        repo: `${GH}/enchanted-vanity`,
        starred: true,
    },
    {
        id: 'cutesell',
        category: 'featured',
        title: 'CuteSell Plush Store',
        description: {
            es: 'Tienda online de peluches con catálogo inmersivo, búsqueda global y panel de administración.',
            en: 'Online plush store with immersive catalog, global search, and admin dashboard.',
        },
        tech: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind CSS'],
        repo: `${GH}/CuteSell`,
        liveLink: 'https://cutesell-abe0e5d5cwdwf7a6.eastus-01.azurewebsites.net/',
        starred: true,
    },
    {
        id: 'dpavel',
        category: 'featured',
        title: "D'Pavel Coffee Experience",
        description: {
            es: 'Catálogo digital para cafetería con navegación visual y flujo de compra orientado a retail.',
            en: 'Digital catalog for a cafe with visual browsing and a retail-oriented purchase flow.',
        },
        tech: ['Vue', 'Node.js', 'PostgreSQL', 'Azure'],
        repo: `${GH}/DPavel`,
        liveLink: 'https://dpavel-gzdgamcvhzgja8h0.eastus-01.azurewebsites.net/',
        starred: true,
    },
    {
        id: 'g-e',
        category: 'featured',
        title: 'Hairdo — G-E',
        description: {
            es: 'Página web para un negocio de peluquería, con presentación de servicios y contacto.',
            en: 'Website for a hairdressing business, with service presentation and contact.',
        },
        tech: ['JavaScript', 'React'],
        repo: `${GH}/G-E`,
    },

    // 🛠 BACKEND & SISTEMAS
    {
        id: 'backend-programming',
        category: 'backend',
        title: 'Backend Programming',
        description: {
            es: 'Repositorio curado de patrones, utilidades y arquitecturas para acelerar desarrollos backend.',
            en: 'Curated repository of patterns, utilities, and architectures to speed up backend development.',
        },
        tech: ['Node.js', 'Express', 'C#', 'SQL'],
        repo: `${GH}/Backend_Programming`,
    },
    {
        id: 'db-final-test',
        category: 'backend',
        title: 'DB Final Test',
        description: {
            es: 'Proyecto final de bases de datos: modelado, consultas y pruebas sobre un caso real.',
            en: 'Database course final project: modeling, queries, and testing on a real case.',
        },
        tech: ['JavaScript', 'SQL'],
        repo: `${GH}/DB-Final-Test`,
    },
    {
        id: 'json-extractor',
        category: 'backend',
        title: 'JsonExtractor',
        description: {
            es: 'Utilidad para extraer y transformar datos JSON de forma automatizada.',
            en: 'Utility for extracting and transforming JSON data in an automated way.',
        },
        tech: ['JavaScript', 'Node.js'],
        repo: `${GH}/JsonExtractor`,
    },
    {
        id: 'dotnet',
        category: 'backend',
        title: '.NET Practice',
        description: {
            es: 'Ejercicios y servicios construidos con C# y el ecosistema .NET.',
            en: 'Exercises and services built with C# and the .NET ecosystem.',
        },
        tech: ['C#', '.NET'],
        repo: `${GH}/Dotnet`,
    },
    {
        id: 'yt-downloader',
        category: 'backend',
        title: 'YT Video Downloader',
        description: {
            es: 'Utilidad de consola para verificar y descargar videos de YouTube en MP4 con nombres seguros.',
            en: 'Console utility to verify and download YouTube videos as MP4 with safe file names.',
        },
        tech: ['C#', '.NET', 'YoutubeExplode'],
        repo: `${GH}/YT-Video-Downloader`,
    },
    {
        id: 'pizzas-los-herrera',
        category: 'backend',
        title: 'Pizzas Los Herrera',
        description: {
            es: 'Sistema para pizzería construido en Rust como ejercicio de sistemas y rendimiento.',
            en: 'Pizzeria system built in Rust as a systems and performance exercise.',
        },
        tech: ['Rust'],
        repo: `${GH}/Pizzas-Los-Herrera`,
    },

    // 🤖 IA & AUTOMATIZACIÓN
    {
        id: 'cecilos',
        category: 'automation',
        title: 'CecilOs',
        description: {
            es: 'Agente de escritorio 100% local para Linux Wayland con voz, visión y ejecución modular.',
            en: '100% local desktop agent for Linux Wayland with voice, vision, and modular execution.',
        },
        tech: ['Python', 'Wayland', 'Moonshine', 'Piper'],
        repo: `${GH}/CecilOs`,
        starred: true,
    },
    {
        id: 'thesis-scraper',
        category: 'automation',
        title: 'Thesis Insight Scraper',
        description: {
            es: 'Scraper para recopilar datos académicos dispersos y convertirlos en información estructurada.',
            en: 'Scraper for collecting scattered academic data and turning it into structured information.',
        },
        tech: ['Selenium', 'BeautifulSoup', 'Python'],
        repo: `${GH}/Cuban-Tesis-Scrapper`,
    },
    {
        id: 'automation-projects',
        category: 'automation',
        title: 'Automation Projects',
        description: {
            es: 'Scripts de automatización para tareas repetitivas y orquestación de flujos de trabajo.',
            en: 'Automation scripts for repetitive tasks and workflow orchestration.',
        },
        tech: ['Python', 'Bash', 'Cron'],
        repo: `${GH}/Automation-Projects`,
    },
    {
        id: 'bitcoin-analizer',
        category: 'automation',
        title: 'Bitcoin Analizer',
        description: {
            es: 'Herramienta de análisis de datos y tendencias del mercado de Bitcoin en Python.',
            en: 'Python tool for analyzing Bitcoin market data and trends.',
        },
        tech: ['Python', 'Pandas', 'Data Analysis'],
        repo: `${GH}/Bitcoin_Analizer`,
    },
    {
        id: 'extract-extension',
        category: 'automation',
        title: 'Extract-Extension',
        description: {
            es: 'Extensión de navegador para extraer información de páginas web de forma rápida.',
            en: 'Browser extension to quickly extract information from web pages.',
        },
        tech: ['JavaScript', 'Browser Extension'],
        repo: `${GH}/Extract-Extension`,
    },
    {
        id: 'windows-vigilant',
        category: 'automation',
        title: 'Windows Vigilant',
        description: {
            es: 'Herramienta de monitoreo para Windows escrita en C, orientada a sistemas.',
            en: 'Monitoring tool for Windows written in C, systems-oriented.',
        },
        tech: ['C', 'WinAPI'],
        repo: `${GH}/Windows_Vigilant`,
    },

    // 📐 ACADÉMICO & FUNDAMENTOS
    {
        id: 'eda-course',
        category: 'academic',
        title: 'EDA Course',
        description: {
            es: 'Curso y apuntes sobre estructuras de datos, complejidad temporal y recorridos de árboles.',
            en: 'Course notes on data structures, time complexity, and tree traversals.',
        },
        tech: ['Markdown', 'C#', 'Python'],
        repo: `${GH}/EDA_Course`,
    },
    {
        id: 'discrete-math',
        category: 'academic',
        title: 'Discrete Math Foundations',
        description: {
            es: 'Cuaderno introductorio de teoría discreta, grafos y fundamentos matemáticos para algoritmos.',
            en: 'Introductory notebook on discrete theory, graphs, and mathematical foundations for algorithms.',
        },
        tech: ['LaTeX', 'Python'],
        repo: `${GH}/Discrete_Math`,
    },
    {
        id: 'examen-matematica-discreta',
        category: 'academic',
        title: 'Examen Matemática Discreta',
        description: {
            es: 'Resolución estructurada de examen de matemática discreta con razonamiento paso a paso.',
            en: 'Structured solutions for a discrete mathematics exam with step-by-step reasoning.',
        },
        tech: ['LaTeX', 'Matemática Discreta'],
        repo: `${GH}/Examen-Matematica-Discreta`,
    },
    {
        id: 'optimization-models',
        category: 'academic',
        title: 'Optimization Models',
        description: {
            es: 'Modelos de optimización matemática aplicados a problemas de ciencia de la computación.',
            en: 'Mathematical optimization models applied to computer science problems.',
        },
        tech: ['Python', 'Investigación de Operaciones'],
        repo: `${GH}/Optimization_Models`,
    },
    {
        id: 'python-documentation',
        category: 'academic',
        title: 'Python Documentation',
        description: {
            es: 'Documentación y guías de estudio estructuradas sobre Python y sus herramientas.',
            en: 'Structured study guides and documentation on Python and its tooling.',
        },
        tech: ['Python', 'Markdown'],
        repo: `${GH}/Python_Documentation`,
    },
];

export const categoryOrder: ProjectCategory[] = ['featured', 'backend', 'automation', 'academic'];
