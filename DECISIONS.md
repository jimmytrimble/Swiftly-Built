# Decisions and open items

## Placeholders you still need to fill

| Placeholder                      | Where                                                   |
| -------------------------------- | ------------------------------------------------------- |
| `[LINKEDIN URL]`, `[GITHUB URL]` | `src/lib/site.ts` (used in footer and JSON-LD `sameAs`) |
| `[PRICE]` ×4, `[RATE]`           | `src/pages/services.astro` → `tiers` array              |
| `[YEARS]` (Team USA)             | `src/pages/about.astro` → `timeline` array              |
| `FORMSPREE_ID`, `CAL_LINK`       | `.env` locally and Render env vars                      |

## Choices the brief left open

1. **White text on electric blue is 3.6:1**, not 4.5:1 (the brief said all pairs pass; this one does not). To keep the brand pair and still meet WCAG AA, primary buttons use 19px / 700 text, which qualifies as "large text" where AA requires 3:1. axe and Lighthouse pass. If you'd rather keep 16px, change the primary button text to jet (`--color-jet`) or darken the fill to `--color-track`.
2. **Fonts**: the variable fontsource packages do not ship per-subset CSS, so `src/styles/fonts.css` declares Latin-only `@font-face` rules (3 woff2 files, ~115 KB total, hashed and preloaded). `font-display: swap` everywhere, with an `Inter Fallback` face (`size-adjust`/ascent/descent overrides on Arial) so swap causes no layout shift. CLS measured 0.
3. **Scroll reveal is JS-gated**: the hidden state only applies when `<html class="js">` is set by an inline script, so content is never invisible without JavaScript or if IntersectionObserver fails.
4. **No `vercel.json`**: the `@astrojs/vercel` adapter emits the Build Output API bundle; nothing extra was needed. Add one only if you want custom headers/redirects.
5. **Hero phone slides use the case-study `cover`** (object-fit: cover inside the 300×620 frame). If real covers are landscape-heavy, consider adding a `heroImage` field to the schema instead.
6. **Case-study schema** gained three fields the brief did not list: `problem`, `build`, `resultDetail`, to populate the Problem / Build / Result sections. The "timeline sentence" in Build is generated from `turnaroundWeeks` and `platforms`.
7. **Prev/next links** on a case study fall back to "All work" at either end of the list.
8. **Services table** gets a `tabindex="0"` scroll region with an aria-label so keyboard users can scroll it on narrow screens. Rows use `<th scope="row">`.
9. **Contact form** keeps a real `action`/`method` (works with JS off, Formspree then redirects to its own thank-you page). With JS, it submits via `fetch` with `Accept: application/json` and renders inline success/error. A hidden `_subject` field sets the email subject. Honeypot field is Formspree's `_gotcha`.
10. **Cal.com** is loaded via the official embed snippet, written in vanilla TS (no React), only once the embed container is within 200px of the viewport. Dark theme with `cal-brand` set to electric. A `<noscript>` link to the Cal.com page is the fallback.
11. **Counter values**: a numeric `value` animates; a string renders static. That is why `[N]` placeholders show as text today.
12. **Homepage "Built for"** separators and about-teaser photo are plain CSS; the photo placeholder is a bordered ink box with mono text.
13. **404 page** is `noindex` and filtered out of the sitemap.
14. **ESLint** is flat-config with `typescript-eslint` + `eslint-plugin-astro`; Prettier uses `prettier-plugin-astro`. `pnpm lint`, `pnpm check`, `pnpm build` all pass with zero warnings.
15. **Brand icons and the OG image** are produced by `scripts/gen-favicons.mjs` (sharp) from the running-figure mark (`public/brand/mark-*.png`): `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, and `og-default.png`. The OG image embeds real Inter Tight; regenerate (`node scripts/gen-favicons.mjs`) after any logo change.
16. **Case-study card heading level** is `h3` on the homepage and `h2` on `/work` to keep heading order correct on each page.
17. **Reduced motion**: the global `prefers-reduced-motion` rule collapses all transitions/animations; the counter, reveal, and hero crossfade scripts also check the media query and skip entirely.

## Measured

Lighthouse 12, mobile emulation, local static server (no gzip, no CDN cache headers):
`/` → Performance 99 · Accessibility 100 · Best Practices 96 · SEO 100. CLS 0, TBT 0 ms.
Best Practices loses points only for console errors from Plausible/Cal.com being unreachable in the sandbox; on Vercel with compression and cache headers the remaining perf notes clear. Inline JS per page is ~1.4 KB gzipped (budget: 30 KB).
