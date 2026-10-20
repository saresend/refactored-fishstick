import { Eyebrow, Links, Rule } from '../components/ui.tsx'

const SETTINGS = [
  ['editor', 'neovim'],
  ['shell', 'zsh + tmux'],
  ['theme', 'noctis'],
  ['now', 'rebuilding this site'],
]

export default function About() {
  return (
    <>
      <Eyebrow path="about.md" />
      <h1 className="post-title">About</h1>
      <div className="prose">
        <p>Hi, I'm Sam. I'm a software engineer who likes small, sharp tools: the kind you can learn in an afternoon and keep using for a decade.</p>
        <p>I work mostly on product engineering, and spend more evenings than I'd like to admit tuning dotfiles that were already fine. This site is where I write things down: notes on building software, the occasional deep dive, and whatever I'm tinkering with.</p>
      </div>

      <Rule n=":set">all</Rule>
      <ul className="set">
        {SETTINGS.map(([key, value]) => (
          <li key={key}><span className="key">{key}</span><span className="val">{value}</span></li>
        ))}
      </ul>

      <Rule n="gx">elsewhere</Rule>
      <Links />
    </>
  )
}
