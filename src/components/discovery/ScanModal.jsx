import { useState } from 'react'
import { searchByVisualScan } from '../../services/searchService'

export function ScanModal({ isOpen, onClose, onSelectProduct }) {
  const [scanState, setScanState] = useState('idle') // idle | scanning | complete
  const [currentStep, setCurrentStep] = useState(null)
  const [results, setResults] = useState([])

  const handleClose = () => {
    setScanState('idle')
    setCurrentStep(null)
    setResults([])
    onClose?.()
  }

  const startScanning = async () => {
    setScanState('scanning')
    const matched = await searchByVisualScan((step) => {
      setCurrentStep(step)
    })
    setResults(matched)
    setScanState('complete')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content scan-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close scanner">
          ✕
        </button>

        <div className="scan-modal-header">
          <span className="eyebrow">Visual Retail Intelligence</span>
          <h3 className="modal-title">Scan Garment</h3>
          <p className="modal-subtitle">
            Point your camera or simulate visual search to discover availability in nearby stores.
          </p>
        </div>

        {scanState === 'idle' && (
          <div className="scanner-viewfinder">
            <div className="viewfinder-frame">
              {/* Reference look of dress being scanned */}
              <img
                src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"
                alt="Target garment preview"
                className="viewfinder-img"
              />
              <div className="viewfinder-reticle">
                <span className="corner top-left" />
                <span className="corner top-right" />
                <span className="corner bottom-left" />
                <span className="corner bottom-right" />
                <div className="viewfinder-scanline" />
              </div>
            </div>

            <div className="scanner-actions">
              <button className="btn btn-primary scanner-start-btn" onClick={startScanning}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Run Visual Search
              </button>
            </div>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="scanner-processing">
            <div className="scanning-pulse-circle">
              <div className="pulse-ring" />
              <div className="pulse-ring delay-1" />
              <span className="pulse-icon">✦</span>
            </div>
            <p className="scanning-status-text">{currentStep?.text || 'Initializing optical recognition...'}</p>
            <div className="scanning-progress-bar">
              <div
                className="scanning-progress-fill"
                style={{ width: `${currentStep?.progress || 10}%` }}
              />
            </div>
          </div>
        )}

        {scanState === 'complete' && (
          <div className="scanner-results">
            <div className="scan-success-badge">
              <span className="match-check">✓</span>
              <span>Visual match identified in 4 local boutiques</span>
            </div>

            <div className="scan-results-grid">
              {results.map((prod) => (
                <div
                  key={prod.id}
                  className="scan-result-card"
                  onClick={() => {
                    onSelectProduct(prod)
                    onClose()
                  }}
                >
                  <img src={prod.image} alt={prod.name} className="scan-card-thumb" />
                  <div className="scan-card-info">
                    <span className={`badge-match ${prod.matchType === 'EXACT MATCH' ? 'exact' : 'similar'}`}>
                      {prod.matchScore}% • {prod.matchType}
                    </span>
                    <h4 className="scan-card-title">{prod.name}</h4>
                    <div className="scan-card-meta">
                      <span className="scan-card-price">{prod.price}</span>
                      <span className="scan-card-store">📍 {prod.storeName} ({prod.distance})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn btn-outline"
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={startScanning}
            >
              Scan Another Garment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
