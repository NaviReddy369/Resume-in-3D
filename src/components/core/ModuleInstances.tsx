import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { damp3 } from 'maath/easing'
import { useAppStore } from '@/store/useAppStore'
import { getBlendedModuleTargets } from './moduleTargets'
import { getAccentColor } from './accentColors'

const MODULE_COUNT = 6
const dummy = new THREE.Object3D()
const currentPositions = Array.from({ length: MODULE_COUNT }, () => new THREE.Vector3())
const currentScales = new Array(MODULE_COUNT).fill(0)

export function ModuleInstances() {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const scrollProgress = useAppStore.getState().scrollProgress
    const targets = getBlendedModuleTargets(scrollProgress)

    for (let i = 0; i < MODULE_COUNT; i++) {
      damp3(currentPositions[i], targets[i].position, 0.3, delta)
      currentScales[i] = THREE.MathUtils.damp(currentScales[i], targets[i].scale, 4, delta)
      dummy.position.copy(currentPositions[i])
      dummy.scale.setScalar(Math.max(currentScales[i], 0.0001))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true

    const material = mesh.material as THREE.MeshStandardMaterial
    material.emissive.copy(getAccentColor(scrollProgress))
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MODULE_COUNT]}>
      <icosahedronGeometry args={[0.32, 1]} />
      <meshStandardMaterial color="#0b0f16" emissive="#222222" emissiveIntensity={1.4} roughness={0.35} metalness={0.4} />
    </instancedMesh>
  )
}
