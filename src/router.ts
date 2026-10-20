import { useSyncExternalStore } from 'react'

export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'writing' }
  | { name: 'post'; slug: string }

export function matchRoute(pathname: string): Route | null {
  const path = pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return { name: 'home' }
  if (path === '/about') return { name: 'about' }
  if (path === '/writing') return { name: 'writing' }
  const post = path.match(/^\/writing\/([a-z0-9-]+)$/)
  return post ? { name: 'post', slug: post[1] } : null
}

const subscribe = (onChange: () => void) => {
  addEventListener('popstate', onChange)
  return () => removeEventListener('popstate', onChange)
}

export const usePathname = () => useSyncExternalStore(subscribe, () => location.pathname)

export function navigate(to: string) {
  if (to !== location.pathname) {
    history.pushState(null, '', to)
    dispatchEvent(new PopStateEvent('popstate'))
  }
  scrollTo(0, 0)
}

// Plain <a href="/writing"> links, including ones inside rendered markdown, navigate without a page reload.
export function interceptLinks(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const anchor = (event.target as Element | null)?.closest('a')
  if (!anchor || anchor.target || anchor.hasAttribute('download')) return
  const url = new URL(anchor.href)
  if (url.origin !== location.origin || url.hash || !matchRoute(url.pathname)) return
  event.preventDefault()
  navigate(url.pathname)
}
