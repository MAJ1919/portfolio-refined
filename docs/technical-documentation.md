# Technical Documentation

## Architecture Overview

This portfolio website is a **single-page application (SPA)** built with vanilla HTML, CSS, and JavaScript — no frameworks or build tools required. The architecture follows a clean separation of concerns:

```
index.html     → Structure & content (semantic HTML5)
css/styles.css → Presentation & layout (CSS3 with custom properties)
js/script.js   → Behavior & interactivity (ES6+ JavaScript)
```

---

## File Descriptions

### `index.html`
The main (and only) HTML file containing all page sections. Key design decisions:

- **Single `<h1>` tag** for SEO — the hero section title. All other section headings use `<h2>`.
- **Semantic elements** — `<header>`, `<section>`, `<article>`, `<footer>`, and `<nav>` for accessibility and SEO.
- **SVG inline graphics** — Project mockup images are embedded as inline SVGs for crisp rendering at any resolution and zero external HTTP requests.
- **`data-theme` attribute** on `<html>` — Controls the active color scheme.
- **`data-category` attribute** on project articles — Enables tag-based filtering.
- **`novalidate` on the form** — Disables native browser validation so our custom JavaScript validation handles all feedback.

### `css/styles.css`
All styles in a single file with a clear table of contents. Key patterns:

| Pattern | Description |
|---------|-------------|
| **CSS Custom Properties** | ~40 design tokens for colors, fonts, spacing, shadows, and radii. Dark mode is achieved by overriding these variables under `[data-theme="dark"]`. |
| **BEM Naming** | Block-Element-Modifier naming convention (e.g., `.project-card__title`, `.btn--primary`). |
| **CSS Grid** | Used for the projects grid (`grid-template-columns: repeat(auto-fill, minmax(480px, 1fr))`) and skills grid. |
| **Flexbox** | Used for navigation, hero content, footer, and button groups. |
| **Glassmorphism Header** | `backdrop-filter: blur(16px)` with translucent background for a frosted-glass effect. |
| **Media Queries** | Three breakpoints: `1024px` (tablet), `768px` (mobile), `480px` (small mobile). |

### `js/script.js`
All JavaScript in a single IIFE-style block wrapped in `DOMContentLoaded`. Features implemented:

| Feature | API / Technique |
|---------|-----------------|
| **Theme Toggle** | `localStorage.getItem/setItem`, `data-theme` attribute |
| **Time Greeting** | `new Date().getHours()` |
| **Mobile Menu** | `classList.toggle('open')` on nav and hamburger |
| **Active Nav** | `scroll` event listener, `offsetTop` comparison |
| **Scroll Reveal** | `IntersectionObserver` with `threshold: 0.15` |
| **Form Validation** | `blur` event listeners, regex for email, `submit` prevention |
| **Particles** | Dynamically created `<div>` elements with CSS animation |
| **Header Shadow** | `scroll` event listener, `classList.toggle('scrolled')` |
| **Project Filtering** | `input` & `click` event listeners, logic matching string searches and arrays |

---

## Responsive Design Approach

The site uses a **desktop-first** approach with three CSS media query breakpoints:

### Desktop (> 1024px)
- Full navigation bar with horizontal links
- Two-column project grid
- Side-by-side About section (avatar + text)

### Tablet (768px – 1024px)
- Single-column project grid
- Centered About section
- Slightly reduced font sizes

### Mobile (< 768px)
- Hamburger menu with slide-in navigation drawer
- Single-column layouts throughout
- Contact form switches to single column
- Stacked footer elements
- Scroll indicator hidden

### Small Mobile (< 480px)
- Further reduced font sizes and padding
- Stacked stats and project links

### Testing
- Tested using Chrome DevTools device toolbar
- Verified on common viewport sizes: 1920px, 1024px, 768px, 375px, 320px

---

## Design Decisions

### Color Palette
- **Primary**: `#6C63FF` (violet) — modern, professional, eye-catching
- **Accent**: `#3B82F6` (blue) — complementary to primary, used in gradients
- **Success**: `#22C55E` (green) — form validation success
- **Error**: `#EF4444` (red) — form validation errors
- **Backgrounds**: Light mode uses subtle off-whites (`#FAFBFF`, `#F1F5F9`); dark mode uses deep navy (`#0B1121`, `#111827`)

### Typography
- **Font**: Inter (Google Fonts) — clean, modern, excellent readability
- **Scale**: Modular type scale from `0.75rem` to `3.5rem`
- **Weight range**: 300 (light) to 800 (extra-bold) for clear visual hierarchy

### Animations
- **Page load**: Hero content fades in with staggered delays (`0s → 0.8s`)
- **Scroll reveal**: Elements fade up from 40px below using Intersection Observer
- **Hover effects**: Cards lift with `translateY(-6px)`, buttons shift with `translateY(-2px)`
- **Particles**: CSS-only floating animation with randomized duration (10–25s)
- **Theme toggle**: Rotates slightly on hover for playful interaction

---

## Performance Considerations

- **No external dependencies** — Zero JavaScript libraries or CSS frameworks
- **Inline SVGs** — No HTTP requests for project images
- **CSS transitions** over animations where possible for GPU-accelerated rendering
- **Passive scroll listeners** — `{ passive: true }` on scroll handlers for smooth scrolling
- **Intersection Observer** — Far more efficient than scroll-based visibility detection
- **`preconnect`** — Google Fonts preconnect links for faster font loading

---

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 15+ | ✅ Full (with `-webkit-backdrop-filter`) |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not supported (CSS custom properties, Intersection Observer) |

---

## Accessibility

- **Semantic HTML5** landmark elements
- **`aria-label`** attributes on icon-only buttons
- **Keyboard navigable** — All interactive elements are focusable
- **Color contrast** — Text meets WCAG AA contrast ratios in both themes
- **`prefers-reduced-motion`** — Consider adding for users who prefer less animation (future improvement)
