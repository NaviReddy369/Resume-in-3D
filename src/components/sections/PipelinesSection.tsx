import { forwardRef } from 'react'
import { SectionShell } from './SectionShell'
import { PipelineDiagram } from '@/components/pipeline/PipelineDiagram'
import { pipelines } from '@/data/pipelines'

export const PipelinesSection = forwardRef<HTMLElement>(function PipelinesSection(_props, ref) {
  return (
    <SectionShell id="pipelines" ref={ref} moduleId={pipelines.moduleId} label={pipelines.label} wide>
      <p className="kicker">{pipelines.kicker}</p>
      <h2 className="display-heading">{pipelines.title}</h2>
      <p className="body-copy">{pipelines.summary}</p>
      <ul className="bullet-list">
        {pipelines.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="metric-row">
        <div>
          <strong>{pipelines.metric.value}</strong>
          <span>{pipelines.metric.label}</span>
        </div>
        <div>
          <strong>{pipelines.secondaryMetric.value}</strong>
          <span>{pipelines.secondaryMetric.label}</span>
        </div>
      </div>
      <PipelineDiagram />
    </SectionShell>
  )
})
