import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { bootLines } from './bootLines'

const SESSION_KEY = 'systemsDeckBooted'
const LINE_INTERVAL_MS = 380

export function BootSequence() {
  const bootStatus = useAppStore((s) => s.bootStatus)
  const setBootStatus = useAppStore((s) => s.setBootStatus)
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion)
  const [visibleLines, setVisibleLines] = useState(0)

  function complete() {
    sessionStorage.setItem(SESSION_KEY, '1')
    document.body.style.overflow = ''
    setBootStatus('complete')
  }

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setBootStatus('complete')
      return
    }
    document.body.style.overflow = 'hidden'
    setBootStatus('playing')
    // complete() intentionally omitted from deps — it closes over the initial setBootStatus reference, which is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBootStatus])

  useEffect(() => {
    if (bootStatus !== 'playing') return

    if (prefersReducedMotion) {
      complete()
      return
    }

    if (visibleLines >= bootLines.length) {
      const timeout = setTimeout(complete, 500)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), LINE_INTERVAL_MS)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootStatus, visibleLines, prefersReducedMotion])

  return (
    <motion.div className="boot-sequence" role="status" aria-live="polite" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="boot-lines">
        {bootLines.slice(0, visibleLines).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <button type="button" className="boot-skip" onClick={complete}>
        Skip
      </button>
    </motion.div>
  )
}
