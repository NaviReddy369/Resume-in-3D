# DESIGN.md — The Systems Deck

Design plan for Naveen Gudimilla's portfolio rebuild. This is a working document, revised once against a self-critique pass (see bottom) before build starts.

## Concept

The site is not a resume with a 3D background. It is a **system you boot into**. The visitor doesn't scroll past sections describing Naveen's work — they move through a running machine, and the machine's own shape tells the story: it assembles, orbits, flows, splits, softens, threads a path, and settles. The persistent 3D "system core" is the spine; DOM content is annotation layered over it, in the register of system documentation, not marketing copy.

Structure: one continuous scroll page (`/`) through seven systems (BOOT, ORBIT, PIPELINES, PRODUCTS, SIGNAL, TRAJECTORY, CONNECT), plus four routed "opened application" case-study pages that read like the product's own UI.

## Palette

Authored in OKLCH for perceptual uniformity — lightness and chroma stay controlled while hue does the work, which is what keeps a 7-hue accent system from reading as rainbow noise. Base is a cool slate-graphite, not pure black: it has an almost-imperceptible blue-cyan cast that reads as "instrument panel" rather than "void."

| Token | Value | Role |
|---|---|---|
| `--void` | `oklch(14% 0.02 250)` | Deepest background, page base |
| `--panel` | `oklch(19% 0.025 250)` | Raised surface (section chrome, rail) |
| `--panel-raised` | `oklch(24% 0.03 250)` | Cards, case-study surfaces, hover states |
| `--line` | `oklch(38% 0.02 250 / 55%)` | Hairline borders, dividers |
| `--ink` | `oklch(96% 0.01 250)` | Primary text — off-white, not pure white |
| `--ink-muted` | `oklch(68% 0.02 250)` | Secondary text, captions, metadata |

**Accent arc** — one hue per section, held at a constant chroma (`0.13`) and lightness (`68%`) so all seven feel like one calibrated instrument, varying only in hue angle along a deliberate narrative arc (not evenly spaced, not rainbow-random):

| Section | Hue | Character |
|---|---|---|
| BOOT | 45° | warm amber — ignition |
| ORBIT | 205° | instrument blue — the flagship system |
| PIPELINES | 175° | teal/cyan — data in motion |
| PRODUCTS | 260° | violet — engineering-as-product |
| SIGNAL | 320° | rose — the creative register |
| TRAJECTORY | 235° | indigo — distance, time |
| CONNECT | 40° | warm amber — returns to human warmth |

The arc bookends warm→cool→warm→cool→warm: it opens on ignition, cools through the engineering core, warms for the creative section, cools once more for the look back across time, and closes back at human warmth for the ask. This progression is itself something a template generator would not produce — it has to be authored with intent.

Each section's accent drives: the 3D core's particle/emissive color, a thin top-rule on that section's content block, the active dot in the progress rail, and (on case-study routes) the static header-bar tint.

## Type

Three self-hosted (Fontsource) faces, each with exactly one job — no face is used interchangeably with another:

- **Display — Space Grotesk**, weight 700 only, tight tracking, used exclusively for: the BOOT hero line, the one large statement per section, and case-study H1s. Never used for body paragraphs or UI chrome. Scarcity is what makes it land.
- **Body — Inter**, weights 400/500/600, all paragraph copy, bullets, nav, buttons. Chosen for legibility over character — the display face and mono face carry the personality so body text can stay quiet.
- **Utility/mono — JetBrains Mono**, weights 400/500. This is the site's "system voice": module IDs (`SYS/02 — PIPELINES`), boot sequence text, metrics, timestamps, pipeline diagram labels, command palette entries. Given far more surface area than a typical portfolio's monospace accent — it's a structural element, not a garnish.

## Layout concept

Not a centered text column. Each section is an asymmetric split: a fixed-width content block anchored left or right (alternating per section), while the 3D core sits pinned center-viewport behind/around it — content and machine share the frame rather than stacking. A vertical spine along one edge holds the module-ID progress rail (`SYS/01` … `SYS/07`), always visible, functioning like a system status sidebar rather than a nav menu.

Case-study routes (`/orbit`, `/products/*`) drop the split layout and the 3D core entirely. They open full-bleed, styled as if you launched the product itself: a persistent top bar (module ID, back-to-deck link, thin accent-tinted rule in that system's hue) followed by problem → constraints → decisions → architecture → outcome, in that fixed order every time — the structure itself is the tell that these are engineered artifacts, not blog posts.

## 3D core — state descriptions

One continuous particle/module system (see ARCHITECTURE.md for technical implementation), seven resting states:

1. **BOOT** — scattered points converge into a compact icosphere. The system waking up.
2. **ORBIT** — three modules (duty assignment, parent portal, camp ops) ring an anchor at three orbital radii/speeds — a running ERP, module ownership made literal.
3. **PIPELINES** — the swarm flattens into a piecewise path with visible directional flow: source → transform → warehouse → dashboard. The only state with continuous self-motion independent of scroll — data doesn't stop moving.
4. **PRODUCTS** — the one system fissions into three independent small clusters, each with its own core — three shipped products, three separate systems, same maker.
5. **SIGNAL** — the swarm relaxes into a slow sine-driven plane, softer and slower — the creative register.
6. **TRAJECTORY** — density concentrates into three anchor clusters connected by threads — three career eras read as a constellation, not a list.
7. **CONNECT** — near-total collapse to a single pulsing beacon at the origin. Calm. One clear signal, one ask.

## Interactions

- **Boot sequence** — first visit only (sessionStorage-gated), ~2.5s of terse monospace status lines synced to the particle-assemble animation, skippable, and skipped outright under `prefers-reduced-motion`.
- **Command palette** (⌘K/Ctrl+K, `cmdk`) — fuzzy nav to any section or case study, plus real actions (email, resume download, GitHub, LinkedIn, Behance). A small always-focusable hint chip teaches it in the corner.
- **Live pipeline diagram** (PIPELINES) — real SVG, keyboard-focusable nodes, hover/focus opens a fixed explain panel per node (what it is, what decision it enabled), animated flow via CSS.
- **Case studies as product demos** — ORBIT + three PRODUCT routes, deep-linkable, structured problem→constraints→decisions→architecture→outcome, real metrics only.
- **Operator's tour** — auto-advancing scroll with narration captions, exits on any manual scroll/keypress, hidden entirely under reduced-motion (it's inherently a motion feature).

## Self-critique — "would a template produce this?"

Going through each element honestly:

- **Dark background + neon accent** is now the single most common "AI-generated developer portfolio" look. → Mitigated by: authoring in OKLCH with a genuine tonal arc across 7 hues (not one neon accent), holding chroma/lightness constant so the system reads as calibrated rather than decorative, and reserving bloom for the 3D core only, at a high luminance threshold, so nothing else glows.
- **Particle-swarm hero backgrounds** are themselves becoming a template trope in AI-tool portfolio output. → Mitigated by: the particles are never decorative wallpaper — every state is a literal diagram of the content next to it (orbital modules = actual ERP modules, flowing pipe = the actual data pipeline, fission = the actual three products), so removing the copy would make the shape stop making sense. A decorative background survives that test; this doesn't.
- **Command palettes** are trending in portfolio sites generally now too. → Mitigated by: keeping it functionally real (it fuzzy-navigates actual routes and fires actual actions — email, resume, socials — not a toy), and treating it as one signature among five rather than the whole identity.
- **Space Grotesk + Inter + JetBrains Mono** is a common dev-portfolio font trio. → Mitigated by: enforcing genuine scarcity (display face appears at most once per section) and giving the mono face outsized structural duty (module IDs, metrics, diagram labels) rather than using it as a decorative label font — the mono face becomes the site's actual voice, not a garnish.
- **Hero → about → projects → contact** is the single most template-shaped structure possible. → Already avoided by the continuous-scroll "systems" framing and routed case-study-as-product-page pattern; no separate action needed here, but worth stating this was the first and most important decision.

Revision made after this pass: increased the mono face's role from "labels only" to a full structural voice (metrics, diagram text, boot lines) and tightened the accent arc to an explicit warm→cool→warm→cool→warm narrative rather than an arbitrary hue spread, specifically because an arbitrary spread would have failed its own test above.

<!-- TODO: Naveen to provide real resume.pdf, favicon, and OG share image — placeholders will be inserted with clear TODO markers per the phased plan. -->
