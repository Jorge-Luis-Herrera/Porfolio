import { Navbar } from './components/ui/Navbar'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { Spotlight } from './components/ui/Spotlight'
import { TechMarquee } from './components/ui/TechMarquee'
import { Hero } from './components/sections/Hero'
import { MainProjects } from './components/sections/MainProjects'
import { Stats } from './components/sections/Stats'
import { Experience } from './components/sections/Experience'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { AboutSection } from './components/sections/AboutSection'
import { Footer } from './components/sections/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-base text-ink">
      <ScrollProgress />
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <Spotlight />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <MainProjects />
          <Stats />
          <Experience />
          <ProjectsSection />
          <SkillsSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
