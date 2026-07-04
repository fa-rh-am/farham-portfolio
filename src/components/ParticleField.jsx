import { useEffect, useRef } from 'react'

const COLORS = ['rgba(108,155,184,0.35)', 'rgba(137,169,142,0.35)', 'rgba(227,182,85,0.35)']

/**
 * A quiet field of drifting dust-mote particles. Purely decorative,
 * disabled entirely for users who prefer reduced motion.
 */
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let particles = []
    let width = 0
    let height = 0

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    const createParticles = () => {
      const count = Math.min(42, Math.floor((width * height) / 45000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.15 + 0.03,
        drift: Math.random() * 0.4 - 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift * 0.2
        if (p.y < -10) p.y = height + 10
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
