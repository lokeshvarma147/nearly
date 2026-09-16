import { useState, useRef, useEffect } from 'react'
import { STORES } from '../../data/stores'
import { PRODUCTS } from '../../data/products'

export function DiscoveryTerminalOverlay({
  isOpen,
  initialMode = 'menu', // 'menu' | 'scan' | 'search' | 'nearby'
  onClose,
  onSelectProduct,
  userLocation = null,
  onGrantLocation = () => {},
}) {
  const [mode, setMode] = useState(initialMode)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(PRODUCTS)
  const [isScanning, setIsScanning] = useState(false)
  const [scanStream, setScanStream] = useState(null)
  const [cameraError, setCameraError] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [selectedStore, setSelectedStore] = useState(STORES[0])
  const [locationStatus, setLocationStatus] = useState('idle') // idle | requesting | success | denied

  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  // Sync mode when initialMode changes
  useEffect(() => {
    if (initialMode) setMode(initialMode)
  }, [initialMode])

  // Camera cleanup on close or mode change
  useEffect(() => {
    return () => {
      if (scanStream) {
        scanStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [scanStream])

  // Start real device camera
  const startCamera = async () => {
    setCameraError(null)
    setCapturedImage(null)
    setIsScanning(true)

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported on this browser')
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' }, // Prefer rear camera on phones
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      setScanStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.warn('Camera access unavailable:', err)
      setCameraError(err.message || 'Camera permission denied or camera not found.')
      setIsScanning(false)
    }
  }

  // Handle capture frame or file input
  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth || 640
      canvas.height = videoRef.current.videoHeight || 480
      const ctx = canvas.getContext('2d')
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
      setCapturedImage(dataUrl)
      // Stop stream
      if (scanStream) {
        scanStream.getTracks().forEach((track) => track.stop())
        setScanStream(null)
      }
      setIsScanning(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setCapturedImage(reader.result)
        setIsScanning(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Real Geolocation
  const requestLocation = () => {
    setLocationStatus('requesting')
    if (!navigator.geolocation) {
      setLocationStatus('denied')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationStatus('success')
        onGrantLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
      },
      (err) => {
        console.warn('Geolocation error:', err)
        setLocationStatus('denied')
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  }

  // Search logic with natural language query parsing
  const handleSearch = (q) => {
    setSearchQuery(q)
    const norm = q.toLowerCase().trim()
    if (!norm) {
      setSearchResults(PRODUCTS)
      return
    }

    // Natural keywords filtering
    const filtered = PRODUCTS.filter((p) => {
      const target = `${p.name} ${p.category} ${p.subtitle} ${p.materials} ${p.storeName}`.toLowerCase()
      // Check words
      const words = norm.split(' ')
      return words.some((w) => w.length > 2 && target.includes(w))
    })

    setSearchResults(filtered.length > 0 ? filtered : PRODUCTS)
  }

  if (!isOpen) return null

  return (
    <div className="terminal-modal-overlay" onClick={onClose}>
      <div
        className="terminal-kiosk-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="NEARLY Discovery Terminal"
      >
        {/* Terminal Hardware Top Bezel */}
        <div className="terminal-bezel-bar">
          <div className="terminal-hardware-badges">
            <span className="terminal-led-dot active" />
            <span className="terminal-kiosk-tag">KIOSK 03 // LIVE BOUTIQUE RADAR</span>
          </div>
          <button className="terminal-close-btn" onClick={onClose} aria-label="Close terminal">
            ✕
          </button>
        </div>

        {/* Main Terminal Screen Content */}
        <div className="terminal-screen-interior">
          {/* Header Banner */}
          <div className="terminal-masthead">
            <span className="eyebrow terminal-eyebrow">ACT 03 // DISCOVERY TERMINAL</span>
            <h2 className="terminal-main-title">WHAT ARE YOU LOOKING FOR?</h2>
            <p className="terminal-tagline">Search physical store inventory across verified boutiques</p>
          </div>

          {/* Quick Navigation Tabs (SCAN / SEARCH / NEAR ME) */}
          <div className="terminal-nav-tabs">
            <button
              className={`terminal-tab-btn ${mode === 'scan' ? 'active' : ''}`}
              onClick={() => {
                setMode('scan')
                startCamera()
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>SCAN</span>
            </button>

            <button
              className={`terminal-tab-btn ${mode === 'search' ? 'active' : ''}`}
              onClick={() => setMode('search')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>SEARCH</span>
            </button>

            <button
              className={`terminal-tab-btn ${mode === 'nearby' ? 'active' : ''}`}
              onClick={() => setMode('nearby')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>NEAR ME</span>
            </button>
          </div>

          {/* 1. SCAN GARMENT VIEW */}
          {mode === 'scan' && (
            <div className="terminal-tab-content terminal-scan-flow">
              <div className="scanner-real-camera-wrap">
                <div className="scanner-viewport-box">
                  {isScanning && !cameraError && (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="scanner-live-video"
                    />
                  )}

                  {capturedImage && (
                    <img src={capturedImage} alt="Captured garment" className="scanner-live-video" />
                  )}

                  {(!isScanning && !capturedImage) || cameraError ? (
                    <div className="scanner-camera-placeholder">
                      <img
                        src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
                        alt="Garment sample"
                        className="scanner-live-video sample-overlay"
                      />
                      {cameraError && (
                        <div className="camera-err-notice">
                          <span>⚠️ {cameraError}</span>
                          <p>You can upload a photo from your gallery below.</p>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Viewfinder Target Reticle */}
                  <div className="scanner-reticle-corners">
                    <span className="reticle-corner tl" />
                    <span className="reticle-corner tr" />
                    <span className="reticle-corner bl" />
                    <span className="reticle-corner br" />
                    <div className="reticle-center-garment-guide">
                      <span>GARMENT AREA</span>
                    </div>
                  </div>
                </div>

                {/* Shutter / Upload Buttons */}
                <div className="scanner-touch-controls">
                  {isScanning ? (
                    <button className="btn btn-primary btn-shutter" onClick={handleCapture}>
                      📸 Capture &amp; Match
                    </button>
                  ) : (
                    <button className="btn btn-primary btn-shutter" onClick={startCamera}>
                      {capturedImage ? '🔄 Retake Photo' : '📷 Open Camera'}
                    </button>
                  )}

                  <button
                    className="btn btn-secondary btn-upload-photo"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📁 Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              {/* Verified In-Store Matches */}
              <div className="terminal-scan-results-shelf">
                <div className="shelf-header">
                  <span className="match-tag">✓ VERIFIED IN BOUTIQUE RACKS NEARBY</span>
                  <p>Garments sharing similar drape &amp; cut available today:</p>
                </div>

                <div className="mobile-product-cards-stack">
                  {PRODUCTS.slice(0, 3).map((prod) => (
                    <div
                      key={prod.id}
                      className="mobile-touch-prod-card"
                      onClick={() => {
                        onSelectProduct?.(prod)
                        onClose()
                      }}
                    >
                      <img src={prod.image} alt={prod.name} className="prod-card-thumb" />
                      <div className="prod-card-body">
                        <span className="prod-badge-gold">{prod.category}</span>
                        <h4 className="prod-name">{prod.name}</h4>
                        <div className="prod-meta-row">
                          <span className="prod-price">{prod.price}</span>
                          <span className="prod-dist">📍 {prod.distance}</span>
                        </div>
                        <span className="prod-store-sub">{prod.storeName}</span>
                        <button className="btn btn-primary btn-sm btn-touch-view">
                          View Store Fitting ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. SEARCH INTERFACE VIEW */}
          {mode === 'search' && (
            <div className="terminal-tab-content terminal-search-flow">
              <div className="terminal-search-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="terminal-search-input"
                  placeholder="black oversized shirt, cream blazer, linen pants..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button className="terminal-clear-btn" onClick={() => handleSearch('')}>✕</button>
                )}
              </div>

              {/* Natural Language Suggested Queries */}
              <div className="terminal-chips-row">
                <span className="chips-label">Suggested:</span>
                {[
                  'White linen shirt',
                  'Black oversized shirt',
                  'Cream structured blazer',
                  'Blue denim jacket',
                ].map((sug) => (
                  <button
                    key={sug}
                    className={`terminal-chip ${searchQuery === sug ? 'active' : ''}`}
                    onClick={() => handleSearch(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Touch-First Single Column Results Stack */}
              <div className="terminal-search-results">
                <div className="terminal-results-meta">
                  Showing <strong>{searchResults.length}</strong> physical in-store garments
                </div>

                <div className="mobile-product-cards-stack">
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      className="mobile-touch-prod-card"
                      onClick={() => {
                        onSelectProduct?.(prod)
                        onClose()
                      }}
                    >
                      <img src={prod.image} alt={prod.name} className="prod-card-thumb" />
                      <div className="prod-card-body">
                        <span className="prod-badge-gold">{prod.category}</span>
                        <h4 className="prod-name">{prod.name}</h4>
                        <div className="prod-meta-row">
                          <span className="prod-price">{prod.price}</span>
                          <span className="prod-dist">📍 {prod.distance}</span>
                        </div>
                        <span className="prod-store-sub">{prod.storeName}</span>
                        <button className="btn btn-primary btn-sm btn-touch-view">
                          View In Store ➔
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. NEAR ME / LOCATION VIEW */}
          {mode === 'nearby' && (
            <div className="terminal-tab-content terminal-nearby-flow">
              {/* Geolocation Prompt Banner */}
              <div className="location-permission-banner">
                <div className="location-banner-text">
                  <span className="pin-symbol">📍</span>
                  <div>
                    <strong>Find boutiques near you</strong>
                    <p>Enable device location to sort physical store racks by distance.</p>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-sm btn-grant-loc"
                  onClick={requestLocation}
                  disabled={locationStatus === 'requesting'}
                >
                  {locationStatus === 'success'
                    ? '✓ Location Active'
                    : locationStatus === 'requesting'
                    ? 'Locating...'
                    : 'USE MY LOCATION'}
                </button>
              </div>

              <div className="terminal-nearby-grid">
                {/* Store Cards List */}
                <div className="terminal-stores-list">
                  <div className="terminal-results-meta">
                    <strong>{STORES.length} Verified Boutiques</strong> in Bangalore
                  </div>

                  {STORES.map((store) => {
                    const isSel = selectedStore?.id === store.id
                    return (
                      <div
                        key={store.id}
                        className={`terminal-store-row ${isSel ? 'active' : ''}`}
                        onClick={() => setSelectedStore(store)}
                      >
                        <div className="store-row-left">
                          <span className="store-name">{store.name}</span>
                          <span className="store-hood">{store.neighborhood}</span>
                          <span className="store-status">● {store.inventoryStatus}</span>
                        </div>
                        <div className="store-row-right">
                          <span className="store-distance">{store.distanceText}</span>
                          <span className="store-rating">★ {store.rating}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Selected Store Touch Detail Box */}
                <div className="terminal-store-radar-box">
                  <div className="radar-header">
                    <span className="live-radar-dot" />
                    <span>Real-time boutique inventory locator</span>
                  </div>

                  <div className="radar-store-card">
                    <span className="eyebrow">{selectedStore.tag}</span>
                    <h3>{selectedStore.name}</h3>
                    <p className="radar-address">{selectedStore.address}</p>

                    <div className="radar-meta-row">
                      <div>
                        <strong>Distance:</strong> {selectedStore.distanceText}
                      </div>
                      <div>
                        <strong>Hours:</strong> {selectedStore.hours}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedStore.phone}
                      </div>
                    </div>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.name + ' ' + selectedStore.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{ marginTop: '1.2rem', width: '100%', justifyContent: 'center' }}
                    >
                      Directions to Boutique ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
