export function Scene2DFallback({ onTriggerAction }) {
  return (
    <div className="scene-2d-fallback-root">
      <div className="fallback-hero-backdrop">
        <div className="fallback-boutique-graphic">
          <div className="fallback-facade-card">
            <span className="fallback-badge">NEARLY PHYSICAL BOUTIQUE</span>
            <h1 className="fallback-title">NEARLY</h1>
            <p className="fallback-sub">SEE IT. FIND IT. NEARBY.</p>
            <div className="fallback-door-portal">
              <span className="portal-glow" />
              <button
                className="btn btn-primary btn-enter-terminal"
                onClick={() => onTriggerAction('menu')}
              >
                Enter Discovery Terminal ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
