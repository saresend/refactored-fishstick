import { Card, Eyebrow, PostCard, Rule } from '../components/ui.tsx'
import { posts } from '../posts.ts'
import { sideQuests } from '../sideQuests.ts'

export default function Writing() {
  return (
    <>
      <Eyebrow path="writing/" />
      <h1 className="post-title">Writing</h1>

      <Rule n="01">posts</Rule>
      {posts.length === 0 && <p className="empty">Nothing here yet.</p>}
      {posts.map((post) => <PostCard key={post.slug} post={post} />)}

      <Rule n="02">side-quests</Rule>
      {sideQuests.map((quest) => (
        <Card
          key={quest.name}
          href={quest.href}
          meta={quest.meta}
          title={quest.name}
          summary={quest.summary}
          pills={quest.tags.map((label) => ({ label }))}
        />
      ))}
    </>
  )
}
