import { forwardRef } from 'react'
import { SectionShell } from './SectionShell'
import { signal } from '@/data/signal'

export const SignalSection = forwardRef<HTMLElement>(function SignalSection(_props, ref) {
  return (
    <SectionShell id="signal" ref={ref} moduleId={signal.moduleId} label={signal.label}>
      <p className="kicker">{signal.kicker}</p>
      <h2 className="display-heading">{signal.title}</h2>
      <p className="body-copy">{signal.summary}</p>
      <p className="body-copy">{signal.exploration}</p>
      <a className="secondary-action" href={signal.behance} target="_blank" rel="noreferrer">
        View Behance →
      </a>
    </SectionShell>
  )
})
