# AGENTS.md — ViFi Corporate Website (Astro + GitHub Pages)

Read this file before making any changes. This repository is the public-facing marketing site for ViFi and is intentionally separate from the application platform.

If a more local instruction file exists in a subdirectory, the local file wins for that scope.

## Mission

Maintain and extend this Astro-based static corporate site. The site must remain:

- statically generated
- deployable on GitHub Pages
- fast by default
- highly maintainable for AI-assisted iteration
- safe for corporate marketing content
- minimal in client-side JavaScript unless a feature truly needs it

## Current Repo Reality

This repo contains an Astro site deployed to GitHub Pages at `https://vifi.us`. The Hugo-to-Astro migration is complete. There are no Hugo files remaining.

The site is currently a coming-soon landing page with the foundation for a full corporate marketing site.

## Primary Goals

1. Build a polished corporate website in Astro.
2. Preserve static hosting on GitHub Pages.
3. Minimize JavaScript and hydration.
4. Make future AI-agent edits safe and predictable.
5. Establish clean structure for landing pages, pricing, docs/blog, SEO, and conversion-focused CTAs.

## Non-Goals

This repository must NOT contain:

- dashboard or authenticated app code
- backend APIs
- customer data handling
- server-side sessions
- ad hoc Node services
- feature flags tied to app runtime
- business logic copied from the platform repo

If a requirement needs backend behavior, use a static-friendly external service or move that work to the platform repo.

## Approved Stack

- Framework: Astro
- Output mode: static
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: shadcn/ui only when React-based interactivity is justified
- React support: `@astrojs/react` only when needed for islands
- Icons: Lucide
- Content: Astro Content Collections for structured content
- Markdown/MDX: allowed for blog, docs, case studies, changelog, and legal pages
- Deployment: GitHub Pages via GitHub Actions

## Architecture Rules

### Astro First

Default to `.astro` components and server-rendered static markup.

Use React components only for small interactive islands such as:

- accordion/faq disclosure patterns if native HTML is insufficient
- dialogs
- tabs
- carousels
- calculators
- complex animated widgets that cannot be done cleanly in Astro

Do NOT convert the site into a React SPA.

### Hydration Policy

Hydrate as little as possible.

Preferred order:

1. no hydration
2. `client:visible`
3. `client:idle`
4. `client:load`

Do not use `client:load` unless the page experience is broken without immediate hydration.

### Content and Page Model

Use file-based routing in `src/pages/`.

Suggested top-level routes:

- `/`
- `/about`
- `/pricing`
- `/contact`
- `/solutions/[segment]`
- `/blog/[slug]`
- `/legal/privacy`
- `/legal/terms`

If docs or articles are added, they must come from content collections rather than hardcoded page blobs.

## Repository Structure

Target structure:

- `src/pages/` — route files
- `src/layouts/` — shared layouts
- `src/components/site/` — shared marketing components
- `src/components/blocks/` — larger page sections
- `src/components/ui/` — shadcn/ui components only
- `src/content/` — collections such as `blog`, `pages`, `testimonials`, `faqs`
- `src/data/` — typed local data for nav, plans, testimonials, comparisons
- `src/styles/` — global styles and Tailwind entrypoints
- `public/` — static assets, favicons, social images, CNAME
- `.github/workflows/` — Pages deployment workflow

Avoid dumping everything into `src/components/`.

## Naming Conventions

- Astro components: `PascalCase.astro`
- React components: `PascalCase.tsx`
- Utility files: `camelCase.ts`
- Route files: Astro route naming conventions
- Content slugs: lowercase kebab-case
- Asset filenames: lowercase kebab-case

## Git and Commit Rules

- Use [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `chore:`, `docs:`).
- Keep commit messages short and clear.
- Do NOT add co-author trailers or other metadata to commit messages.

## Change Rules

1. Audit what exists before deleting.
2. Preserve content and brand intent where it is still correct.
3. Leave the repository in a coherent state after every change.

## GitHub Pages Rules

The site must remain deployable to GitHub Pages.

### Astro Config

Set `site` correctly in `astro.config.*`.

Set `base` only if deployment is under a repository subpath such as `/repo-name`.

Do NOT set a repo subpath `base` if the site is deployed at the root custom domain.

### Custom Domain

If this site uses a custom domain, preserve or add:

- `public/CNAME`

Do not accidentally break custom-domain deployments during the migration.

### Workflow

Prefer the official Astro GitHub Pages deployment approach over a custom build pipeline unless there is a documented repo-specific reason not to.

## Styling and Design Rules

- Build a premium corporate design, not a template-looking startup landing page.
- Favor calm, modern, conversion-oriented design.
- Prioritize typography, spacing, hierarchy, and clarity over novelty.
- Avoid gratuitous animation.
- Maintain consistent section spacing and container widths.
- Keep color usage disciplined and accessible.

### Fonts

Prefer self-hosted fonts or system fonts.

Do not add unnecessary third-party font/runtime dependencies if they hurt performance or privacy.

### Images

- Use optimized static assets.
- Prefer SVG for logos and simple illustrations.
- Use Astro image tooling where appropriate.
- Do not hotlink production assets from third-party URLs.

## SEO Rules

Every public page must have:

- unique title
- meta description
- canonical URL where appropriate
- Open Graph tags
- Twitter/X social metadata where appropriate

Also include:

- sitemap
- robots.txt
- structured data when useful
- clean heading hierarchy
- semantic HTML
- crawlable internal links

Do not ship placeholder SEO values.

## Accessibility Rules

All pages must meet a strong accessibility baseline:

- semantic landmarks
- keyboard-accessible navigation
- visible focus states
- proper color contrast
- labeled controls
- alt text for meaningful images
- no reliance on hover-only interactions

Accessibility is not optional.

## Performance Rules

Performance is a core feature.

- Default to static HTML and CSS
- Keep hydrated islands rare and small
- Avoid heavy animation libraries unless justified
- Avoid remote script bloat
- Avoid render-blocking third-party embeds
- Keep bundle size small
- Avoid shipping React where pure Astro works

Do not add analytics, chat widgets, or trackers unless explicitly requested.

## Content Safety Rules

This is a corporate site. Marketing claims must be supportable.

Do NOT introduce or preserve claims like:

- compliance certifications
- security guarantees
- uptime percentages
- customer counts
- model/provider claims
- integration claims
- pricing promises

unless they are explicitly confirmed in the repo or task context.

If the existing site contains unverified claims, flag them in your summary and replace them with safer wording if instructed to proceed.

## Forms and Conversion

Use static-friendly form handling only.

Allowed examples:

- Formspree
- Basin
- a similar hosted form backend
- `mailto:` only for temporary placeholder states

Do not build a custom backend in this repo.

## Content Collections

If blog/docs/resources are introduced, define schemas and validate frontmatter.

Suggested collections:

- `blog`
- `resources`
- `faqs`
- `legal`
- `site-pages`

Content schema should enforce consistency for fields like:

- title
- description
- publishedAt
- updatedAt
- draft
- tags
- hero image
- canonical URL

## Testing and Quality Gates

Before considering work complete, run and fix issues from the repo’s standard quality checks.

Minimum expectations:

- install succeeds
- local dev server runs
- production build succeeds
- GitHub Pages path assumptions are correct
- lint passes
- type-check passes
- no broken internal links introduced
- no obvious accessibility regressions
- no unused dependencies added casually

If tests are not yet present, prefer adding lightweight checks over adding nothing.

## Dependency Rules

Do not add a dependency unless it clearly earns its keep.

Before adding one, ask:

- Can Astro do this natively?
- Can CSS do this?
- Can a tiny utility do this?
- Is this needed on day one?

Avoid dependency sprawl.

## shadcn/ui Rules

If using shadcn/ui:

- Use the current `shadcn` CLI, not deprecated old commands
- Only add components actually used
- Keep React islands isolated
- Do not turn the site into a React-first app just because shadcn is available

Do not install a large component set “just in case.”

## Suggested Commands

These are representative; prefer the package manager already chosen for the repo.

- create Astro app / initialize in-place
- add Tailwind
- add React only if needed
- initialize shadcn only if needed
- run dev
- run build
- run preview
- run lint
- run type-check

Document the actual commands in `README.md` once the stack is established.

## MCP / Tooling Expectations

The coding agent should be equipped to use, if available:

- filesystem editing
- git status / diff / commit inspection
- GitHub repo and workflow inspection
- package manager execution
- browser/page rendering for visual verification
- image optimization or asset inspection
- search across repository files
- markdown/content schema editing

If the environment supports skills or reusable workflows, prioritize:

- Astro project setup
- Tailwind setup
- GitHub Pages deployment
- content migration
- SEO metadata implementation
- accessibility review
- performance review

If a tool is unavailable, do not fake its results. State the limitation and proceed conservatively.

## Required Agent Workflow

Before editing:

1. Read this file and any local instruction files.
2. Inspect the current repo structure.
3. Understand deployment assumptions (GitHub Pages, custom domain `vifi.us`).
4. Determine whether React is actually needed for the change.
5. Implement incrementally and verify the build passes.

When changing architecture, also update:

- `README.md`
- deployment workflow docs
- any relevant contributor instructions
- this `AGENTS.md` if assumptions changed

## Definition of Done

A task is done only when:

- the site builds statically (`npm run build` succeeds)
- type checking passes (`npm run check`)
- GitHub Pages deployment assumptions are correct
- custom domain behavior is preserved (`public/CNAME` exists)
- docs and instructions match reality

## Do / Don’t

Do:

- prefer Astro over React
- prefer static over hydrated
- prefer clarity over cleverness
- preserve valid content while improving structure
- keep the repository easy for future agents to understand

Don’t:

- introduce backend logic
- over-hydrate the site
- preserve unverifiable corporate claims
- add dependencies casually
- break GitHub Pages deployment