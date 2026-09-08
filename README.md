# ViFi Corporate Website

Static marketing site for [ViFi](https://vifi.us), built with Astro and deployed to GitHub Pages.

## Stack

- **Framework:** [Astro](https://astro.build) (static output)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v4
- **Language:** TypeScript
- **Hosting:** GitHub Pages with custom domain (`vifi.us`)

## Development

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run check      # TypeScript and Astro diagnostics
npm run test:growth # After build: hero CTA, guide links, SEO, privacy and voice-widget regression checks
```

## Project Structure

```
src/
  pages/           Route files
  layouts/         Shared page layouts
  components/
    site/          Global components (Header, Footer, Analytics, VoiceWidget)
    home/          The scroll-driven homepage story (HomeStory)
    blocks/        Page section components (PageHero, PricingCards, CTA)
  content/         Markdown collections (blog, faqs, legal)
  styles/          global.css (Tailwind tokens, self-hosted fonts) and
                   design.css (the shared design system: buttons, cards,
                   blob outlines, nav, footer, responsive modes)
  data/            Typed data (navigation, pricing, solutions, etc.)
public/            Static assets (CNAME, favicon, robots.txt, fonts/, legal/)
.github/workflows/ GitHub Pages deployment
```

## Design system

The visual system is a light-only, electric-blue treatment: `#f8fafc` ground,
`#1e293b` text, one accent `#0055ff`, Instrument Sans for text and JetBrains
Mono for labels, 2px accent borders with hard offset shadows, hand-drawn SVG
outlines and line art. Tokens live in `src/styles/global.css` (`@theme`), the
component classes in `src/styles/design.css` (Tailwind's `components` layer, so
utilities still win). Fonts are self-hosted from `public/fonts/` (SIL OFL,
licenses alongside). The homepage story was designed on a Claude Design canvas
and ported as `src/components/home/HomeStory.astro`; it pins sections on desktop
and tablet, flows on phones and short viewports, and falls back to the flowing
layout without JavaScript.

## Deployment

Favicons and home-screen icons live in `public/icons/framed-call-2026-09/`.
The SVG is the vector master; its exterior is transparent around the white tile,
blue outline, and offset shadow. `BaseLayout.astro` references the versioned SVG,
PNG/ICO fallbacks, and Apple Touch icon. `public/site.webmanifest` supplies the
192px and 512px icons in browser display mode. Root `favicon.svg` and `favicon.ico`
also provide the current mark for clients that request those conventional paths.
When replacing the mark, export from the SVG, preserve alpha, and use a new
versioned directory to refresh browser caches.

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the Astro site and deploys to GitHub Pages using the official `withastro/action`.

Custom domain `vifi.us` is configured via `public/CNAME` and `site` in `astro.config.ts`.

## Guidelines

See `AGENTS.md` for architecture rules, content safety guidelines, and contributor instructions.

## Dependency maintenance (September 2026)

The site uses Astro 7's Rust compiler and native Markdown pipeline with Vite 8.
`compressHTML: true` preserves the existing spacing between inline prose.
CI uses Node 26.8.1 and checks pull requests before deployment; only the deploy
job can write Pages or request an OIDC token. Run `npm ci`, `npm run check`,
`npm run build`, and `npm run test:growth` locally.

TypeScript 7 supplies `tsc --noEmit`. Astro's checker still requires the
TypeScript 6 programmatic API, so `typescript` aliases the maintained
`@typescript/typescript6` package and `@typescript/native` aliases TypeScript 7,
following Microsoft's documented side-by-side setup. Remove the compatibility
API once Astro supports TypeScript 7. The dependency lockfile records both.
