import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useMemo } from 'react'
import { sections } from '../data/experience'

type Props = {
  activeIndex: number
}

export default function SceneCameraRig({ activeIndex }: Props) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const section = sections[activeIndex]
    target.set(...section.cameraPosition)
    lookAt.set(...section.lookAt)

    const driftY = Math.sin(state.clock.elapsedTime * 0.45) * 0.08
    camera.position.lerp(target.clone().add(new THREE.Vector3(0, driftY, 0)), 1 - Math.exp(-delta * 2.4))

    const lookMatrix = new THREE.Matrix4()
    lookMatrix.lookAt(camera.position, lookAt, camera.up)
    const targetQuaternion = new THREE.Quaternion().setFromRotationMatrix(lookMatrix)
    camera.quaternion.slerp(targetQuaternion, 1 - Math.exp(-delta * 2.8))
  })

  return null
}
