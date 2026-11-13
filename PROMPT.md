# Swiftly Built website: build instructions

This folder is a starter kit. Everything the site needs is already here:

- `public/brand/`: the logo mark in four colors (plus the original), and the founder photo
- `public/work/`: seven real app screenshots used in the case studies
- `reference/`: the approved design mocks as static HTML, with full-page screenshots
  - `home-desktop.html` / `.png`: the homepage at 1440px
  - `home-mobile.html` / `.png`: the homepage hero at 390px
  - `logo-sheet.html` / `.png`: logo lockups, palette, type, and track motifs

## Match the mocks

Open `reference/home-desktop.html` in a browser and read its source before writing any code. The homepage you build must match it: same sections in the same order, same copy, colors, font sizes, spacing, image placement, and layout. The mock is the source of truth for anything visual; this document is the source of truth for structure, stack, other pages, and behavior. Where they disagree on a visual detail, follow the mock. Reuse the mock's inline styles as Tailwind classes or tokens; do not copy the reference HTML into the site as-is. When the homepage is done, take a full-page screenshot at 1440px and at 390px and compare them with `reference/home-desktop.png` and `reference/home-mobile.png`; fix any differences before moving on.

Build the project in this folder (scaffold Astro here, keeping `public/` and `reference/` as they are). Exclude `reference/` from the build output.

---

You are building the production marketing website for **Swiftly Built LLC**, a one-person mobile app studio. Build the entire site in this repository, end to end, with no placeholders left in code except where this brief marks content as `[BRACKETED]`. Ask me nothing until the site runs locally; make reasonable decisions and list them in a `DECISIONS.md` at the end.

## 1. Stack and constraints

- **Framework:** Astro 5 (static output), TypeScript, Tailwind CSS 4. No React unless a component truly needs client state; prefer Astro components and vanilla `<script>` for the small amount of interactivity below.
- **Hosting target:** Vercel (`@astrojs/vercel` adapter, static). Include `vercel.json` only if needed.
- **Package manager:** pnpm. Node 20+.
- **Fonts:** Inter Tight (700, 800) for headlines, Inter (400, 500, 600) for body, JetBrains Mono (500) for labels and code. Self-host via `@fontsource-variable/inter-tight`, `@fontsource-variable/inter`, and `@fontsource/jetbrains-mono`; do not load Google Fonts at runtime. Use `font-display: swap`.
- **Performance budget:** Lighthouse 95+ on all four categories, mobile. No layout shift on font load (set `size-adjust` fallbacks or use `font-display: optional` for body). Total JS shipped to the browser under 30 KB gzipped. Images in AVIF/WebP via Astro `<Image>`.
- **Accessibility:** WCAG 2.2 AA. Real `<button>`, `<a>`, `<label>`. Visible focus rings (2px electric blue). Skip link. `prefers-reduced-motion` disables all animation. All color pairs listed below already pass 4.5:1; do not introduce lighter greys.
- **SEO:** per-page `<title>` and meta description, Open Graph and Twitter cards, canonical URLs, `sitemap.xml` and `robots.txt` via `@astrojs/sitemap`, JSON-LD `LocalBusiness` + `Person` schema on the homepage, `ProfessionalService` on Services (no `priceRange` or offer prices).
- **Analytics:** Plausible script tag, domain `swiftlybuilt.com`, loaded with `defer`. No cookies, no consent banner needed.
- **Forms:** contact form posts to Formspree (`FORMSPREE_ID` env var); progressive enhancement, works with JS off. Honeypot field for spam.
- **Scheduling:** embed Cal.com inline (`CAL_LINK` env var, e.g. `jamiel-trimble/scoping-call`) on the Contact page; lazy-load the embed script on scroll into view.

## 2. Brand tokens (put these in `src/styles/tokens.css` as CSS custom properties and map them into Tailwind)

```css
:root {
  --color-jet: #0B0B0D;        /* primary background */
  --color-graphite: #2A2A2E;   /* cards, borders on dark */
  --color-ink: #141416;        /* raised surfaces on dark */
  --color-white: #FFFFFF;
  --color-fog: #F2F2F5;        /* light section background */
  --color-mist: #E4E4E7;       /* borders on light */
  --color-electric: #0A84FF;   /* accent: buttons, links, logo mark */
  --color-track: #0047AB;      /* accent hover / on light backgrounds */
  --color-podium: #FF3B4E;     /* Team USA red on dark backgrounds (5.6:1 on jet) */
  --color-flag: #C8102E;       /* Team USA red on light backgrounds and as a fill under white text */
  --color-text-muted: #A1A1AA; /* captions on dark (7:1 on jet) */
  --color-text-soft: #D4D4D8;  /* body on dark */
  --color-text-muted-light: #52525B; /* captions on light */

  --font-display: 'Inter Tight Variable', 'Inter Variable', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 16px;
  --max-w: 1200px;
  --section-y: clamp(72px, 10vw, 112px);
  --motion-fast: 150ms;
  --motion-base: 220ms;
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

Rules: dark theme is the default and only theme (no light-mode toggle). Electric blue covers under 10% of any viewport; it is for the primary button, links, the logo mark, eyebrow labels, and the final CTA band. Red is a Team USA nod and stays under about 2% of any viewport: never on buttons, links, form states, or body text (so it is never mistaken for an error). Use it only at these spots: the period after `Built to last` in the hero H1 (`--color-podium`), the bottom line of `LaneDivider`, the `04 · Finish line` step label, a 4px `--color-flag` top border on the CTA band, and the period in the 404 headline. Headlines use `letter-spacing: -0.035em` to `-0.04em` and line-height `0.98` to `1.04`. Body line-height `1.5` to `1.55`.

## 3. Logo

The brand is built on sprinting: the owner ran track for Team USA, and "Swiftly" means both the Swift language and speed. Running motifs should be visible across the site (mark, lane lines, race-cue step labels, stopwatch-style stats), kept graphic and clean, never cartoonish.

The logo artwork is supplied and already in this folder at `public/brand/`; app screenshots are in `public/work/`. Do not move, rename, or regenerate them. The mark is a solid sprinter silhouette with speed trails and lane lines, as transparent PNGs (445×350, aspect ratio 1.27:1):

- `public/brand/mark-electric.png` (#0A84FF): default, on dark backgrounds
- `public/brand/mark-white.png`: on blue or graphite backgrounds
- `public/brand/mark-track.png` (#0047AB) and `public/brand/mark-black.png`: on white or fog backgrounds
- `public/brand/mark-original.png`: the source file, black on white

Create `src/components/Logo.astro` with props `variant: 'mark' | 'horizontal' | 'stacked'`, `height` (px), and `onLight` (boolean). It renders the right PNG as an `<img>` with `alt="Swiftly Built"`, explicit width and height to prevent layout shift, and `height: auto` scaling. Sizes: nav 40px tall, footer 30px, hero lockups 80 to 100px. If it would be cleaner, trace the PNG to a single-color SVG with potrace and use `fill="currentColor"`, but keep the silhouette exactly as drawn. The wordmark is "Swiftly Built" in `--font-display` 800, `letter-spacing: -0.035em`, slanted forward with `transform: skewX(-8deg)` (`display: inline-block`); in the horizontal lockup the word "Built" is electric blue. Also generate `public/favicon.png` and `public/favicon.ico` (white mark on an electric-blue rounded square), `public/apple-touch-icon.png` (180px, electric mark on jet), and `public/og-default.png` (1200×630, jet background, horizontal lockup centered, tagline below).

## 4. Site map and routes

| Route | File | Title |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Swiftly Built — Fast. Complete. Built to last. |
| `/work` | `src/pages/work/index.astro` | Work — Swiftly Built |
| `/work/[slug]` | `src/pages/work/[slug].astro` | `{app name}` — Case study |
| `/services` | `src/pages/services.astro` | Services and pricing — Swiftly Built |
| `/about` | `src/pages/about.astro` | About Jamiel Trimble — Swiftly Built |
| `/contact` | `src/pages/contact.astro` | Book a scoping call — Swiftly Built |
| `/404` | `src/pages/404.astro` | Page not found |

Case studies are an Astro content collection at `src/content/work/*.md` with schema: `title`, `client` (string, e.g. "Outpatient clinic"), `platforms` (array of `'iOS' | 'Android'`), `turnaroundWeeks` (number, optional), `result` (one-line string), `stack` (array of strings), `screens` (array of images), `order` (number), `featured` (boolean). Screenshots are real phone captures (640×1390) in `public/work/`; show them in rounded phone frames, never cropped to landscape. Seed three entries:
  - `moviebuff` — MovieBuff · Consumer app · iOS · in production · `Movie discovery with trailer reels, recommendations, watchlists, and friends.` Screens: `moviebuff-browse.jpg`, `moviebuff-reels.jpg`, `moviebuff-saved.jpg`.
  - `naturally-yours` — Naturally Yours Beauty Supply · Retail client · iOS · in production · `A customer storefront plus an owner app for inventory, orders, and messages.` Screens: `ny-shop.jpg`, `ny-inventory.jpg`, `ny-login.jpg`.
  - `gameon` — GameOn · Sports platform · iOS · `[STATUS]` · `[ONE LINE ON WHAT GAMEON DOES]`. Screens: `gameon-login.jpg`.
  Leave `turnaroundWeeks` and `stack` as `[BRACKETED]` placeholders for me to fill.

## 5. Shared layout and components

- `src/layouts/Base.astro`: html shell, head meta, skip link, `<Header>`, `<slot>`, `<Footer>`, Plausible tag.
- `Header.astro`: sticky, jet background, 1px graphite bottom border, 72px tall. Left: `Logo variant="horizontal" size={30}`. Right: links Work, Services, Tech help (`/#tech-help`), About, then a blue "Book a call" button to `/contact`. Below 768px: links collapse into a menu opened by a 44×44 button (`aria-expanded`, Escape closes, focus trapped while open).
- `Footer.astro`: logo + "Swiftly Built LLC", "Columbia, MD · Veteran-owned", links LinkedIn `[URL]`, GitHub `[URL]`, email `hello@swiftlybuilt.com`.
- `Button.astro`: variants `primary` (electric fill, white text, hover `--color-track`), `outline` (1px `#52525B` border on dark, white text), `dark` (jet fill, for use on the blue CTA band). Min height 48px, radius `--radius-sm`, 150ms transition.
- `Eyebrow.astro`: mono, 13px, uppercase, `letter-spacing: 0.14em`, electric blue (track blue on light sections).
- `Section.astro`: props `tone: 'dark' | 'raised' | 'light' | 'accent'`, applies background/text colors and `--section-y` padding, with an inner `max-w` container and 32px side padding.
- `Counter.astro`: a stopwatch-style stat (number in `--font-mono`) that counts up once when scrolled into view (IntersectionObserver; skipped under reduced motion). Props `value`, `suffix`, `label`.
- `LaneDivider.astro`: three 2px horizontal lines stacked with 6px gaps; top `#3F3F46`, middle electric blue, bottom `--color-podium` red. Used above the process steps and as a section break.
- `Reveal.astro` wrapper: 220ms ease-out fade + 12px rise on scroll, left-to-right for horizontal groups; disabled under reduced motion.

## 6. Homepage, section by section (match this order and copy exactly)

1. **Hero** (dark). Eyebrow: `iOS · Android · AI · Tech support`. H1 on three lines: `Fast.` / `Complete.` / `Built to last.` (the final period in `--color-podium`) at `clamp(48px, 7vw, 84px)`. Subhead: `Production-ready iOS and Android apps, delivered end to end by one engineer. Weeks, not quarters.` Buttons: primary `Book a 20-minute call` → `/contact`; outline `See the work` → `/work`. Right column (stacks below on mobile): two overlapping phone frames (front 285×619, back 220×478 at 85% opacity, radius 44px, graphite border): the front shows `moviebuff-browse.jpg` and the back `ny-shop.jpg`; the front crossfades through `moviebuff-reels.jpg` and `gameon-login.jpg` every 4 seconds, pausing on hover and under reduced motion.
2. **Proof strip** (raised, graphite borders top and bottom). Three `Counter`s in a 3-column grid (3 columns on mobile too, smaller type): `3 wks` average turnaround, scope to store; `8 yrs` defense technology and program management; `TS/SCI` active clearance (static, no count-up).
3. **What you get** (dark). Eyebrow `What you get`. H2 `One builder. Every layer. Zero hand-offs.` Line under it: `Every project is scoped and quoted on its own. Tell me what you need and I'll come back with a price and a delivery date.` Four cards on ink background with graphite border, radius 14px, 28px padding, each with a 28px stroke icon (lucide-style, inline SVG, electric blue):
   - Frontend — SwiftUI for iOS and a native Android build, designed for the device it runs on.
   - Backend and deployment — Auth, data, APIs, and hosting set up, monitored, and documented so you own it.
   - Payments — Stripe, Apple Pay, subscriptions, and in-app purchases wired in and tested.
   - App store launch — Store listings, review, release, and 30 days of post-launch support included.
4. **Featured work** (light, fog background, jet text). Eyebrow `Featured work` in track blue. H2 `Shipped, not promised.` Right-aligned link `All case studies →`. Three case-study cards (white, mist border, radius 16px): a 300px-tall dark panel showing one or two of the app's phone screenshots (150px wide, radius 20px, second one offset 28px lower), then title, meta line `{client} · {turnaroundWeeks} weeks · {platforms}`, and the result line in 500 weight. Whole card is the link.
   Below the cards, a `More screens from shipped apps` row: six phone screenshots (180px wide, radius 24px) in a horizontal scroll with scroll snap.
5. **How it works** (dark). Eyebrow `How it works`. H2 `From the blocks to the finish line.` A `LaneDivider` above a 4-column grid; each column: mono uppercase race cue in electric blue, title, one line:
   - `01 · On your marks` — Discovery call — 20 minutes on what you need and who it is for.
   - `02 · Set` — Scope and quote — A written scope, your quote, and a delivery date within 48 hours.
   - `03 · Go` — Weekly demo builds — A TestFlight build on your phone every week.
   - `04 · Finish line` (label in `--color-podium` instead of blue) — Launch and support — Store submission handled, 30 days of support included.
6. **Tech advice and support** (raised, `id="tech-help"`). Eyebrow `Tech advice and support`. H2 `Not every problem needs a new app.` Intro `Straight answers on software questions and hands-on help with everyday hardware. Quick sessions, no jargon.` Outline button `Ask a tech question` → `/contact?type=tech-advice`. Three cards (same style as What you get) with bulleted lists:
   - Software advice — Choosing a platform, vendor, or tech stack · Code and architecture reviews · App Store and Play Store problems · Security basics for small teams
   - Tech support — Laptop, phone, and tablet setup and troubleshooting · Wi-Fi, printers, and small-office networks · Backups and moving to a new device · Slow, crashing, or misbehaving machines
   - How sessions work — Remote, or on-site around Columbia, MD · One-off sessions or ongoing support · Quoted after a short call about the issue
7. **Built for** (raised strip). Label `Built for`, then four bold items in a wrapping row: Clinics and practices · Local businesses · Startups · Cleared and defense teams.
8. **About teaser** (dark). Left: founder photo `public/brand/founder.jpg` at 380×440, `object-fit: cover`, `object-position: center top`, radius 16px, alt `Jamiel Trimble, founder of Swiftly Built`. Right: eyebrow `About the founder`, H2 `Built by someone who knows what fast actually means.`, paragraph `Jamiel Trimble ran track for Team USA, then spent eight years as an Air Force and Space Force officer leading technical programs. Swiftly Built is the engineer he wanted to hire and could not find.`, link `Read the story →` to `/about`.
9. **CTA band** (track blue `#0047AB` background so white button text passes contrast, with a 4px `--color-flag` top border). H2 `Have an app in mind? Let's scope it this week.` Dark button `Request a quote` → `/contact?type=new-app` and white-outline button `Book a 20-minute call` → `/contact`.
10. **Footer.**

## 7. Other pages

- **/work:** eyebrow `Work`, H1 `Case studies`, grid of all case studies (same card as homepage), sorted by `order`.
- **/work/[slug]:** hero with title, meta line, result; sections `Problem`, `Build` (stack as mono chips, timeline sentence), `Result`, `Screens` (horizontal scroll row of phone screenshots with scroll snap); prev/next case study links; CTA band.
- **/services:** H1 `Scoped to you. Quoted to you.` Intro: `Every project is different, so there is no price list. Tell me what you need, and within 48 hours you get a written scope, a quote, and a delivery date.` **Do not show any prices, price ranges, or "starting at" text anywhere on the site.** Tier cards (grid, 1 column on mobile), each with name, what you get, typical timeline, and a `Request a quote` button linking to `/contact?type=new-app&tier=<slug>`:
  - Sprint — Clickable prototype or MVP, iOS first, one core flow — 2 to 3 weeks
  - Launch — Full production app, iOS and Android, backend, auth, store submission — 6 to 10 weeks
  - Scale — Launch plus payments, admin dashboard, analytics, CI/CD — 10 to 16 weeks
  - Retainer — Maintenance, OS updates, feature work — Monthly
  Then a "Tech advice and support" block reusing the homepage section's three cards, with buttons `Ask a tech question` (`/contact?type=tech-advice`) and `Get tech support` (`/contact?type=tech-support`). Below that, a "What is included in every project" checklist (written scope and quote within 48 hours, weekly TestFlight builds, store submission, 30-day support, source code and documentation handed over, milestone payments) and a short "Changes" paragraph: `Scope is locked at discovery. Anything added after that is a written change order with its own quote and date, agreed before work starts.` CTA band.
- **/about:** H1 `Built by someone who knows what fast actually means.` Founder photo (`public/brand/founder.jpg`). Body copy, verbatim:

  > I'm Jamiel Trimble, founder of Swiftly Built. Before I wrote code, I ran track for Team USA. Sprinting teaches you one thing above everything else: speed is not rushing. It is preparation, precision, and a clean start.
  >
  > I carried that into eight years as an Air Force and Space Force officer, where I managed technical programs, helped stand up a new organization, and led prototype development on projects that could not afford to fail. Along the way I became a software developer, spending three years building applications, some of them at the TS level, and shipping apps of my own from first sketch to the App Store.
  >
  > Swiftly Built is the company I wanted to hire and could not find: one engineer who handles the whole thing. The screens, the server, the deployment, the payments, the store submission. No hand-offs, no waiting on a third party, no surprises in the invoice.
  >
  > The name is a double meaning. My apps are written in Swift. They are also delivered swiftly. And they are built to last, because I have spent my career on systems where "it works for now" was never good enough.
  >
  > If you have an app in mind, let's scope it this week.

  Then a vertical timeline (single electric-blue line, graphite dots) with entries: Team USA track athlete `[YEARS]`; U.S. Air Force / Space Force officer, 2018 to 2026; Software developer, 3 years, TS-level projects; Swiftly Built LLC, founded 2026. Credentials strip in mono: `Former Team USA track athlete · U.S. Space Force officer · Active TS/SCI clearance · M.S. Cybersecurity · Apps in production on the App Store`. CTA band.
- **/contact:** H1 `Let's scope it.` Left: Cal.com inline embed. Right: form with fields Name, Email, What do you need? (select: New app / Tech advice / Tech support / Not sure; preselected from the `type` query param, and `tier` prefilled into a hidden field), Tell me about it (textarea), Rough timeline (select: As soon as possible / 1 to 3 months / 3 to 6 months / Not sure), honeypot, submit `Send`. Success and error states rendered inline. Line under the form: `No phone number needed. You will hear back within one business day.`
- **/404:** mark, `Wrong lane.`, link home.

## 8. Project hygiene

- `README.md` with setup, env vars (`FORMSPREE_ID`, `CAL_LINK`, `PUBLIC_SITE_URL`), and deploy steps.
- `.env.example`.
- ESLint + Prettier configured; `pnpm lint`, `pnpm build`, `pnpm preview` all pass.
- A GitHub Actions workflow that runs lint and build on pull requests.
- Commit in logical steps with conventional commit messages.
- When done: run `pnpm build`, fix every warning, then write `DECISIONS.md` listing every choice you made that this brief left open and every `[BRACKETED]` placeholder I still need to fill, with file paths.
