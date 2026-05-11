# Christopher Mathai - Developer Portfolio

A highly interactive, performance-driven personal portfolio built with **Next.js**, featuring a physics-based 3D hero section, dynamic GitHub data fetching, and zero-dependency buttery smooth CSS animations.

## ✨ Features

- **Interactive 3D Hero**: Uses `@react-three/fiber` and `@react-three/rapier` to render a fully interactive, draggable 3D lanyard physics simulation right on the homepage. Dynamically scales based on device viewport.
- **Ultra-Optimized Assets**: The 3D model features a highly optimized `.glb` payload and uses next-generation `.avif` textures for lightning-fast loading speeds on the Vercel Edge network. 
- **Zero-Dependency Staggered Navigation**: A beautiful, highly-optimized staggered slide-out menu built entirely with modern Pure CSS transitions and variables (zero GSAP or heavy animation libraries). Features desktop hover support and scroll-based frosted glass styling.
- **Dynamic "Currently Cooking" Section**: Automatically fetches and parses the latest pushed repository via a custom Next.js API route (`/api/github-feed`) converting your real-time GitHub Atom feed into a clean UI card.
- **High-Craft Visual Design**: Utilizes custom CSS, CSS variables, and clean class-based styling without Tailwind. Features custom cursors, editorial-grade typography, and smooth glassmorphism effects.
- **Scroll Reveal Animations**: Custom `useScrollReveal` hooks utilizing native `IntersectionObserver` to animate elements elegantly into view as you scroll down the page.
- **Fully Responsive Layout**: Fluid typography and grid systems that perfectly adapt from ultra-wide desktop monitors down to mobile devices.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router & Turbopack)
- **Language:** TypeScript
- **3D & Physics:** React Three Fiber, React Three Drei, React Three Rapier, Three.js
- **Styling:** Pure Vanilla CSS, CSS Variables
- **Icons & Fonts:** Custom integrated fonts (`DM Mono`, `Instrument Serif`, `Bebas Neue`)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/` - Next.js App Router pages, layout, and API routes (`/api/github-feed`).
- `src/components/` - Reusable UI components (`Hero`, `Lanyard`, `StaggeredMenu`, `CustomCursor`, `Contact`, etc.).
- `src/data/` - Static data structures for projects and archives.
- `src/hooks/` - Custom React hooks like `useScrollReveal`.
- `public/` - Static assets, highly optimized 3D models (`.glb`), and next-gen textures (`.avif`) used by the Canvas.

## 📝 License

Designed and engineered by Christopher Mathai.
