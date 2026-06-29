import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, PointerLockControls, Sky } from '@react-three/drei'
import LobbyScene from '../scenes/LobbyScene'
import PlayerController from './PlayerController'

export default function ThreeCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 1.6, 5], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} castShadow />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <LobbyScene />
      </Suspense>
      <PlayerController />
      <PointerLockControls selector="#root" />
    </Canvas>
  )
}
