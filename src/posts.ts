import { parsePost } from './markdown.ts'
import type { Post } from './markdown.ts'

// Every content/posts/*.md file, bundled at build time. Drafts only show up in dev.
const files = import.meta.glob<string>('/content/posts/*.md', { query: '?raw', import: 'default', eager: true })

export const posts: Post[] = Object.entries(files)
  .map(([path, source]) => parsePost(path.slice(path.lastIndexOf('/') + 1, -'.md'.length), source))
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const findPost = (slug: string) => posts.find((post) => post.slug === slug)
