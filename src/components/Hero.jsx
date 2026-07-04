import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { profile } from '../data/content'
import ScenicArt from './ScenicArt'
import TerminalIntro from './TerminalIntro'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = forwardRef(function Hero({ onNavigateNext }, ref) {
  const [imgFailed, setImgFailed] = useState(false)
  const [photoRevealed, setPhotoRevealed] = useState(false)

  return (
    <section
      ref={ref}
      data-section-id="hero"
      className="snap-section relative flex min-h-screen w-full items-center px-5 pb-28 pt-20 md:px-16 md:py-24 md:pl-44 md:pr-12 lg:pl-56 lg:pr-20"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <motion.p variants={item} className="font-mono text-xs uppercase tracking-[0.3em] text-sage-deep">
            Portfolio · {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 font-display text-5xl font-semibold leading-[0.95] text-ink text-balance sm:text-7xl md:text-8xl"
          >
            {profile.handle}
          </motion.h1>

          <motion.div variants={item} className="mt-8">
            <TerminalIntro onPhotoCommand={() => setPhotoRevealed(true)} />
          </motion.div>
        </div>

        <motion.div variants={item} className="relative mx-auto aspect-[4/5] w-full max-w-sm">
          <motion.div
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky/20 via-gold/10 to-sage/20 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: photoRevealed ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-soft"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={
              photoRevealed
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.96 }
            }
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {!imgFailed ? (
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <ScenicArt className="h-full w-full object-cover" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={onNavigateNext}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-faint md:flex"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  )
})

export default Hero
