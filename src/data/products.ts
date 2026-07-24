export interface Product {
  id: string
  name: string
  url: string
  tagline: string
  description: string
  route: string
}

export const products: Product[] = [
  {
    id: 'gnk-continuum',
    name: 'GNK Continuum',
    url: 'https://gnkcontinuum.org',
    tagline: 'Intelligent task automation',
    description:
      'AI workflow analysis, automation insights, and human-AI collaboration — designed, built, and deployed solo, end to end.',
    route: '/products/gnk-continuum',
  },
  {
    id: '3rd-eye-feel',
    name: '3rd Eye Feel',
    url: 'https://3rd-eye-feel.pages.dev',
    tagline: 'See beyond the plan',
    description:
      'AI builds a personalized, step-by-step implementation guide tailored to your vision — designed, built, and deployed solo, end to end.',
    route: '/products/3rd-eye-feel',
  },
  {
    id: 'alex',
    name: 'Alex',
    url: '',
    tagline: 'Internal analytics & automation',
    // TODO: Naveen to provide further specifics on Alex's capabilities for the full case study
    description:
      'Built at Hudson Valley Concierge Service — an internal tool for operational analytics and automation.',
    route: '/products/alex',
  },
]
