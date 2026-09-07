# Dependency refresh and source review — September 5, 2026

Tracking: #26. Reviewed latest main at `781440e`; unrelated work in the original design checkout is preserved.

## Changes

- Astro 6 → **7.3.1**, Tailwind **4.3.3**, current Astro check/sitemap packages, Node **26.8.1**, and all direct Actions pinned to current release SHAs.
- TypeScript **7.0.2** supplies the native compiler; Microsoft's **6.0.2 API distribution** remains alongside it because Astro check still requires the programmatic API. A direct replacement was tested and rejected by Astro; this explicit compatibility bridge keeps both checks running.
- Astro 7's native compiler/Markdown pipeline is adopted. `compressHTML: true` preserves inline prose whitespace through its changed JSX whitespace behavior.
- The PR workflow now runs checks/build/growth tests before artifact creation; only the deployment job receives Pages/OIDC write permissions.
- Conversion tracking parses destinations and counts only the exact app origin and login/register routes. Prefix-matching unrelated hosts/routes no longer pollutes analytics.
- Transitive SVGO updated past GHSA-2p49-hgcm-8545; final clean install audits **zero vulnerabilities** and `npm outdated --json` returns `{}`.

## Validation

`npm ci`, native TypeScript check, Astro check (47 files, zero errors/warnings/hints), production build (28 pages), and all 8 growth/privacy tests pass. Every generated internal page link/fragment resolves; all JSON-LD parses; the dev server returns the expected homepage. CNAME and static GitHub Pages architecture are preserved. No live deployment or remote analytics-delivery test was performed.

## Remaining considerations

- Early same-tab CTA navigation can lose placement attribution before the remote analytics SDK finishes loading. Coordinate a first-party handoff protocol with the app's acquisition funnel (#687 in vifi-platform).
- PostHog and GA4 scripts load remotely, so npm audit does not attest their runtime versions. Existing production/GPC guards and input masking are preserved and tested.
- The contact page relies on `mailto:`; an in-page hosted form would improve conversion for people without an email handler.

The source review covered static routes/layouts, navigation, JSON-LD, calculator and analytics surfaces. It found no confirmed exploitable application vulnerability; this is bounded review evidence, not proof of absence.

## Upgrade references

- [Astro 7 migration guide](https://docs.astro.build/en/guides/upgrade-to/v7/)
- [Microsoft's TypeScript 7 / 6 side-by-side guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0)
