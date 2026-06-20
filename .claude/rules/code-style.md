# Code Style Rules

## TypeScript & React

- **Components**: PascalCase for components (e.g., `StaggeredMenu.tsx`, `CustomCursor.tsx`). One component per file.
- **Functions & Variables**: camelCase for function names, hook definitions, and variables.
- **Types**: Explicitly type props interfaces. Utilize `src/types/` for shareable data shape definitions (e.g. Project data).

## Styling (Pure CSS & Variables)

- **Pure Vanilla CSS**: Avoid Tailwind CSS or heavy utility frameworks. Use CSS files scoped to their components (e.g., `Lanyard.css`) or imported globally (`src/app/globals.css`).
- **CSS Custom Properties**: Define global variables (colors, fonts, layout tokens) in `:root` inside `globals.css` (e.g., `--accent`, `--bg-primary`, `--transition-smooth`).
- **Premium Aesthetics**: Prioritize frosted glassmorphism, soft gradients, clean editorial typography, and high-craft responsiveness utilizing fluid typography (`clamp()`) and adaptive layout structures.

## Interaction & Animations

- **Zero-Dependency Animations**: Leverage CSS transitions and animation keyframes with CSS variables (e.g. staggered transitions using `style={{ '--index': i } as React.CSSProperties}`) rather than adding heavy javascript libraries.
- **Scroll Reveal**: Integrate scroll-based entrance animations using the native `useScrollReveal` hook (which implements `IntersectionObserver` internally under the hood).
- **Custom Cursor**: Ensure interactions respect custom cursor zones (`data-cursor` selectors) for interactive elements on desktops.

## Project Structure (Next.js App Router)

- `src/app/` — Routing, layouts, pages, and API route handlers.
- `src/components/` — Draggable 3D elements, standard HTML UI components, section divisions (`About`, `Works`, `Contact`).
- `src/hooks/` — Custom React hooks.
- `src/data/` — Static data stores and lists (e.g. project arrays).
- Import structure: Prioritize absolute root imports (e.g. `@/components/...` if configured in tsconfig) or clean relative paths. Maintain clear segregation between client components (`'use client'`) and server components.
