import gsap from 'gsap'
import { ensureGsapSetup } from '@/lib/gsapSetup'
import { sections } from '@/data/sections'
import { useAppStore } from '@/store/useAppStore'

interface ProgressRailProps {
  sectionRefs: React.RefObject<HTMLElement | null>[]
}

export function ProgressRail({ sectionRefs }: ProgressRailProps) {
  const currentSectionIndex = useAppStore((s) => s.currentSectionIndex)

  function goTo(index: number) {
    ensureGsapSetup()
    const target = sectionRefs[index]?.current
    if (!target) return
    gsap.to(window, { duration: 1, scrollTo: { y: target, autoKill: true }, ease: 'power2.inOut' })
  }

  return (
    <nav className="progress-rail" aria-label="Section navigation">
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          className={`rail-node${index === currentSectionIndex ? ' active' : ''}`}
          aria-current={index === currentSectionIndex ? 'true' : undefined}
          onClick={() => goTo(index)}
        >
          <span className="rail-index">{section.moduleId}</span>
          <span className="rail-label">{section.label}</span>
        </button>
      ))}
    </nav>
  )
}
