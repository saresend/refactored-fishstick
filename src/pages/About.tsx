import { Eyebrow, Links, Rule } from '../components/ui.tsx'

export default function About() {
  return (
    <>
      <Eyebrow path="about.md" />
      <h1 className="post-title">About</h1>
      <div className="prose">
        <p>I'm Sam, a dev based in nyc. Currently working at mirage, a company focused on making video editing and creative work more agentic, and part of the team behind <a href="https://x.com/trymirage/status/2102429594804429138">tesseract</a>, and <a href="https://captions.ai"><code>captions.ai</code></a>.</p>
        <p>Professionally focused on systems and architecture to join agents and media editing together, and personally interested in how to make personally flexible software more accessible.</p>
      </div>

      <Rule n="gx">elsewhere</Rule>
      <Links />
    </>
  )
}
