import { useState, useEffect } from 'react'
import { searchByText, getCategories, getSuggestedSearches } from '../../services/searchService'
import { ProductCard } from '../products/ProductCard'
import { ScanModal } from '../discovery/ScanModal'

export function ProductCatalog({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState('All Items')
  const [matchFilter, setMatchFilter] = useState('ALL')
  const [distanceFilter, setDistanceFilter] = useState('10')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeModalProduct, setActiveModalProduct] = useState(null)
  const [isScanOpen, setIsScanOpen] = useState(false)

  const categories = getCategories()
  const suggested = getSuggestedSearches()

  useEffect(() => {
    let isCurrent = true

    searchByText(query, {
      category: selectedCategory,
      matchType: matchFilter,
      maxDistanceKm: distanceFilter,
    }).then((res) => {
      if (isCurrent) {
        setProducts(res)
        setLoading(false)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [query, selectedCategory, matchFilter, distanceFilter])

  return (
    <section className="catalog-section" id="discover">
      <div className="wrap">
        {/* Act 3 Application Header (Inspired by Image 3 Discover Screen) */}
        <div className="catalog-header reveal">
          <div className="catalog-title-group">
            <span className="eyebrow">Visual Search Engine</span>
            <h2 className="catalog-main-title">Discover Your Next Look</h2>
            <p className="catalog-subtitle">
              Find what you want. Where you can actually try and buy it right now.
            </p>
          </div>

          {/* Quick Actions Row: Scan / Upload / Near Me */}
          <div className="catalog-quick-actions">
            <button
              className="btn btn-primary"
              onClick={() => setIsScanOpen(true)}
              id="action-scan-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Scan Garment
            </button>
            <a href="#stores" className="btn btn-outline" id="action-nearme-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Nearby Stores
            </a>
          </div>
        </div>

        {/* Search Bar with AI style suggestions */}
        <div className="catalog-search-bar-wrap reveal">
          <div className="search-input-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by garment, silhouette, color, or style (e.g. 'Noir pleated midi dress')..."
            />
            {query && (
              <button className="search-clear-btn" onClick={() => setQuery('')}>✕</button>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="search-suggestion-row">
            <span className="suggestion-label">Suggested:</span>
            {suggested.slice(0, 4).map((sug) => (
              <button
                key={sug}
                className={`suggestion-chip ${query === sug ? 'active' : ''}`}
                onClick={() => setQuery(sug)}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls (Category pills, match type, distance) */}
        <div className="catalog-filters-bar reveal">
          {/* Category Tabs */}
          <div className="category-scroll-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Match Accuracy & Distance Radius */}
          <div className="filter-controls-group">
            <div className="filter-select-wrap">
              <label htmlFor="filter-match" className="filter-label">Match Accuracy:</label>
              <select
                id="filter-match"
                className="filter-select"
                value={matchFilter}
                onChange={(e) => setMatchFilter(e.target.value)}
              >
                <option value="ALL">All Matches</option>
                <option value="EXACT MATCH">Exact Match Only (95%+)</option>
                <option value="VERY SIMILAR">Very Similar</option>
                <option value="SIMILAR STYLE">Similar Silhouette</option>
              </select>
            </div>

            <div className="filter-select-wrap">
              <label htmlFor="filter-distance" className="filter-label">Max Proximity:</label>
              <select
                id="filter-distance"
                className="filter-select"
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
              >
                <option value="2">Within 2 km</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Match Status */}
        <div className="catalog-meta-info">
          <p className="catalog-count-text">
            Showing <strong>{products.length}</strong> physical in-store garments nearby
          </p>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="catalog-loading-grid">
            <div className="catalog-spinner" />
            <p>Scanning physical boutique racks...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid reveal">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <p className="empty-title">No direct in-store matches found</p>
            <p className="empty-desc">
              Try adjusting your search terms, broadening the distance radius, or reset your filters.
            </p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setQuery('')
                setSelectedCategory('All Items')
                setMatchFilter('ALL')
                setDistanceFilter('10')
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="modal-overlay" onClick={() => setActiveModalProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveModalProduct(null)}>✕</button>
            <div className="modal-product-layout">
              <div className="modal-img-col">
                <img src={activeModalProduct.image} alt={activeModalProduct.name} />
                <span className={`badge-match ${activeModalProduct.matchType === 'EXACT MATCH' ? 'exact' : 'similar'}`}>
                  {activeModalProduct.matchScore}% • {activeModalProduct.matchType}
                </span>
              </div>
              <div className="modal-info-col">
                <span className="eyebrow">{activeModalProduct.category}</span>
                <h3 className="modal-prod-title">{activeModalProduct.name}</h3>
                <p className="modal-prod-sub">{activeModalProduct.subtitle}</p>
                <div className="modal-pricing-row">
                  <span className="modal-price">{activeModalProduct.price}</span>
                  <span className="modal-stock-badge">● {activeModalProduct.availability}</span>
                </div>
                <p className="modal-desc">{activeModalProduct.description}</p>
                <div className="modal-specs">
                  <div><strong>Materials:</strong> {activeModalProduct.materials}</div>
                  <div><strong>Inventory Verified:</strong> {activeModalProduct.lastUpdated}</div>
                </div>

                <div className="modal-store-box">
                  <div className="modal-store-info">
                    <span className="store-pin-icon">📍</span>
                    <div>
                      <strong>{activeModalProduct.storeName}</strong>
                      <p>{activeModalProduct.distance}</p>
                    </div>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(activeModalProduct.storeName)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Directions to Boutique ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Scanner Modal */}
      <ScanModal
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        onSelectProduct={(p) => setActiveModalProduct(p)}
      />
    </section>
  )
}
