# The Systems Deck

Naveen Gudimilla's portfolio — a single continuous scroll journey through seven "systems" (BOOT, ORBIT, PIPELINES, PRODUCTS, SIGNAL, TRAJECTORY, CONNECT), anchored by a persistent 3D particle/module core that morphs shape with scroll position. Built with React 19, Vite, TypeScript, and React Three Fiber.

See `DESIGN.md` and `ARCHITECTURE.md` for the concept, palette, and technical architecture behind the build.

## Quick start

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev       # local dev server (port 5173)
npm run build     # production build (tsc + vite build)
npm run preview   # serve the production build locally
ANALYZE=true npm run build   # production build + emits dist/stats.html bundle visualizer
```

## What's built

- **Persistent 3D system core** (`src/components/core/`) — a shared particle swarm plus a small instanced-mesh set, procedurally morphing through 7 states keyed to scroll position (BOOT assemble → ORBIT rings → PIPELINES flow → PRODUCTS fission → SIGNAL wave → TRAJECTORY constellation → CONNECT beacon). Degrades through 4 device tiers (`high`/`medium`/`low`/`fallback`), the last of which swaps to a WebGL-free CSS fallback (`Fallback2DCore`) and is forced under `prefers-reduced-motion`.
- **Boot sequence** (`src/components/boot/`) — plays once per session (sessionStorage-gated), skippable, skipped outright under reduced motion.
- **Command palette** (`src/components/palette/`) — ⌘K / Ctrl+K, fuzzy nav to any section, case study, or action (email, resume, socials), via `cmdk`.
- **Interactive pipeline diagram** (`src/components/pipeline/`) — real SVG/HTML diagram of both AWS and GCP architectures Naveen built, hover/focus explain panel, animated flow.
- **Case-study routes** (`src/routes/*CaseStudy.tsx`) — `/orbit`, `/products/gnk-continuum`, `/products/3rd-eye-feel`, `/products/alex`, each lazy-loaded and deep-linkable, structured problem → constraints → decisions → architecture → outcome.
- **Operator's Tour** (`src/components/tour/`) — auto-advancing scroll walkthrough with narration captions, exits on any manual scroll/keypress, hidden under reduced motion.

## Content

All copy lives in `src/data/*.ts` as typed data, not hardcoded in components. Real facts only — anywhere content was intentionally left high-level pending more detail from Naveen, it's flagged with a `// TODO:` comment in the relevant data file (see `src/data/productDetails/alex.ts` in particular).

## Outstanding, before this ships

- Drop the real resume at `public/resume.pdf` (path already wired into the header, command palette, and CONNECT section).
- Once deployed, add the real domain to `index.html`'s `og:url`/canonical tags (see the `TODO` comment there) — social crawlers require absolute URLs.
- Optional: `Profile (10).pdf` from the old `src/public/` folder was removed as part of this rebuild (wrong location for Vite anyway) — confirm nothing in it was needed before considering it gone for good.

## Verified

- `tsc --noEmit` and `npm run build` both pass clean.
- Lighthouse (desktop, production build): **Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100** (after adding `public/robots.txt`).
- Keyboard-only pass confirmed: skip-link → header → all 7 progress-rail sections → tour toggle → section CTAs, all in a sane tab order; command palette opens on ⌘K/Ctrl+K and closes on Escape.
- `prefers-reduced-motion` forces the WebGL-free fallback core and skips the boot animation; verified via emulated media in a headless browser.
- Mobile viewport (390×844) verified: progress rail hides, section cards go full-width, bottom-corner chrome (palette hint, tour toggle) shrinks to fit.

## Deploy

`vercel.json` at the repo root already configures the build (`npm run build` → `dist`) and an SPA rewrite (`/(.*) → /index.html`), which covers client-side routing for all case-study routes.
