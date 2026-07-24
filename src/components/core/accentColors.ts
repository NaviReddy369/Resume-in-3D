import * as THREE from 'three'
import { sections } from '@/data/sections'

function smootherstep(x: number) {
  const t = THREE.MathUtils.clamp(x, 0, 1)
  return t * t * t * (t * (t * 6 - 15) + 10)
}

export function getAdjacentStates(scrollProgress: number) {
  const sectionFloat = THREE.MathUtils.clamp(scrollProgress, 0, 1) * (sections.length - 1)
  const stateA = Math.floor(sectionFloat)
  const stateB = Math.min(stateA + 1, sections.length - 1)
  const blend = smootherstep(sectionFloat - stateA)
  return { stateA, stateB, blend }
}

const accentColor = new THREE.Color()
const colorA = new THREE.Color()
const colorB = new THREE.Color()

/** Chroma/lightness held constant across sections so the 7-hue arc reads as one calibrated instrument, not a rainbow. */
export function getAccentColor(scrollProgress: number): THREE.Color {
  const { stateA, stateB, blend } = getAdjacentStates(scrollProgress)
  colorA.setHSL(sections[stateA].hue / 360, 0.55, 0.62)
  colorB.setHSL(sections[stateB].hue / 360, 0.55, 0.62)
  return accentColor.copy(colorA).lerp(colorB, blend)
}
