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
```

## Project Structure

```
src/
  pages/           Route files
  layouts/         Shared page layouts
  components/
    site/          Global components (Header, Footer)
    blocks/        Page section components (Hero, Features, CTA)
  styles/          Global CSS and Tailwind config
  data/            Typed data (navigation, etc.)
public/            Static assets (CNAME, favicon, robots.txt)
.github/workflows/ GitHub Pages deployment
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the Astro site and deploys to GitHub Pages using the official `withastro/action`.

Custom domain `vifi.us` is configured via `public/CNAME` and `site` in `astro.config.ts`.

## Guidelines

See `AGENTS.md` for architecture rules, content safety guidelines, and contributor instructions.
