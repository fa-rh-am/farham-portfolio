import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { skills } from '../data/content'

const SKILL_GROUPS = [
  { key: 'languages', label: 'Languages', accent: 'sky' },
  { key: 'frontend', label: 'Frontend', accent: 'sage' },
  { key: 'backend', label: 'Backend', accent: 'gold' },
  { key: 'tools', label: 'Tools', accent: 'sky' },
]

const accentClasses = {
  sky: 'border-sky/30 bg-sky/10 text-sky-deep',
  sage: 'border-sage/30 bg-sage/10 text-sage-deep',
  gold: 'border-gold/30 bg-gold/10 text-gold-deep',
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const pill = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

const About = forwardRef(function About(_, ref) {
  return (
    <section
      ref={ref}
      data-section-id="about"
      className="snap-section relative flex min-h-screen w-full flex-col justify-center px-5 pb-28 pt-20 md:px-16 md:py-24 md:pl-44 md:pr-12 lg:pl-56 lg:pr-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sage-deep">Who's behind the code</p>
        <div className="mt-2 flex items-center gap-3">
          <Sparkles size={28} strokeWidth={1.6} className="text-sky-deep" />
          <h2 className="font-display text-5xl font-semibold text-ink md:text-6xl">About</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <p className="font-body text-lg leading-relaxed text-ink-soft">
              I'm a developer who likes things to work quietly and well — code that reads clearly,
              interfaces that don't get in the way, and problems that are actually worth solving.
            </p>
            <p className="font-body text-lg leading-relaxed text-ink-soft">
              Outside of a text editor, I'm usually somewhere outdoors, chasing a good view or a new
              place. I think the same patience that makes a long hike worthwhile also makes good
              software: small, deliberate steps, taken consistently, toward something worth reaching.
            </p>
            <p className="font-body text-lg leading-relaxed text-ink-soft">
              I care about craft — in a well-structured API as much as in a well-composed photo.
            </p>
          </div>

          <div className="space-y-6">
            {SKILL_GROUPS.map((group) => (
              <div key={group.key}>
                <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-ink-faint">
                  {group.label}
                </h3>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {skills[group.key].map((skill) => (
                    <motion.span
                      key={skill}
                      variants={pill}
                      className={`rounded-full border px-4 py-1.5 font-body text-sm font-medium ${accentClasses[group.accent]}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default About
