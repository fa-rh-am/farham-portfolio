import { motion } from 'framer-motion'
import { Compass, FolderGit2, User, Mail, Home } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'timeline', label: 'Timeline', icon: Compass },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'about', label: 'About', icon: User },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export default function Sidebar({ activeIndex, onNavigate }) {
  return (
    <>
      {/* Desktop: vertical dock of labeled buttons, echoing a trail of stops */}
      <nav
        aria-label="Section navigation"
        className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:left-8"
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(index)}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative flex w-32 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                isActive
                  ? 'border-sky/40 bg-cream-soft shadow-card'
                  : 'border-ink/5 bg-cream-soft/40 hover:bg-cream-soft/80'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute -left-2 h-8 w-1 rounded-full bg-sky"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={18}
                strokeWidth={1.75}
                className={isActive ? 'text-sky-deep' : 'text-ink-faint group-hover:text-ink-soft'}
              />
              <span
                className={`font-body text-sm font-semibold tracking-wide ${
                  isActive ? 'text-ink' : 'text-ink-soft'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Mobile: compact bottom dock, icons only */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-x-0 bottom-4 z-40 flex justify-center md:hidden"
      >
        <div className="flex items-center gap-1 rounded-full border border-ink/5 bg-cream-soft/95 p-1.5 shadow-soft backdrop-blur">
          {NAV_ITEMS.map((item, index) => {
            const isActive = index === activeIndex
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(index)}
                aria-label={item.label}
                aria-current={isActive ? 'true' : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-sky/15 text-sky-deep' : 'text-ink-faint'
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export { NAV_ITEMS }
