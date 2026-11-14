# Swiftly Built — marketing site

Static marketing site for Swiftly Built LLC. Astro 5 + TypeScript + Tailwind CSS 4, deployed to Vercel.

## Local setup

Requires Node 20+ and pnpm 9.

```bash
corepack enable
corepack prepare pnpm@9.12.0 --activate
pnpm install
cp .env.example .env
pnpm dev
```

The site runs locally at http://localhost:4321.

## Environment variables

```bash
FORMSPREE_ID=your-formspree-id
CAL_LINK=jamiel-trimble/scoping-call
PUBLIC_SITE_URL=https://swiftlybuilt.net
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm format
pnpm check
```

## Deployment

This project targets Vercel and uses `@astrojs/vercel` in static mode. Add the environment variables above in your Vercel project settings and deploy the repository.

## Notes

- `pnpm build` must pass before deployment.
- `public/` contains generated brand and favicon assets.
- `DECISIONS.md` documents open content placeholders and implementation choices.
