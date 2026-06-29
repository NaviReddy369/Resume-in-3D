import React from 'react'
import { Text } from '@react-three/drei'
import { sections } from '../data/experience'

type Props = {
  activeIndex: number
  onSelectSection: (index: number) => void
}

export default function LobbyScene({ activeIndex, onSelectSection }: Props) {
  return (
    <>
      <group position={[0, -0.4, 0]}>
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[16, 64]} />
          <meshStandardMaterial color="#09101c" roughness={0.92} />
        </mesh>

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[4.6, 5.3, 64]} />
          <meshStandardMaterial color="#14243b" emissive="#12263f" emissiveIntensity={0.5} metalness={0.35} roughness={0.3} />
        </mesh>

        <mesh position={[0, 4.2, -12]}>
          <boxGeometry args={[16, 7, 0.5]} />
          <meshStandardMaterial color="#0f1b2f" roughness={0.6} metalness={0.2} />
        </mesh>

        <mesh position={[0, 2.8, -11.65]}>
          <boxGeometry args={[10, 2.2, 0.15]} />
          <meshStandardMaterial color="#101f37" emissive="#f97316" emissiveIntensity={0.6} roughness={0.25} metalness={0.4} />
        </mesh>

        <Text position={[0, 2.92, -11.54]} fontSize={0.68} color="#fff7ed" anchorX="center" anchorY="middle">
          STRATEGY . SYSTEMS . IMPACT
        </Text>

        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.3, 2.9, 1.1, 6]} />
          <meshStandardMaterial color="#111827" metalness={0.65} roughness={0.28} />
        </mesh>

        <mesh position={[0, 1.95, 0]} castShadow>
          <cylinderGeometry args={[1.55, 1.85, 0.25, 6]} />
          <meshStandardMaterial color="#1e293b" emissive="#fb923c" emissiveIntensity={0.25} metalness={0.5} roughness={0.2} />
        </mesh>

        {sections.map((section, index) => {
          const isActive = index === activeIndex

          return (
            <group key={section.id} position={section.stationPosition}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                <ringGeometry args={[0.9, 1.2, 48]} />
                <meshStandardMaterial color={section.accent} emissive={section.accent} emissiveIntensity={isActive ? 1.6 : 0.45} />
              </mesh>

              <mesh position={[0, 1.35, 0]} castShadow onClick={() => onSelectSection(index)}>
                <boxGeometry args={[1.6, 2.5, 1.6]} />
                <meshStandardMaterial
                  color={isActive ? '#e2e8f0' : '#162133'}
                  emissive={section.accent}
                  emissiveIntensity={isActive ? 0.75 : 0.18}
                  metalness={0.3}
                  roughness={0.22}
                />
              </mesh>

              <mesh position={[0, 2.95, 0]} castShadow>
                <boxGeometry args={[1.2, 0.12, 1.2]} />
                <meshStandardMaterial color={section.accent} emissive={section.accent} emissiveIntensity={isActive ? 1.4 : 0.55} />
              </mesh>

              <Text position={[0, 3.65, 0]} fontSize={0.34} color="#e2e8f0" anchorX="center" anchorY="middle">
                {section.label.toUpperCase()}
              </Text>
            </group>
          )
        })}

        <mesh position={[0, 3.8, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[7.8, 0.04, 16, 120]} />
          <meshStandardMaterial color="#334155" emissive="#1d4ed8" emissiveIntensity={0.15} />
        </mesh>

        <mesh position={[0, 5.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.4, 0.03, 16, 120]} />
          <meshStandardMaterial color="#475569" emissive="#f97316" emissiveIntensity={0.12} />
        </mesh>
      </group>
    </>
  )
}
