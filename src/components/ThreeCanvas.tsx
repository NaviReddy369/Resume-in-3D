import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import LobbyScene from '../scenes/LobbyScene'
import SceneCameraRig from './SceneCameraRig'

type Props = {
  activeIndex: number
  onSelectSection: (index: number) => void
}

export default function ThreeCanvas({ activeIndex, onSelectSection }: Props) {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 2.6, 10.5], fov: 42 }}>
      <color attach="background" args={['#07111f']} />
      <fog attach="fog" args={['#07111f', 12, 32]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 6]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[0, 4, 0]} intensity={14} color="#f97316" distance={10} />
      <pointLight position={[7, 3, -2]} intensity={10} color="#38bdf8" distance={9} />
      <pointLight position={[-7, 3, -2]} intensity={10} color="#a3e635" distance={9} />
      <pointLight position={[0, 3, -11]} intensity={10} color="#facc15" distance={8} />
      <pointLight position={[0, 3, 6]} intensity={10} color="#fb7185" distance={8} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.25}>
          <LobbyScene activeIndex={activeIndex} onSelectSection={onSelectSection} />
        </Float>
      </Suspense>
      <SceneCameraRig activeIndex={activeIndex} />
    </Canvas>
  )
}
