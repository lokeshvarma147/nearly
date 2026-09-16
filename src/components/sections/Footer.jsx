export function Footer() {
  return (
    <footer className="nearly-footer">
      <div className="wrap footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">NEARLY</h3>
            <p className="footer-tagline">SEE IT. FIND IT. NEARBY.</p>
            <p className="footer-subtext">
              Physical retail discovery platform. Connecting discerning fashion shoppers directly with local boutique inventory.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Discovery</h4>
              <a href="#discover">Visual Search</a>
              <a href="#discover">Dresses &amp; Gowns</a>
              <a href="#discover">Outerwear &amp; Coats</a>
              <a href="#discover">Tailored Blazers</a>
            </div>
            <div className="footer-col">
              <h4>Retail Partners</h4>
              <a href="#stores">Boutique Directory</a>
              <a href="#partners">Join As Retailer</a>
              <a href="#how-it-works">Inventory POS Integration</a>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#how-it-works">How NEARLY Works</a>
              <a href="#top">Storefront Experience</a>
              <span>Version 2.4.0 (Bangalore Pilot)</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NEARLY Technologies Inc. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Storefront Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
