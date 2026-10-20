import { Eyebrow } from '../components/ui.tsx'

export default function NotFound({ path }: { path: string }) {
  return (
    <>
      <Eyebrow path="?" />
      <h1 className="post-title">Not found</h1>
      <p className="error">E211: File "{path}" no longer available</p>
      <a className="back" href="/">← home</a>
    </>
  )
}
