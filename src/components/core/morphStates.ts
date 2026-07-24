import * as THREE from 'three'

/** Deterministic hash (not Math.random()) so a state's shape is identical at any particle count/tier. */
function hash(i: number, seed: number) {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export type MorphStateFn = (i: number, n: number, out: THREE.Vector3) => THREE.Vector3

// BOOT — a compact Fibonacci-sphere point cloud: the system waking up.
const boot: MorphStateFn = (i, n, out) => {
  const radius = 1.6
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / Math.max(n - 1, 1)) * 2
  const r = Math.sqrt(Math.max(1 - y * y, 0))
  const theta = golden * i
  return out.set(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
}

// ORBIT — three rings at three radii/speeds: duty assignment, parent portal, camp ops.
const orbit: MorphStateFn = (i, n, out) => {
  const ring = i % 3
  const ringRadius = 1.4 + ring * 0.9
  const angle = (i / n) * Math.PI * 2 * (3 + ring) + ring * 2.1
  const jitter = (hash(i, 1) - 0.5) * 0.15
  const y = (hash(i, 2) - 0.5) * 0.3
  return out.set(Math.cos(angle) * (ringRadius + jitter), y, Math.sin(angle) * (ringRadius + jitter))
}

const pipelineWaypoints = [
  new THREE.Vector3(-3.2, 1.2, 0),
  new THREE.Vector3(-1.0, 0.3, 0.4),
  new THREE.Vector3(1.2, -0.4, -0.3),
  new THREE.Vector3(3.2, -1.2, 0),
]

// PIPELINES — source -> transform -> warehouse -> dashboard, with continuous flow offset.
const pipelines: MorphStateFn = (i, n, out) => {
  const t = i / Math.max(n - 1, 1)
  const segCount = pipelineWaypoints.length - 1
  const segment = Math.min(Math.floor(t * segCount), segCount - 1)
  const localT = t * segCount - segment
  out.lerpVectors(pipelineWaypoints[segment], pipelineWaypoints[segment + 1], localT)
  out.y += (hash(i, 3) - 0.5) * 0.25
  out.z += (hash(i, 4) - 0.5) * 0.25
  return out
}

export const productClusterCenters = [
  new THREE.Vector3(-2.4, 0, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(2.4, 0, 0),
]

// PRODUCTS — one system fissions into three independent clusters.
const products: MorphStateFn = (i, n, out) => {
  const cluster = i % 3
  boot(i, n, out)
  out.multiplyScalar(0.45).add(productClusterCenters[cluster])
  return out
}

// SIGNAL — a slow sine-driven plane: the creative register.
const signal: MorphStateFn = (i, n, out) => {
  const t = i / Math.max(n - 1, 1)
  const x = (t - 0.5) * 6
  const z = (hash(i, 5) - 0.5) * 3
  const y = Math.sin(x * 1.4 + z * 0.6) * 0.7
  return out.set(x, y, z)
}

export const trajectoryAnchors = [
  new THREE.Vector3(-2.6, 0.6, 0),
  new THREE.Vector3(0, -0.4, 0.3),
  new THREE.Vector3(2.6, 0.8, -0.2),
]

// TRAJECTORY — three career eras read as a constellation, not a list.
const trajectory: MorphStateFn = (i, n, out) => {
  const t = i / Math.max(n - 1, 1)
  const first = t < 0.5
  const localT = first ? t * 2 : (t - 0.5) * 2
  const from = first ? trajectoryAnchors[0] : trajectoryAnchors[1]
  const to = first ? trajectoryAnchors[1] : trajectoryAnchors[2]
  out.lerpVectors(from, to, localT)
  out.x += (hash(i, 6) - 0.5) * 0.3
  out.y += (hash(i, 7) - 0.5) * 0.3
  return out
}

// CONNECT — near-total collapse to a single pulsing beacon.
const connect: MorphStateFn = (i, n, out) => {
  boot(i, n, out)
  return out.multiplyScalar(0.12)
}

export const morphStates: MorphStateFn[] = [boot, orbit, pipelines, products, signal, trajectory, connect]
