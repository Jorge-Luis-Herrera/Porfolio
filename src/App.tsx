import { Navbar } from './components/ui/Navbar'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Spotlight } from './components/ui/Spotlight'
import { CustomCursor } from './components/ui/CustomCursor'
import { Preloader } from './components/ui/Preloader'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { TechMarquee } from './components/ui/TechMarquee'
import { Hero } from './components/sections/Hero'
import { ProjectExplorer } from './components/sections/ProjectExplorer'
import { Stats } from './components/sections/Stats'
import { Experience } from './components/sections/Experience'
import { SkillsSection } from './components/sections/SkillsSection'
import { HobbiesSection } from './components/sections/HobbiesSection'
import { AboutSection } from './components/sections/AboutSection'
import { Footer } from './components/sections/Footer'
import { ProjectModalProvider } from './context/ProjectModalContext'

function App() {
  return (
    <ProjectModalProvider>
      <SmoothScroll />
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <div className="relative min-h-screen bg-base text-ink">
        <div className="grid-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        <Spotlight />

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <ProjectExplorer />
            <Stats />
            <Experience />
            <SkillsSection />
            <HobbiesSection />
            <AboutSection />
          </main>
          <Footer />
        </div>
      </div>
    </ProjectModalProvider>
  )
}

export default App
