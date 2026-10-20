import { Marked } from 'marked'

export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  minutes: number
  draft: boolean
  html: string
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

// Flat `key: value` frontmatter only; that's all posts need.
export function parseFrontmatter(source: string): { data: Record<string, string>; body: string } {
  const match = source.match(FRONTMATTER)
  if (!match) return { data: {}, body: source }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(':')
    if (colon > 0) data[line.slice(0, colon).trim()] = line.slice(colon + 1).trim()
  }
  return { data, body: source.slice(match[0].length) }
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const marked = new Marked({
  renderer: {
    // ```css theme.css  →  a code box with "theme.css" and "css" in its title bar.
    code({ text, lang }) {
      const [language = '', ...title] = (lang ?? '').trim().split(/\s+/)
      const bar = `<div class="code-bar"><span>${escapeHtml(title.join(' '))}</span><span>${escapeHtml(language)}</span></div>`
      const cls = language ? ` class="language-${escapeHtml(language)}"` : ''
      return `<div class="code">${bar}<pre><code${cls}>${escapeHtml(text)}</code></pre></div>\n`
    },
  },
})

export const readingMinutes = (body: string) =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220))

export function parsePost(slug: string, source: string): Post {
  const { data, body } = parseFrontmatter(source)
  const where = `content/posts/${slug}.md`
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${where}: file name must be lowercase-kebab-case`)
  if (!data.title) throw new Error(`${where}: frontmatter needs a "title"`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date ?? '')) throw new Error(`${where}: frontmatter "date" must be YYYY-MM-DD`)
  return {
    slug,
    title: data.title,
    date: data.date,
    tags: (data.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
    summary: data.summary ?? '',
    minutes: readingMinutes(body),
    draft: data.draft === 'true',
    html: marked.parse(body, { async: false }),
  }
}
