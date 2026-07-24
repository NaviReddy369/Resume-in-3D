import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { links } from '@/data/links'

interface CaseStudyLayoutProps {
  moduleId: string
  label: string
  hue: number
  children: ReactNode
}

export function CaseStudyLayout({ moduleId, label, hue, children }: CaseStudyLayoutProps) {
  return (
    <div className="case-study" style={{ '--accent': `oklch(68% 0.13 ${hue})` } as CSSProperties}>
      <header className="case-study-header">
        <Link className="case-study-back" to="/">
          ← Back to the deck
        </Link>
        <span className="case-study-module">
          {moduleId} — {label}
        </span>
      </header>
      <main id="main-content" className="case-study-body">
        {children}
      </main>
      <footer className="case-study-footer">
        <a className="primary-action" href={`mailto:${links.email}`}>
          Email me
        </a>
        <a className="secondary-action" href={links.resume} download>
          Resume
        </a>
      </footer>
    </div>
  )
}
