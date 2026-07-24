export const orbit = {
  moduleId: 'SYS/01',
  label: 'ORBIT',
  kicker: 'Flagship system — Community Matters 2 · Mar 2025–Present',
  title: 'Orbit: the ERP Community Matters 2 runs on',
  summary:
    'Independently architected, developed, and deployed a full custom ERP — staff duty assignment automation, camp operations management, and a parent portal serving families every camp season.',
  bullets: [
    'Sole owner of all technology: software, cloud infrastructure, security, and data platforms across GCP, AWS, Snowflake, and Firebase',
    'Analytics foundation built from scratch — SQL models on BigQuery and Snowflake unify Firebase Firestore and Cloud Storage into a single source of truth across 15+ KPIs',
    '10+ Tableau dashboards for enrollment, engagement, and outcomes — stakeholder reporting latency down 40%',
    'GCP ETL workflows (Cloud Storage, BigQuery scheduled queries, Python) running at 99%+ data quality',
    'Snowflake-to-Tableau middleware integration cut dashboard load times by 35%',
  ],
  metric: { value: '15+', label: 'KPIs unified into one source of truth' },
  secondaryMetric: { value: '−40%', label: 'stakeholder reporting latency' },
  route: '/orbit',
  caseStudy: {
    problem:
      "CM2's camp operations — staff duty assignment, camp logistics, and family-facing communication — had no dedicated system built for them, and no unified analytics layer connecting operational data to reporting the organization could act on.",
    constraints: [
      'One person to design, build, deploy, secure, and operate the entire stack — no engineering team, no ops team',
      'Real families and real camp seasons depending on the system working correctly the first time',
      'Multiple cloud platforms already in play (GCP, Firebase) to unify rather than replace',
    ],
    decisions: [
      'Firebase/Firestore for the operational application layer (real-time, low-ops), BigQuery + Snowflake for the analytics layer — rather than forcing one platform to do both jobs',
      'The parent portal built as a first-class module, not an afterthought, since family trust depends on it working every season',
      'ETL automated end to end (Cloud Storage, BigQuery scheduled queries, Python) instead of manual exports, so the 99%+ data quality bar holds without ongoing manual intervention',
    ],
    architecture:
      'GCP + Firebase power the operational ERP (duty assignment, camp ops, parent portal). Cloud Storage and BigQuery scheduled queries (Python) handle ETL into Snowflake, the analytics warehouse. Tableau sits on top as the dashboard layer, with a Snowflake–Tableau middleware integration built to cut load times.',
    outcome:
      '15+ KPIs unified into a single source of truth, 10+ Tableau dashboards live across enrollment, engagement, and outcomes reporting, stakeholder reporting latency down 40%, dashboard load times down 35%, ETL holding at 99%+ data quality.',
  },
}
