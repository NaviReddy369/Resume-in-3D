import { forwardRef } from 'react'
import { SectionShell } from './SectionShell'
import { links } from '@/data/links'

export const BootSection = forwardRef<HTMLElement>(function BootSection(_props, ref) {
  return (
    <SectionShell id="boot" ref={ref} moduleId="SYS/00" label="BOOT">
      <p className="kicker">Naveen Gudimilla</p>
      <h1 className="display-heading">I build the systems organizations run on.</h1>
      <p className="body-copy">
        One person, full stack: software, cloud infrastructure, data platforms, and media — for a nonprofit that runs
        its whole operation on what I ship.
      </p>
      <p className="meta-line">IT &amp; Media Director, Community Matters 2 · Poughkeepsie, NY</p>
      <a className="primary-action" href={`mailto:${links.email}`}>
        Email me
      </a>
    </SectionShell>
  )
})
