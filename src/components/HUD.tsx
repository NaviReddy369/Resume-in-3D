import React from 'react'

export default function HUD() {
  return (
    <div>
      <div className="hud" style={{ top: 12, right: 12 }}>
        <div className="p-2 bg-black/50 text-white rounded">Mini Map (placeholder)</div>
      </div>
      <div className="hud" style={{ left: 12, bottom: 12 }}>
        <div className="p-2 bg-black/50 text-white rounded">WASD • Click to lock mouse</div>
      </div>
    </div>
  )
}
