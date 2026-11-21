# Portfolio — Ondřej Matoušek

Personal portfolio and studio site: software development, websites, AI & automation, MVPs.
Bilingual (CS / EN), dark-first with an optional light theme.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion · Lucide.
No other runtime dependencies.

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /cs or /en by Accept-Language
npm run check    # lint + typecheck + production build
```

## Visual concept — "Signal & Structure"

- **Structure:** graphite canvas, blueprint hairline grid, monospace annotations (`01 — About`, `profile.json`) — the language of engineering.
- **Signal:** one warm ember accent (`--accent`) plus a cool counterpart (`--cool`) used sparingly for glow and emphasis.
- **Type:** Bricolage Grotesque (display), Geist (text), Geist Mono (annotations), Instrument Serif italic for a single accent word in the hero.
- **Service identities:** each service has its own hue token (`--hue-software`, `--hue-web`, `--hue-ai`, `--hue-mvp`) driving icon, spotlight and detail page.
- **Motion:** CSS for above-the-fold (no JS needed, LCP text is never hidden), Motion for scroll reveals, tab pill and the process timeline. Everything respects `prefers-reduced-motion`.

All tokens live in [`src/app/globals.css`](src/app/globals.css).

## Project structure

```
src/
  app/
    [locale]/            # root layout, home, work, case studies, services, OG image, 404
    api/contact/         # contact form endpoint (Resend)
    global-not-found.tsx # 404 for URLs outside any locale
    sitemap.ts robots.ts icon.svg
  content/               # ← all site content, separate from presentation
    site.ts              # name, URL, links, e-mail (placeholders marked)
    projects.ts          # portfolio projects / case studies
    services.ts          # 4 services incl. detail-page content
    tech.ts process.ts
  i18n/                  # locales + UI dictionaries (cs / en)
  components/            # layout, sections, work, contact, ui
  proxy.ts               # locale redirect (Next 16 "proxy", formerly middleware)
```

### Adding a project

Append an object to [`src/content/projects.ts`](src/content/projects.ts). It automatically appears on the home page, `/work`, gets a case-study page, sitemap entry and static generation. Only list technologies you can back up.

- `art` picks one of the illustrative SVG previews (`jobs`, `replay`, `watcher`, `seasonality`, `insiders`, `shop`) — they are labelled *illustrative* in the UI.
- Add a real screenshot with `image: { src: "/work/name.webp", alt: {...}, width, height }` — it replaces the illustration.
- `todo` renders a visible "note to complete" box on the case study. Remove it once the data is filled in.

## Placeholders to fill in before launch

| Where | What |
|---|---|
| `src/content/site.ts` | Confirm full name, add LinkedIn URL and (optionally) public e-mail. Hidden in the UI while `null`. |
| `projects.ts` → `trade-watcher` | Repository was empty — description, features and stack are placeholders. |
| `projects.ts` → `insiders-app` | Mapped to the **Gurus** repository (13F + SEC Form 4). Confirm this is the intended project. |
| `projects.ts` → all | Your role, year, real screenshots, public URLs for SeasonalityApp / TradeReplay / Insiders App if you want them shown. |
| `tech.ts` | Review the three levels (professional / in projects / workflow). |
| Environment | `NEXT_PUBLIC_SITE_URL`, contact form variables (see below). |

## Contact form

`POST /api/contact` validates input (shared rules in `src/lib/contact.ts`), has a honeypot and a basic per-instance rate limit, and sends via the [Resend](https://resend.com) REST API.

Set in your hosting environment (see `.env.example`):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@your-domain.cz
CONTACT_FROM_EMAIL="Portfolio <web@your-domain.cz>"   # domain verified in Resend
```

Without them the endpoint returns **503 `not_configured`** and the form tells the visitor the message was **not** sent. It never fakes success.

## Deployment

### Vercel (recommended)

The site uses a proxy (locale redirect), a route handler (contact form) and Cache Components / Partial Prerendering. Vercel supports all of these with zero configuration.

1. Push the repository to GitHub and import it in Vercel (framework preset: Next.js).
2. Add the environment variables above (Production + Preview).
3. Add your domain and set `NEXT_PUBLIC_SITE_URL` to it.

### Azure

- **Azure App Service (Linux, Node 20.9+)** — the most predictable Azure option for this feature set: build with `npm run build`, start with `npm run start` (the `PORT` env var is honoured by `next start`). Configure the same environment variables in App Settings.
- **Azure Static Web Apps** — its Next.js "hybrid" hosting is a preview feature with restrictions. It has not been verified with Next.js 16, the proxy file or Cache Components here. Test it on a preview environment before relying on it.

## Quality checklist (implemented)

- CS/EN with `hreflang` alternates, `x-default`, canonical URLs, localized Open Graph images, JSON-LD `Person`.
- `sitemap.xml` (with language alternates), `robots.txt`, custom 404 (localized + global), real 404 status for unknown slugs.
- Keyboard: skip link, visible focus rings, WAI-ARIA tabs (arrow keys / Home / End), mobile menu with Escape + focus return, stretched-link cards with focus ring.
- Contrast-checked tokens for both themes, form errors announced (`aria-invalid`, `aria-describedby`, live region).
- Fonts self-hosted via `next/font`, no external requests, no client JS needed for the hero.
- Security headers (`nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
