import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { User, FileText, Mail, MapPin, Code2, Trophy, Zap, Layers, Cpu, Binary, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export const PersonalInfo = () => {
    const { language } = useLanguage();
    const [selectedSkill, setSelectedSkill] = useState<{ name: string, file: string } | null>(null);
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedSkill) {
            setIsLoading(true);
            fetch(`/content/skills/${selectedSkill.file}.md`)
                .then(res => res.text())
                .then(text => {
                    setMarkdownContent(text);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Error loading skill content:', err);
                    setMarkdownContent(language === 'es' ? '# Error\nNo se pudo cargar el contenido.' : '# Error\nCould not load content.');
                    setIsLoading(false);
                });
        }
    }, [selectedSkill, language]);

    return (
        <section id="personal" className="max-w-6xl mx-auto px-6 py-32 border-t border-white-soft/5">
            <div className="flex flex-col lg:flex-row gap-20">
                {/* Left Side: Bio & Story */}
                <div className="flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4 text-accent">
                            <User className="w-5 h-5" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                                {language === 'es' ? 'Historia del Autor' : 'The Author\'s Story'}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif italic text-white-soft">
                            {language === 'es' ? 'La arquitectura del pensamiento.' : 'The architecture of thought.'}
                        </h2>

                        <div className="space-y-6 text-white-soft/60 font-sans leading-relaxed text-lg">
                            <p>
                                {language === 'es'
                                    ? 'Mi viaje en las ciencias de la computación comenzó con una curiosidad insaciable por entender no solo cómo funcionan las máquinas, sino cómo el lenguaje humano puede dictar la lógica del mundo digital.'
                                    : 'My journey in computer science began with an insatiable curiosity to understand not only how machines work, but how human language can dictate the logic of the digital world.'}
                            </p>
                            <p>
                                {language === 'es'
                                    ? 'A lo largo de mis "capítulos" técnicos, he buscado unificar el rigor matemático con la elegancia del software bien escrito. Me considero un estudiante de ciencias de la computación, donde cada línea de código es una palabra en una narrativa más grande de eficiencia y propósito.'
                                    : 'Throughout my technical "chapters," I have sought to unify mathematical rigor with the elegance of well-written software. I consider myself a computer science student, where every line of code is a word in a larger narrative of efficiency and purpose.'}
                            </p>
                        </div>

                        {/* Soft Skills Grid */}
                        <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                { name: language === 'es' ? 'Liderazgo (CTO)' : 'Leadership (CTO)', icon: <Trophy className="w-4 h-4" />, file: 'leadership' },
                                { name: language === 'es' ? 'Rapidez' : 'Speed', icon: <Zap className="w-4 h-4" />, file: 'speed' },
                                { name: language === 'es' ? 'Creatividad' : 'Creativity', icon: <Cpu className="w-4 h-4" />, file: 'creativity' },
                                { name: language === 'es' ? 'Entendimiento' : 'Understanding', icon: <Binary className="w-4 h-4" />, file: 'understanding' },
                                { name: language === 'es' ? 'Doc. Absoluta' : 'Absolute Doc', icon: <FileText className="w-4 h-4" />, file: 'absolute-doc' },
                                { name: language === 'es' ? 'Predicciones' : 'Predictions', icon: <Layers className="w-4 h-4" />, file: 'predictions' }
                            ].map((skill, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedSkill(skill)}
                                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white-soft/5 border border-white-soft/5 rounded hover:border-accent/30 transition-colors group text-left w-full"
                                >
                                    <span className="text-accent/50 group-hover:text-accent transition-colors shrink-0">{skill.icon}</span>
                                    <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-wider text-white-soft/60 break-words">{skill.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-8 pt-12">
                            <div className="space-y-2">
                                <span className="block font-mono text-[10px] uppercase tracking-widest text-white-soft/30">{language === 'es' ? 'Residencia' : 'Location'}</span>
                                <div className="flex items-center gap-2 text-white-soft/80">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    <span>{language === 'es' ? 'Cuba / Remoto' : 'Cuba / Remote'}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="block font-mono text-[10px] uppercase tracking-widest text-white-soft/30">{language === 'es' ? 'Especialidad' : 'Specialization'}</span>
                                <div className="flex items-center gap-2 text-white-soft/80">
                                    <Code2 className="w-4 h-4 text-accent" />
                                    <span>{language === 'es' ? 'Arquitectura de Sistemas & IA' : 'Systems & AI Architecture'}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Professional Assets & CP */}
                <div className="w-full lg:w-80 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-paper border border-white-soft/10 rounded-xl space-y-8"
                    >
                        <h3 className="font-serif text-xl italic text-white-soft">{language === 'es' ? 'Archivos Profesionales' : 'Professional Archives'}</h3>

                        <div className="space-y-4">
                            <a href={language === 'es' ? "/cv.html" : "/cv-en.html"} target="_blank" className="flex items-center justify-between p-4 bg-white-soft/5 hover:bg-accent/10 border border-white-soft/5 hover:border-accent/30 rounded-lg transition-all group">
                                <div className="flex items-center gap-3 text-white-soft/80 group-hover:text-accent">
                                    <FileText className="w-5 h-5" />
                                    <span className="font-mono text-xs uppercase tracking-widest">
                                        {language === 'es' ? 'Currículum Vitae' : 'Curriculum Vitae'}
                                    </span>
                                </div>
                            </a>
                            <a href={language === 'es' ? "/cover-letter.html" : "/cover-letter-en.html"} target="_blank" className="flex items-center justify-between p-4 bg-white-soft/5 hover:bg-accent/10 border border-white-soft/5 hover:border-accent/30 rounded-lg transition-all group">
                                <div className="flex items-center gap-3 text-white-soft/80 group-hover:text-accent">
                                    <Mail className="w-5 h-5" />
                                    <span className="font-mono text-xs uppercase tracking-widest">
                                        {language === 'es' ? 'Carta de Presentación' : 'Cover Letter'}
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div className="pt-8 border-t border-white-soft/10">
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white-soft/30 mb-6">{language === 'es' ? 'Dominio en Problemas' : 'Problem Solving Dominance'}</h4>
                            <div className="space-y-6">
                                <a href="https://codeforces.com/profile/Detroy" target="_blank" className="block space-y-2 group">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white-soft/60 group-hover:text-white-soft transition-colors">Codeforces</span>
                                        <Trophy className="w-4 h-4 text-[#FFD700]" />
                                    </div>
                                    <div className="h-1.5 w-full bg-white-soft/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[65%] bg-[#FFD700]/50" />
                                    </div>
                                </a>
                                <a href="https://www.geeksforgeeks.org/profile/jorgeluisherrera" target="_blank" className="block space-y-2 group">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white-soft/60 group-hover:text-white-soft transition-colors">GeeksForGeeks</span>
                                        <Trophy className="w-4 h-4 text-[#C0C0C0]" />
                                    </div>
                                    <div className="h-1.5 w-full bg-white-soft/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[80%] bg-[#C0C0C0]/50" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Skill Modal */}
            <AnimatePresence>
                {selectedSkill && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-paper border border-white-soft/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
                        >
                            <div className="p-6 border-b border-white-soft/5 flex justify-between items-center bg-white-soft/5">
                                <div className="flex items-center gap-3 text-accent font-mono text-xs uppercase tracking-[0.3em]">
                                    <Binary className="w-4 h-4" />
                                    {selectedSkill.name}
                                </div>
                                <button
                                    onClick={() => setSelectedSkill(null)}
                                    className="p-2 hover:bg-white-soft/10 rounded-full transition-colors group"
                                >
                                    <X className="w-5 h-5 text-white-soft/40 group-hover:text-white-soft transition-colors" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto custom-scrollbar prose prose-invert prose-accent max-w-none">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
