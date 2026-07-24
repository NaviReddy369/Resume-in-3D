export const thirdEyeFeel = {
  moduleId: 'SYS/03.2',
  label: '3RD EYE FEEL',
  kicker: 'Independent SaaS — designed, built, and deployed solo',
  title: '3rd Eye Feel: see beyond the plan',
  summary:
    'AI builds a personalized, step-by-step implementation guide tailored to your vision — built end to end, solo, and live at 3rd-eye-feel.pages.dev.',
  url: 'https://3rd-eye-feel.pages.dev',
  route: '/products/3rd-eye-feel',
  // TODO: Naveen to provide deeper technical/architecture specifics and any usage metrics if this case study should go further than the current high-level framing
  caseStudy: {
    problem:
      "Turning a vision into an actionable plan usually means choosing between generic templates that don't fit, or one-on-one consulting that doesn't scale.",
    constraints: [
      'Solo build, scoped tightly enough to ship without a team',
      'Guidance needed to feel personalized to the vision, not templated, with no human in the loop per user',
    ],
    decisions: [
      "Used AI to generate the step-by-step guide itself, rather than matching users into a fixed set of pre-written plans",
      "Named and framed the product around the outcome — 'see beyond the plan' — rather than the mechanism, keeping the experience focused on the user's vision",
    ],
    architecture:
      "An AI-driven guide generator takes a user's stated vision and produces a personalized, step-by-step implementation plan.",
    outcome: 'Live at 3rd-eye-feel.pages.dev — designed, built, and deployed solo, end to end.',
  },
}
