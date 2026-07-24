import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { orgDock } from '@/data/orgDock'

export function OrgDock() {
  const [openId, setOpenId] = useState<string | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openId) return

    function onPointerDown(event: PointerEvent) {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setOpenId(null)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenId(null)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openId])

  return (
    <div className="org-dock" ref={dockRef} role="toolbar" aria-label="Organizations and products I've built for">
      {orgDock.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            className="org-dock-item"
            key={item.id}
            style={{ '--dock-hue': item.hue } as CSSProperties}
          >
            <button
              type="button"
              className="org-dock-icon"
              aria-expanded={isOpen}
              aria-label={item.name}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <img src={encodeURI(item.image)} alt="" loading="lazy" />
            </button>
            <span className="org-dock-tooltip">{item.name}</span>

            {isOpen && (
              <div className="org-dock-card" role="dialog" aria-label={`${item.name} case study`}>
                <p className="org-dock-card-kicker">{item.kicker}</p>
                <h3 className="org-dock-card-title">{item.name}</h3>
                <p className="org-dock-card-tagline">{item.tagline}</p>

                <div className="org-dock-card-body">
                  <p>
                    <strong>Problem</strong> {item.caseStudy.problem}
                  </p>
                  <p>
                    <strong>What I did</strong> {item.caseStudy.solution}
                  </p>
                  {item.caseStudy.outcome && (
                    <p>
                      <strong>Outcome</strong> {item.caseStudy.outcome}
                    </p>
                  )}
                </div>

                {(item.route || item.url) && (
                  <div className="org-dock-card-actions">
                    {item.route && (
                      <Link className="org-dock-card-link" to={item.route} onClick={() => setOpenId(null)}>
                        View full case study →
                      </Link>
                    )}
                    {item.url && (
                      <a className="org-dock-card-link" href={item.url} target="_blank" rel="noreferrer">
                        Visit site ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
