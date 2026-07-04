import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowUpRight, Send } from 'lucide-react'
import { contact, profile } from '../data/content'

const Contact = forwardRef(function Contact(_, ref) {
  return (
    <section
      ref={ref}
      data-section-id="contact"
      className="snap-section relative flex min-h-screen w-full flex-col justify-center px-5 pb-28 pt-20 md:px-16 md:py-24 md:pl-44 md:pr-12 lg:pl-56 lg:pr-20"
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sage-deep">The summit</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <Send size={26} strokeWidth={1.6} className="text-sky-deep" />
          <h2 className="font-display text-5xl font-semibold text-ink md:text-6xl">Let's talk</h2>
        </div>

        <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
          {contact.message}
        </p>

        <motion.a
          href={`mailto:${contact.email}`}
          whileHover={{ y: -3 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-sky-deep"
        >
          <Mail size={16} />
          {contact.email}
        </motion.a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-cream-soft px-5 py-2.5 font-body text-sm font-medium text-ink-soft shadow-card transition-colors hover:border-sky/40 hover:text-sky-deep"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs text-ink-faint">
          {profile.handle} · built with React &amp; a quiet love of mountains
        </p>
      </div>
    </section>
  )
})

export default Contact
