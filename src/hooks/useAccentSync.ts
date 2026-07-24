import { useEffect } from 'react'
import { sections } from '@/data/sections'
import { useAppStore } from '@/store/useAppStore'

export function useAccentSync() {
  const currentSectionIndex = useAppStore((s) => s.currentSectionIndex)

  useEffect(() => {
    const hue = sections[currentSectionIndex]?.hue ?? sections[0].hue
    document.documentElement.style.setProperty('--accent', `oklch(68% 0.13 ${hue})`)
  }, [currentSectionIndex])
}
