import { create } from 'zustand'

export type DeviceTier = 'high' | 'medium' | 'low' | 'fallback'
export type BootStatus = 'pending' | 'playing' | 'skipped' | 'complete'

interface AppState {
  /** 0..1, written by GSAP's scroll scrub. Read only via getState() inside useFrame/GSAP callbacks — never the reactive selector form, or every scroll tick re-renders the React tree. */
  scrollProgress: number
  currentSectionIndex: number
  bootStatus: BootStatus
  deviceTier: DeviceTier | null
  prefersReducedMotion: boolean
  paletteOpen: boolean
  tourActive: boolean
  setScrollProgress: (progress: number) => void
  setCurrentSectionIndex: (index: number) => void
  setBootStatus: (status: BootStatus) => void
  setDeviceTier: (tier: DeviceTier) => void
  setPrefersReducedMotion: (value: boolean) => void
  setPaletteOpen: (value: boolean) => void
  setTourActive: (value: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  currentSectionIndex: 0,
  bootStatus: 'pending',
  deviceTier: null,
  prefersReducedMotion: false,
  paletteOpen: false,
  tourActive: false,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setCurrentSectionIndex: (index) => set({ currentSectionIndex: index }),
  setBootStatus: (status) => set({ bootStatus: status }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
  setPaletteOpen: (value) => set({ paletteOpen: value }),
  setTourActive: (value) => set({ tourActive: value }),
}))
