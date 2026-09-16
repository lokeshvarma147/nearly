import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero({ onOpenScan }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      })
      gsap.from('.hero-main-title', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        delay: 0.35,
      })
      gsap.from('.hero-tagline', {
        y: 25,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.55,
      })
      gsap.from('.hero-actions-row > *', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.75,
      })
      gsap.from('.hero-pill-stats > *', {
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.95,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="wrap hero-inner">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">Physical Retail Discovery</p>
          <h1 className="hero-main-title">
            <span>SEE IT.</span>
            <span>FIND IT.</span>
            <span className="gold-text">NEARBY.</span>
          </h1>

          <p className="hero-tagline">
            Your next find is already in a store around the corner. Search dresses, coats, and wardrobe essentials across verified physical boutiques in your city.
          </p>

          <div className="hero-actions-row">
            <button className="btn btn-primary" onClick={onOpenScan}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Scan What You See
            </button>
            <a href="#discover" className="btn btn-outline">
              Explore Live Inventory ↓
            </a>
          </div>

          <div className="hero-pill-stats">
            <div className="pill-stat">
              <span className="pill-dot" />
              <strong>50+</strong>
              <span>Local Boutiques</span>
            </div>
            <div className="pill-stat">
              <span className="pill-dot" />
              <strong>1.4 km</strong>
              <span>Avg Distance</span>
            </div>
            <div className="pill-stat">
              <span className="pill-dot" />
              <strong>Live</strong>
              <span>Rack Inventory</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span className="scroll-label">SCROLL TO ENTER STORE</span>
        <div className="scroll-arrow-line" />
      </div>
    </section>
  )
}
