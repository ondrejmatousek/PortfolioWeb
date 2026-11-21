# PortfolioWeb

Personal application. Development workflow is defined centrally in the
app-development skill (C:\AI-Harness\skills\app-development\SKILL.md).

- Start development tasks with `$app-development <task>`.
- Shared rules: C:\AI-Harness\rules (coding.md, security.md, analysis.md)
  and quality gates: C:\AI-Harness\gates\quality-gates.md.
- Project configuration (build/tests/review): C:\AI-Harness\projects.
- Ask before destructive operations, deployment, fundamental architecture
  changes, commits and pushes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Content lives in `src/content/*` and `src/i18n/dictionaries.ts`; components only render it. Keep CS and EN in sync (the `Dictionary` type enforces the shape).
- Never invent project facts, clients, metrics or testimonials. Unknown data → `todo` field or `PLACEHOLDER` comment.
- Hosting is Azure Static Web Apps (Free) with `output: "export"`: no proxy, no route handlers, no `headers()` in next.config. Every dynamic route needs `generateStaticParams`; metadata routes need `dynamic = "force-static"`.
- Redirect, 404 and security headers live in `public/staticwebapp.config.json`; `public/index.html` picks the locale from the browser language.
- The contact form is the managed Azure Function in `api/` (logic in `api/src/contact-core.js`, tests: `cd api && npm test`). Keep its validation in sync with `src/lib/contact.ts`.
- Run `npm run check` (lint + typecheck + build) before finishing.
