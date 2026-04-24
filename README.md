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
- Mouse-tracked spotlight and floating physics on desktop
- Animated star field background
- iOS Settings-style navigation with screen transitions
- Sections: About, Experience, Projects, Education, Resume, Contact
- Typewriter role cycling on the desktop hero
- iOS status bar with live clock
- In-app browser simulation for social links
- Fully responsive — mobile shows the phone UI fullscreen, desktop shows the 3D scene

## Getting Started

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm preview
```

## Customisation

All content lives in `src/data/portfolio-data.ts` — update `personalInfo`, `experiences`, `projects`, `skills`, and `education` there. No other files need to change for content updates.

To add a profile photo, import your image in `portfolio-data.ts` and set it as `personalInfo.photo`.

Place your resume PDF at `public/resume.pdf` to enable the Resume screen download/view buttons.
