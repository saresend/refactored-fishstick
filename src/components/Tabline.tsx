import { useEffect } from 'react'
import { navigate } from '../router.ts'

const TABS = [
  { key: '1', label: 'home', href: '/' },
  { key: '2', label: 'about', href: '/about' },
  { key: '3', label: 'writing', href: '/writing' },
]

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

// Powerline-style tab bar. Also owns the site's keyboard shortcuts: 1–3 switch tabs, j/k/g/G scroll.
export default function Tabline({ active }: { active?: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return
      const tab = TABS.find((t) => t.key === e.key)
      if (tab) navigate(tab.href)
      else if (e.key === 'j') scrollBy({ top: 64 })
      else if (e.key === 'k') scrollBy({ top: -64 })
      else if (e.key === 'g') scrollTo({ top: 0 })
      else if (e.key === 'G') scrollTo({ top: document.documentElement.scrollHeight })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="pl tabline">
      <nav className="segs" aria-label="Site">
        {TABS.map((tab) => (
          <a key={tab.href} className="seg tab" href={tab.href} aria-current={tab.label === active ? 'page' : undefined}>
            <kbd>{tab.key}</kbd>{tab.label}
          </a>
        ))}
      </nav>
      <div className="spacer" />
      <span className="hint hide-sm">j/k scroll</span>
    </header>
  )
}
