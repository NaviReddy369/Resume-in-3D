import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'
import { CaseStudyBlock } from '@/components/caseStudy/CaseStudyBlock'
import { orbit } from '@/data/orbit'
import { sections } from '@/data/sections'

const orbitMeta = sections.find((section) => section.id === 'orbit')!

export default function OrbitCaseStudy() {
  return (
    <CaseStudyLayout moduleId={orbit.moduleId} label={orbit.label} hue={orbitMeta.hue}>
      <p className="kicker">{orbit.kicker}</p>
      <h1 className="display-heading">{orbit.title}</h1>
      <p className="body-copy">{orbit.summary}</p>

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

      <CaseStudyBlock heading="Problem">
        <p className="body-copy">{orbit.caseStudy.problem}</p>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Constraints">
        <ul className="bullet-list">
          {orbit.caseStudy.constraints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Decisions">
        <ul className="bullet-list">
          {orbit.caseStudy.decisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Architecture">
        <p className="body-copy">{orbit.caseStudy.architecture}</p>
      </CaseStudyBlock>

      <CaseStudyBlock heading="Outcome">
        <p className="body-copy">{orbit.caseStudy.outcome}</p>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
