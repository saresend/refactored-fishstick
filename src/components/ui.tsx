import type { ReactNode } from 'react'
import { isExternal } from '../markdown.ts'
import type { Post } from '../markdown.ts'

// A link that opens off-site URLs in a new tab.
export function A({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const external = isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return <a href={href} className={className} {...external}>{children}</a>
}

export function Eyebrow({ path }: { path: string }) {
  return <p className="eyebrow"><b>~/sam-resendez</b> / {path}</p>
}

export function Rule({ n, children }: { n: string; children: ReactNode }) {
  return <div className="rule"><span>{n}</span> {children}</div>
}

export type Pill = { label: string; tone?: 'date' }

export function Pills({ items, className = '' }: { items: Pill[]; className?: string }) {
  return (
    <div className={`pills ${className}`}>
      {items.map((pill) => <span key={pill.label} className={`pill ${pill.tone ?? ''}`}>{pill.label}</span>)}
    </div>
  )
}

type CardProps = { href?: string; meta: ReactNode; title: string; summary?: string; pills: Pill[] }

export function Card({ href, meta, title, summary, pills }: CardProps) {
  const body = (
    <>
      <span className="card-meta">{meta}</span>
      <h3>{title}</h3>
      {summary && <p>{summary}</p>}
      <Pills items={pills} />
    </>
  )
  return href ? <A className="card" href={href}>{body}</A> : <div className="card">{body}</div>
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card
      href={`/writing/${post.slug}`}
      meta={<time dateTime={post.date}>{post.date}</time>}
      title={post.title}
      summary={post.summary}
      pills={[...post.tags.map((label) => ({ label })), { label: `${post.minutes} min` }]}
    />
  )
}

export function Links() {
  return (
    <div className="links">
      <A href="https://github.com/saresend">github</A>
      <A href="mailto:samresendez1@gmail.com">email</A>
      <A href="https://x.com/samresendez1">x</A>
    </div>
  )
}
