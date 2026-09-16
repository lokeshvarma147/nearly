export function StoreCard({ store, onSelect, isSelected }) {
  return (
    <div
      className={`store-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect?.(store)}
    >
      <div className="store-card-header">
        <div>
          <span className="store-card-tag">{store.tag}</span>
          <h4 className="store-card-name">{store.name}</h4>
          <span className="store-card-hood">{store.neighborhood}</span>
        </div>
        <div className="store-card-dist-pill">
          <strong>{store.distanceKm}</strong>
          <span>km</span>
        </div>
      </div>

      <p className="store-card-address">{store.address}</p>

      <div className="store-card-meta">
        <div className="store-hours">
          <span className="hours-dot" />
          <span>{store.hours}</span>
        </div>
        <span className="store-rating">★ {store.rating} ({store.reviewsCount})</span>
      </div>

      <div className="store-card-actions">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline store-action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          Get Directions ↗
        </a>
        <button className="btn btn-primary store-action-btn" onClick={() => onSelect?.(store)}>
          View Store
        </button>
      </div>
    </div>
  )
}
