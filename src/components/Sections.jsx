import { profile, expertise, experience, projects, achievements, education } from '../data'

function Icon({ name }) {
  const common = { width: 26, height: 26, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'ai':
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19" /></svg>
    case 'arch':
      return <svg {...common}><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>
    case 'code':
      return <svg {...common}><path d="M8 6l-6 6 6 6M16 6l6 6-6 6M13 4l-2 16" /></svg>
    case 'infra':
      return <svg {...common}><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01" /></svg>
    default:
      return null
  }
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="reveal">
          <p className="eyebrow">01 / Profile</p>
          <h2 className="section-title">From e-commerce craftsman to <span className="gradient-text">AI systems architect.</span></h2>
        </div>
        <div className="reveal about-body">
          <p>{profile.summary}</p>
          <p className="about-current">
            Currently leading AI product development at <strong>Besomi Electronics</strong> — building procurement automation and intelligent data-processing systems end to end.
          </p>
          <div className="about-edu">
            {education.map((e) => (
              <div key={e.degree} className="edu-row">
                <span className="edu-year">{e.year}</span>
                <span><strong>{e.degree}</strong><br /><em>{e.school}</em></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="wrap">
        <div className="reveal section-head">
          <p className="eyebrow">02 / Capabilities</p>
          <h2 className="section-title">What I architect &amp; build</h2>
          <p className="section-lead">A full stack of capabilities — but always pointed at one outcome: intelligent systems that ship and create real leverage.</p>
        </div>
        <div className="expertise-grid">
          {expertise.map((e, i) => (
            <article className="card expertise-card reveal" key={e.title}>
              <div className="expertise-icon">< Icon name={e.icon} /></div>
              <div className="expertise-no">0{i + 1}</div>
              <h3>{e.title}</h3>
              <p className="expertise-blurb">{e.blurb}</p>
              <ul>
                {e.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <div className="reveal section-head">
          <p className="eyebrow">03 / Trajectory</p>
          <h2 className="section-title">7+ years, one direction — up</h2>
        </div>
        <div className="timeline">
          {experience.map((x) => (
            <div className="timeline-item reveal" key={x.company}>
              <div className="timeline-dot">{x.current && <span className="pulse" />}</div>
              <div className="timeline-card card">
                <div className="timeline-top">
                  <h3>{x.role}</h3>
                  <span className="timeline-period">{x.period}</span>
                </div>
                <div className="timeline-company">
                  <strong className="gradient-text">{x.company}</strong>
                  <em>{x.location}</em>
                  {x.current && <span className="badge">Current</span>}
                </div>
                <ul>
                  {x.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="reveal section-head">
          <p className="eyebrow">04 / Selected Work</p>
          <h2 className="section-title">Systems shipped to production</h2>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <article className={`card project-card reveal ${p.featured ? 'featured' : ''}`} key={p.name}>
              {p.featured && <span className="project-flag">★ Flagship</span>}
              <div className="project-tag">{p.tag}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => <span key={s}>{s}</span>)}
              </div>
              {p.link && (
                <a className="project-link" href={`https://${p.link}`} target="_blank" rel="noreferrer">
                  {p.link} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Achievements() {
  return (
    <section className="section" id="impact">
      <div className="wrap">
        <div className="reveal section-head">
          <p className="eyebrow">05 / Impact</p>
          <h2 className="section-title">Outcomes, not just output</h2>
        </div>
        <div className="achieve-list">
          {achievements.map((a, i) => (
            <div className="achieve-row reveal card" key={i}>
              <span className="achieve-no gradient-text">0{i + 1}</span>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-inner reveal">
        <p className="eyebrow">06 / Let's build</p>
        <h2 className="contact-title">Have a system worth <span className="gradient-text">architecting?</span></h2>
        <p className="section-lead" style={{ margin: '0 auto 2.4rem' }}>
          I partner with teams to design and ship intelligent, production-grade platforms. Let's talk about yours.
        </p>
        <a className="btn btn-primary contact-mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-links">
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={`https://${profile.site}`} target="_blank" rel="noreferrer">{profile.site} ↗</a>
          <a href={`/${profile.resume}`} target="_blank" rel="noreferrer">Résumé (PDF) ↗</a>
        </div>
        <footer className="footer">
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React, Three.js &amp; GSAP.
        </footer>
      </div>
    </section>
  )
}
