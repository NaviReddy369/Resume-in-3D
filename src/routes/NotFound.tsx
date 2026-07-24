import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="meta-line">SYS/404 — not mounted yet</p>
      <Link className="secondary-action" to="/">
        ← Back to the deck
      </Link>
    </div>
  )
}
