import { useEffect, useState } from 'react'
import './App.css'

type Site = { title: string; description: string }

export default function App() {
  const [site, setSite] = useState<Site | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/site', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load site')
        return response.json() as Promise<Site>
      })
      .then(setSite)
      .catch((error: Error) => {
        if (error.name !== 'AbortError') setFailed(true)
      })
    return () => controller.abort()
  }, [])

  return (
    <main>
      <header><span className="mark" aria-hidden="true">S.</span><span>PERSONAL SITE</span></header>
      <section aria-labelledby="title">
        <p className="eyebrow">A NEW BEGINNING</p>
        <h1 id="title">{site?.title ?? 'A little space on the web.'}</h1>
        <p className="description">{site?.description ?? 'My personal site is on its way.'} For now, consider this a hello.</p>
        <div className="status" role="status"><span className={failed ? 'dot error' : 'dot'} />{failed ? 'Site data is temporarily unavailable' : site ? 'Server online · SQLite connected' : 'Connecting…'}</div>
      </section>
      <footer><span>Something good starts here.</span><span>UNDER CONSTRUCTION ↗</span></footer>
    </main>
  )
}
