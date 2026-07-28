# Portfolio v2 — Interactive 3D Developer Portfolio

A single-page developer portfolio built around a live WebGL scene. React 19 renders
the UI, React Three Fiber drives the 3D layer, and GSAP ScrollTrigger ties camera
movement and section reveals to scroll position.

**Live:** [jawadrizvi.com/v2](https://jawadrizvi.com/v2)

---

## Why this exists

Most portfolio templates are static. The goal here was to make scrolling itself the
interaction — the 3D scene reacts continuously to scroll progress rather than
playing a canned animation, while staying accessible and fast on mobile.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| 3D rendering | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Animation | GSAP 3 (ScrollTrigger) |
| Linting | ESLint 10 |

## Features

- Scroll-linked 3D scene — camera and geometry respond to scroll progress
- Reusable `useReveal` hook for staggered section entrance animations
- Content driven from a single `src/data.js` file, so the portfolio can be
  re-skinned for a different person without touching components
- Responsive layout with a reduced-motion fallback
- Zero backend — deploys to any static host

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/jawadhaider0024/jawad-portfolio-v2.git
cd jawad-portfolio-v2
npm install
npm run dev
```

Open http://localhost:5173.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Page composition and scroll orchestration
├── data.js               # ALL portfolio content — edit this first
├── useReveal.js          # Scroll-reveal animation hook
├── components/
│   ├── Scene3D.jsx       # React Three Fiber canvas and scroll-linked camera
│   ├── Hero.jsx          # Landing section overlaying the 3D canvas
│   ├── Nav.jsx           # Navigation
│   └── Sections.jsx      # About / work / contact sections
└── assets/               # Images and icons
```

## Making it your own

1. Edit `src/data.js` — name, role, project list, and contact links all live there.
2. Swap `src/assets/hero.png` for your own image.
3. Adjust the palette in `src/index.css` (CSS custom properties at the top).
4. Tune the 3D scene in `src/components/Scene3D.jsx` — geometry, materials, and the
   scroll-to-camera mapping are all in that one file.

## Deployment

`npm run build` produces a static `dist/` folder. Upload it to any static host
(Netlify, Vercel, GitHub Pages, or plain nginx/Apache).

If you deploy to a subpath rather than a domain root, set the base in
`vite.config.js`:

```js
export default defineConfig({ base: '/v2/', /* ... */ })
```

## Contributing

Issues and pull requests are welcome — particularly around performance on
low-end mobile GPUs and accessibility improvements. Fork it freely for your own
portfolio; attribution is appreciated but not required.

## License

MIT — see [LICENSE](LICENSE).
