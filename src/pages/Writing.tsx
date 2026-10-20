import { Card, Eyebrow, PostCard, Rule } from '../components/ui.tsx'
import { posts } from '../posts.ts'
import { projects } from '../projects.ts'

export default function Writing() {
  return (
    <>
      <Eyebrow path="writing/" />
      <h1 className="post-title">Writing</h1>

      <Rule n="01">posts</Rule>
      {posts.length === 0 && <p className="empty">Nothing here yet.</p>}
      {posts.map((post) => <PostCard key={post.slug} post={post} />)}

      <Rule n="02">projects</Rule>
      {projects.map((project) => (
        <Card
          key={project.name}
          href={project.href}
          meta={project.when}
          title={project.name}
          summary={project.summary}
          pills={[
            ...project.tags.map((label) => ({ label, tone: 'tag' as const })),
            ...(project.status ? [{ label: project.status, tone: 'date' as const }] : []),
          ]}
        />
      ))}
    </>
  )
}
