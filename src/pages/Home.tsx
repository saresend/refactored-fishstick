import { Eyebrow, PostCard, Rule } from '../components/ui.tsx'
import { posts } from '../posts.ts'

const LATEST = 3

export default function Home() {
  return (
    <>
      <Eyebrow path="README.md" />
      <h1 className="display">Sam Resendez</h1>
      <p className="lede">swe at Mirage, video editing &amp; agents.<br />Previously TCS at Princeton, mobile DevX at Meta.<br />fight on ✌️</p>

      <Rule n="01">writing</Rule>
      {posts.length === 0 && <p className="empty">Nothing here yet.</p>}
      {posts.slice(0, LATEST).map((post) => <PostCard key={post.slug} post={post} />)}
      {posts.length > LATEST && <a className="more" href="/writing">all writing →</a>}
    </>
  )
}
