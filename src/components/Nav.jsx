import { useEffect, useState } from 'react'

const links = [
  ['Experience', '#top'],
  ['Discover', '#discover'],
  ['Nearby Stores', '#stores'],
  ['How It Works', '#how-it-works'],
  ['For Boutiques', '#partners'],
]

export default function Nav({ onOpenScan }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo">
          <span className="nav-logo-text">NEARLY</span>
          <span className="nav-logo-sub">RETAIL DISCOVERY</span>
        </a>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="btn btn-primary nav-scan-btn"
            onClick={() => {
              setOpen(false)
              onOpenScan?.()
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Scan Garment
          </button>
        </nav>

        <button
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
