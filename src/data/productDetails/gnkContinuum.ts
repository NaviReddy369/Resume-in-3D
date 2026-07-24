export const gnkContinuum = {
  moduleId: 'SYS/03.1',
  label: 'GNK CONTINUUM',
  kicker: 'Independent SaaS — designed, built, and deployed solo',
  title: 'GNK Continuum: intelligent task automation',
  summary:
    'AI workflow analysis, automation insights, and human-AI collaboration — built end to end, solo, and live at gnkcontinuum.org.',
  url: 'https://gnkcontinuum.org',
  route: '/products/gnk-continuum',
  // TODO: Naveen to provide deeper technical/architecture specifics and any usage metrics if this case study should go further than the current high-level framing
  caseStudy: {
    problem:
      "Repetitive, multi-step workflows pile up because automating them properly usually takes as long as just doing them by hand — so they never get automated at all.",
    constraints: [
      'Built and shipped solo, alongside a full-time role',
      'Had to work across workflows the tool has never seen before, not just a fixed template library',
    ],
    decisions: [
      'Centered the product on AI-driven workflow analysis rather than a fixed rules engine, so it adapts to a workflow instead of forcing the workflow into a template',
      'Framed the product around human-AI collaboration — surfacing automation insights for a person to review and approve, not a fully autonomous black box',
    ],
    architecture:
      'An AI workflow analysis layer ingests a described workflow, surfaces automation insights, and hands off actionable next steps for human-AI collaboration.',
    outcome: 'Live at gnkcontinuum.org — designed, built, and deployed solo, end to end.',
  },
}
