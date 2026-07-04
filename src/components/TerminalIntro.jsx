import { useEffect, useRef, useState } from 'react'
import { terminalLines } from '../data/content'

const CHAR_DELAY_COMMAND = 55
const CHAR_DELAY_OUTPUT = 14
const LINE_PAUSE = 380

/**
 * A small terminal window that types itself out line by line — a
 * developer-flavored alternative to a plain bio paragraph. Once it
 * reaches the "open photo.jpg" command, it calls onPhotoCommand() so
 * the hero photo can reveal itself in sync.
 */
export default function TerminalIntro({ onPhotoCommand }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [done, setDone] = useState(false)
  const firedPhotoCue = useRef(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion.current) {
      setLineIndex(terminalLines.length - 1)
      setCharCount(terminalLines[terminalLines.length - 1].text.length)
      setDone(true)
      onPhotoCommand?.()
      return
    }

    let cancelled = false

    const typeLine = (li) => {
      if (cancelled) return
      if (li >= terminalLines.length) {
        setDone(true)
        return
      }
      const line = terminalLines[li]
      const delay = line.type === 'command' ? CHAR_DELAY_COMMAND : CHAR_DELAY_OUTPUT

      let ci = 0
      const step = () => {
        if (cancelled) return
        ci += 1
        setCharCount(ci)
        if (ci >= line.text.length) {
          if (line.type === 'command' && line.text.startsWith('open photo') && !firedPhotoCue.current) {
            firedPhotoCue.current = true
            onPhotoCommand?.()
          }
          window.setTimeout(() => {
            if (cancelled) return
            setLineIndex(li + 1)
            setCharCount(0)
            typeLine(li + 1)
          }, LINE_PAUSE)
          return
        }
        window.setTimeout(step, delay)
      }
      step()
    }

    typeLine(0)
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-soft">
      <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-sky/70" />
        <span className="ml-2 font-mono text-xs text-cream/40">whoami.sh</span>
      </div>

      <div className="min-h-[220px] p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {terminalLines.slice(0, lineIndex).map((line, i) => (
          <TerminalLine key={i} line={line} text={line.text} />
        ))}

        {!done && lineIndex < terminalLines.length && (
          <TerminalLine
            line={terminalLines[lineIndex]}
            text={terminalLines[lineIndex].text.slice(0, charCount)}
            showCursor
          />
        )}

        {done && (
          <div className="flex items-center gap-1 text-sage/70">
            <span>$</span>
            <span className="inline-block h-4 w-2 animate-pulse bg-gold/70" />
          </div>
        )}
      </div>
    </div>
  )
}

function TerminalLine({ line, text, showCursor }) {
  if (line.type === 'command') {
    return (
      <p className="text-cream/90">
        <span className="text-sage/80">$</span> {text}
        {showCursor && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-gold/70 align-middle" />}
      </p>
    )
  }
  return (
    <p className="pl-4 text-sky-100/70" style={{ color: '#CFE2EA' }}>
      {text}
      {showCursor && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-gold/70 align-middle" />}
    </p>
  )
}
