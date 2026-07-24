import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { SectionShell } from './SectionShell'
import { orbit } from '@/data/orbit'

export const OrbitSection = forwardRef<HTMLElement>(function OrbitSection(_props, ref) {
  return (
    <SectionShell id="orbit" ref={ref} moduleId={orbit.moduleId} label={orbit.label} align="right">
      <p className="kicker">{orbit.kicker}</p>
      <h2 className="display-heading">{orbit.title}</h2>
      <p className="body-copy">{orbit.summary}</p>
      <ul className="bullet-list">
        {orbit.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="metric-row">
        <div>
          <strong>{orbit.metric.value}</strong>
          <span>{orbit.metric.label}</span>
        </div>
        <div>
          <strong>{orbit.secondaryMetric.value}</strong>
          <span>{orbit.secondaryMetric.label}</span>
        </div>
      </div>
      <Link className="secondary-action" to={orbit.route}>
        Open case study →
      </Link>
    </SectionShell>
  )
})
