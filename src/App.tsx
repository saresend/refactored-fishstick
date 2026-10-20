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

function resolve(pathname: string): { tab?: string; page: ReactNode } {
  const route = matchRoute(pathname)
  switch (route?.name) {
    case 'home': return { tab: 'home', page: <Home /> }
    case 'about': return { tab: 'about', page: <About /> }
    case 'writing': return { tab: 'writing', page: <Writing /> }
    case 'post': {
      const post = findPost(route.slug)
      if (post) return { tab: 'writing', page: <PostPage post={post} /> }
    }
  }
  return { page: <NotFound path={pathname} /> }
}

export default function App() {
  const pathname = usePathname()
  const { tab, page } = resolve(pathname)

  useEffect(() => {
    document.addEventListener('click', interceptLinks)
    return () => document.removeEventListener('click', interceptLinks)
  }, [])

  return (
    <>
      <Tabline active={tab} />
      <main className="page">{page}</main>
    </>
  )
}
