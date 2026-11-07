# Vishal's Portfolio

An interactive developer portfolio built as an iOS-style experience. On desktop, a 3D iPhone renders in WebGL with the portfolio navigable inside it. On mobile, the phone UI fills the screen directly.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Three.js** / **React Three Fiber** / **@react-three/drei** — 3D phone model (procedural geometry, no GLTF)
- **Framer Motion** — page transitions, spring animations, micro-interactions
- **Tailwind CSS** + **Radix UI** — styling and primitives
- **Vercel Analytics** — usage tracking

## Features

- 3D iPhone 16 Pro model with realistic titanium frame, dynamic island, camera bump and side buttons
- Interactive HTML overlay (portfolio content) synchronized with the 3D phone geometry
- Mouse-tracked spotlight and phone motion on desktop; rendering settles when idle and pauses in hidden tabs
- Lightweight CSS star field background
- iOS Settings-style grouped navigation, large titles, edge-swipe back, and reduced-motion-aware transitions
- Sections: About, Experience, Projects, Education, Resume, Contact
- Stable desktop role heading and a View projects action that opens the phone’s Projects screen
- iOS status bar with live clock
- Direct social links, email actions, and clipboard copy feedback
- Fully responsive — mobile shows the phone UI fullscreen without downloading Three.js; desktop loads the 3D scene separately

## Getting Started

Requires **Node.js 26.13.0 LTS** and **pnpm 8.15.7**. The runtime is pinned in `.nvmrc` and `.node-version`.

```bash
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Build for production (includes a check that 3D dependencies stay out of the mobile bundle):

```bash
pnpm build
pnpm preview
```

## Customisation

All content lives in `src/data/portfolio-data.ts` — update `personalInfo`, `experiences`, `projects`, `skills`, and `education` there. No other files need to change for content updates.

Place your resume PDF at `public/resume.pdf` to enable the Resume screen download/view buttons.
