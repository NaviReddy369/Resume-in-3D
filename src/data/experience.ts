export type ExperienceSection = {
  id: string
  label: string
  title: string
  eyebrow: string
  summary: string
  bullets: string[]
  metric: string
  accent: string
  cameraPosition: [number, number, number]
  lookAt: [number, number, number]
  stationPosition: [number, number, number]
}

export const sections: ExperienceSection[] = [
  {
    id: 'arrival',
    label: 'Arrival',
    title: 'A spatial resume built like a flagship product.',
    eyebrow: 'Founder-grade first impression',
    summary:
      'The opening moment frames the portfolio as a controlled environment where product thinking, design direction, and engineering execution operate as one system.',
    bullets: [
      'Cinematic landing with immediate orientation',
      'Deliberate visual hierarchy instead of generic hero copy',
      'Built to make a recruiter stop and explore'
    ],
    metric: '10s impact',
    accent: '#f97316',
    cameraPosition: [0, 2.6, 10.5],
    lookAt: [0, 1.8, 0],
    stationPosition: [0, 1.4, -1]
  },
  {
    id: 'work',
    label: 'Work',
    title: 'Projects presented as proof, not as a gallery.',
    eyebrow: 'Execution zone',
    summary:
      'Each project should read like a product decision: what mattered, what changed, and what measurable signal it created.',
    bullets: [
      'Featured case studies with decision framing',
      'Impact metrics anchored in business or product outcomes',
      'Structured for fast scanning by hiring teams'
    ],
    metric: '03 case studies',
    accent: '#38bdf8',
    cameraPosition: [7.5, 2.4, 5.5],
    lookAt: [7.2, 1.8, -2],
    stationPosition: [7.5, 1.3, -2.2]
  },
  {
    id: 'systems',
    label: 'Systems',
    title: 'Design systems, engineering standards, and technical range.',
    eyebrow: 'Capability zone',
    summary:
      'This area demonstrates how the work scales: interface systems, architecture discipline, performance thinking, and implementation rigor.',
    bullets: [
      'Stack fluency shown through systems, not tag clouds',
      'Performance and maintainability treated as product features',
      'Complexity explained with clarity'
    ],
    metric: 'Full-stack depth',
    accent: '#a3e635',
    cameraPosition: [-7.2, 2.5, 5.8],
    lookAt: [-7.2, 1.7, -2.4],
    stationPosition: [-7.2, 1.3, -2.2]
  },
  {
    id: 'proof',
    label: 'Proof',
    title: 'Signal stacked through outcomes, trust, and operating style.',
    eyebrow: 'Credibility zone',
    summary:
      'Rather than asking the visitor to infer quality, this station makes confidence explicit with trust markers, delivery evidence, and reputation cues.',
    bullets: [
      'Testimonials or endorsements with context',
      'Delivery velocity and ownership patterns',
      'Visible proof of craft across product and code'
    ],
    metric: 'Trust stack',
    accent: '#facc15',
    cameraPosition: [0, 2.4, -7.6],
    lookAt: [0, 1.6, -11],
    stationPosition: [0, 1.3, -11]
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'End the journey with a clear invitation to act.',
    eyebrow: 'Conversion zone',
    summary:
      'The final station should turn interest into action with a direct path to connect, collaborate, or schedule the next conversation.',
    bullets: [
      'One primary CTA with zero ambiguity',
      'Secondary channels kept accessible but quiet',
      'Confident close instead of passive footer links'
    ],
    metric: '1 clear CTA',
    accent: '#fb7185',
    cameraPosition: [0, 2.2, 2.5],
    lookAt: [0, 1.4, 6.4],
    stationPosition: [0, 1.2, 6.4]
  }
]
