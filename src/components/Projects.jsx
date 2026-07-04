import { forwardRef, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, ArrowUpRight, Layers, X, Cpu, BrainCircuit, Globe, GraduationCap, LayoutGrid } from 'lucide-react'
import { projects, projectCategories } from '../data/content'

const CATEGORY_ICONS = {
  all: LayoutGrid,
  embedded: Cpu,
  ai: BrainCircuit,
  web: Globe,
  university: GraduationCap,
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const Projects = forwardRef(function Projects(_, ref) {
  const [openProject, setOpenProject] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const tabs = useMemo(() => [{ id: 'all', label: 'All' }, ...projectCategories], [])
  const visibleProjects = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  )

  // Close modal on Escape
  useEffect(() => {
    if (!openProject) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpenProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openProject])

  return (
    <section
      ref={ref}
      data-section-id="projects"
      className="snap-section relative flex min-h-screen w-full flex-col justify-start px-5 pb-28 pt-20 md:px-16 md:py-16 md:pl-44 md:pr-12 lg:pl-56 lg:pr-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sage-deep">Selected work</p>
        <div className="mt-2 flex items-center gap-3">
          <Layers size={26} strokeWidth={1.6} className="text-sky-deep" />
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Projects</h2>
        </div>
        <p className="mt-3 max-w-xl font-body text-sm text-ink-soft md:text-base">
          A few things I've built and shipped, grouped by area. Pick a camp, then tap a card for the
          full story — or jump straight to GitHub.
        </p>

        {/* Category tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = CATEGORY_ICONS[tab.id] ?? LayoutGrid
            const isActive = tab.id === activeCategory
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                aria-pressed={isActive}
                className={`relative flex items-center gap-2 rounded-full border px-4 py-2 font-body text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? 'border-sky/40 bg-cream-soft text-ink shadow-card'
                    : 'border-ink/10 bg-cream-soft/40 text-ink-soft hover:border-sky/30'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="category-active-bg"
                    className="absolute inset-0 rounded-full bg-sky/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={15} strokeWidth={1.8} className="relative" />
                <span className="relative">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeCategory}
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.button
                key={project.id}
                layout
                onClick={() => setOpenProject(project)}
                variants={card}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-2xl border border-ink/10 bg-cream-soft/80 p-5 text-left shadow-card transition-colors duration-300 hover:border-sky/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{project.title}</h3>
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream text-ink-faint transition-colors duration-300 group-hover:bg-sky/15 group-hover:text-sky-deep">
                      {project.kind === 'GitHub' ? <Github size={15} /> : <ArrowUpRight size={15} />}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">{project.summary}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink/10 bg-cream px-3 py-1 font-mono text-[11px] text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 && (
          <p className="mt-8 font-body text-sm text-ink-faint">Nothing here yet — check back soon.</p>
        )}

        <a
          href="https://github.com/fa-rh-am"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-sky-deep hover:underline"
        >
          See everything on GitHub
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {openProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
            onClick={() => setOpenProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[1.5rem] border border-ink/10 bg-cream-soft p-8 shadow-soft"
            >
              <button
                onClick={() => setOpenProject(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-faint hover:bg-cream hover:text-ink"
              >
                <X size={16} />
              </button>

              <span className="font-mono text-xs text-sky-deep">{openProject.year}</span>
              <h3 className="mt-1 font-display text-3xl font-semibold text-ink">{openProject.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">{openProject.summary}</p>

              <ul className="mt-5 space-y-2">
                {openProject.highlights.map((point) => (
                  <li key={point} className="flex gap-2 font-body text-sm text-ink-soft">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-deep" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {openProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 bg-cream px-3 py-1 font-mono text-[11px] text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={openProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-body text-sm font-semibold text-cream transition-colors hover:bg-sky-deep"
              >
                {openProject.kind === 'GitHub' ? <Github size={15} /> : <ArrowUpRight size={15} />}
                {openProject.kind === 'GitHub' ? 'View on GitHub' : 'Visit live project'}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
})

export default Projects
