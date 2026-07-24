import { forwardRef, type ReactNode } from 'react'

interface SectionShellProps {
  id: string
  moduleId: string
  label: string
  align?: 'left' | 'right'
  wide?: boolean
  children: ReactNode
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(function SectionShell(
  { id, moduleId, label, align = 'left', wide = false, children },
  ref
) {
  return (
    <section id={id} ref={ref} className={`system-section align-${align}`} aria-label={`${moduleId} ${label}`}>
      <div className={`section-content${wide ? ' wide' : ''}`}>
        <p className="module-id">
          {moduleId} — {label}
        </p>
        {children}
      </div>
    </section>
  )
})
