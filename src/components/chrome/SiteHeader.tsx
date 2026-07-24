import { links } from '@/data/links'

export function SiteHeader() {
  return (
    <header className="site-header">
      <span className="brand-mark">NAVEEN GUDIMILLA</span>
      <a className="header-resume" href={links.resume} download>
        Resume
      </a>
    </header>
  )
}
