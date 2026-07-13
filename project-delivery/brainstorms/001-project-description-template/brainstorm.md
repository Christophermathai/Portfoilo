# Project Description Page Template

Create a dedicated, reusable project description page template (case study page) that aligns with the existing industrial/obsidian design system.

## Problem Statement
Currently, projects are displayed in a grid on the main portfolio page and the `/projects` archive, with details appearing in a modal overlay. As projects grow in complexity, a modal is insufficient for detailed case studies (e.g., architecture, challenges, media, deep dives). We need a dedicated page template (`/projects/[slug]`) that can be used universally for all projects.

## Research Findings
**Design System Analysis**:
- **Aesthetic**: Industrial, dark mode ("obsidian"), high contrast, command-console feel.
- **Typography**: 
  - `Bebas Neue` (`--font-bebas`): Huge display headings, numbers, and primary buttons.
  - `DM Mono` (`--font-dm-mono`): Body text, small tags, navigation labels, UI elements.
  - `Instrument Serif` (`--font-instrument`): Accents, quotes, roles, email addresses (often italicized).
- **Colors**: Background (`#080808`), Surface (`#111110`), Accent (`#FF3D00` - vibrant orange/red), Muted text (`#666660`), Borders (`#222220`).
- **UI Patterns**: 
  - Section headers with numbers (e.g., `01`, `02`) and horizontal lines.
  - Grid-based layouts with 1px borders (`gap: 1px`, `background: var(--border)`).
  - Hover animations (underline expansions, arrow `↗` translations).
  - Custom cursor that expands on hoverables.
  - "Reveal" scroll animations.

## Open Questions
1. Should clicking a project card in the grid navigate directly to the new page, or should the modal remain and contain a "Read Full Case Study" button?
2. Do you want to include a markdown/MDX parser for the project content, or should the template rely on structured data in `src/data/projects.ts` (e.g., arrays for features, strings for overview)?
3. Are there any specific sections you want in every project page? (e.g., "Architecture Diagram", "Challenges Faced", "Key Learnings")?

## Proposed Approaches

### Approach A: Structured Data Template (Recommended)
**How it works**: Extend `src/data/projects.ts` with new fields (`slug`, `overview`, `challenges`, `features`, `images`). Create `src/app/projects/[slug]/page.tsx` that reads this data and injects it into a hardcoded layout.
**Pros**: Easy to maintain, fast to build, consistent layout.
**Cons**: Less flexible if one project needs a radically different layout.
**Risk**: Low
**Effort**: M
**Likely files touched**: `src/data/projects.ts`, `src/app/projects/[slug]/page.tsx`, `src/components/Works.tsx`

### Approach B: MDX-Based Case Studies
**How it works**: Setup `next-mdx-remote` or similar to parse `.mdx` files from a `content/projects` directory.
**Pros**: Ultimate flexibility, can embed custom React components in markdown.
**Cons**: Requires more setup, slightly higher maintenance.
**Risk**: Low
**Effort**: L
**Likely files touched**: `src/app/projects/[slug]/page.tsx`, `content/projects/*.mdx`, `package.json`

## Recommended Delivery Path
Standard pipeline: `/spec-task -> /plan-task -> /implement-task -> /review-task`

We have started the `/plan-task` via the generated implementation plan.
