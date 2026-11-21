<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes

- Content lives in `src/content/*` and `src/i18n/dictionaries.ts`; components only render it. Keep CS and EN in sync (the `Dictionary` type enforces the shape).
- Never invent project facts, clients, metrics or testimonials. Unknown data → `todo` field or `PLACEHOLDER` comment.
- `cacheComponents` is on: wrap `new Date()` etc. in `"use cache"` helpers; unknown `[slug]` values are rewritten to a 404 in `src/proxy.ts` (otherwise the PPR fallback shell answers 200).
- Run `npm run check` (lint + typecheck + build) before finishing.
