export const alex = {
  moduleId: 'SYS/03.3',
  label: 'ALEX',
  kicker: 'Built at Hudson Valley Concierge Service',
  title: 'Alex: internal analytics & automation',
  summary: 'An internal tool for operational analytics and automation, built alongside the AWS reporting pipeline at HVCS.',
  url: '',
  route: '/products/alex',
  // TODO: Naveen — this case study is intentionally high-level since specific problem framing, architecture, and outcome metrics for Alex weren't provided.
  // Confirm these and I'll flesh the case study out to match Orbit's level of detail.
  caseStudy: {
    problem:
      'Built alongside the AWS reporting pipeline (SYS/02) to extend operational analytics and automation capability internally at HVCS.',
    constraints: ['Built and maintained solo, alongside full-time pipeline and reporting work'],
    decisions: [
      "Built in-house rather than adopting a third-party tool, keeping it tailored to HVCS's specific reporting and automation needs",
    ],
    architecture:
      'Capability areas: operational analytics and workflow automation, built to complement the AWS-based reporting pipeline (S3, Glue Crawler, Athena, Power BI).',
    outcome: 'Used internally at HVCS.',
  },
}
