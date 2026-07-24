import type { NavigateFunction } from 'react-router-dom'
import { sections } from '@/data/sections'
import { products } from '@/data/products'
import { orbit } from '@/data/orbit'
import { links } from '@/data/links'

export interface PaletteActionContext {
  navigate: NavigateFunction
  pathname: string
}

export interface PaletteAction {
  id: string
  label: string
  hint?: string
  group: 'Navigate' | 'Projects' | 'Actions'
  perform: (ctx: PaletteActionContext) => void
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function goToSection(sectionId: string, { navigate, pathname }: PaletteActionContext) {
  if (pathname !== '/') {
    navigate('/')
    // give HomeRoute a tick to mount before the target section exists in the DOM
    setTimeout(() => scrollToSection(sectionId), 80)
  } else {
    scrollToSection(sectionId)
  }
}

export const navigateActions: PaletteAction[] = sections.map((section) => ({
  id: `nav-${section.id}`,
  label: `View ${section.label}`,
  hint: section.moduleId,
  group: 'Navigate',
  perform: (ctx) => goToSection(section.id, ctx),
}))

export const projectActions: PaletteAction[] = [
  {
    id: 'project-orbit',
    label: 'Open Orbit case study',
    hint: orbit.route,
    group: 'Projects',
    perform: ({ navigate }) => navigate(orbit.route),
  },
  ...products
    .filter((product) => product.url)
    .map(
      (product): PaletteAction => ({
        id: `project-${product.id}`,
        label: `Open ${product.name} ↗`,
        hint: product.url.replace(/^https?:\/\//, ''),
        group: 'Projects',
        perform: () => window.open(product.url, '_blank', 'noopener,noreferrer'),
      })
    ),
]

export const commandActions: PaletteAction[] = [
  {
    id: 'action-email',
    label: `Email ${links.email}`,
    group: 'Actions',
    perform: () => {
      window.location.href = `mailto:${links.email}`
    },
  },
  {
    id: 'action-resume',
    label: 'Download resume',
    group: 'Actions',
    perform: () => {
      const anchor = document.createElement('a')
      anchor.href = links.resume
      anchor.download = ''
      anchor.click()
    },
  },
  {
    id: 'action-github',
    label: 'Open GitHub',
    group: 'Actions',
    perform: () => window.open(links.github, '_blank', 'noopener,noreferrer'),
  },
  {
    id: 'action-linkedin',
    label: 'Open LinkedIn',
    group: 'Actions',
    perform: () => window.open(links.linkedin, '_blank', 'noopener,noreferrer'),
  },
  {
    id: 'action-behance',
    label: 'Open Behance',
    group: 'Actions',
    perform: () => window.open(links.behance, '_blank', 'noopener,noreferrer'),
  },
]

export const allPaletteActions: PaletteAction[] = [...navigateActions, ...projectActions, ...commandActions]
