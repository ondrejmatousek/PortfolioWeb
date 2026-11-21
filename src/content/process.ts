import type { ProcessStep } from "./types";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: { cs: "Discovery", en: "Discovery" },
    text: {
      cs: "Nejdřív porozumím problému: kdo řešení používá, co dnes nefunguje a podle čeho poznáme, že je hotovo.",
      en: "First I get to the heart of the problem: who will use the solution, what isn't working today, and how we'll know it's done.",
    },
    outputs: { cs: ["Cíle a priority", "Rozsah první verze"], en: ["Goals and priorities", "Scope of the first version"] },
  },
  {
    id: "design",
    title: { cs: "Návrh řešení", en: "Solution Design" },
    text: {
      cs: "Navrhnu architekturu, datový model a UX. Vyberu technologie, které dávají smysl pro váš projekt – ne ty, které jsou zrovna v módě.",
      en: "I design the architecture, data model and UX, choosing technologies that make sense for your project — not whatever is fashionable.",
    },
    outputs: { cs: ["Architektura", "Wireframy / prototyp"], en: ["Architecture", "Wireframes / prototype"] },
  },
  {
    id: "build",
    title: { cs: "Vývoj s podporou AI", en: "AI-Accelerated Development" },
    text: {
      cs: "Implementuji v krátkých iteracích s AI coding agenty. AI zrychluje psaní kódu a testů; o architektuře a kvalitě rozhoduji já.",
      en: "I build in short iterations with AI coding agents. AI speeds up writing code and tests; architecture and quality decisions stay with me.",
    },
    outputs: { cs: ["Průběžná dema", "Čistý, čitelný kód"], en: ["Regular demos", "Clean, readable code"] },
  },
  {
    id: "quality",
    title: { cs: "Testování a kvalita", en: "Testing & Quality" },
    text: {
      cs: "Automatické testy, code review, kontrola výkonu a přístupnosti. Ověřuji, že řešení dělá to, co má – i v okrajových případech.",
      en: "Automated tests, code review, performance and accessibility checks. I verify the solution does what it should — edge cases included.",
    },
    outputs: { cs: ["Testy", "Kontrola výkonu a přístupnosti"], en: ["Tests", "Performance & accessibility checks"] },
  },
  {
    id: "delivery",
    title: { cs: "Nasazení a rozvoj", en: "Delivery & Evolution" },
    text: {
      cs: "Nasadím do produkce, předám dokumentaci a zůstávám k dispozici pro další rozvoj, úpravy a podporu.",
      en: "I deploy to production, hand over documentation and stay available for further development, changes and support.",
    },
    outputs: { cs: ["Produkční nasazení", "Dokumentace a podpora"], en: ["Production deployment", "Documentation & support"] },
  },
];
