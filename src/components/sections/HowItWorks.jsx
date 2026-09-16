export function HowItWorks() {
  const steps = [
    {
      num: '01',
      tag: 'Capture or Search',
      title: 'Spot a garment anywhere',
      desc: 'Whether it is an outfit you see on the street, an image on social media, or a specific silhouette in mind, snap a photo or describe it in natural language.',
    },
    {
      num: '02',
      tag: 'Visual Intelligence',
      title: 'Match against physical retail racks',
      desc: 'NEARLY analyzes lapels, drape, fabric composition, and color tone, cross-referencing against real-time physical store inventories nearby.',
    },
    {
      num: '03',
      tag: 'Try & Buy Today',
      title: 'Walk in, try the fit, take it home',
      desc: 'Skip three-day shipping delays and returns. See which local boutique has your size waiting on the rack right now.',
    },
  ]

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">The Retail Paradigm</span>
          <h2 className="section-title">Bridging Digital Discovery &amp; Physical Commerce</h2>
          <p className="section-lead">
            The world doesn’t need more e-commerce warehouses. It needs a smarter lens into the beautiful boutique retail that already surrounds us.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="step-card reveal">
              <div className="step-num">{step.num}</div>
              <span className="step-tag">{step.tag}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
