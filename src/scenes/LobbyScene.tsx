import React from 'react'
import { MeshStandardMaterial } from 'three'
import { Text } from '@react-three/drei'

export default function LobbyScene() {
  const floorMat = new MeshStandardMaterial({ color: '#111111', roughness: 0.08, metalness: 0.3 })
  const wallMat = new MeshStandardMaterial({ color: '#efefef', roughness: 0.8 })

  return (
    <>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      {/* Back wall with illuminated logo */}
      <mesh position={[0, 3, -18]}>
        <boxGeometry args={[30, 6, 1]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      <Text position={[0, 3, -17.4]} fontSize={1.2} color="#ffffff" anchorX="center" anchorY="middle">
        Welcome
      </Text>

      {/* Reception desk */}
      <mesh position={[0, 1, -10]} castShadow>
        <boxGeometry args={[6, 1.2, 2]} />
        <meshStandardMaterial color="#222" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* Simple furniture placeholders */}
      <mesh position={[-6, 0.4, -6]}>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#444" roughness={0.6} />
      </mesh>

      {/* Hallway openings to rooms (visual markers) */}
      <mesh position={[12, 1.5, -2]}>
        <boxGeometry args={[1, 3, 6]} />
        <meshStandardMaterial color="#ddd" roughness={0.9} />
      </mesh>

      {/* Decorative plant (simple cylinder + sphere) */}
      <mesh position={[4, 0.5, -6]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 12]} />
        <meshStandardMaterial color="#6b4" />
      </mesh>
    </>
  )
}
