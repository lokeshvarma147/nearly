import { useEffect, useRef, useState, lazy, Suspense, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Nav from './components/Nav'
import Hero from './components/Hero'
import { ProductCatalog } from './components/products/ProductCatalog'
import { NearbyStores } from './components/stores/NearbyStores'
import { HowItWorks } from './components/sections/HowItWorks'
import { ForRetailers } from './components/sections/ForRetailers'
import { Footer } from './components/sections/Footer'
import { ScanModal } from './components/discovery/ScanModal'
import { DiscoveryTerminalOverlay } from './components/discovery/DiscoveryTerminalOverlay'
import { Scene2DFallback } from './components/3d/Scene2DFallback'
import { detectDeviceQuality } from './services/adaptiveQuality'
import { experience } from './services/experienceController'
import { useReveal } from './useReveal'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const Scene3D = lazy(() => import('./components/Scene3D'))

export default function App() {
  const scrollProgress = useRef(0)
  const [activeStoryStage, setActiveStoryStage] = useState('Act 01: Physical Storefront')
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const [terminalOverlayMode, setTerminalOverlayMode] = useState(null) // null | 'scan' | 'search' | 'nearby' | 'menu'
  const [showTerminalActionPrompt, setShowTerminalActionPrompt] = useState(false)
  const [showLocationPrompt, setShowLocationPrompt] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [quality, setQuality] = useState(null)

  useReveal()

  // Initialize device quality benchmark once on mount
  useEffect(() => {
    const q = detectDeviceQuality()
    setQuality(q)
    experience.setQuality(q)
  }, [])

  useEffect(() => {
    // Master scroll trigger linking scroll position smoothly to experience controller
    const trigger = ScrollTrigger.create({
      trigger: '#scroll-track',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5, // Damped continuous scrub
      onUpdate: (self) => {
        const p = self.progress
        scrollProgress.current = p
        experience.setProgress(p)

        // Stage boundary updates only on crossing thresholds (zero per-frame state thrash)
        if (p < 0.35) {
          setShowTerminalActionPrompt(false)
          setShowLocationPrompt(false)
        } else if (p < 0.52) {
          setShowTerminalActionPrompt(false)
          setShowLocationPrompt(false)
        } else if (p < 0.78) {
          setShowTerminalActionPrompt(false)
          // Act 2: Showroom entered -> introduce nearby location discovery prompt naturally
          setShowLocationPrompt(true)
        } else {
          // Act 3: Discovery Station arrived -> prompt terminal actions
          setShowLocationPrompt(false)
          setShowTerminalActionPrompt(true)
        }
      },
    })

    // Listen to discrete stage changes from Experience Controller
    const unsubscribeStage = experience.subscribeStage((st) => {
      if (st === 'outside') setActiveStoryStage('Act 01: Physical Storefront')
      else if (st === 'entering') setActiveStoryStage('Entering Storefront')
      else if (st === 'showroom') setActiveStoryStage('Act 02: Fashion Showroom')
      else if (st === 'terminal') setActiveStoryStage('Act 03: Discovery Station')
    })

    return () => {
      trigger.kill()
      unsubscribeStage()
    }
  }, [])

  // Trigger terminal interaction modal directly from 3D screen click or UI buttons
  const handleOpenTerminal = (mode = 'menu') => {
    setTerminalOverlayMode(mode)
  }

  const handleGrantLocation = (loc) => {
    setUserLocation(loc)
    experience.setUserLocation(loc)
  }

  const isFallback = quality?.tier === 'fallback'

  return (
    <div className="nearly-app-root">
      {/* 3D or 2.5D Fallback World Canvas Host */}
      {isFallback ? (
        <Scene2DFallback onTriggerAction={handleOpenTerminal} />
      ) : (
        <Suspense fallback={<div className="nearly-loader"><span>ENTERING NEARLY BOUTIQUE...</span></div>}>
          <div className="scene-host">
            <Scene3D
              scrollProgress={scrollProgress}
              onTriggerAction={handleOpenTerminal}
              quality={quality}
            />
          </div>
        </Suspense>
      )}

      {/* Subtle cinematic gradient vignette */}
      <div className="bg-store-vignette" />

      {/* Main Navigation Header */}
      <Nav onOpenScan={() => handleOpenTerminal('scan')} />

      {/* Dedicated 3D Scroll Track */}
      <div id="scroll-track" className="scroll-journey-track">
        {/* Cinematic Status Pill HUD in top corner during 3D walkthrough */}
        <div className="story-stage-hud">
          <span className="hud-pulse" />
          <span className="hud-label">{activeStoryStage}</span>
        </div>

        <Hero onOpenScan={() => handleOpenTerminal('scan')} />

        {/* In-world 3D Journey milestone prompts */}
        <div className="journey-anchor milestone-doors">
          <div className="milestone-card">
            <span className="eyebrow">Act 01</span>
            <h3>The Physical Storefront</h3>
            <p>Bronze-framed glass double doors and curated boutique window displays welcome you in.</p>
          </div>
        </div>

        <div className="journey-anchor milestone-wardrobe">
          <div className="milestone-card">
            <span className="eyebrow">Act 02</span>
            <h3>The Fashion Showroom</h3>
            <p>Tailored wool blazers, silk midi dresses, and folded knitwear in warm LED-lit wardrobes on herringbone parquet.</p>
            {showLocationPrompt && (
              <div className="showroom-location-pill">
                <span>📍 Discover clothing available in physical stores near you</span>
                <button
                  className="btn btn-primary btn-sm btn-touch-loc"
                  onClick={() => handleOpenTerminal('nearby')}
                >
                  Enable Nearby Discovery ➔
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="journey-anchor milestone-kiosk">
          <div className="milestone-card kiosk-active-card">
            <span className="eyebrow">Act 03</span>
            <h3>The Discovery Station</h3>
            <p>You have arrived at the in-store terminal. Click below or tap directly on the screen to explore local boutique inventory.</p>

            {/* Direct Clickable Interactive Actions: SCAN / SEARCH / NEAR ME */}
            <div className="terminal-quick-actions-bar">
              <button
                className="btn btn-primary btn-kiosk"
                onClick={() => handleOpenTerminal('scan')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                SCAN
              </button>

              <button
                className="btn btn-secondary btn-kiosk"
                onClick={() => handleOpenTerminal('search')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                SEARCH
              </button>

              <button
                className="btn btn-secondary btn-kiosk"
                onClick={() => handleOpenTerminal('nearby')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                NEAR ME
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Floating Bottom HUD Prompt when at Discovery Station */}
      {showTerminalActionPrompt && (
        <div className="terminal-docked-floating-bar">
          <div className="docked-inner">
            <div className="docked-text">
              <span className="docked-badge">TERMINAL READY</span>
              <span>Select an action or tap the 3D terminal screen</span>
            </div>
            <div className="docked-buttons">
              <button className="btn btn-primary btn-sm" onClick={() => handleOpenTerminal('scan')}>
                [ SCAN ]
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => handleOpenTerminal('search')}>
                [ SEARCH ]
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => handleOpenTerminal('nearby')}>
                [ NEAR ME ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Act 4: Supplementary Physical Boutique Network & Partner Platform Surface */}
      <main className="content-app-surface">
        <ProductCatalog onOpenScan={() => handleOpenTerminal('scan')} />
        <NearbyStores />
        <HowItWorks />
        <ForRetailers />
        <Footer />
      </main>

      {/* Global Interactive Discovery Terminal Overlay (SCAN, SEARCH, NEAR ME) */}
      <DiscoveryTerminalOverlay
        isOpen={Boolean(terminalOverlayMode)}
        initialMode={terminalOverlayMode || 'menu'}
        onClose={() => setTerminalOverlayMode(null)}
        userLocation={userLocation}
        onGrantLocation={handleGrantLocation}
        onSelectProduct={() => {
          const el = document.getElementById('discover')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
      />


      {/* Global Scan Garment Modal */}
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onSelectProduct={() => {
          const el = document.getElementById('discover')
          el?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
    </div>
  )
}

