import { motion } from 'framer-motion'

/**
 * A soft, layered mountain illustration in the site's calming palette.
 * Used as a placeholder in the Hero photo frame — swap the <img> in
 * Hero.jsx for a real photo whenever you like, this component can stay
 * as a fallback or be dropped entirely.
 */
export default function ScenicArt({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="Illustrated mountain range at dawn"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFE2EA" />
          <stop offset="55%" stopColor="#EAE0C6" />
          <stop offset="100%" stopColor="#F3E3B8" />
        </linearGradient>
        <linearGradient id="peakFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9FBFC9" />
          <stop offset="100%" stopColor="#7FA4AE" />
        </linearGradient>
        <linearGradient id="peakMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C9BB8" />
          <stop offset="100%" stopColor="#4E7C97" />
        </linearGradient>
        <linearGradient id="peakNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A7D62" />
          <stop offset="100%" stopColor="#3E5A44" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill="url(#sky)" />

      <motion.circle
        cx="300"
        cy="120"
        r="46"
        fill="#F6F1E7"
        opacity="0.9"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <path
        d="M0 300 L70 210 L130 270 L190 170 L250 260 L320 190 L400 280 L400 500 L0 500 Z"
        fill="url(#peakFar)"
        opacity="0.55"
      />
      <path
        d="M0 360 L60 300 L120 350 L180 280 L240 345 L300 290 L400 360 L400 500 L0 500 Z"
        fill="url(#peakMid)"
        opacity="0.75"
      />
      <path
        d="M0 430 L50 380 L110 420 L170 360 L230 415 L290 370 L400 430 L400 500 L0 500 Z"
        fill="url(#peakNear)"
      />

      {/* Snow caps */}
      <path d="M170 360 L182 372 L194 358 L206 372 L230 415 L110 420 Z" fill="#F6F1E7" opacity="0.85" />
      <path d="M50 380 L62 392 L74 378 L86 392 L110 420 L0 430 L0 400 Z" fill="#F6F1E7" opacity="0.7" />
    </svg>
  )
}
