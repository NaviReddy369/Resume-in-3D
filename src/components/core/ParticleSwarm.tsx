import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { damp3 } from 'maath/easing'
import { useAppStore } from '@/store/useAppStore'
import { morphStates } from './morphStates'
import { getAdjacentStates, getAccentColor } from './accentColors'

interface ParticleSwarmProps {
  count: number
}

const tmpA = new THREE.Vector3()
const tmpB = new THREE.Vector3()
const tmpTarget = new THREE.Vector3()
const tmpCurrent = new THREE.Vector3()

export function ParticleSwarm({ count }: ParticleSwarmProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      morphStates[0](i, count, tmpTarget)
      arr[i * 3] = tmpTarget.x
      arr[i * 3 + 1] = tmpTarget.y
      arr[i * 3 + 2] = tmpTarget.z
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    const geometry = pointsRef.current?.geometry
    if (!geometry) return

    const array = geometry.attributes.position.array as Float32Array
    const scrollProgress = useAppStore.getState().scrollProgress
    const { stateA, stateB, blend } = getAdjacentStates(scrollProgress)
    const fnA = morphStates[stateA]
    const fnB = morphStates[stateB]

    for (let i = 0; i < count; i++) {
      fnA(i, count, tmpA)
      fnB(i, count, tmpB)
      tmpTarget.copy(tmpA).lerp(tmpB, blend)

      const idx = i * 3
      tmpCurrent.set(array[idx], array[idx + 1], array[idx + 2])
      const smoothTime = 0.28 + ((i % 97) / 97) * 0.4
      damp3(tmpCurrent, tmpTarget, smoothTime, delta)
      array[idx] = tmpCurrent.x
      array[idx + 1] = tmpCurrent.y
      array[idx + 2] = tmpCurrent.z
    }

    geometry.attributes.position.needsUpdate = true

    if (materialRef.current) {
      materialRef.current.color.copy(getAccentColor(scrollProgress))
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={materialRef} size={0.045} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}
