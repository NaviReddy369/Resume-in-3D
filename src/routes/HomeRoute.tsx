import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDeviceCapability } from '@/hooks/useDeviceCapability'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useSectionInView } from '@/hooks/useSectionInView'
import { useAccentSync } from '@/hooks/useAccentSync'
import { useAppStore } from '@/store/useAppStore'
import { SystemCoreCanvas } from '@/components/core/SystemCoreCanvas'
import { Fallback2DCore } from '@/components/core/Fallback2DCore'
import { BootSequence } from '@/components/boot/BootSequence'
import { SiteHeader } from '@/components/chrome/SiteHeader'
import { SkipToContent } from '@/components/chrome/SkipToContent'
import { ProgressRail } from '@/components/chrome/ProgressRail'
import { TourToggle } from '@/components/chrome/TourToggle'
import { OperatorTour } from '@/components/tour/OperatorTour'
import { BootSection } from '@/components/sections/BootSection'
import { OrbitSection } from '@/components/sections/OrbitSection'
import { PipelinesSection } from '@/components/sections/PipelinesSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { SignalSection } from '@/components/sections/SignalSection'
import { TrajectorySection } from '@/components/sections/TrajectorySection'
import { ConnectSection } from '@/components/sections/ConnectSection'

export function HomeRoute() {
  useDeviceCapability()
  useScrollProgress()
  useAccentSync()

  const deviceTier = useAppStore((s) => s.deviceTier)
  const bootStatus = useAppStore((s) => s.bootStatus)

  const sectionRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ]

  useSectionInView(sectionRefs)

  const showBoot = bootStatus === 'pending' || bootStatus === 'playing'

  return (
    <div className="home-route">
      <SkipToContent />
      {deviceTier === 'fallback' ? <Fallback2DCore /> : deviceTier ? <SystemCoreCanvas /> : null}
      <SiteHeader />
      <ProgressRail sectionRefs={sectionRefs} />
      <TourToggle />
      <OperatorTour />
      <main id="main-content">
        <BootSection ref={sectionRefs[0]} />
        <OrbitSection ref={sectionRefs[1]} />
        <PipelinesSection ref={sectionRefs[2]} />
        <ProductsSection ref={sectionRefs[3]} />
        <SignalSection ref={sectionRefs[4]} />
        <TrajectorySection ref={sectionRefs[5]} />
        <ConnectSection ref={sectionRefs[6]} />
      </main>
      <AnimatePresence>{showBoot && <BootSequence key="boot" />}</AnimatePresence>
    </div>
  )
}
