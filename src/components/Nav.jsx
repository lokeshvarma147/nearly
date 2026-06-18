import { useEffect, useState } from 'react'
import { profile } from '../data'

const links = [
  ['About', '#about'],
  ['Expertise', '#expertise'],
  ['Experience', '#experience'],
  ['Work', '#work'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo">
          <span className="gradient-text">JR</span>
          <em>/ AI Architect</em>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a className="btn btn-ghost nav-cta" href={`/${profile.resume}`} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </nav>
        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
