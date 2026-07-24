import { useAppStore } from '@/store/useAppStore'

export function TourToggle() {
  const tourActive = useAppStore((s) => s.tourActive)
  const setTourActive = useAppStore((s) => s.setTourActive)
  const prefersReducedMotion = useAppStore((s) => s.prefersReducedMotion)

  if (prefersReducedMotion) return null

  return (
    <button type="button" className="tour-toggle" onClick={() => setTourActive(!tourActive)}>
      {tourActive ? 'Exit tour' : 'Take the tour'}
    </button>
  )
}
