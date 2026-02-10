import { motion } from 'framer-motion';
import { Cpu, Terminal, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const TechLibrary = () => {
    const { t, language } = useLanguage();

    const categories = [
        {
            title: t('library.infra'),
            icon: <Cpu className="w-5 h-5 text-accent" />,
            skills: language === 'es'
                ? ["Go (Golang)", "Docker", "Sistemas Distribuidos", "Concurrencia", "SRE / Observabilidad", "Prometheus & Grafana"]
                : ["Go (Golang)", "Docker", "Distributed Systems", "Concurrency", "SRE / Observability", "Prometheus & Grafana"]
        },
        {
            title: t('library.ai'),
            icon: <Terminal className="w-5 h-5 text-accent" />,
            skills: language === 'es'
                ? ["Python", "Orquestación LLMs (RAG)", "Vector Databases", "LangChain", "SQL & NoSQL", "Data Governance"]
                : ["Python", "LLM Orchestration (RAG)", "Vector Databases", "LangChain", "SQL & NoSQL", "Data Governance"]
        },
        {
            title: t('library.backend'),
            icon: <Globe className="w-5 h-5 text-accent" />,
            skills: language === 'es'
                ? ["TypeScript / Node.js", "Diseño de APIs (REST/gRPC)", "Microservicios", "C# / .NET Core", "Clean Architecture", "Event Sourcing"]
                : ["TypeScript / Node.js", "API Design (REST/gRPC)", "Microservices", "C# / .NET Core", "Clean Architecture", "Event Sourcing"]
        },
        {
            title: t('library.security'),
            icon: <Shield className="w-5 h-5 text-accent" />,
            skills: language === 'es'
                ? ["JWT / OAuth 2.0", "Cloud Security", "Inmutabilidad de Datos", "Trazabilidad", "CI/CD Pipelines"]
                : ["JWT / OAuth 2.0", "Cloud Security", "Data Immutability", "Traceability", "CI/CD Pipelines"]
        }
    ];

    return (
        <section className="max-w-6xl mx-auto px-6 py-24 bg-paper/30 border-y border-white-soft/5 mb-24">
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
                <h2 className="text-3xl font-serif text-white-soft italic">{t('library.title')}</h2>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white-soft/30">{t('library.subtitle')}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {categories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            {category.icon}
                            <h3 className="font-serif text-lg text-white-soft/90">{category.title}</h3>
                        </div>
                        <ul className="space-y-4">
                            {category.skills.map((skill) => (
                                <li key={skill} className="flex items-center gap-3 group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent transition-colors" />
                                    <span className="text-sm font-sans text-white-soft/50 group-hover:text-white-soft/80 transition-colors">
                                        {skill}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
