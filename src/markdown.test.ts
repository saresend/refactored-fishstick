import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { parseFrontmatter, parsePost, readingMinutes } from './markdown.ts'

test('frontmatter is split from the body', () => {
  const { data, body } = parseFrontmatter('---\ntitle: Hello: world\ndate: 2026-01-02\n---\n\nBody text\n')
  assert.deepEqual(data, { title: 'Hello: world', date: '2026-01-02' })
  assert.equal(body, '\nBody text\n')
  assert.deepEqual(parseFrontmatter('No frontmatter'), { data: {}, body: 'No frontmatter' })
})

test('posts parse metadata and render markdown', () => {
  const post = parsePost('hello-world', [
    '---',
    'title: Hello',
    'date: 2026-01-02',
    'tags: one, two ,',
    'summary: A test post',
    '---',
    '',
    '## Heading',
    '',
    'Some `inline` code and a [link](/writing) and an [external one](https://example.com/?a=1&b=2 "Example").',
    '',
    '```ts src/example.ts',
    'const tag = "<b>" && 1 < 2',
    '```',
  ].join('\n'))
  assert.equal(post.title, 'Hello')
  assert.equal(post.date, '2026-01-02')
  assert.deepEqual(post.tags, ['one', 'two'])
  assert.equal(post.summary, 'A test post')
  assert.equal(post.draft, false)
  assert.match(post.html, /<h2>Heading<\/h2>/)
  assert.match(post.html, /<code>inline<\/code>/)
  assert.match(post.html, /<a href="\/writing">link<\/a>/)
  assert.match(post.html, /<a href="https:\/\/example\.com\/\?a=1&amp;b=2" title="Example" target="_blank" rel="noopener noreferrer">external one<\/a>/)
  // Fenced code: title and language in the bar, contents escaped.
  assert.match(post.html, /<div class="code-bar"><span>src\/example\.ts<\/span><span>ts<\/span><\/div>/)
  assert.match(post.html, /<code class="language-ts">const tag = &quot;&lt;b&gt;&quot; &amp;&amp; 1 &lt; 2<\/code>/)
})

test('invalid posts fail loudly at build time', () => {
  assert.throws(() => parsePost('ok', '---\ndate: 2026-01-02\n---\n'), /needs a "title"/)
  assert.throws(() => parsePost('ok', '---\ntitle: T\ndate: Jan 2\n---\n'), /YYYY-MM-DD/)
  assert.throws(() => parsePost('Bad Name', '---\ntitle: T\ndate: 2026-01-02\n---\n'), /kebab-case/)
  assert.equal(parsePost('ok', '---\ntitle: T\ndate: 2026-01-02\ndraft: true\n---\n').draft, true)
})

test('reading time rounds to whole minutes, at least one', () => {
  assert.equal(readingMinutes(''), 1)
  assert.equal(readingMinutes('word '.repeat(880)), 4)
})

test('every post in content/posts is valid', () => {
  const dir = new URL('../content/posts/', import.meta.url)
  const files = existsSync(dir) ? readdirSync(dir).filter((name) => name.endsWith('.md')) : []
  for (const name of files) parsePost(name.slice(0, -'.md'.length), readFileSync(new URL(name, dir), 'utf8'))
})
