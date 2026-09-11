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
  content/         Markdown collections (blog, faqs, legal, resources)
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

## OpenAI Ads measurement

The active account is **ViFi LLC**, using the **ViFi Website** Pixel
`7GK9ZEWXgj5HQvsJUGAMZL`. Do not use the retired account named `OLD DELETE`.
The GitHub Actions repository variable retains this public ID. Browser SDK
loading is independently disabled by default; retaining the ID does not enable it.

The optional browser Pixel is loaded through the shared `Analytics.astro`
component. Set the GitHub Actions repository variable `OPENAI_ADS_PIXEL_ID` to
the public Pixel ID from Ads Manager, using the same ID for `app.vifi.us`.
The Pages build maps it to `PUBLIC_OPENAI_ADS_PIXEL_ID`; other build systems
must supply that public variable themselves. See `.env.example`. A blank ID
disables the integration. No API key is required or accepted.

`OPENAI_ADS_BROWSER_ENABLED` is a separate GitHub Actions repository variable,
mapped to `PUBLIC_OPENAI_ADS_BROWSER_ENABLED`. It defaults to `false`; this
change does not activate it. Set it to `true` and redeploy through the normal
Pages workflow only as part of the coordinated browser activation. Turning it
off and redeploying preserves first-party choices and attribution support.

Before any Pixel load, the site calls the app's read-only
`GET /api/auth/ad-measurement-policy` with credentials, no caching and no referrer.
Its version 2 response contains `default_allowed` and `account_opt_out` booleans.
The server determines regional eligibility from the trusted edge, not browser
claims. Eligible U.S. visits may measure by default; other/unknown locations,
failed or malformed policy responses stay off without an explicit choice.
A failed policy lookup blocks the SDK even for remembered grants. GPC, account
refusals, prior shared-cookie refusals, and invalid/duplicate choice cookies
override a regional default. Policy is refreshed when the tab regains focus.

Choices are inline on the Privacy page, reached through the existing footer
link. No popup, overlay or floating ad widget appears on any page. Policy and
measurement work independently of the presence of those controls. A fresh
**Allow** or **Turn off** writes `v2.granted` or `v2.denied` to the shared
`vifi_ads_consent` cookie for 180 days; a regional default stays only in memory
and is never recorded as explicit consent. Old `v1.denied` remains binding.
Old `v1.granted` retains its narrower first-party measurement permission, but
does not enable the public-site Pixel's contact matching until a fresh Allow.

When enabled and permitted, the Pixel runs only on `vifi.us` and `www.vifi.us`,
excludes `/signal` previews and unsafe query/fragment state, and measures page
views and individual blog articles. Automatic advanced matching may normalize
and hash supported contact details available in public-site form fields. The
privacy disclosure covers that behavior. Every event retains `opt_out: true`;
audience retargeting or future user-level personalization is not enabled.
The SDK is not loaded in the authenticated application. Backend conversions
are handled separately without explicit customer identity fields, caller/SMS
data or private dashboard content.

Permitted visits preserve raw opaque `oppref` in `vifi_ads_oppref` for up to 30
days without copying it into PostHog, URLs or preference/event payloads. Refusal
clears attribution and calls SDK consent false. The first-party handoff works
while the browser switch is off. The API prefers `__oppref` when present.
Permission POSTs to `/api/auth/ad-measurement` use header version 2 and distinguish
`regional_default` from `explicit`. Only a fresh Allow includes
`explicit_action:true`; remembered/default permissions cannot clear account
refusal. After an account refusal, SDK activation requires a successful fresh
Allow POST and a policy readback confirming the refusal is cleared. Anonymous
401s or offline failures do not claim account synchronization; the local cookie
still records the choice. POSTs are serialized to preserve choice ordering.
The app restricts cross-origin access to these two endpoints. Neither endpoint
creates a conversion event. Confirm the complete attribution flow before
campaign use; these local checks never send live conversions.

Run `npm run test:ads`, `npm run check`, and `npm run build` to check the setup.
Local tests stub the SDK and do not send live conversions. A local preview is
intentionally disabled by the hostname guard. Read the workspace setup report
for privacy, security, consent, and data-handling review. Server conversion
delivery is configured separately in vifi-platform and stays disabled until
its operator-managed credential is provisioned.

## Guidelines

See `AGENTS.md` for architecture rules, content safety guidelines, and contributor instructions.

## Acquisition resources and measurement

The ungated `/resources/ai-receptionist-test-scorecard/` worksheet uses the
validated `resources` content collection, includes a print layout, and links to
an editable CSV in `public/resources/`. Keep its seven scenarios and the CSV in
sync when revising the worksheet. The buyer guide and home-service landing pages
link to it; its signup CTA has a distinct placement/version for measurement.

Marketing attribution retains one sanitized campaign bundle in tab-scoped
`sessionStorage` for up to 30 minutes so internal browsing does not lose the
campaign before signup. It does not decorate internal links or manufacture new
campaigns. Explicit destination attribution wins as a whole bundle; GPC prevents
use of storage and tracking. Storage failure must never block navigation.
The analytics regression tests cover expiry, campaign replacement, input bounds,
privacy, middle-clicks, and the website-to-app handoff. Test traffic is not
customer acquisition.

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
