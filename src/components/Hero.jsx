import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile, stats } from '../data'

export default function Hero() {
  const rolesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2,
      })
      gsap.from('.hero-meta > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.9,
      })
      gsap.from('.hero-stat', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.2,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <p className="eyebrow hero-line">{profile.location}</p>
        <h1 className="hero-title">
          <span className="hero-line">Syed Jawad</span>
          <span className="hero-line gradient-text">Haider Rizvi</span>
        </h1>
        <div className="hero-roles hero-line" ref={rolesRef}>
          {profile.roles.map((r, i) => (
            <span key={r} className="role-chip">
              {r}
              {i < profile.roles.length - 1 && <i>•</i>}
            </span>
          ))}
        </div>
        <p className="hero-tagline hero-line">{profile.tagline}</p>
        <div className="hero-meta">
          <a className="btn btn-primary" href="#work">View My Work →</a>
          <a className="btn btn-ghost" href="#contact">Let's Talk</a>
        </div>
        <div className="hero-stats">
          {stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <div className="hero-stat-value gradient-text">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scroll">
        <span>SCROLL</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
