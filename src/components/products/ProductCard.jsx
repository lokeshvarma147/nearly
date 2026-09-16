import { useState } from 'react'

export function ProductCard({ product, onSelect }) {
  const [isSaved, setIsSaved] = useState(false)

  const getBadgeClass = (type) => {
    switch (type) {
      case 'EXACT MATCH':
        return 'exact'
      case 'VERY SIMILAR':
        return 'similar'
      case 'SIMILAR STYLE':
        return 'style'
      default:
        return 'similar'
    }
  }

  return (
    <article className="product-card" onClick={() => onSelect?.(product)}>
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />

        {/* Match Percentage Badge */}
        <div className="product-badge-float">
          <span className={`badge-match ${getBadgeClass(product.matchType)}`}>
            {product.matchScore}% MATCH • {product.matchType}
          </span>
        </div>

        {/* Favorite Save Button */}
        <button
          className={`product-save-btn ${isSaved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            setIsSaved(!isSaved)
          }}
          aria-label="Save to favorites"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? '#C8A870' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Subtle quick-view hover hint */}
        <div className="product-overlay-action">
          <span>View In-Store Details</span>
        </div>
      </div>

      <div className="product-body">
        <div className="product-category-row">
          <span className="product-category">{product.category}</span>
          <span className="product-availability-tag">
            <span className="stock-dot" />
            {product.availability}
          </span>
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-subtitle">{product.subtitle}</p>

        <div className="product-footer">
          <div className="product-pricing">
            <span className="price-current">{product.price}</span>
            {product.originalPrice && (
              <span className="price-original">{product.originalPrice}</span>
            )}
          </div>

          <div className="product-store-info">
            <div className="store-name-line">
              <span className="store-pin-icon">📍</span>
              <strong className="store-title">{product.storeName}</strong>
            </div>
            <span className="store-dist-time">
              {product.distance} • Updated {product.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
