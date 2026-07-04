import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Coordinates a full-page scroll-snap layout: tracks which section is
 * active, exposes a way to jump to a section by index/id, and wires up
 * ArrowUp / ArrowDown / Space keyboard navigation between sections.
 */
export function useSectionNav(sectionIds) {
  const containerRef = useRef(null)
  const sectionRefs = useRef({})
  const [activeIndex, setActiveIndex] = useState(0)
  const isProgrammaticScroll = useRef(false)

  const registerSection = useCallback((id) => (node) => {
    if (node) sectionRefs.current[id] = node
  }, [])

  const scrollToIndex = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(sectionIds.length - 1, index))
      const id = sectionIds[clamped]
      const node = sectionRefs.current[id]
      if (node) {
        isProgrammaticScroll.current = true
        node.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActiveIndex(clamped)
        window.setTimeout(() => {
          isProgrammaticScroll.current = false
        }, 700)
      }
    },
    [sectionIds]
  )

  const scrollToId = useCallback(
    (id) => {
      const index = sectionIds.indexOf(id)
      if (index !== -1) scrollToIndex(index)
    },
    [sectionIds, scrollToIndex]
  )

  // Observe which section is currently in view to keep the sidebar in sync
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const id = entry.target.dataset.sectionId
            const index = sectionIds.indexOf(id)
            if (index !== -1) setActiveIndex(index)
          }
        })
      },
      { root: container, threshold: [0.5] }
    )

    Object.values(sectionRefs.current).forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [sectionIds])

  // Global keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (isTyping) return

      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault()
        scrollToIndex(activeIndex + 1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        scrollToIndex(activeIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, scrollToIndex])

  return { containerRef, registerSection, activeIndex, scrollToIndex, scrollToId }
}
