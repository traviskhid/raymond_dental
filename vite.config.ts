import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sqlite-api-middleware',
      async configureServer(server) {
        try {
          // @ts-ignore
          const { default: app } = await import('./server/server.js')
          server.middlewares.use(app)
          console.log('[Vite] SQLite REST API middleware mounted on /api')
        } catch (err) {
          console.error('[Vite] Failed to mount SQLite API middleware:', err)
        }
      },
    },
  ],
  server: {
    proxy: {
      // Fallback proxy if external server on 3001 is used
      '/api-standalone': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-standalone/, '/api'),
      },
    },
  },
})
