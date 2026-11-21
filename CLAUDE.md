# PortfolioWeb

Personal application. Development workflow is defined centrally in the
app-development skill (C:\AI-Harness\skills\app-development\SKILL.md).

- Start development tasks with `/app-development <task>`.
- Shared rules: C:\AI-Harness\rules (coding.md, security.md, analysis.md)
  and quality gates: C:\AI-Harness\gates\quality-gates.md.
- Project configuration (build/tests/review): C:\AI-Harness\projects.
- Ask before destructive operations, deployment, fundamental architecture
  changes, commits and pushes.

## Project notes
- Technology: Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4, Motion, Lucide; Azure Functions (Node) in api/
- Hosting: Azure Static Web Apps Free (rg-portfolio-web / portfolio-web); deployment needs approval
- Build / run: `npm run dev` (http://localhost:3000), `npm run check` (lint + typecheck + build)
- Next.js-specific agent rules and project conventions: see AGENTS.md
