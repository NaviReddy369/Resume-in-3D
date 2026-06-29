import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ThreeCanvas from './components/ThreeCanvas'
import LoadingScreen from './components/LoadingScreen'
import HUD from './components/HUD'

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Suspense fallback={<LoadingScreen />}>
        <ThreeCanvas />
      </Suspense>
      <HUD />
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </div>
  )
}
