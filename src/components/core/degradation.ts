import type { DeviceTier } from '@/store/useAppStore'

export interface TierConfig {
  particleCount: number
  bloomEnabled: boolean
  dpr: [number, number] | number
}

export const tierConfig: Record<DeviceTier, TierConfig> = {
  high: { particleCount: 6000, bloomEnabled: true, dpr: [1, 1.5] },
  medium: { particleCount: 3000, bloomEnabled: true, dpr: [1, 1.25] },
  low: { particleCount: 1200, bloomEnabled: false, dpr: 1 },
  fallback: { particleCount: 0, bloomEnabled: false, dpr: 1 },
}
