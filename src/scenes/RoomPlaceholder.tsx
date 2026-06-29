import React from 'react'
import { Text } from '@react-three/drei'

type Props = { name: string; position?: [number, number, number] }

export default function RoomPlaceholder({ name, position = [0, 1.8, 0] }: Props) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[6, 3.2, 6]} />
        <meshStandardMaterial color="#f7f7f7" roughness={0.9} />
      </mesh>
      <Text position={[0, 1.6, 3.2]} fontSize={0.45} color="#222" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}
