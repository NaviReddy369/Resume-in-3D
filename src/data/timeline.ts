export interface TimelineEra {
  id: string
  range: string
  org: string
  role: string
  summary: string
  bullets?: string[]
}

export const timeline: TimelineEra[] = [
  {
    id: 'virtusa',
    range: 'Jul 2019 – Dec 2022',
    org: 'Virtusa (Google client)',
    role: 'Project Billing Specialist, BU Operations PMO — Hyderabad',
    summary: 'Owned end-to-end billing on a $12M+/month Google portfolio across US, EMEA, and APAC.',
    bullets: [
      'Insights influencing $1.5M in cost optimization',
      'Automated workflows with UiPath, Power Automate, and Excel macros — manual billing time down 20%',
      'Power BI + SQL reporting, Oracle Fusion ERP, Azure DevOps alignment',
      'Where I taught myself automation to fix slow manual processes — and never looked back',
    ],
  },
  {
    id: 'hvcs',
    range: 'Apr 2024 – Mar 2025',
    org: 'Hudson Valley Concierge Service',
    role: 'Data & Technology Analyst',
    summary: 'First role owning technology end to end — pipeline to dashboard.',
  },
  {
    id: 'cm2',
    range: 'Mar 2025 – Present',
    org: 'Community Matters 2',
    role: 'IT & Media Director',
    summary: 'The arc: operations, to data engineering, to full systems ownership.',
  },
]

export const education = [
  { degree: 'MS, Information Technology', school: 'Marist University', range: '2023 – 2025' },
  { degree: 'MBA, Finance', school: 'Osmania University', range: '2017 – 2019' },
  { degree: 'BBA', school: "St. Joseph's Degree & PG College", range: '2014 – 2017' },
]

export const skills = [
  'Python',
  'SQL',
  'ETL & data modeling',
  'GCP (BigQuery, Cloud Storage, Firebase)',
  'AWS (S3, Glue, Athena)',
  'Azure',
  'Snowflake',
  'Tableau',
  'Power BI',
  'Google Analytics',
  'UiPath',
  'Power Automate',
  'Oracle Fusion ERP',
  'Azure DevOps',
  'Confluence',
  'Brand & design systems',
  'Graphic design',
  'Web & social strategy',
]
