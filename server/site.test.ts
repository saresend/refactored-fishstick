import assert from 'node:assert/strict'
import { once } from 'node:events'
import { mkdtempSync, rmSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { createApi } from './api.ts'
import { getSite, openDatabase } from './storage.ts'

test('SQLite initializes and preserves edits after reopening', () => {
  const dir = mkdtempSync(join(tmpdir(), 'personal-site-'))
  const filename = join(dir, 'site.sqlite')
  try {
    const db = openDatabase(filename)
    assert.equal(getSite(db)?.title, 'A little space on the web.')
    db.prepare('UPDATE site_settings SET title = ? WHERE id = 1').run('My website')
    db.close()
    const reopened = openDatabase(filename)
    assert.equal(getSite(reopened)?.title, 'My website')
    reopened.close()
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('API health, persisted settings, method restrictions, and fallthrough', async () => {
  const db = openDatabase(':memory:')
  const api = createApi(db)
  const server = createServer((req, res) => api(req, res, () => {
    res.end('frontend')
  }))
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  assert.ok(address && typeof address === 'object')
  const base = `http://127.0.0.1:${address.port}`
  try {
    const health = await fetch(`${base}/api/health`)
    assert.equal(health.status, 200)
    assert.deepEqual(await health.json(), { status: 'ok', database: 'sqlite' })
    const site = await fetch(`${base}/api/site`)
    assert.deepEqual(await site.json(), { title: 'A little space on the web.', description: 'My personal site is on its way.' })
    assert.equal((await fetch(`${base}/api/site`, { method: 'POST' })).status, 405)
    assert.equal((await fetch(`${base}/api/missing`)).status, 404)
    const head = await fetch(`${base}/api/site`, { method: 'HEAD' })
    assert.equal(head.status, 200)
    assert.equal(await head.text(), '')
    assert.equal(await (await fetch(base)).text(), 'frontend')
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
    db.close()
  }
})
