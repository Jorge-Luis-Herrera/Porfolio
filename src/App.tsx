import './App.css'
import { Hero } from './components/sections/Hero'
import { ProjectGallery } from './components/sections/ProjectGallery'
import { TechLibrary } from './components/sections/TechLibrary'
import { BlueprintDoc } from './components/sections/BlueprintDoc'
import { SideNav } from './components/ui/SideNav'
import { PersonalInfo } from './components/sections/PersonalInfo'
import { ThemeToggle } from './components/ui/ThemeToggle'
import { Mail, MessageCircle, Send, Globe, Github, Linkedin } from 'lucide-react'
import { useLanguage } from './context/LanguageContext'

function App() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <main className="bg-background min-h-screen text-white-soft selection:bg-accent/30 overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <SideNav />

      <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-40 bg-background/80 backdrop-blur-md border-b border-white-soft/5">
        <span className="font-serif text-lg md:text-xl italic tracking-wider text-white-soft lg:ml-24 transition-all">The Writer's Code</span>
        <div className="flex gap-4 md:gap-8 items-center font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white-soft/60">
          <a href="#proyectos" className="hover:text-accent transition-colors hidden md:block">{t('nav.projects')}</a>
          <a href="#contacto" className="hover:text-accent transition-colors hidden md:block">{t('nav.contact')}</a>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center mr-2 md:mr-0">
            <ThemeToggle />
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 w-16 md:w-auto h-7 md:h-auto px-2 md:px-3 border border-white-soft/10 hover:border-accent/50 rounded-full transition-all text-accent group whitespace-nowrap text-[8px] md:text-[10px]"
            >
              <Globe className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:rotate-180 transition-transform duration-500 shrink-0" />
              <span>Vol. {language === 'es' ? 'ES' : 'EN'}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="lg:pl-20">
        <Hero />
        <TechLibrary />

        <div id="proyectos">
          <ProjectGallery />
        </div>

        <PersonalInfo />

        <div id="blueprint">
          <BlueprintDoc />
        </div>

        <footer id="contacto" className="max-w-6xl mx-auto px-6 py-24 border-t border-white-soft/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-3xl font-serif italic mb-4">{t('footer.epilogue')}</h2>
              <p className="text-white-soft/50 font-sans leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 items-center">
              <a href="https://github.com/Jorge-Luis-Herrera" target="_blank" className="text-white-soft/40 hover:text-accent transition-all transform hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/jorge-luis-herrera-cecilia-6a9031377/" target="_blank" className="text-white-soft/40 hover:text-accent transition-all transform hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://t.me/Jorge_Lhc" target="_blank" className="text-white-soft/40 hover:text-accent transition-all transform hover:scale-110">
                <Send className="w-6 h-6" />
              </a>
              <a href="https://wa.me/5350722776" target="_blank" className="text-white-soft/40 hover:text-accent transition-all transform hover:scale-110">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="mailto:herreraceciliajorgeluis@gmail.com" className="text-white-soft/40 hover:text-accent transition-all transform hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="mt-24 text-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white-soft/20">
              {t('footer.copy')}
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default App
