import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SPEED = 2.5

export default function PlayerController() {
  const { camera, gl } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const keys = useRef({ forward: false, backward: false, left: false, right: false })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': keys.current.forward = true; break
        case 'KeyS': keys.current.backward = true; break
        case 'KeyA': keys.current.left = true; break
        case 'KeyD': keys.current.right = true; break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': keys.current.forward = false; break
        case 'KeyS': keys.current.backward = false; break
        case 'KeyA': keys.current.left = false; break
        case 'KeyD': keys.current.right = false; break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const onClick = () => {
      const canvas = gl.domElement
      if (document.pointerLockElement !== canvas) {
        canvas.requestPointerLock?.()
      }
    }
    const root = document.getElementById('root')
    root?.addEventListener('click', onClick)
    return () => root?.removeEventListener('click', onClick)
  }, [gl.domElement])

  useFrame((_, delta) => {
    // compute direction based on camera yaw
    const forward = keys.current.forward ? 1 : 0
    const backward = keys.current.backward ? 1 : 0
    const left = keys.current.left ? 1 : 0
    const right = keys.current.right ? 1 : 0

    direction.current.set(right - left, 0, backward - forward).normalize()
    if (direction.current.lengthSq() > 0) {
      // align with camera rotation on Y
      const angle = camera.rotation.y
      const move = new THREE.Vector3()
      move.copy(direction.current).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle)
      velocity.current.lerp(move.multiplyScalar(SPEED), 0.2)
    } else {
      velocity.current.lerp(new THREE.Vector3(0, 0, 0), 0.2)
    }

    camera.position.addScaledVector(velocity.current, delta)
    // simple floor clamp
    if (camera.position.y < 1.6) camera.position.y = 1.6
  })

  return null
}
