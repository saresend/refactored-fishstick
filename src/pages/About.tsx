import { A, Eyebrow, Links, Rule } from '../components/ui.tsx'

export default function About() {
  return (
    <>
      <Eyebrow path="about.md" />
      <h1 className="post-title">About</h1>
      <div className="prose">
        <p>I'm Sam, a dev based in nyc. I currently work at mirage, a company focused on making video editing and creative work more agentic. We're the team behind <A href="https://x.com/trymirage/status/2102429594804429138">tesseract</A> and <A href="https://captions.ai"><code>captions.ai</code></A>.</p>
        <p>Professionally focused on systems and architecture to join agents and media editing together, and personally interested in shipping deeply personalizable software.</p>
      </div>

      <Rule n="gx">elsewhere</Rule>
      <Links />
    </>
  )
}
