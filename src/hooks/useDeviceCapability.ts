import { useEffect } from 'react'
import { useAppStore, type DeviceTier } from '@/store/useAppStore'

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

function detectTier(): { tier: DeviceTier; reducedMotion: boolean } {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cores = navigator.hardwareConcurrency ?? 4
  const mem = (navigator as NavigatorWithMemory).deviceMemory ?? 4
  const narrow = window.innerWidth < 768

  let webgl2Probe: WebGL2RenderingContext | null = null
  try {
    webgl2Probe = document.createElement('canvas').getContext('webgl2')
  } catch {
    webgl2Probe = null
  }

  let tier: DeviceTier
  if (reducedMotion || !webgl2Probe || mem <= 2) {
    tier = 'fallback'
  } else if (cores <= 4) {
    tier = 'low'
  } else if (narrow || cores <= 6 || mem <= 4) {
    tier = 'medium'
  } else {
    tier = 'high'
  }

  return { tier, reducedMotion }
}

export function useDeviceCapability() {
  const setDeviceTier = useAppStore((s) => s.setDeviceTier)
  const setPrefersReducedMotion = useAppStore((s) => s.setPrefersReducedMotion)

  useEffect(() => {
    const { tier, reducedMotion } = detectTier()
    setDeviceTier(tier)
    setPrefersReducedMotion(reducedMotion)
  }, [setDeviceTier, setPrefersReducedMotion])
}
