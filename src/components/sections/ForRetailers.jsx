export function ForRetailers() {
  return (
    <section className="for-retailers-section" id="partners">
      <div className="wrap">
        <div className="retailers-banner reveal">
          <div className="retailers-copy">
            <span className="eyebrow">For Independent Boutiques</span>
            <h2 className="retailers-title">Turn Digital Footprints into Store Foot Traffic</h2>
            <p className="retailers-desc">
              Join 50+ local boutique owners who list their daily floor inventory on NEARLY. High-intent shoppers searching for exact garments walk straight into your showroom ready to buy.
            </p>
            <div className="retailers-metrics">
              <div className="metric-box">
                <span className="metric-val">3.4x</span>
                <span className="metric-lbl">Higher conversion than online ads</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">0%</span>
                <span className="metric-lbl">Return rates on in-store fittings</span>
              </div>
              <div className="metric-box">
                <span className="metric-val">&lt; 15 min</span>
                <span className="metric-lbl">Average customer arrival time</span>
              </div>
            </div>
            <div className="retailers-actions">
              <button className="btn btn-primary" onClick={() => alert('Partner application submitted! Our team will contact your boutique shortly.')}>
                Partner Your Boutique →
              </button>
              <a href="#discover" className="btn btn-outline">
                Explore Demo Inventory
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
