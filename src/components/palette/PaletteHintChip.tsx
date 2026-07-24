import { useAppStore } from '@/store/useAppStore'

export function PaletteHintChip() {
  const setPaletteOpen = useAppStore((s) => s.setPaletteOpen)

  return (
    <button type="button" className="palette-hint-chip" onClick={() => setPaletteOpen(true)}>
      <kbd>⌘</kbd>
      <kbd>K</kbd>
      <span className="palette-hint-label">Command palette</span>
    </button>
  )
}
