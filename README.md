# Swiftly Built — marketing site

Static marketing site for Swiftly Built LLC. Astro 5 + TypeScript + Tailwind CSS 4, deployed to Vercel.

## Setup

Requires Node 20+ and pnpm 9.

```bash
pnpm install
cp .env.example .env   # then fill in the values below
pnpm dev               # http://localhost:4321
```

## Environment variables

| Variable          | Used for                                                | Example                    |
| ----------------- | ------------------------------------------------------- | -------------------------- |
| `FORMSPREE_ID`    | Contact form endpoint (`https://formspree.io/f/<id>`)   | `xabcdefg`                 |
| `CAL_LINK`        | Cal.com inline embed on `/contact`                      | `jj/scoping-call`          |
| `PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph, JSON-LD (no slash) | `https://swiftlybuilt.com` |

All three are read at build time. Set them in Vercel → Project → Settings → Environment Variables for Production and Preview.

## Scripts

| Command        | What it does                                  |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Dev server with HMR                           |
| `pnpm build`   | Production build to `dist/` (+ Vercel output) |
| `pnpm preview` | Serve the production build locally            |
| `pnpm lint`    | ESLint + Prettier check                       |
| `pnpm format`  | Prettier write                                |
| `pnpm check`   | Astro/TypeScript diagnostics                  |

`node scripts/gen-assets.mjs` regenerates `favicon.ico`, `apple-touch-icon.png`, `og-default.png` and the placeholder case-study images from the brand SVG. Only needed if the logo changes.

## Content

Case studies live in `src/content/work/*.md` (frontmatter only; see `src/content.config.ts` for the schema). Images referenced there live in `src/assets/work/`. Add a file, set `order` and `featured`, and it appears on `/work`, in `/work/<slug>`, and (if featured) on the homepage.

Homepage proof-strip numbers are in `src/lib/stats.ts`. Social links and email are in `src/lib/site.ts`. Pricing rows are at the top of `src/pages/services.astro`.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo. Framework preset: Astro. Build command `pnpm build`, output directory `dist` (both auto-detected).
3. Add the three environment variables above.
4. Deploy. Point `swiftlybuilt.com` at the project under **Domains**.

CI (`.github/workflows/ci.yml`) runs `pnpm lint` and `pnpm build` on every pull request and on pushes to `main`.

## Before launch

See `DECISIONS.md` for every `[BRACKETED]` placeholder still to fill and the choices made where the brief left room.
