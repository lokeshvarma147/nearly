# NEARLY — Cinematic 3D Retail Discovery Experience

SEE IT. FIND IT. NEARBY.

A scroll-linked 3D WebGL retail discovery experience and visual search platform connecting consumers with physical fashion inventory in nearby boutique stores.

React 19 renders the UI, React Three Fiber and Three.js drive the 3D storefront and showroom world, and GSAP ScrollTrigger orchestrates the camera journey from the street outside into the store, through the wardrobe showroom, to the in-store discovery terminal, and into the 2D application surface.

## The Core Story & Experience

1. **Act 1 — Storefront Facade**: Stand outside an architectural glass boutique facade with warm lighting and the NEARLY store sign.
2. **Door Opening**: Physical entrance double doors rotate open smoothly as the user scrolls forward.
3. **Act 2 — Fashion Showroom**: Camera steps inside a walk-in wardrobe featuring hanging silk midi dresses, wool coats, and slatted walnut walls.
4. **Act 3 — In-Store Discovery Station**: Encounter the central terminal asking *"What are you looking for?"* with Scan, Search, and Near Me actions.
5. **Act 4 — 3D → 2D Signature Transition**: Camera zooms into the terminal screen as the interface expands seamlessly into a full-screen fashion visual search application.
6. **Product Discovery & Map**: Real-time product results filtered by match confidence (Exact Match, Very Similar, Similar Style), category, and proximity radius with local store inventory and Google Maps directions.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| 3D rendering | Three.js + `@react-three/fiber` + `@react-three/drei` |
| Animation | GSAP 3 (ScrollTrigger) |
| Styling | Modular Vanilla CSS & Design Tokens |
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
