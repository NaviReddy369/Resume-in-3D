import React, { Suspense, useState } from 'react'
import ThreeCanvas from './components/ThreeCanvas'
import LoadingScreen from './components/LoadingScreen'
import ExperienceOverlay from './components/ExperienceOverlay'
import { sections } from './data/experience'

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasEntered, setHasEntered] = useState(false)

  const handleNext = () => setActiveIndex((current) => (current + 1) % sections.length)
  const handlePrev = () => setActiveIndex((current) => (current - 1 + sections.length) % sections.length)

  return (
    <div className="app-shell">
      <Suspense fallback={<LoadingScreen />}>
        <ThreeCanvas activeIndex={activeIndex} onSelectSection={setActiveIndex} />
      </Suspense>
      <ExperienceOverlay
        activeIndex={activeIndex}
        hasEntered={hasEntered}
        onEnter={() => setHasEntered(true)}
        onSelect={setActiveIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}
