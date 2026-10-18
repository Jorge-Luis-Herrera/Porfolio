import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
      </main>
      <ContactSection />
    </div>
  )
}

export default App
