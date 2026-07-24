import { forwardRef } from 'react'
import { SectionShell } from './SectionShell'
import { links } from '@/data/links'

export const ConnectSection = forwardRef<HTMLElement>(function ConnectSection(_props, ref) {
  return (
    <SectionShell id="connect" ref={ref} moduleId="SYS/06" label="CONNECT">
      <p className="kicker">Ready when you are</p>
      <h2 className="display-heading">Let's talk about what you're building.</h2>
      <a className="primary-action" href={`mailto:${links.email}`}>
        {links.email}
      </a>
      <p className="meta-line">{links.phone}</p>
      <div className="connect-links">
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={links.behance} target="_blank" rel="noreferrer">
          Behance
        </a>
        <a href={links.resume} download>
          Resume
        </a>
      </div>
    </SectionShell>
  )
})
