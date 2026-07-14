# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — run ESLint over the whole repo
- `npm run preview` — preview the production build locally
- `npm run deploy` — build and publish `dist/` to GitHub Pages via `gh-pages` (runs `predeploy`/`build` first)

There is no test suite/runner configured in this project.

## Architecture

This is a single-page personal portfolio site: React 18 + Vite, React Router for page routing, Tailwind CSS for styling, and Framer Motion / GSAP for animation. Deployed both to Vercel (`vercel.json` SPA rewrite) and GitHub Pages (`gh-pages` script).

### Routing and layout shell

`src/App.jsx` wraps everything in `ActiveSectionProvider` and a persistent `PageLayout` (`src/layouts/PageLayout.jsx`), which renders the fixed `SidebarNav` alongside routed page content. Routes (`/`, `/projects`, `/project/:projectId`) are animated in/out via Framer Motion's `AnimatePresence` using the shared `pageTransition` variants from `src/utils/animations.js` — any new route should be added inside `AnimatedRoutes` in `App.jsx` following the same `motion.div` wrapper pattern.

### Active-section tracking for nav highlighting

`src/context/ActiveSectionContext.jsx` exposes `activeSection`/`setActiveSection`, consumed by `SidebarNav` to highlight the correct nav item. `Home` is a single scrollable page composed of section components (`Hero`, `AboutIntro`, `HorizontalScroll`, `FeaturedProjects`, `SkillsSection`, `Contact`); sections are expected to call `setActiveSection` (e.g. via scroll/IntersectionObserver) as the user scrolls past them, since `/#experience`, `/#skills`, `/#contact` are anchor links into this single page rather than separate routes. `SidebarNav` resolves nav-item active state by combining `location.pathname` with `activeSection` (see `HASH_TO_SECTION` map and `isActive`).

Hash-link clicks (`/#skills` etc.) are intercepted in `SidebarNav.handleHashClick`: if already on `/`, it scrolls to the element (or dispatches a custom `nav:scrollToExperience` window event on desktop for the experience section) instead of doing a full route navigation; otherwise it navigates normally so the hash resolves after the route mounts.

### Content data

Project and skills content is data-driven, not hardcoded into components:
- `src/data/projects.js` exports `featuredProjects` (subset shown on Home) and `allProjects` (full list for `/projects`) — kept as two separate arrays with overlapping entries, so a new project usually needs an entry in both if it should also appear as featured.
- `src/data/experience.js`, `src/data/skills.js` follow the same data-file convention for their respective sections.

Each project entry has `id` (used for `/project/:projectId` routing), `tags`, `category`, and optional `featured` flag; `ProjectDetail.jsx` looks up the project by `id` from route params.

### Styling conventions

Tailwind theme (`tailwind.config.js`) defines the site's design tokens — use these instead of ad hoc colors/fonts:
- Colors: `dark-{950,900,800,700}` (backgrounds), `apricot` (primary accent, DEFAULT/light/dark), `citrus` (secondary accent), `blueberry` (muted), `cream` (warm whites for light sections)
- Fonts: `font-sans` (DM Sans, body), `font-display` (Playfair Display, headings), `font-accent` (Caveat, handwritten accents)
- Custom font sizes `display-lg/md/sm` use `clamp()` for fluid responsive scaling
- Shared easing curve `[0.19, 1, 0.22, 1]` ("out-expo") is used consistently across both Tailwind keyframes and Framer Motion/GSAP transitions in `src/utils/animations.js` — reuse this easing for new animations rather than introducing new curves.

### Animation utilities

`src/utils/animations.js` centralizes Framer Motion variants (`fadeUpVariants`, `fadeInVariants`, `staggerContainer`, `slideInLeft/Right`, `pageTransition`) and GSAP ScrollTrigger config presets (`defaultScrollTrigger`, `scrubScrollTrigger`). Prefer importing from here over redefining animation variants in individual components.
