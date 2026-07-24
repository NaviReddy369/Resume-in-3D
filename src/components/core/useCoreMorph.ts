import * as THREE from 'three'
import { morphStates } from './morphStates'
import { getAdjacentStates } from './accentColors'

const a = new THREE.Vector3()
const b = new THREE.Vector3()

/** One-off blended target lookup (e.g. seeding initial positions). Not used in the hot per-frame loop — see ParticleSwarm, which resolves stateA/stateB/blend once per frame instead of once per particle. */
export function getBlendedTarget(i: number, n: number, scrollProgress: number, out: THREE.Vector3) {
  const { stateA, stateB, blend } = getAdjacentStates(scrollProgress)
  morphStates[stateA](i, n, a)
  morphStates[stateB](i, n, b)
  return out.copy(a).lerp(b, blend)
}
