import type { TechGroup } from "./types";

/**
 * Technology overview.
 * level:
 *  - "professional" — used professionally, day to day
 *  - "projects"     — used in my own and delivered projects
 *  - "workflow"     — tools that are part of my development workflow
 * Adjust levels to match your experience — the UI renders them as-is.
 */
export const techGroups: TechGroup[] = [
  {
    id: "backend",
    title: { cs: "Backend", en: "Backend" },
    description: {
      cs: "Jádro mé práce: aplikační logika, API a služby v ekosystému .NET.",
      en: "The core of my work: application logic, APIs and services in the .NET ecosystem.",
    },
    items: [
      { name: "C#", level: "professional" },
      { name: ".NET", level: "professional" },
      { name: "ASP.NET Core", level: "professional" },
      { name: "REST API", level: "professional" },
    ],
  },
  {
    id: "database",
    title: { cs: "Databáze", en: "Database" },
    description: {
      cs: "Návrh datových modelů, dotazy a migrace.",
      en: "Data modelling, queries and migrations.",
    },
    items: [
      { name: "SQL Server", level: "professional" },
      { name: "Entity Framework Core", level: "professional" },
      { name: "SQLite", level: "projects" },
    ],
  },
  {
    id: "frontend",
    title: { cs: "Frontend", en: "Frontend" },
    description: {
      cs: "Rozhraní webů a webových aplikací.",
      en: "Interfaces for websites and web applications.",
    },
    items: [
      { name: "HTML", level: "professional" },
      { name: "CSS", level: "professional" },
      { name: "JavaScript", level: "professional" },
      { name: "TypeScript", level: "projects" },
      { name: "Next.js", level: "projects" },
    ],
  },
  {
    id: "web",
    title: { cs: "Web", en: "Web" },
    description: {
      cs: "Weby, které si klient spravuje sám.",
      en: "Websites clients can manage themselves.",
    },
    items: [
      { name: "WordPress", level: "professional" },
      { name: "Divi", level: "professional" },
    ],
  },
  {
    id: "ai-tools",
    title: { cs: "AI a nástroje", en: "AI & Tools" },
    description: {
      cs: "Workflow, které zrychluje vývoj bez ztráty kontroly.",
      en: "A workflow that speeds up development without losing control.",
    },
    items: [
      { name: "Claude Code", level: "workflow" },
      { name: "AI Coding Agents", level: "workflow" },
      { name: "Git", level: "workflow" },
      { name: "GitHub", level: "workflow" },
      { name: "Visual Studio", level: "workflow" },
      { name: "Azure", level: "projects" },
    ],
  },
];
