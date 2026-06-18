import { Suspense, lazy } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { About, Expertise, Experience, Projects, Achievements, Contact } from './components/Sections'
import { useReveal } from './useReveal'
import './App.css'

const Scene3D = lazy(() => import('./components/Scene3D'))

export default function App() {
  useReveal()
  return (
    <>
      <Suspense fallback={null}>
        <div className="scene-host">
          <Scene3D />
        </div>
      </Suspense>
      <div className="bg-grid" />
      <div className="bg-vignette" />
      <Nav />
      <main className="content">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
