# 3D Interactive Office Portfolio (Foundation)

This workspace contains the foundation for a premium 3D office environment built with React, Vite, TypeScript, and React Three Fiber.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

What’s included
- Vite + React + TypeScript scaffold
- React Three Fiber Canvas and environment
- `PlayerController` with pointer-lock and WASD movement
- Basic `LobbyScene` and reusable `RoomPlaceholder`
- Minimal HUD and loading screen
- Public folders for `models` and `textures`

Cloudflare Pages deployment
- Build the app:

```bash
npm run build
```

- Deploy with Wrangler:

```bash
npm run deploy:cf
```

- Or connect the GitHub repo in Cloudflare Pages and set the build command to `npm run build` and the output directory to `dist`.

Next recommended milestone
- Implement collision geometry and robust collision detection
- Add room interiors with optimized GLTF models (lazy loaded)
- Add postprocessing (bloom, AO) and HDRI for realistic lighting
- Implement door animations with GSAP and proximity triggers
- Integrate Leva for debug controls and toggleable quality settings
