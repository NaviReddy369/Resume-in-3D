# ARCHITECTURE.md — The Systems Deck

Companion to `DESIGN.md`. Covers component tree, state model, scroll strategy, and performance plan. Reflects decisions already reviewed and approved in the implementation plan.

## Stack additions

Keeping: React 19, Vite 5, TypeScript, `@react-three/fiber`, `@react-three/drei`, `react-router-dom`, `gsap`, Tailwind (thin utility layer only — real design tokens live in CSS custom properties, not Tailwind config).

Adding: `framer-motion`, `@react-three/postprocessing`, `cmdk`, `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono`. Promoting `zustand` and `maath` from transitive (via drei) to direct dependencies. Adding a `@/*` → `src/*` path alias (`tsconfig.json` + `vite.config.ts`).

## Scroll orchestration: GSAP ScrollTrigger

Chosen over drei `ScrollControls` because `ScrollControls` virtualizes scroll inside the R3F canvas — incompatible with having real routed case-study pages that need normal document scroll, crawlability, and native back/forward. ScrollTrigger runs against real `<body>` scroll, so there is exactly one scroll model across the whole app.

**Data flow (the rule that keeps this at 60fps):**
- `useScrollProgress` sets up one root `ScrollTrigger` (`trigger: document.body`, `scrub: true`) whose `onUpdate` writes a plain `0..1` float into the zustand store: `useAppStore.getState().setScrollProgress(p)`.
- The 3D core reads that value **only** via `useAppStore.getState()` inside `useFrame` — never the reactive selector form — so scrolling never triggers a React re-render.
- `currentSectionIndex` (0–6) is a separate, low-frequency reactive field, set by `IntersectionObserver` (`useSectionInView`) — safe to subscribe to reactively since it changes at most 6 times per session.
- Continuous scroll-scrubbed DOM motion (per-section reveals, parallax) is driven directly by GSAP timelines on refs, bypassing React state entirely.
- `framer-motion` is reserved for discrete, state-driven transitions: command palette open/close, boot line reveals, route mount/unmount (`AnimatePresence`), tour caption crossfades, progress-rail active-dot transitions.

## Routing

`/` — the continuous scroll journey (`HomeRoute`), eager-loaded (it's the primary experience).
`/orbit`, `/products/gnk-continuum`, `/products/3rd-eye-feel`, `/products/alex` — case-study routes, `React.lazy` + `Suspense`, rendered inside `CaseStudyLayout` (no `<Canvas>` — a static CSS gradient tinted with that route's section hue). The Canvas unmounts on navigation away from `/`; a small WebGL re-init cost on return is an acceptable trade for not holding a second GPU context during reading-heavy pages.
`*` — `NotFound`.

`vercel.json`'s existing SPA rewrite (`/(.*) → /index.html`) already supports this; re-verified in Phase 3 against the real route set.

## Component tree

```
src/
  main.tsx                 React root; imports Fontsource weight CSS + styles/index.css
  App.tsx                  <BrowserRouter><Routes>; mounts global <CommandPalette/> (all routes)

  routes/
    HomeRoute.tsx           "/" — mounts SystemCoreCanvas + BootSequence + 7 sections + chrome
    OrbitCaseStudy.tsx       lazy
    GnkContinuumCaseStudy.tsx  lazy
    ThirdEyeFeelCaseStudy.tsx  lazy
    AlexCaseStudy.tsx         lazy
    NotFound.tsx

  layouts/
    CaseStudyLayout.tsx     shared chrome for case-study routes: back-to-deck nav, static hue header bar, CTA footer

  components/
    core/
      SystemCoreCanvas.tsx  <Canvas> wrapper — dpr clamp, gl config, <EffectComposer><Bloom/></EffectComposer> gated by tier
      SystemCore.tsx        composes ParticleSwarm + ModuleInstances; reads scrollProgress + accent hue
      ParticleSwarm.tsx     shared Points/BufferGeometry swarm (amorphous states)
      ModuleInstances.tsx   InstancedMesh, hard cap 6 instances (discrete "modules")
      morphStates.ts        7 pure functions (i, N) => Vector3, deterministic hash-seeded
      useCoreMorph.ts       scrollProgress -> {stateA, stateB, blend}, called inside useFrame
      accentColors.ts       7 hue values + continuous HSL/OKLCH interpolation helper
      degradation.ts        DeviceTier -> {particleCount, bloomEnabled, dprRange}
      Fallback2DCore.tsx    CSS/SVG gradient-blob fallback, no WebGL
    boot/
      BootSequence.tsx      sessionStorage-gated overlay, skip button
      bootLines.ts
    palette/
      CommandPalette.tsx    cmdk Command.Dialog — Navigate / Projects / Actions groups
      commandPaletteActions.ts
      PaletteHintChip.tsx   real, focusable hint button
    chrome/
      ProgressRail.tsx      SYS/01..07 spine, click + keyboard nav (GSAP scrollTo), aria-current
      SiteHeader.tsx
      TourToggle.tsx
      SkipToContent.tsx
    sections/
      SectionShell.tsx      shared "SYS/0N — LABEL" heading + IntersectionObserver + local ScrollTrigger
      BootSection.tsx / OrbitSection.tsx / PipelinesSection.tsx / ProductsSection.tsx /
      SignalSection.tsx / TrajectorySection.tsx / ConnectSection.tsx
    pipeline/
      PipelineDiagram.tsx   SVG, toggles between the two real architectures
      PipelineNode.tsx      keyboard-focusable, real <text>
      pipelineData.ts
    tour/
      OperatorTour.tsx      GSAP-driven auto-advance, exits on manual interaction
      tourCaptions.ts

  data/
    sections.ts             7 entries: id, moduleId, label, hue, route?
    orbit.ts / pipelines.ts / products.ts / signal.ts / timeline.ts / links.ts
    productDetails/gnkContinuum.ts / thirdEyeFeel.ts / alex.ts   (alex.ts carries explicit TODO markers)

  store/useAppStore.ts
  hooks/useScrollProgress.ts / useDeviceCapability.ts / useSectionInView.ts / useCommandPalette.ts
  lib/gsapSetup.ts
  styles/tokens.css, index.css
```

## State model (`useAppStore.ts`)

```
scrollProgress: number              // 0..1, GSAP-written, read only via getState() in useFrame
currentSectionIndex: number         // 0..6, IntersectionObserver-driven, safe to subscribe reactively
bootStatus: 'pending' | 'playing' | 'skipped' | 'complete'
deviceTier: 'high' | 'medium' | 'low' | 'fallback'
prefersReducedMotion: boolean
paletteOpen: boolean
tourActive: boolean
```

Convention enforced across the codebase: `scrollProgress` is never read via the reactive selector form — only `.getState()` inside frame/GSAP callbacks.

## 3D system core — technical approach

**Geometry:** a shared `Points`/`BufferGeometry` swarm for amorphous states (BOOT scatter, PIPELINES flow, SIGNAL waves, TRAJECTORY constellation, CONNECT halo) plus a hard-capped `InstancedMesh` (6 instances, reused/rescaled across states, never mounted/unmounted) for anything that needs to read as a distinct rigid object (ORBIT's 3 modules, PRODUCTS' 3 clusters, CONNECT's beacon core). Particles alone can't sell "three orbiting modules" at low counts — discrete geometry is needed for that read.

**Per-state targets:** procedural pure functions of particle index (`morphStates.ts`), deterministic hash-seeded (not `Math.random()`) so they recompute identically at any particle count/tier:
- BOOT: compact icosphere point cloud.
- ORBIT: 3 rings by `i % 3`, angle `(i/N)·2π·k` + radial jitter; module instances at each ring's lead position.
- PIPELINES: 4-waypoint piecewise path (source→transform→warehouse→dashboard), perpendicular jitter for thickness, per-particle flow offset advancing with time (mod 1) — the one state with continuous self-motion.
- PRODUCTS: 3 clusters by `i % 3`, each an independent icosphere blob with its own module instance core.
- SIGNAL: `y = sin(x·f + phase)·amp` plane, slower drift.
- TRAJECTORY: 3 anchor clusters (career eras) with density concentrated along connecting paths.
- CONNECT: near-total collapse to origin, radius pulsing via `sin(time)`, single glowing module instance.

**Interpolation:** `sectionFloat = scrollProgress * 6` → `stateA = floor`, `stateB = min(stateA+1, 6)`, `blend = smootherstep(fract(sectionFloat))`. Each frame, blend the two states' target functions, then damp the particle's live position toward that continuously-moving target with `maath`'s `damp3` (framerate-independent, varies lambda per transition — snappier BOOT↔ORBIT, calmer SIGNAL↔TRAJECTORY), with a small per-particle phase offset so motion doesn't look lockstep.

**Accent hue wiring:** `accentColors.ts` interpolates the same nearest-two-states blend across the 7 hues, writing into a shared `THREE.Color` read every frame by particle/module materials, and pushed once per `currentSectionIndex` change onto a CSS custom property on `documentElement` for DOM chrome — zero extra React render cost.

**Postprocessing:** `<EffectComposer><Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.4} mipmapBlur/></EffectComposer>`, mounted only on high/medium tiers (component not rendered at all on low/fallback, not just zero-intensity — actually skips the render pass). High threshold keeps bloom confined to highlights, avoiding an "everything glows" look.

## Progressive degradation

`useDeviceCapability.ts` runs once on mount:

```
reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
cores = navigator.hardwareConcurrency ?? 4
mem   = navigator.deviceMemory ?? 4        // guarded, Chromium-only
narrow = window.innerWidth < 768
webgl2Probe = try { canvas.getContext('webgl2') } catch { null }

if (reducedMotion || !webgl2Probe || mem <= 2)   tier = 'fallback'
else if (cores <= 4 || mem <= 2)                  tier = 'low'
else if (narrow || cores <= 6 || mem <= 4)         tier = 'medium'
else                                               tier = 'high'
```

| Tier | Particles | Bloom | DPR |
|---|---|---|---|
| high | 6000 | on | [1, 1.5] |
| medium | 3000 | reduced | [1, 1.25] |
| low | 1200 | off | 1 |
| fallback | 0 → `Fallback2DCore` | n/a | n/a |

`fallback` never creates a WebGL context and never plays the boot animation (a near-static hue crossfade instead) — this single tier decision satisfies both the low-end and the reduced-motion requirement at once.

## Performance plan

- Code-splitting: `React.lazy` for the 4 case-study routes only; `HomeRoute`/`SystemCoreCanvas` eager.
- DPR clamp: never exceeds 1.5 regardless of tier.
- Fonts: Fontsource, specific weight files only (Space Grotesk 700; Inter 400/500/600; JetBrains Mono 400/500) — not whole-family imports.
- Bundle: tree-shake drei via named imports only; `rollup-plugin-visualizer` added in Phase 3 to verify bundle size before the Lighthouse pass.
- `frameloop="always"` (R3F default) kept for simplicity; `frameloop="demand"` documented as a future optimization only if profiling shows idle-scroll CPU cost.
- Target: Lighthouse ≥ 90 desktop performance, verified in Phase 3.

## Accessibility

3D canvas is `aria-hidden` and purely presentational — all content exists as real HTML text (nothing baked into canvas, including the pipeline diagram which is SVG with real `<text>`). Keyboard reachability and visible focus states across progress rail, command palette, pipeline nodes, and case-study nav. `prefers-reduced-motion` skips the boot animation and forces the 2D fallback core; the Operator's Tour is hidden entirely under reduced motion since it's inherently a motion feature.
