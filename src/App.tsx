import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Tabline from './components/Tabline.tsx'
import About from './pages/About.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import PostPage from './pages/PostPage.tsx'
import Writing from './pages/Writing.tsx'
import { findPost } from './posts.ts'
import { interceptLinks, matchRoute, usePathname } from './router.ts'
import './App.css'

function resolve(pathname: string): { tab?: string; title?: string; page: ReactNode } {
  const route = matchRoute(pathname)
  switch (route?.name) {
    case 'home': return { tab: 'home', page: <Home /> }
    case 'about': return { tab: 'about', title: 'about', page: <About /> }
    case 'writing': return { tab: 'writing', title: 'writing', page: <Writing /> }
    case 'post': {
      const post = findPost(route.slug)
      if (post) return { tab: 'writing', title: post.title, page: <PostPage post={post} /> }
    }
  }
  return { title: 'not found', page: <NotFound path={pathname} /> }
}

export default function App() {
  const pathname = usePathname()
  const { tab, title, page } = resolve(pathname)

  useEffect(() => {
    document.addEventListener('click', interceptLinks)
    return () => document.removeEventListener('click', interceptLinks)
  }, [])

  useEffect(() => {
    document.title = title ? `${title} · sam-resendez` : 'sam-resendez'
  }, [title])

  return (
    <>
      <Tabline active={tab} />
      <main className="page">{page}</main>
    </>
  )
}
