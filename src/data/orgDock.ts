import { orbit } from '@/data/orbit'
import { gnkContinuum } from '@/data/productDetails/gnkContinuum'
import { thirdEyeFeel } from '@/data/productDetails/thirdEyeFeel'

export interface DockEntry {
  id: string
  name: string
  image: string
  kicker: string
  tagline: string
  caseStudy: {
    problem: string
    solution: string
    outcome?: string
  }
  route?: string
  url?: string
  hue: number
}

export const orgDock: DockEntry[] = [
  {
    id: 'cm2',
    name: 'Community Matters 2',
    image: '/bar images/CM2 Logo.png',
    kicker: 'IT & Media Director · Mar 2025–Present',
    tagline: 'Full systems ownership — software, infrastructure, brand',
    caseStudy: {
      problem:
        "CM2 needed one person to own everything from camp operations software to the organization's public-facing brand, with no engineering team and no design team to lean on.",
      solution:
        "Independently architected and built Orbit, CM2's full ERP (staff duty assignment, camp operations, parent portal) on GCP and Firebase, with a BigQuery/Snowflake analytics layer feeding 10+ Tableau dashboards. Also lead brand identity, graphic design, and digital content strategy across web, social, and print.",
      outcome:
        "15+ KPIs unified into one source of truth, stakeholder reporting latency down 40%, and a consistent brand voice across every channel CM2 shows up in.",
    },
    hue: 205,
  },
  {
    id: 'orbit',
    name: 'Orbit',
    image: '/bar images/ORBIT (1).png',
    kicker: 'Flagship system — built solo for Community Matters 2',
    tagline: 'The ERP CM2 runs its camp seasons on',
    caseStudy: {
      problem: orbit.caseStudy.problem,
      solution:
        'Firebase/Firestore for the real-time operational layer, BigQuery + Snowflake for analytics, Tableau on top — architected, built, secured, and operated end to end, solo.',
      outcome: orbit.caseStudy.outcome,
    },
    route: '/orbit',
    hue: 205,
  },
  {
    id: 'hvcs',
    name: 'Hudson Valley Concierge Service',
    image: '/bar images/Hudson Valley - Copy.png',
    kicker: 'Data & Technology Analyst · Apr 2024–Mar 2025',
    tagline: 'First role owning technology end to end',
    caseStudy: {
      problem:
        'Leadership had no self-serve way to see client-interaction data — every report meant a manual export, and there was no internal tooling for operational analytics.',
      solution:
        'Built an AWS reporting pipeline (S3 → Glue Crawler → Athena → Power BI), built Alex, an internal analytics & automation tool, and ran the organization\'s social media campaigning.',
      outcome:
        'Report generation time down 35%, roughly 10 analyst hours saved per week once the Glue crawler schedule was automated.',
    },
    hue: 175,
  },
  {
    id: 'pankids',
    name: 'Pan Kids',
    image: '/bar images/pan kids logo.jpg',
    kicker: 'Ecommerce & social media',
    tagline: 'Online store + campaign, built end to end',
    caseStudy: {
      problem:
        'Pan Kids had no online storefront and no consistent social presence — no way for customers to discover or buy outside word of mouth.',
      solution:
        'Designed and built an ecommerce site end to end, then planned and ran a social media campaign alongside it to drive traffic and brand awareness.',
      outcome:
        'Gave Pan Kids a functioning sales channel and an active social presence where neither existed before.',
    },
    hue: 320,
  },
  {
    id: 'gnk-continuum',
    name: 'GNK Continuum',
    image: '/bar images/logo512.png',
    kicker: 'Independent SaaS — designed, built, and deployed solo',
    tagline: 'Intelligent task automation',
    caseStudy: {
      problem: gnkContinuum.caseStudy.problem,
      solution:
        'AI-driven workflow analysis that adapts to a workflow instead of forcing it into a fixed template, surfacing automation insights for human-AI collaboration rather than a fully autonomous black box.',
      outcome: gnkContinuum.caseStudy.outcome,
    },
    route: '/products/gnk-continuum',
    url: 'https://gnkcontinuum.org',
    hue: 260,
  },
  {
    id: '3rd-eye-feel',
    name: '3rd Eye Feel',
    image: '/bar images/logo.png',
    kicker: 'Independent SaaS — designed, built, and deployed solo',
    tagline: 'See beyond the plan',
    caseStudy: {
      problem: thirdEyeFeel.caseStudy.problem,
      solution:
        "AI generates a personalized, step-by-step implementation guide from a user's stated vision, instead of matching them into fixed templates.",
      outcome: thirdEyeFeel.caseStudy.outcome,
    },
    route: '/products/3rd-eye-feel',
    url: 'https://3rd-eye-feel.pages.dev',
    hue: 260,
  },
]
