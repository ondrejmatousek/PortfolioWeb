# Portfolio — Ondřej Matoušek

Personal portfolio and studio site: software development, websites, AI & automation, MVPs.
Bilingual (CS / EN), dark-first with an optional light theme.

**Stack:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 · Motion · Lucide.
No other runtime dependencies.

```bash
npm install
npm run dev      # http://localhost:3000/cs (or /en)
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
    global-not-found.tsx # 404 for URLs outside any locale
    sitemap.ts robots.ts icon.svg
  content/               # ← all site content, separate from presentation
    site.ts              # name, URL, links, e-mail (placeholders marked)
    projects.ts          # portfolio projects / case studies
    services.ts          # 4 services incl. detail-page content
    tech.ts process.ts
  i18n/                  # locales + UI dictionaries (cs / en)
  components/            # layout, sections, work, contact, ui
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

The form posts to `/api/contact`, a managed **Azure Function** in [`api/`](api/) (Node 20). Logic is in `api/src/contact-core.js` with tests (`cd api && npm test`). Validation mirrors `src/lib/contact.ts`. It has a honeypot, a per-instance rate limit, a 10 s provider timeout, and sends via the [Resend](https://resend.com) REST API.

Set these in the Azure portal → Static Web App → **Environment variables** (production):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@your-domain.cz
CONTACT_FROM_EMAIL="Portfolio <web@your-domain.cz>"   # domain verified in Resend
```

Without them the function returns **503 `not_configured`** and the form tells the visitor the message was **not** sent. It never fakes success.

## Deployment — Azure Static Web Apps (Free)

Live: https://brave-tree-0c058d803.6.azurestaticapps.net (resource group `rg-portfolio-web`, app `portfolio-web`, West Europe).

The site is a static export (`output: "export"` → `out/`) plus the managed function in `api/`:

- `public/staticwebapp.config.json`: 404 page, security headers, Node runtime for the API, OG image rewrites.
- `public/index.html`: sends `/` to `/cs` or `/en` by browser language (no server-side negotiation on static hosting).
- `scripts/postbuild-swa.mjs`: copies OG images to `*.png` so SWA serves them as `image/png`.

Redeploy manually:

```bash
NEXT_PUBLIC_SITE_URL=https://brave-tree-0c058d803.6.azurestaticapps.net npm run build
(cd api && npm ci)
az staticwebapp secrets list -n portfolio-web -g rg-portfolio-web --query properties.apiKey -o tsv   # deployment token
SWA_CLI_DEPLOYMENT_TOKEN=<token> npx @azure/static-web-apps-cli@2 deploy ./out --api-location ./api --api-language node --api-version 20 --env production
```

A custom domain can be added for free in the portal (Static Web App → Custom domains). Then update `NEXT_PUBLIC_SITE_URL` and rebuild.

> Avast HTTPS scanning on this machine breaks TLS verification for Azure CLI and Node. Point `REQUESTS_CA_BUNDLE` / `NODE_EXTRA_CA_CERTS` to a PEM bundle that includes the Avast root, or turn off HTTPS scanning for these tools.

## Quality checklist (implemented)

- CS/EN with `hreflang` alternates, `x-default`, canonical URLs, localized Open Graph images, JSON-LD `Person`.
- `sitemap.xml` (with language alternates), `robots.txt`, custom 404 with real 404 status (SWA `responseOverrides`).
- Keyboard: skip link, visible focus rings, WAI-ARIA tabs (arrow keys / Home / End), mobile menu with Escape + focus return, stretched-link cards with focus ring.
- Contrast-checked tokens for both themes, form errors announced (`aria-invalid`, `aria-describedby`, live region).
- Fonts self-hosted via `next/font`, no external requests, no client JS needed for the hero.
- Security headers (`nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
