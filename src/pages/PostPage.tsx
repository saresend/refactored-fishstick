import { Eyebrow, Pills } from '../components/ui.tsx'
import type { Post } from '../markdown.ts'

export default function PostPage({ post }: { post: Post }) {
  return (
    <article>
      <a className="back" href="/writing">← writing</a>
      <Eyebrow path={`writing / ${post.slug}.md`} />
      <h1 className="post-title">{post.title}</h1>
      <Pills
        className="post-meta"
        items={[
          { label: post.date, tone: 'date' },
          { label: `${post.minutes} min read` },
          ...post.tags.map((label) => ({ label })),
          ...(post.draft ? [{ label: 'draft' }] : []),
        ]}
      />
      {/* Rendered from our own markdown files at build time, so the HTML is trusted. */}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
