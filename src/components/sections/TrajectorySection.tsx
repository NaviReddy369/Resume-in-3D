import { forwardRef } from 'react'
import { SectionShell } from './SectionShell'
import { timeline, education, skills } from '@/data/timeline'

export const TrajectorySection = forwardRef<HTMLElement>(function TrajectorySection(_props, ref) {
  return (
    <SectionShell id="trajectory" ref={ref} moduleId="SYS/05" label="TRAJECTORY" align="right">
      <p className="kicker">Career trajectory</p>
      <h2 className="display-heading">Operations, to data engineering, to systems ownership</h2>
      <ol className="timeline-list">
        {timeline.map((era) => (
          <li key={era.id}>
            <p className="meta-line">{era.range}</p>
            <h3>{era.org}</h3>
            <p className="body-copy">{era.role}</p>
            <p className="body-copy">{era.summary}</p>
            {era.bullets && (
              <ul className="bullet-list">
                {era.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      <p className="trajectory-subheading">Education</p>
      <div className="education-list">
        {education.map((entry) => (
          <p key={entry.degree} className="body-copy">
            {entry.degree}, {entry.school} ({entry.range})
          </p>
        ))}
      </div>
      <p className="trajectory-subheading">Skills</p>
      <div className="skills-list">
        {skills.map((skill) => (
          <span key={skill} className="skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </SectionShell>
  )
})
