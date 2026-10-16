import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

export function openDatabase(filename: string) {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true })
  const db = new DatabaseSync(filename)
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      title TEXT NOT NULL,
      description TEXT NOT NULL
    );
    INSERT OR IGNORE INTO site_settings (id, title, description)
    VALUES (1, 'A little space on the web.', 'My personal site is on its way.');
  `)
  return db
}

export function getSite(db: DatabaseSync) {
  return db.prepare('SELECT title, description FROM site_settings WHERE id = ?').get(1)
}
