import { useEffect } from 'react'
import { useAppStore } from '@/store/useAppStore'

export function useCommandPalette() {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isModK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isModK) {
        event.preventDefault()
        const { paletteOpen, setPaletteOpen } = useAppStore.getState()
        setPaletteOpen(!paletteOpen)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
}
