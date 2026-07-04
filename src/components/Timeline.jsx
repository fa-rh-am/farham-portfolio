import { forwardRef, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Footprints } from 'lucide-react'
import { timeline } from '../data/content'
import ScenicArt from './ScenicArt'
import PixelHiker from './PixelHiker'

const TRAIL_COLORS = ['#6C9BB8', '#89A98E', '#E3B655']

const Timeline = forwardRef(function Timeline({ isActive }, ref) {
  const [active, setActive] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)
  const current = timeline[active]

  const go = (delta) => {
    setActive((prev) => Math.max(0, Math.min(timeline.length - 1, prev + delta)))
  }

  useEffect(() => setImgFailed(false), [active])

  // While the Timeline section is in view, Left/Right steps between
  // milestones. Up/Down/Space stay reserved for section-level nav.
  useEffect(() => {
    if (!isActive) return
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  return (
    <section
      ref={ref}
      data-section-id="timeline"
      className="snap-section relative flex min-h-screen w-full flex-col justify-start px-5 pb-28 pt-20 md:px-16 md:py-20 md:pl-44 md:pr-12 lg:pl-56 lg:pr-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sage-deep">Life journey</p>
        <div className="mt-2 flex items-center gap-3">
          <Footprints size={26} strokeWidth={1.6} className="text-sky-deep" />
          <h2 className="font-display text-4xl font-semibold text-ink md:text-5xl">Timeline</h2>
        </div>

        {/* Milestone card */}
        <div className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-cream-soft/80 shadow-soft backdrop-blur-sm md:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1.2fr]"
            >
              <div className="relative aspect-[16/9] w-full md:aspect-auto md:h-[320px]">
                {!imgFailed && current.photo ? (
                  <img
                    src={current.photo}
                    alt={current.title}
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ScenicArt className="h-full w-full object-cover" />
                )}
              </div>

              <div className="flex flex-col justify-center gap-3 overflow-y-auto p-6 md:h-[320px] md:p-8">
                <span className="font-mono text-sm text-sky-deep">{current.date}</span>
                <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{current.title}</h3>
                <div className="rounded-xl border border-ink/8 bg-cream/70 p-4">
                  <p className="font-body text-sm leading-relaxed text-ink-soft">{current.description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next controls */}
          <button
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous milestone"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-cream-soft/90 p-2 text-ink-soft shadow-card transition-opacity disabled:opacity-0 md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={active === timeline.length - 1}
            aria-label="Next milestone"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-cream-soft/90 p-2 text-ink-soft shadow-card transition-opacity disabled:opacity-0 md:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* The trail: a hiking-path metaphor connecting each stop */}
        <div className="relative mt-10 px-2 md:mt-12">
          {/* Marker that walks along the trail as the active milestone changes */}
          <motion.div
            className="pointer-events-none absolute -top-11 z-10 flex -translate-x-1/2 flex-col items-center"
            initial={false}
            animate={{ left: `${(active / (timeline.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-1 flex h-12 items-end justify-center"
            >
              <PixelHiker stage={active} size={34} />
            </motion.div>

            {active === timeline.length - 1 && (
              <div aria-hidden="true" className="pointer-events-none absolute -top-2">
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: TRAIL_COLORS[i % TRAIL_COLORS.length],
                      left: 0,
                      top: 0,
                    }}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: Math.cos((i / 6) * Math.PI * 2) * 26,
                      y: Math.sin((i / 6) * Math.PI * 2) * 26 - 10,
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          <svg
            data-testid="trail-path"
            viewBox={`0 0 ${timeline.length * 200} 60`}
            preserveAspectRatio="none"
            className="h-14 w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
                {TRAIL_COLORS.map((color, i) => (
                  <stop key={color} offset={`${(i / (TRAIL_COLORS.length - 1)) * 100}%`} stopColor={color} />
                ))}
              </linearGradient>
            </defs>
            <line
              x1="0"
              y1="30"
              x2={timeline.length * 200}
              y2="30"
              stroke="#243238"
              strokeOpacity="0.08"
              strokeWidth="3"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
            <motion.line
              x1="0"
              y1="30"
              x2={timeline.length * 200}
              y2="30"
              stroke="url(#trailGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={{
                x2: (active / (timeline.length - 1)) * (timeline.length * 200),
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <div className="relative -mt-14 grid" style={{ gridTemplateColumns: `repeat(${timeline.length}, 1fr)` }}>
            {timeline.map((stop, index) => {
              const isDone = index <= active
              return (
                <button
                  key={stop.id}
                  onClick={() => setActive(index)}
                  className="group flex flex-col items-center gap-3 py-1"
                  aria-current={index === active ? 'true' : undefined}
                  aria-label={`${stop.title}, ${stop.date}`}
                >
                  <span
                    className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      index === active
                        ? 'scale-125 border-sky-deep bg-cream-soft shadow-[0_0_0_6px_rgba(108,155,184,0.18)]'
                        : isDone
                          ? 'border-sage-deep bg-sage/40'
                          : 'border-ink/15 bg-cream-soft'
                    }`}
                  >
                    {index === active && <span className="h-2 w-2 rounded-full bg-sky-deep" />}
                  </span>
                  <span
                    className={`hidden text-center font-body text-xs font-semibold sm:block ${
                      index === active ? 'text-ink' : 'text-ink-faint'
                    }`}
                  >
                    {stop.title}
                  </span>
                  <span className="hidden font-mono text-[10px] text-ink-faint sm:block">{stop.date}</span>
                </button>
              )
            })}
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint md:hidden">
          Tap a stop, or swipe, to move along the trail
        </p>
        <p className="mt-6 hidden text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint md:block">
          Use ← / → to walk the trail
        </p>
      </div>
    </section>
  )
})

export default Timeline
