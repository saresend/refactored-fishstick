import { Eyebrow, Links, PostCard, Rule } from '../components/ui.tsx'
import { posts } from '../posts.ts'

const LATEST = 3

export default function Home() {
  return (
    <>
      <Eyebrow path="README.md" />
      <h1 className="display">Sam Resendez</h1>
      <p className="lede">Software engineer. I like small, sharp tools, quiet interfaces, and writing things down.</p>

      <Rule n="01">writing</Rule>
      {posts.length === 0 && <p className="empty">Nothing here yet.</p>}
      {posts.slice(0, LATEST).map((post) => <PostCard key={post.slug} post={post} />)}
      {posts.length > LATEST && <a className="more" href="/writing">all writing →</a>}

      <Rule n="02">about</Rule>
      <div className="prose">
        <p>I work mostly on product engineering, and spend more evenings than I'd like to admit tuning dotfiles that were already fine. <a href="/about">More about me</a>.</p>
      </div>
      <Links />
    </>
  )
}
