import React from 'react'
import { sections } from '../data/experience'

type Props = {
  activeIndex: number
  hasEntered: boolean
  onEnter: () => void
  onSelect: (index: number) => void
  onNext: () => void
  onPrev: () => void
}

export default function ExperienceOverlay({
  activeIndex,
  hasEntered,
  onEnter,
  onSelect,
  onNext,
  onPrev
}: Props) {
  const active = sections[activeIndex]

  return (
    <div className="experience-shell">
      <div className="experience-backdrop" />

      <header className="topbar">
        <div className="brand-lockup">
          <span className="brand-kicker">Resume in 3D</span>
          <span className="brand-title">Spatial Portfolio Headquarters</span>
        </div>
        <div className="topbar-meta">
          <span>Immersive narrative</span>
          <span>Curated exploration</span>
        </div>
      </header>

      <aside className="progress-rail" aria-label="Portfolio sections">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={`rail-node${index === activeIndex ? ' active' : ''}`}
            onClick={() => onSelect(index)}
          >
            <span className="rail-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="rail-copy">
              <span>{section.label}</span>
              <small>{section.metric}</small>
            </span>
          </button>
        ))}
      </aside>

      <main className="story-panel">
        <div className="story-chip" style={{ color: active.accent, borderColor: `${active.accent}66` }}>
          {active.eyebrow}
        </div>
        <p className="story-count">
          {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </p>
        <h1>{active.title}</h1>
        <p className="story-summary">{active.summary}</p>

        <div className="story-metric">
          <span>Priority signal</span>
          <strong>{active.metric}</strong>
        </div>

        <div className="story-points">
          {active.bullets.map((bullet) => (
            <div key={bullet} className="story-point">
              <span className="point-dot" style={{ background: active.accent }} />
              <p>{bullet}</p>
            </div>
          ))}
        </div>

        <div className="story-actions">
          {!hasEntered ? (
            <button type="button" className="primary-action" onClick={onEnter}>
              Enter experience
            </button>
          ) : (
            <>
              <button type="button" className="secondary-action" onClick={onPrev}>
                Previous
              </button>
              <button type="button" className="primary-action" onClick={onNext}>
                Next station
              </button>
            </>
          )}
        </div>

        <div className="story-note">
          <span>Navigation</span>
          <p>Use the rail to jump between stations. The camera is intentionally guided to keep the story sharp.</p>
        </div>
      </main>

      <section className="bottom-dock">
        <div>
          <span className="dock-label">Current station</span>
          <strong>{active.label}</strong>
        </div>
        <div>
          <span className="dock-label">Design intent</span>
          <strong>Memorable, premium, high-signal</strong>
        </div>
        <div>
          <span className="dock-label">Primary CTA</span>
          <strong>Invite the next conversation</strong>
        </div>
      </section>
    </div>
  )
}
