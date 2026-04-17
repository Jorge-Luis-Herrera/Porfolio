import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectModal } from '../ui/ProjectModal';
import { ProjectStackModal } from '../ui/ProjectStackModal';
import { LayoutGrid, Smartphone, Terminal, Brain, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface ProjectData {
    category: 'fullstack' | 'android' | 'devops' | 'ai';
    chapter: string;
    title: string;
    description: string;
    tech: string[];
    link: string;
    liveLink?: string;
    thumbnail?: string;
    essay: {
        problem: string;
        solution: string;
        outcome: string;
    };
}

const getProjects = (lang: string): ProjectData[] => [
    // --- FULLSTACK ---
    {
        category: 'fullstack',
        chapter: lang === 'es' ? 'Capítulo I' : 'Chapter I',
        title: 'B&V Cosméticos',
        description: lang === 'es'
            ? 'Catálogo premium de belleza con panel de administración, inventario, subida de imágenes y pedidos por WhatsApp.'
            : 'Premium beauty catalog with an admin panel, inventory management, image uploads, and WhatsApp ordering.',
        tech: ['React', 'NestJS', 'SQLite', 'Azure'],
        link: 'https://github.com/Jorge-Luis-Herrera/Enchanted-Vanity',
        liveLink: 'https://enchanted-vanity-dggjdvgch9hqfne7.eastus-01.azurewebsites.net/',
        essay: {
            problem: lang === 'es'
                ? 'Necesidad de un catálogo de belleza con administración clara y persistencia estable.'
                : 'Need for a beauty catalog with clear administration and stable persistence.',
            solution: lang === 'es'
                ? 'Frontend reactivo con backend NestJS, CRUD de inventario y despliegue en Azure.'
                : 'Reactive frontend with a NestJS backend, inventory CRUD, and Azure deployment.',
            outcome: lang === 'es'
                ? 'Experiencia de compra y gestión más fluida con datos persistentes e imágenes alojadas.'
                : 'Smoother shopping and management experience with persistent data and hosted images.'
        }
    },
    {
        category: 'fullstack',
        chapter: lang === 'es' ? 'Capítulo II' : 'Chapter II',
        title: 'Cute Sell Plush Store',
        description: lang === 'es'
            ? 'Tienda online de peluches con catálogo inmersivo, búsqueda global, panel admin y ventas por WhatsApp.'
            : 'Online plush store with an immersive catalog, global search, admin dashboard, and WhatsApp sales.',
        tech: ['Next.js', 'NestJS', 'TypeScript', 'Tailwind CSS'],
        link: 'https://github.com/Jorge-Luis-Herrera/Cutesell',
        liveLink: 'https://cutesell-abe0e5d5cwdwf7a6.eastus-01.azurewebsites.net/',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80',
        essay: {
            problem: lang === 'es'
                ? 'La tienda necesitaba una experiencia moderna de catálogo y administración unificada.'
                : 'The store needed a modern catalog experience and a unified admin workflow.',
            solution: lang === 'es'
                ? 'Interfaz con animaciones suaves, catálogo visual y gestión de inventario orientada a conversión.'
                : 'Animated interface with a visual catalog and inventory management focused on conversion.',
            outcome: lang === 'es'
                ? 'Proceso de compra más claro y una operación administrativa más ágil.'
                : 'Clearer shopping flow and a more agile admin operation.'
        }
    },
    {
        category: 'fullstack',
        chapter: lang === 'es' ? 'Capítulo III' : 'Chapter III',
        title: "D'Pavel Coffee Experience",
        description: lang === 'es'
            ? 'Experiencia de catálogo para cafetería con navegación visual y flujo de compra orientado a retail.'
            : 'Cafe catalog experience with visual browsing and a retail-oriented purchase flow.',
        tech: ['Vue', 'Node.js', 'PostgreSQL'],
        link: 'https://github.com/Jorge-Luis-Herrera/Catalogo-DPavel',
        liveLink: 'http://dpavel-gzdgamcvhzgja8h0.eastus-01.azurewebsites.net/',
        thumbnail: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80',
        essay: {
            problem: lang === 'es'
                ? 'La marca necesitaba una presencia digital cálida y con identidad propia.'
                : 'The brand needed a warm digital presence with its own identity.',
            solution: lang === 'es'
                ? 'Interfaz inmersiva con micro-interacciones y un catálogo fluido para productos de cafetería.'
                : 'Immersive interface with micro-interactions and a fluid catalog for cafe products.',
            outcome: lang === 'es'
                ? 'Una experiencia digital más consistente con la propuesta de la cafetería.'
                : 'A more consistent digital experience aligned with the cafe concept.'
        }
    },
    {
        category: 'fullstack',
        chapter: lang === 'es' ? 'Capítulo IV' : 'Chapter IV',
        title: 'YT Video Downloader',
        description: lang === 'es'
            ? 'Utilidad de consola para verificar y descargar videos de YouTube en MP4 con nombres seguros.'
            : 'Console utility to verify and download YouTube videos as MP4 with safe file names.',
        tech: ['C#', '.NET', 'YoutubeExplode'],
        link: 'https://github.com/Jorge-Luis-Herrera/YT-Video-Downloader',
        essay: {
            problem: lang === 'es'
                ? 'Necesidad de una descarga simple y confiable de videos para uso offline.'
                : 'Need for a simple, reliable way to download videos for offline use.',
            solution: lang === 'es'
                ? 'Cliente de consola con validación previa y descarga asistida por YoutubeExplode.'
                : 'Console client with pre-validation and downloads powered by YoutubeExplode.',
            outcome: lang === 'es'
                ? 'Flujo directo para obtener videos en MP4 con manejo básico de errores.'
                : 'Straightforward flow to obtain MP4 videos with basic error handling.'
        }
    },
    {
        category: 'fullstack',
        chapter: lang === 'es' ? 'Capítulo V' : 'Chapter V',
        title: 'Backend Programming',
        description: lang === 'es'
            ? 'Repositorio curado de patrones, utilidades y arquitecturas para acelerar desarrollos backend.'
            : 'Curated repository of patterns, utilities, and architectures to speed up backend development.',
        tech: ['Node.js', 'Express', 'C#', 'SQL'],
        link: 'https://github.com/Jorge-Luis-Herrera/Backend_Programming',
        essay: {
            problem: lang === 'es'
                ? 'Aprender e implementar patrones backend sin una guía práctica consume demasiado tiempo.'
                : 'Learning and implementing backend patterns without practical guidance takes too much time.',
            solution: lang === 'es'
                ? 'Colección de referencias y arquitecturas listas para reutilizar.'
                : 'A collection of references and architectures ready for reuse.',
            outcome: lang === 'es'
                ? 'Base de conocimiento reutilizable que acelera la puesta en marcha de nuevos servicios.'
                : 'Reusable knowledge base that speeds up new service launches.'
        }
    },
    // --- DEVOPS ---
    {
        category: 'devops',
        chapter: lang === 'es' ? 'Capítulo VI' : 'Chapter VI',
        title: 'Automation Projects',
        description: lang === 'es'
            ? 'Scripts de automatización para tareas repetitivas y orquestación de flujos de trabajo.'
            : 'Automation scripts for repetitive tasks and workflow orchestration.',
        tech: ['Python', 'Bash', 'Cron'],
        link: 'https://github.com/Jorge-Luis-Herrera/Automation-Projects',
        essay: {
            problem: lang === 'es'
                ? 'Las tareas repetitivas de administración consumen tiempo y aumentan los errores manuales.'
                : 'Repetitive administration tasks consume time and increase manual errors.',
            solution: lang === 'es'
                ? 'Framework de scripts modulares para automatizar procesos frecuentes.'
                : 'Modular scripting framework to automate frequent processes.',
            outcome: lang === 'es'
                ? 'Menor overhead operativo y menos fricción en tareas rutinarias.'
                : 'Lower operational overhead and less friction in routine tasks.'
        }
    },
    {
        category: 'devops',
        chapter: lang === 'es' ? 'Capítulo VII' : 'Chapter VII',
        title: 'Thesis Insight Scraper',
        description: lang === 'es'
            ? 'Scraper para recopilar datos académicos dispersos y convertirlos en información estructurada.'
            : 'Scraper for collecting scattered academic data and turning it into structured information.',
        tech: ['Selenium', 'BeautifulSoup', 'Python'],
        link: 'https://github.com/Jorge-Luis-Herrera/Cuban-Tesis-Scrapper',
        essay: {
            problem: lang === 'es'
                ? 'La información académica estaba dispersa y era difícil de tabular de forma confiable.'
                : 'Academic information was scattered and hard to tabulate reliably.',
            solution: lang === 'es'
                ? 'Crawler automatizado con Selenium y extracción HTML con BeautifulSoup.'
                : 'Automated crawler with Selenium and HTML extraction using BeautifulSoup.',
            outcome: lang === 'es'
                ? 'Extracción masiva de datos estructurados para análisis e investigación.'
                : 'Massive extraction of structured data for analysis and research.'
        }
    },
    {
        category: 'devops',
        chapter: lang === 'es' ? 'Capítulo VIII' : 'Chapter VIII',
        title: 'CecilOs',
        description: lang === 'es'
            ? 'Agente de escritorio 100% local para Linux Wayland con voz, visión y ejecución modular.'
            : '100% local desktop agent for Linux Wayland with voice, vision, and modular execution.',
        tech: ['Python', 'Wayland', 'Moonshine', 'Piper'],
        link: 'https://github.com/Jorge-Luis-Herrera/CecilOs',
        essay: {
            problem: lang === 'es'
                ? 'Controlar el escritorio con contexto y privacidad sin depender de servicios en la nube.'
                : 'Controlling the desktop with context and privacy without relying on cloud services.',
            solution: lang === 'es'
                ? 'Arquitectura modular con voz, visión de pantalla y ejecución local coordinada por módulos.'
                : 'Modular architecture with voice, screen vision, and local execution coordinated by modules.',
            outcome: lang === 'es'
                ? 'Asistente local robusto, privado y orientado a automatizar tareas complejas.'
                : 'A robust, private local assistant oriented toward automating complex tasks.'
        }
    },
    // --- AI & SCIENCE ---
    {
        category: 'ai',
        chapter: lang === 'es' ? 'Capítulo IX' : 'Chapter IX',
        title: 'EDA Course',
        description: lang === 'es'
            ? 'Curso y apuntes sobre estructuras de datos, complejidad temporal y recorridos de árboles.'
            : 'Course notes on data structures, time complexity, and tree traversals.',
        tech: ['Markdown', 'C#', 'Python'],
        link: 'https://github.com/Jorge-Luis-Herrera/EDA_Course',
        essay: {
            problem: lang === 'es'
                ? 'Hace falta material claro para estudiar complejidad y estructuras de datos paso a paso.'
                : 'Clear material is needed to study complexity and data structures step by step.',
            solution: lang === 'es'
                ? 'Apuntes con ejemplos visuales, fórmulas y recorridos implementados en C#.'
                : 'Notes with visual examples, formulas, and traversals implemented in C#.',
            outcome: lang === 'es'
                ? 'Base didáctica sólida para revisar teoría y práctica de algoritmos.'
                : 'A solid learning base for reviewing algorithm theory and practice.'
        }
    },
    {
        category: 'ai',
        chapter: lang === 'es' ? 'Capítulo X' : 'Chapter X',
        title: 'Discrete Math Foundations',
        description: lang === 'es'
            ? 'Cuaderno introductorio de teoría discreta, grafos y fundamentos matemáticos para algoritmos.'
            : 'Introductory notebook on discrete theory, graphs, and mathematical foundations for algorithms.',
        tech: ['LaTeX', 'Python', 'Discrete Math'],
        link: 'https://github.com/Jorge-Luis-Herrera/Discrete_Math',
        essay: {
            problem: lang === 'es'
                ? 'La base matemática de los algoritmos suele presentarse de forma poco accesible.'
                : 'The mathematical basis of algorithms is often presented in a hard-to-approach way.',
            solution: lang === 'es'
                ? 'Notas y ejercicios sobre combinatoria, grafos y fundamentos discretos.'
                : 'Notes and exercises on combinatorics, graphs, and discrete foundations.',
            outcome: lang === 'es'
                ? 'Base teórica más clara para entender algoritmos y sistemas de IA.'
                : 'Clearer theoretical base for understanding algorithms and AI systems.'
        }
    },
    {
        category: 'ai',
        chapter: lang === 'es' ? 'Capítulo XI' : 'Chapter XI',
        title: 'MarkItDown',
        description: lang === 'es'
            ? 'Herramienta para convertir documentos a Markdown con un flujo de lectura más legible y automatizable.'
            : 'Tool for converting documents to Markdown with a more readable and automatable workflow.',
        tech: ['Python', 'Markdown', 'Document Intelligence'],
        link: 'https://github.com/Jorge-Luis-Herrera/MarkitDown',
        essay: {
            problem: lang === 'es'
                ? 'La portabilidad entre formatos propietarios y Markdown sigue siendo una fricción común.'
                : 'Portability between proprietary formats and Markdown remains a common friction point.',
            solution: lang === 'es'
                ? 'Conversión enfocada en legibilidad y reutilización documental.'
                : 'Conversion focused on readability and document reuse.',
            outcome: lang === 'es'
                ? 'Flujo documental más simple para extraer y reutilizar contenido.'
                : 'Simpler document workflow for extracting and reusing content.'
        }
    }
];

export const ProjectGallery = () => {
    const { t, language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

    const projects = getProjects(language);

    const pillars = [
        { id: 'fullstack', label: t('pillars.fullstack'), icon: <LayoutGrid className="w-8 h-8" />, color: 'text-[#58a6ff]' },
        { id: 'android', label: t('pillars.android'), icon: <Smartphone className="w-8 h-8" />, color: 'text-[#23d160]' },
        { id: 'devops', label: t('pillars.devops'), icon: <Terminal className="w-8 h-8" />, color: 'text-[#f8d06b]' },
        { id: 'ai', label: t('pillars.ai'), icon: <Brain className="w-8 h-8" />, color: 'text-[#ff7eb6]' },
    ];

    const filteredProjects = projects.filter(p => p.category === selectedCategory);

    return (
        <section className="max-w-6xl mx-auto px-6 py-24 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-20">
                <div className="h-px flex-1 border-t border-dashed border-white-soft/10"></div>
                <h2 className="text-3xl font-serif text-white-soft italic shrink-0 px-4">{t('gallery.title')}</h2>
                <div className="h-px flex-1 border-t border-dashed border-white-soft/10"></div>
            </div>

            {/* Quadrant Navigator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 transition-all">
                {pillars.map((pillar, index) => (
                    <motion.div
                        key={pillar.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedCategory(pillar.id)}
                        className="group relative h-64 md:h-80 cursor-pointer overflow-hidden p-8 flex flex-col justify-between transition-all border border-dashed border-white-soft/10 hover:border-accent/30 bg-paper hover:bg-white-soft/[0.02] hover:-translate-y-1"
                    >
                        {/* Blueprint Corner Accents - Solid to 'complete' the corners */}
                        <div className="absolute top-[-1px] left-[-1px] w-4 h-4 border-t border-l border-white-soft/40 group-hover:border-accent transition-colors" />
                        <div className="absolute top-[-1px] right-[-1px] w-4 h-4 border-t border-r border-white-soft/40 group-hover:border-accent transition-colors" />
                        <div className="absolute bottom-[-1px] left-[-1px] w-4 h-4 border-b border-l border-white-soft/40 group-hover:border-accent transition-colors" />
                        <div className="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b border-r border-white-soft/40 group-hover:border-accent transition-colors" />

                        <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity group-hover:opacity-40 ${pillar.id === 'fullstack' ? 'bg-[#58a6ff]' : pillar.id === 'android' ? 'bg-[#23d160]' : pillar.id === 'devops' ? 'bg-[#f8d06b]' : 'bg-[#ff7eb6]'}`} />

                        <div className="flex justify-between items-start z-10">
                            <div className={`${pillar.color} opacity-40 group-hover:opacity-100 transition-all transform group-hover:scale-110 duration-500`}>
                                {pillar.icon}
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-white-soft/20 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>

                        <div className="z-10">
                            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-white-soft/30 mb-2">
                                // 0{index + 1}
                            </span>
                            <h3 className="text-3xl font-serif italic text-white-soft group-hover:text-accent transition-colors">{pillar.label}</h3>
                            <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-all">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">{t('pillars.viewStack')}</span>
                                <div className="h-px w-8 bg-accent/40" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ProjectStackModal
                isOpen={!!selectedCategory}
                onClose={() => setSelectedCategory(null)}
                category={pillars.find(p => p.id === selectedCategory)?.label || ''}
                projects={filteredProjects}
                onSelectProject={(project) => {
                    setSelectedProject(project);
                }}
            />

            <ProjectModal
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                project={selectedProject}
            />
        </section>
    );
};
