import type { IncomingMessage, ServerResponse } from 'node:http'
import type { DatabaseSync } from 'node:sqlite'
import { getSite } from './storage.ts'

export function createApi(db: DatabaseSync) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const path = new URL(req.url ?? '/', 'http://localhost').pathname
    if (path !== '/api' && !path.startsWith('/api/')) return next()
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = 405
      res.setHeader('Allow', 'GET, HEAD')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }
    try {
      let body: unknown
      if (path === '/api/health') {
        db.prepare('SELECT 1').get()
        body = { status: 'ok', database: 'sqlite' }
      } else if (path === '/api/site') {
        body = getSite(db)
      } else {
        res.statusCode = 404
        body = { error: 'Not found' }
      }
      res.end(req.method === 'HEAD' ? undefined : JSON.stringify(body))
    } catch (error) {
      console.error('API error:', error)
      res.statusCode = 500
      res.end(JSON.stringify({ error: 'Internal server error' }))
    }
  }
}
