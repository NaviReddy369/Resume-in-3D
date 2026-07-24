import { useAppStore } from '@/store/useAppStore'
import { tierConfig } from './degradation'
import { ParticleSwarm } from './ParticleSwarm'
import { ModuleInstances } from './ModuleInstances'

export function SystemCore() {
  const deviceTier = useAppStore((s) => s.deviceTier)
  const tier = deviceTier ?? 'medium'
  const { particleCount } = tierConfig[tier]

  if (particleCount === 0) return null

  return (
    <group>
      <ParticleSwarm count={particleCount} />
      <ModuleInstances />
    </group>
  )
}
