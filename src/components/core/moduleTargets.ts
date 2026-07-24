import * as THREE from 'three'
import { trajectoryAnchors, productClusterCenters } from './morphStates'
import { getAdjacentStates } from './accentColors'

export interface ModuleTarget {
  position: THREE.Vector3
  scale: number
}

const MODULE_SLOTS = 6

function emptySlots(): ModuleTarget[] {
  return Array.from({ length: MODULE_SLOTS }, () => ({ position: new THREE.Vector3(0, 0, 0), scale: 0 }))
}

function targetsForState(stateIndex: number): ModuleTarget[] {
  const slots = emptySlots()

  if (stateIndex === 1) {
    // ORBIT — three modules at each ring's lead position
    ;[0, 1, 2].forEach((ring) => {
      const radius = 1.4 + ring * 0.9
      const angle = ring * 2.1
      slots[ring] = {
        position: new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius),
        scale: 1,
      }
    })
  } else if (stateIndex === 3) {
    // PRODUCTS — three independent cores
    productClusterCenters.forEach((center, idx) => {
      slots[idx] = { position: center.clone(), scale: 1 }
    })
  } else if (stateIndex === 5) {
    // TRAJECTORY — three career-era anchors
    trajectoryAnchors.forEach((anchor, idx) => {
      slots[idx] = { position: anchor.clone(), scale: 0.8 }
    })
  } else if (stateIndex === 6) {
    // CONNECT — single beacon core
    slots[0] = { position: new THREE.Vector3(0, 0, 0), scale: 1.4 }
  }

  return slots
}

export function getBlendedModuleTargets(scrollProgress: number): ModuleTarget[] {
  const { stateA, stateB, blend } = getAdjacentStates(scrollProgress)
  const a = targetsForState(stateA)
  const b = targetsForState(stateB)

  return a.map((slotA, idx) => {
    const slotB = b[idx]
    return {
      position: new THREE.Vector3().lerpVectors(slotA.position, slotB.position, blend),
      scale: THREE.MathUtils.lerp(slotA.scale, slotB.scale, blend),
    }
  })
}
