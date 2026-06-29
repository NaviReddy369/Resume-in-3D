import React from 'react'

export default function LoadingScreen() {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <div style={{ color: '#fff', fontSize: 18 }}>Loading 3D Office...</div>
    </div>
  )
}
