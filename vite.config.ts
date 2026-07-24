import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  const analyzePlugins = process.env.ANALYZE
    ? [(await import('rollup-plugin-visualizer')).visualizer({ open: true, filename: 'dist/stats.html' })]
    : []

  return {
    plugins: [react(), ...analyzePlugins],
    server: { port: 5173 },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      chunkSizeWarningLimit: 950,
      rollupOptions: {
        output: {
          // Only "three" is split out: it has no React hook dependency, so it's safe to
          // isolate into its own cacheable chunk. Everything else that touches React hooks
          // (@react-three/fiber, framer-motion, cmdk, zustand, react-router-dom, ...) stays
          // grouped with React itself — forcing those into a separate manual chunk previously
          // broke module init order in production (`Cannot read properties of undefined
          // (reading 'useState')`), since Rollup doesn't guarantee hook-consumer chunks
          // finish resolving against the same React instance when manually split apart.
          manualChunks: {
            three: ['three']
          }
        }
      }
    }
  }
})
