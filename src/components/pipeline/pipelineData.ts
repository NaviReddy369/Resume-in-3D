export interface PipelineNodeData {
  id: string
  label: string
  what: string
  decision: string
  x: number
  y: number
}

export interface PipelineArchitecture {
  id: string
  name: string
  nodes: PipelineNodeData[]
}

export const architectures: PipelineArchitecture[] = [
  {
    id: 'aws',
    name: 'Hudson Valley Concierge Service — AWS',
    nodes: [
      {
        id: 's3',
        label: 'S3',
        what: 'Raw client-interaction records land here as they arrive.',
        decision: 'Decoupled storage from compute, so schema changes never require a migration.',
        x: 8,
        y: 50,
      },
      {
        id: 'glue',
        label: 'Glue Crawler',
        what: 'Scans S3 and keeps the schema catalog current automatically.',
        decision:
          'Automating the crawler schedule turned a manual weekly chore into a background job — about 10 analyst hours saved per week.',
        x: 36,
        y: 50,
      },
      {
        id: 'athena',
        label: 'Athena',
        what: 'Serverless SQL directly over the S3 data via the Glue catalog.',
        decision: 'Chose query-on-demand over a standing warehouse — query volume never justified always-on infrastructure.',
        x: 64,
        y: 50,
      },
      {
        id: 'powerbi',
        label: 'Power BI',
        what: 'Leadership dashboards built directly on Athena queries.',
        decision: 'Pointing Power BI straight at Athena instead of manual exports cut report generation time by 35%.',
        x: 92,
        y: 50,
      },
    ],
  },
  {
    id: 'gcp',
    name: 'Community Matters 2 — GCP',
    nodes: [
      {
        id: 'firebase',
        label: 'Firebase',
        what: 'Firestore holds the live operational data — duty assignments, camp ops, the parent portal.',
        decision:
          'Chose Firebase for the operational layer because it is real-time and low-ops, leaving the analytics layer free to be optimized separately.',
        x: 8,
        y: 50,
      },
      {
        id: 'storage',
        label: 'Cloud Storage',
        what: 'Exported operational data lands here as a staging layer before transformation.',
        decision: 'Decoupling staging from the live database means ETL runs never touch production load.',
        x: 36,
        y: 50,
      },
      {
        id: 'bigquery',
        label: 'BigQuery (scheduled queries)',
        what: 'Python-orchestrated scheduled queries transform and load data into the warehouse.',
        decision: 'Automating this end to end is what holds the 99%+ data quality bar without ongoing manual intervention.',
        x: 64,
        y: 50,
      },
      {
        id: 'tableau',
        label: 'Tableau',
        what: 'Where enrollment, engagement, and outcomes reporting live — 10+ dashboards.',
        decision: 'Automating everything upstream is what keeps 15+ KPIs traceable to a single source of truth.',
        x: 92,
        y: 50,
      },
    ],
  },
]
