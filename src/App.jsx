import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'
import { useSectionNav } from './hooks/useSectionNav'

const SECTION_IDS = ['hero', 'timeline', 'projects', 'about', 'contact']

export default function App() {
  const { containerRef, registerSection, activeIndex, scrollToIndex } = useSectionNav(SECTION_IDS)

  return (
    <div className="relative bg-cream bg-contour">
      <ParticleField />
      <Sidebar activeIndex={activeIndex} onNavigate={scrollToIndex} />

      <main ref={containerRef} className="snap-container relative z-10">
        <Hero ref={registerSection('hero')} onNavigateNext={() => scrollToIndex(1)} />
        <Timeline ref={registerSection('timeline')} isActive={activeIndex === 1} />
        <Projects ref={registerSection('projects')} />
        <About ref={registerSection('about')} />
        <Contact ref={registerSection('contact')} />
      </main>
    </div>
  )
}
