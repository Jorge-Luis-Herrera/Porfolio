import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { MainProjects } from './components/sections/MainProjects'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { AboutSection } from './components/sections/AboutSection'
import { Footer } from './components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <Navbar />
      <main>
        <Hero />
        <MainProjects />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
