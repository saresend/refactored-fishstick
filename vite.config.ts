import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'
import { openDatabase } from './server/storage.ts'
import { createApi } from './server/api.ts'

function sqliteApi(): Plugin {
  const install = (server: ViteDevServer) => {
    const db = openDatabase(process.env.DATABASE_PATH ?? resolve('data/site.sqlite'))
    server.middlewares.use(createApi(db))
    server.httpServer?.once('close', () => db.close())
  }
  return {
    name: 'personal-site-sqlite-api',
    configureServer: install,
    configurePreviewServer(server) {
      const db = openDatabase(process.env.DATABASE_PATH ?? resolve('data/site.sqlite'))
      server.middlewares.use(createApi(db))
      server.httpServer.once('close', () => db.close())
    },
  }
}

export default defineConfig({
  plugins: [react(), sqliteApi()],
  server: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    allowedHosts: ['sam-resendez.exe.xyz'],
    hmr: { protocol: 'wss', host: 'sam-resendez.exe.xyz', clientPort: 443 },
    watch: { ignored: ['**/data/**'] },
  },
  preview: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    allowedHosts: ['sam-resendez.exe.xyz'],
  },
})
