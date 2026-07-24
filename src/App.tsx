import { lazy, Suspense, type LazyExoticComponent, type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomeRoute } from './routes/HomeRoute'
import NotFound from './routes/NotFound'
import { CommandPalette } from './components/palette/CommandPalette'
import { PaletteHintChip } from './components/palette/PaletteHintChip'
import { RouteLoadingFallback } from './components/chrome/RouteLoadingFallback'

const OrbitCaseStudy = lazy(() => import('./routes/OrbitCaseStudy'))
const GnkContinuumCaseStudy = lazy(() => import('./routes/GnkContinuumCaseStudy'))
const ThirdEyeFeelCaseStudy = lazy(() => import('./routes/ThirdEyeFeelCaseStudy'))
const AlexCaseStudy = lazy(() => import('./routes/AlexCaseStudy'))

function lazyRoute(Component: LazyExoticComponent<() => ReactElement>) {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Component />
    </Suspense>
  )
}

export default function App() {
  return (
    <>
      <CommandPalette />
      <PaletteHintChip />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/orbit" element={lazyRoute(OrbitCaseStudy)} />
        <Route path="/products/gnk-continuum" element={lazyRoute(GnkContinuumCaseStudy)} />
        <Route path="/products/3rd-eye-feel" element={lazyRoute(ThirdEyeFeelCaseStudy)} />
        <Route path="/products/alex" element={lazyRoute(AlexCaseStudy)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
