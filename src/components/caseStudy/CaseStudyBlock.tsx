import type { ReactNode } from 'react'

interface CaseStudyBlockProps {
  heading: string
  children: ReactNode
}

export function CaseStudyBlock({ heading, children }: CaseStudyBlockProps) {
  return (
    <section className="case-study-block">
      <h2 className="case-study-block-heading">{heading}</h2>
      {children}
    </section>
  )
}
