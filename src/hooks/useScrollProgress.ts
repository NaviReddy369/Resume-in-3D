import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ensureGsapSetup } from '@/lib/gsapSetup'
import { useAppStore } from '@/store/useAppStore'

export function useScrollProgress() {
  useEffect(() => {
    ensureGsapSetup()

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        useAppStore.getState().setScrollProgress(self.progress)
      },
    })

    return () => trigger.kill()
  }, [])
}
