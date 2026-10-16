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
    // Behind the exe.dev HTTPS proxy, HMR must connect via the public host on 443.
    // Locally, leave PUBLIC_HMR_HOST unset so Vite uses its default (same host/port).
    hmr: process.env.PUBLIC_HMR_HOST
      ? { protocol: 'wss', host: process.env.PUBLIC_HMR_HOST, clientPort: 443 }
      : true,
    watch: { ignored: ['**/data/**'] },
  },
  preview: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    allowedHosts: ['sam-resendez.exe.xyz'],
  },
})
