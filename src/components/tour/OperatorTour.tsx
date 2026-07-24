import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ensureGsapSetup } from '@/lib/gsapSetup'
import { useAppStore } from '@/store/useAppStore'
import { sections } from '@/data/sections'
import { tourCaptions } from './tourCaptions'

const TRAVEL_SECONDS = 1.1
const DWELL_SECONDS = 3.2

export function OperatorTour() {
  const tourActive = useAppStore((s) => s.tourActive)
  const setTourActive = useAppStore((s) => s.setTourActive)
  const currentSectionIndex = useAppStore((s) => s.currentSectionIndex)

  useEffect(() => {
    if (!tourActive) return
    ensureGsapSetup()

    const timeline = gsap.timeline({ onComplete: () => setTourActive(false) })

    sections.forEach((section) => {
      const target = document.getElementById(section.id)
      if (!target) return
      timeline.to(window, { duration: TRAVEL_SECONDS, scrollTo: { y: target, autoKill: false }, ease: 'power2.inOut' })
      timeline.to({}, { duration: DWELL_SECONDS })
    })

    // real user input, not the tour's own programmatic scroll (which fires 'scroll', not these events)
    function stopOnInteraction() {
      setTourActive(false)
    }

    window.addEventListener('wheel', stopOnInteraction, { passive: true })
    window.addEventListener('touchstart', stopOnInteraction, { passive: true })
    window.addEventListener('keydown', stopOnInteraction)

    return () => {
      timeline.kill()
      window.removeEventListener('wheel', stopOnInteraction)
      window.removeEventListener('touchstart', stopOnInteraction)
      window.removeEventListener('keydown', stopOnInteraction)
    }
  }, [tourActive, setTourActive])

  return (
    <AnimatePresence>
      {tourActive && (
        <motion.div
          className="tour-caption"
          key={currentSectionIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
        >
          <p className="meta-line">{sections[currentSectionIndex]?.moduleId}</p>
          <p className="body-copy">{tourCaptions[currentSectionIndex]}</p>
          <button type="button" className="tour-exit" onClick={() => setTourActive(false)}>
            Exit tour
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
