# AI Copilot Instructions for kj-portfolio

## Project Overview
This is an Astro-based portfolio website showcasing professional projects, experience, certifications, and blog content. The site uses content collections for data management and Tailwind CSS for styling.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, RSS, Sitemap generation

---

## Architecture & Data Flow

### Content Collections System
- **Location:** `src/content/config.ts` defines all schemas using Zod validation
- **Collections:** `projects`, `blog`, `experience`, `certifications`
- Each collection has strict schema validation - always check `config.ts` before adding new fields
- Content files are markdown in `src/content/{collection-name}/`
- **Key pattern:** Use `getCollection()` in components to fetch and filter content

**Example pattern from `ProjectsPreview.astro`:**
```astro
const projects = await getCollection("projects");
const featured = projects.filter(p => p.data.featured).slice(0, 4);
```

### Layout Hierarchy
- `BaseLayout.astro` - Root layout with SEO, JSON-LD schema, header/footer
- `BlogLayout.astro`, `ProjectLayout.astro` - Content-specific layouts
- **Pattern:** All page layouts extend BaseLayout for consistent metadata, theming, and navigation

### Component Organization
- `src/components/home/` - Homepage sections (Hero, About, Skills, etc.)
- `src/components/ui/` - Reusable components (ProjectCard, ExperienceCard, etc.)
- `src/components/layout/` - Header and Footer
- Components are .astro files (SSR by default, no hydration unless explicitly needed)

---

## Critical Developer Workflows

### Local Development
```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview built site locally
```

### Adding New Content
1. Add markdown file to `src/content/{collection-name}/`
2. Must match schema in `src/content/config.ts` - TypeScript validation catches schema violations at build time
3. For projects: use `featured: true` to prioritize in preview sections
4. Frontmatter dates must be valid ISO format: `date: 2024-01-15`

### Building New Sections
1. Create `.astro` component in `src/components/home/` for homepage sections
2. Import components into `src/pages/index.astro`
3. Use Tailwind classes (no custom CSS unless in `src/styles/global.css`)
4. Wrap content with `id` for anchor links: `<section id="projects">...</section>`

---

## Key Conventions & Patterns

### CSS & Styling
- **Only framework:** Tailwind CSS 4 via `@tailwindcss/vite`
- **Exceptions:** `src/styles/global.css` for global resets/utilities
- **Color scheme:** Dark theme with zinc-based grays (zinc-900 background, zinc-100 text)
- **Featured state:** Use conditional classes - see `ProjectCard.astro` line ~13 for featured vs default styling

### Component Props Pattern
All UI components use TypeScript interfaces:
```astro
---
interface Props {
  title: string;
  tech?: string[];
  featured?: boolean;
}
const { title, tech = [], featured = false } = Astro.props;
---
```

### SEO & Metadata
- `BaseLayout.astro` handles Open Graph, Twitter cards, canonical URLs, JSON-LD schema
- Override via layout props: `title`, `description`, `ogImage`, `canonical`
- Site URL: `https://kjorken.xyz` (in `astro.config.mjs`)
- Sitemap and RSS auto-generated via integrations

### Collection Queries
- Always use `getCollection()` - enables type-safety and filtering
- Featured projects in preview: filter where `data.featured === true`
- Sort chronologically: convert dates to timestamps for comparison
- Lazy load images: `loading="lazy"` on img tags in grids

---

## Key Files Reference
- **Global config:** [astro.config.mjs](astro.config.mjs) - site URL, integrations, Tailwind plugin
- **Content schemas:** [src/content/config.ts](src/content/config.ts) - all collection definitions
- **Root layout:** [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) - SEO, meta tags, structure
- **Homepage:** [src/pages/index.astro](src/pages/index.astro) - composition of home sections
- **Sample component:** [src/components/ui/ProjectCard.astro](src/components/ui/ProjectCard.astro) - reusable pattern
- **Sample section:** [src/components/home/ProjectsPreview.astro](src/components/home/ProjectsPreview.astro) - data fetching pattern

---

## When Making Changes

**Adding new collection type:**
1. Define schema in `src/content/config.ts`
2. Create corresponding layout in `src/layouts/` if rendering individual pages
3. Create dynamic route handler: `src/pages/{collection-name}/[slug].astro`

**Modifying component styling:**
- Prefer Tailwind classes over custom CSS
- Test dark theme appearance (primary bg: zinc-900, primary text: zinc-100)
- Ensure hover states are defined

**Updating SEO/metadata:**
- JSON-LD schema maintained in BaseLayout - update if adding new collection types
- Image optimization deferred to Astro's built-in handling - use standard img tags
