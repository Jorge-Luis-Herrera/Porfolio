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
        chapter: lang === 'es' ? "Capítulo I" : "Chapter I",
        title: "Enchanted Vanity (Cubit)",
        description: lang === 'es'
            ? "Plataforma e-commerce premium para la gestión de productos de belleza, desarrollada para Cubit."
            : "Premium e-commerce platform for beauty product management, developed for Cubit.",
        tech: ["React", "FastAPI", "SQLite", "Tailwind"],
        link: "https://github.com/Jorge-Luis-Herrera/Enchanted-Vanity",
        liveLink: "https://enchanted-vanity-dggjdvgch9hqfne7.eastus-01.azurewebsites.net/",
        essay: {
            problem: lang === 'es'
                ? "Necesidad de una interfaz administrativa fluida para la gestión de inventario y ventas con una estética premium."
                : "Need for a fluid administrative interface for inventory and sales management with a premium aesthetic.",
            solution: lang === 'es'
                ? "Arquitectura desacoplada con un backend robusto en FastAPI y un frontend reactivo enfocado en UX."
                : "Decoupled architecture with a robust FastAPI backend and a reactive UX-focused frontend.",
            outcome: lang === 'es'
                ? "Sistema operativo optimizado para el flujo de ventas con despliegue automatizado."
                : "Optimized operating system for sales flow with automated deployment."
        }
    },
    {
        category: 'fullstack',
        chapter: lang === 'es' ? "Capítulo II" : "Chapter II",
        title: "Enterprise .NET Systems",
        description: lang === 'es'
            ? "Sistemas escalables desarrollados sobre el ecosistema robusto de .NET."
            : "Scalable systems developed on top of the robust .NET ecosystem.",
        tech: [".NET", "ASP.NET Core", "Entity Framework"],
        link: "https://github.com/Jorge-Luis-Herrera/Dotnet",
        essay: {
            problem: lang === 'es'
                ? "Necesidad de infraestructuras empresariales con tipado fuerte y alto rendimiento."
                : "Need for enterprise infrastructures with strong typing and high performance.",
            solution: lang === 'es'
                ? "Implementación de servicios RESTful y capas de acceso a datos optimizadas."
                : "Implementation of RESTful services and optimized data access layers.",
            outcome: lang === 'es'
                ? "Sistemas estables y mantenibles siguiendo principios SOLID."
                : "Stable and maintainable systems following SOLID principles."
        }
    },
    {
        category: 'fullstack',
        chapter: lang === 'es' ? "Capítulo III" : "Chapter III",
        title: "MediaStream Downloader",
        description: lang === 'es'
            ? "Herramienta automatizada para la descarga y procesamiento de flujos de medios."
            : "Automated tool for downloading and processing media streams.",
        tech: ["Python", "PyTube", "yt-dlp", "FFmpeg"],
        link: "https://github.com/Jorge-Luis-Herrera/YT-Video-Downloader",
        essay: {
            problem: lang === 'es'
                ? "Extracción ineficiente de contenido multimedia para análisis offline."
                : "Inefficient extraction of multimedia content for offline analysis.",
            solution: lang === 'es'
                ? "Scripting en Python para automatizar el flujo de descarga y conversión."
                : "Python scripting to automate the download and conversion flow.",
            outcome: lang === 'es'
                ? "Procesamiento de medios simplificado con integración de FFmpeg."
                : "Simplified media processing with FFmpeg integration."
        }
    },
    // --- ANDROID ---
    {
        category: 'fullstack',
        chapter: lang === 'es' ? "Capítulo IV" : "Chapter IV",
        title: lang === 'es' ? "Backend Architectures" : "Backend Architectures",
        description: lang === 'es'
            ? "Repositorio de patrones y herramientas ('armas') para el desarrollo backend rápido y estandarizado."
            : "Curated repository of patterns and tools ('weapons') for rapid and standardized backend development.",
        tech: ["Node.js", "Express", "C#", "SQL"],
        link: "https://github.com/Jorge-Luis-Herrera/Backend_Programming",
        essay: {
            problem: lang === 'es'
                ? "La complejidad de aprender e implementar patrones de backend estandarizados de manera rápida."
                : "Complexity in learning and implementing standardized backend patterns rapidly.",
            solution: lang === 'es'
                ? "Una colección curada de arquitecturas y utilidades listas para producción."
                : "A curated collection of architectures and utilities ready for production.",
            outcome: lang === 'es'
                ? "Base de conocimiento reutilizable que acelera el tiempo de desarrollo inicial."
                : "Reusable knowledge base that accelerates initial development time."
        }
    },
    // --- DEVOPS ---
    {
        category: 'devops',
        chapter: lang === 'es' ? "Capítulo V" : "Chapter V",
        title: "AutoPilot Core",
        description: lang === 'es'
            ? "Suite de automatización para tareas de sistema y orquestación de flujos de trabajo."
            : "Automation suite for system tasks and workflow orchestration.",
        tech: ["Python", "Bash", "Cron"],
        link: "https://github.com/Jorge-Luis-Herrera/Automation-Projects",
        essay: {
            problem: lang === 'es'
                ? "Tareas repetitivas de administración de sistemas que consumen tiempo crítico."
                : "Repetitive system administration tasks consuming critical time.",
            solution: lang === 'es'
                ? "Framework de scripts modulares para la automatización proactiva."
                : "Modular scripting framework for proactive automation.",
            outcome: lang === 'es'
                ? "Reducción drástica del overhead operativo y errores manuales."
                : "Drastic reduction in operational overhead and manual errors."
        }
    },
    {
        category: 'devops',
        chapter: lang === 'es' ? "Capítulo VI" : "Chapter VI",
        title: "Thesis Insight Scraper",
        description: lang === 'es'
            ? "Mecanismo de scraping avanzado para la recolección de datos académicos no indexados."
            : "Advanced scraping mechanism for collecting non-indexed academic data.",
        tech: ["Selenium", "BeautifulSoup", "Python"],
        link: "https://github.com/Jorge-Luis-Herrera/Cuban-Tesis-Scrapper",
        essay: {
            problem: lang === 'es'
                ? "Dificultad para acceder y tabular datos académicos dispersos en la web."
                : "Difficulty in accessing and tabulating academic data scattered across the web.",
            solution: lang === 'es'
                ? "Crawler automatizado con manejo de estados dinámicos mediante Selenium."
                : "Automated crawler with dynamic state handling using Selenium.",
            outcome: lang === 'es'
                ? "Extracción masiva de datos estructurados para investigación científica."
                : "Massive structured data extraction for scientific research."
        }
    },
    {
        category: 'devops',
        chapter: lang === 'es' ? "Capítulo VII" : "Chapter VII",
        title: "CecilOs Kernel",
        description: lang === 'es'
            ? "Proyecto de desarrollo de sistemas operativos de bajo nivel."
            : "Low-level operating systems development project.",
        tech: ["C", "Assembly", "QEMU"],
        link: "https://github.com/Jorge-Luis-Herrera/CecilOs",
        essay: {
            problem: lang === 'es'
                ? "Comprensión de la abstracción de hardware y gestión de memoria."
                : "Understanding hardware abstraction and memory management.",
            solution: lang === 'es'
                ? "Implementación de un kernel básico con soporte de arranque y gestión de E/S."
                : "Implementation of a basic kernel with boot support and I/O management.",
            outcome: lang === 'es'
                ? "Conocimiento profundo de la interacción software-hardware."
                : "Deep knowledge of software-hardware interaction."
        }
    },
    // --- AI & SCIENCE ---
    {
        category: 'ai',
        chapter: lang === 'es' ? "Capítulo VIII" : "Chapter VIII",
        title: "Data Horizon EDA",
        description: lang === 'es'
            ? "Análisis Exploratorio de Datos avanzado para descubrir patrones científicos."
            : "Advanced Exploratory Data Analysis to discover scientific patterns.",
        tech: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
        link: "https://github.com/Jorge-Luis-Herrera/EDA_Course",
        essay: {
            problem: lang === 'es'
                ? "Ruido estadístico en datasets crudos que impide la toma de decisiones."
                : "Statistical noise in raw datasets preventing decision making.",
            solution: lang === 'es'
                ? "Aplicación de técnicas de limpieza y visualización estadística proactiva."
                : "Application of cleaning techniques and proactive statistical visualization.",
            outcome: lang === 'es'
                ? "Insights accionables y modelos de datos validados estadísticamente."
                : "Actionable insights and statistically validated data models."
        }
    },
    {
        category: 'ai',
        chapter: lang === 'es' ? "Capítulo IX" : "Chapter IX",
        title: "Algorithmic Foundations",
        description: lang === 'es'
            ? "Implementación de conceptos fundamentales en matemáticas discretas y algoritmos."
            : "Implementation of fundamental concepts in discrete mathematics and algorithms.",
        tech: ["LaTeX", "Python", "Discrete Math"],
        link: "https://github.com/Jorge-Luis-Herrera/Discrete_Math",
        essay: {
            problem: lang === 'es'
                ? "Brecha teórica entre algoritmos complejos y sus fundamentos matemáticos."
                : "Theoretical gap between complex algorithms and their mathematical foundations.",
            solution: lang === 'es'
                ? "Documentación y resolución algorítmica de problemas de combinatoria y grafos."
                : "Documentation and algorithmic resolution of combinatorics and graph problems.",
            outcome: lang === 'es'
                ? "Base teórica sólida para el desarrollo de sistemas de IA eficientes."
                : "Solid theoretical foundation for the development of efficient AI systems."
        }
    },
    {
        category: 'ai',
        chapter: lang === 'es' ? "Capítulo X" : "Chapter X",
        title: "MarkitDown Pro",
        description: lang === 'es'
            ? "Procesamiento y conversión inteligente de documentos a formato Markdown."
            : "Intelligent document processing and conversion to Markdown format.",
        tech: ["Python", "Markdown API"],
        link: "https://github.com/Jorge-Luis-Herrera/MarkitDown",
        essay: {
            problem: lang === 'es'
                ? "Fricción en la portabilidad de contenido entre formatos propietarios y Markdown."
                : "Friction in content portability between proprietary formats and Markdown.",
            solution: lang === 'es'
                ? "Desarrollo de un motor de conversión optimizado para legibilidad."
                : "Development of a conversion engine optimized for readability.",
            outcome: lang === 'es'
                ? "Flujo de trabajo documental agilizado y estandarizado."
                : "Streamlined and standardized documentary workflow."
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
