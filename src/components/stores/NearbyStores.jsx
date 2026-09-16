import { useState, useMemo } from 'react'
import { getAllStores } from '../../services/searchService'
import { StoreCard } from './StoreCard'

export function NearbyStores({ onFilterByStore }) {
  const stores = useMemo(() => getAllStores(), [])
  const [selectedStore, setSelectedStore] = useState(stores[0])

  return (
    <section className="nearby-stores-section" id="stores">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Local Boutique Network</span>
          <h2 className="section-title">Verified Nearby Retail Partners</h2>
          <p className="section-lead">
            Every garment discovered on NEARLY is cross-referenced with verified physical stores in your city.
            Walk in, touch the textile, verify sizing, and bring it home today.
          </p>
        </div>

        <div className="stores-layout">
          {/* Stores List */}
          <div className="stores-list-column">
            {stores.map((s) => (
              <StoreCard
                key={s.id}
                store={s}
                isSelected={selectedStore?.id === s.id}
                onSelect={(store) => {
                  setSelectedStore(store)
                  onFilterByStore?.(store)
                }}
              />
            ))}
          </div>

          {/* Interactive Visual Map Preview */}
          <div className="stores-map-column">
            <div className="map-panel">
              <div className="map-badge-overlay">
                <span className="live-radar-dot" />
                <span>Scanning 5 km radius in real-time</span>
              </div>

              {/* Stylized Dark Minimal Map Graphic */}
              <div className="map-canvas-mock">
                {/* Street grid SVG */}
                <svg className="map-svg-grid" width="100%" height="100%">
                  <pattern id="street-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#street-grid)" />
                  {/* Organic road lines */}
                  <path
                    d="M-20,120 Q180,80 320,240 T680,220"
                    fill="none"
                    stroke="rgba(200,168,112,0.18)"
                    strokeWidth="3"
                  />
                  <path
                    d="M120,-20 Q160,260 220,380 T400,600"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                  />
                </svg>

                {/* User Location Pulse */}
                <div className="map-pin user-pin" style={{ top: '52%', left: '46%' }}>
                  <div className="user-pulse-ring" />
                  <div className="user-dot" />
                  <span className="pin-label">You are here</span>
                </div>

                {/* Store Markers */}
                {stores.map((s, idx) => {
                  // Approximate relative offset positions for interactive visual demo
                  const positions = [
                    { top: '34%', left: '62%' },
                    { top: '68%', left: '38%' },
                    { top: '24%', left: '32%' },
                    { top: '38%', left: '26%' },
                    { top: '78%', left: '68%' },
                  ]
                  const pos = positions[idx] || { top: '50%', left: '50%' }
                  const isCur = selectedStore?.id === s.id

                  return (
                    <div
                      key={s.id}
                      className={`map-pin store-pin ${isCur ? 'active' : ''}`}
                      style={{ top: pos.top, left: pos.left }}
                      onClick={() => setSelectedStore(s)}
                    >
                      <div className="store-pin-bubble">
                        <span className="store-pin-km">{s.distanceKm}km</span>
                      </div>
                      <span className="store-pin-name">{s.name}</span>
                    </div>
                  )
                })}
              </div>

              {/* Selected Store Floating Info Banner */}
              {selectedStore && (
                <div className="map-store-spotlight">
                  <div className="spotlight-left">
                    <span className="spotlight-status">● {selectedStore.inventoryStatus}</span>
                    <h4 className="spotlight-title">{selectedStore.name}</h4>
                    <p className="spotlight-address">{selectedStore.address}</p>
                  </div>
                  <div className="spotlight-right">
                    <span className="spotlight-distance">{selectedStore.distanceText}</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.name + ' ' + selectedStore.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
