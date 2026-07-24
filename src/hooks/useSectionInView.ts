import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useSectionInView(sectionRefs: React.RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!mostVisible) return

        const index = sectionRefs.findIndex((ref) => ref.current === mostVisible.target)
        if (index !== -1) {
          useAppStore.getState().setCurrentSectionIndex(index)
        }
      },
      { threshold: [0.4, 0.6] }
    )

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [sectionRefs])
}
