import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useAppStore } from '@/store/useAppStore'
import { tierConfig } from './degradation'
import { SystemCore } from './SystemCore'

export function SystemCoreCanvas() {
  const deviceTier = useAppStore((s) => s.deviceTier)
  const tier = deviceTier ?? 'medium'
  const { bloomEnabled, dpr } = tierConfig[tier]

  return (
    <div className="system-core-canvas" aria-hidden="true">
      <Canvas dpr={dpr} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: false, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <SystemCore />
          {bloomEnabled && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} mipmapBlur />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
