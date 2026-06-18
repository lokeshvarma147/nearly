import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Animates every .reveal element into view on scroll using GSAP ScrollTrigger.
export function useReveal() {
  useEffect(() => {
    const els = gsap.utils.toArray('.reveal')
    const triggers = els.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    )
    // Safety: reveal anything still hidden after load
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(t)
      triggers.forEach((tw) => tw.scrollTrigger && tw.scrollTrigger.kill())
    }
  }, [])
}
