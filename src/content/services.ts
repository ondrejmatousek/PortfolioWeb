import type { Service, ServiceSlug } from "./types";

export const services: Service[] = [
  {
    slug: "software-development",
    hue: "software",
    icon: "server",
    title: { cs: "Vývoj software", en: "Software Development" },
    tagline: {
      cs: "Podnikové aplikace, API a integrace postavené na .NET.",
      en: "Business applications, APIs and integrations built on .NET.",
    },
    summary: {
      cs: "Interní systémy, backendové služby a REST API v C# a ASP.NET Core. Návrh databáze v SQL Serveru, napojení na externí systémy a úpravy existujících aplikací podle změnových požadavků.",
      en: "Internal systems, backend services and REST APIs in C# and ASP.NET Core. SQL Server database design, connections to third-party systems, and changes to existing applications driven by change requests.",
    },
    keywords: {
      cs: ["C# / .NET", "REST API", "SQL Server", "Integrace"],
      en: ["C# / .NET", "REST API", "SQL Server", "Integrations"],
    },
    intro: {
      cs: "Software, který drží firmu v chodu, musí být hlavně spolehlivý a srozumitelný. Navrhuji a vyvíjím aplikace v ekosystému .NET – od datového modelu přes byznys logiku po API a uživatelské rozhraní. Stejně dobře se orientuji v existujícím kódu, kde je potřeba přidat funkci, opravit chybu nebo bezpečně provést změnu.",
      en: "Software that keeps a business running has to be, above all, reliable and easy to reason about. I design and build applications in the .NET ecosystem — from the data model and business logic to the API and user interface. I'm just as comfortable in an existing codebase that needs a new feature, a bug fix or a carefully executed change.",
    },
    deliverables: {
      cs: [
        { title: "Podnikové a interní aplikace", text: "Webové aplikace v ASP.NET Core pro evidenci, schvalování, reporting a každodenní agendu." },
        { title: "REST API a backend", text: "Čisté, zdokumentované API a služby běžící na pozadí, připravené na další rozvoj." },
        { title: "Databáze", text: "Návrh schématu v SQL Serveru, optimalizace dotazů, migrace dat a Entity Framework Core." },
        { title: "Integrace", text: "Propojení s externími systémy, platebními bránami, bankovními API a datovými zdroji." },
        { title: "Změnové požadavky", text: "Analýza dopadu, návrh řešení a bezpečná implementace změn do běžícího systému." },
        { title: "Automatizace procesů", text: "Nahrazení ručních a opakujících se kroků spolehlivým kódem." },
      ],
      en: [
        { title: "Business & internal applications", text: "ASP.NET Core web apps for records, approvals, reporting and day-to-day operations." },
        { title: "REST APIs & backend", text: "Clean, documented APIs and background services that are ready to grow." },
        { title: "Databases", text: "SQL Server schema design, query tuning, data migrations and Entity Framework Core." },
        { title: "Integrations", text: "Connections to third-party systems, payment gateways, banking APIs and data sources." },
        { title: "Change requests", text: "Impact analysis, solution design and safe implementation of changes in a live system." },
        { title: "Process automation", text: "Replacing manual, repetitive steps with dependable code." },
      ],
    },
    useCases: {
      cs: [
        "Firma eviduje data v Excelu a potřebuje skutečnou aplikaci s rolemi a historií.",
        "Stávající systém potřebuje novou funkci nebo napojení na další službu.",
        "Je potřeba API pro mobilní aplikaci, partnera nebo interní nástroj.",
      ],
      en: [
        "A company tracks data in spreadsheets and needs a real application with roles and history.",
        "An existing system needs a new feature or a connection to another service.",
        "An API is needed for a mobile app, a partner or an internal tool.",
      ],
    },
    stack: ["C#", ".NET", "ASP.NET Core", "SQL Server", "Entity Framework Core", "REST API", "Azure"],
    relatedProjects: ["gastropozice", "seasonality-app", "wild-spirit"],
  },
  {
    slug: "websites-ecommerce",
    hue: "web",
    icon: "layout",
    title: { cs: "Weby a e-shopy", en: "Websites & E-commerce" },
    tagline: {
      cs: "Firemní weby, landing pages a e-shopy, které prodávají.",
      en: "Company websites, landing pages and online stores that sell.",
    },
    summary: {
      cs: "Moderní responzivní weby ve WordPressu (Divi) nebo na míru v Reactu a Next.js. Redesign zastaralých webů s důrazem na rychlost, SEO a jasnou cestu zákazníka ke kontaktu.",
      en: "Modern responsive websites in WordPress (Divi) or custom-built with React and Next.js. Redesigns of outdated sites with a focus on speed, SEO and a clear path to getting in touch.",
    },
    keywords: {
      cs: ["WordPress / Divi", "Next.js", "E-shopy", "Redesign"],
      en: ["WordPress / Divi", "Next.js", "E-commerce", "Redesign"],
    },
    intro: {
      cs: "Web je často první místo, kde si o vás zákazník udělá názor. Navrhuji a stavím weby, které rychle načítají, dobře fungují na mobilu a vedou návštěvníka k akci. Podle povahy projektu volím WordPress, kde si obsah spravujete sami, nebo vlastní řešení v Next.js, když je potřeba víc výkonu a flexibility.",
      en: "Your website is often where a customer forms their first opinion of you. I design and build websites that load fast, work well on mobile and guide visitors towards taking action. Depending on the project I choose WordPress, so you can manage content yourself, or a custom Next.js build when you need more performance and flexibility.",
    },
    deliverables: {
      cs: [
        { title: "Firemní weby", text: "Přehledná prezentace firmy, služeb a referencí s jednoduchou správou obsahu." },
        { title: "Landing pages", text: "Jednostránkové weby pro kampaně a produkty zaměřené na konverzi." },
        { title: "E-shopy", text: "Katalog, košík, objednávky a správa produktů podle velikosti a potřeb obchodu." },
        { title: "Webové aplikace", text: "Interaktivní aplikace v Reactu a Next.js s napojením na API a databázi." },
        { title: "Redesign", text: "Modernizace zastaralého webu bez ztráty obsahu a pozic ve vyhledávání." },
        { title: "SEO a výkon", text: "Technické SEO, metadata, Core Web Vitals, přístupnost a optimalizace obrázků." },
      ],
      en: [
        { title: "Company websites", text: "A clear presentation of your company, services and work, with simple content management." },
        { title: "Landing pages", text: "Conversion-focused single-page sites for campaigns and products." },
        { title: "Online stores", text: "Catalogue, cart, orders and product management sized to your business." },
        { title: "Web applications", text: "Interactive React and Next.js applications backed by an API and a database." },
        { title: "Redesign", text: "Modernising an outdated site without losing content or search rankings." },
        { title: "SEO & performance", text: "Technical SEO, metadata, Core Web Vitals, accessibility and image optimisation." },
      ],
    },
    useCases: {
      cs: [
        "Současný web je pomalý, nefunguje na mobilu a nepřivádí poptávky.",
        "Spouštíte nový produkt nebo službu a potřebujete landing page.",
        "Chcete začít prodávat online a potřebujete e-shop, který zvládnete spravovat.",
      ],
      en: [
        "Your current site is slow, broken on mobile and doesn't generate enquiries.",
        "You're launching a new product or service and need a landing page.",
        "You want to start selling online and need a store you can manage yourself.",
      ],
    },
    stack: ["WordPress", "Divi", "Next.js", "React", "TypeScript", "HTML", "CSS"],
    relatedProjects: ["ucetnictvi-dokoupilova", "wild-spirit", "gastropozice"],
  },
  {
    slug: "ai-automation",
    hue: "ai",
    icon: "sparkles",
    title: { cs: "AI a automatizace", en: "AI & Automation" },
    tagline: {
      cs: "AI integrované tam, kde přináší skutečnou úsporu.",
      en: "AI integrated where it delivers real savings.",
    },
    summary: {
      cs: "Integrace AI do existujících systémů, AI agenti a agentic workflows, automatizace rutinních úkolů. Bez buzzwordů – s jasným popisem, co se automatizuje a jak se kontroluje výsledek.",
      en: "AI integrated into existing systems, AI agents and agentic workflows, automation of routine tasks. No buzzwords — just a clear account of what gets automated and how the output is checked.",
    },
    keywords: {
      cs: ["AI integrace", "AI agenti", "Workflow", "Automatizace"],
      en: ["AI integration", "AI agents", "Workflows", "Automation"],
    },
    intro: {
      cs: "AI má smysl tam, kde odstraní opakovanou práci nebo zpřístupní informace, které dnes někdo ručně dohledává. Pomohu najít místa, kde se automatizace vyplatí, navrhnu bezpečné napojení na vaše data a systémy a postavím řešení, u kterého je jasné, co dělá a kdy má rozhodnout člověk.",
      en: "AI makes sense where it removes repetitive work or surfaces information someone currently looks up by hand. I'll help you find where automation pays off, design a safe connection to your data and systems, and build a solution where it's clear what it does and when a person needs to decide.",
    },
    deliverables: {
      cs: [
        { title: "Integrace AI do aplikací", text: "Napojení jazykových modelů na vaše data, dokumenty a stávající software." },
        { title: "AI agenti", text: "Agenti, kteří zvládají vícekrokové úlohy s nástroji a kontrolou výstupu." },
        { title: "Automatizace rutiny", text: "Zpracování dokumentů, e-mailů, exportů a reportů bez ručního přepisování." },
        { title: "Interní nástroje", text: "Jednoduché aplikace, které zpřístupní AI týmu bezpečně a pod kontrolou." },
      ],
      en: [
        { title: "AI in your applications", text: "Connecting language models to your data, documents and existing software." },
        { title: "AI agents", text: "Agents that handle multi-step tasks with tools and output verification." },
        { title: "Routine automation", text: "Processing documents, e-mails, exports and reports without manual retyping." },
        { title: "Internal tools", text: "Simple apps that give your team access to AI safely and under control." },
      ],
    },
    useCases: {
      cs: [
        "Tým tráví hodiny týdně ručním zpracováním dat nebo dokumentů.",
        "Chcete využít AI nad vlastními daty, ale nevíte, jak začít bezpečně.",
        "Stávající aplikace by potřebovala chytřejší vyhledávání nebo sumarizaci.",
      ],
      en: [
        "Your team spends hours each week processing data or documents by hand.",
        "You want to use AI on your own data but aren't sure how to start safely.",
        "An existing application could use smarter search or summarisation.",
      ],
    },
    stack: ["Claude Code", "AI Coding Agents", "C#", ".NET", "TypeScript", "REST API"],
    relatedProjects: ["insiders-app", "seasonality-app"],
  },
  {
    slug: "mvp-product",
    hue: "mvp",
    icon: "rocket",
    title: { cs: "MVP a produktový vývoj", en: "MVP & Product Development" },
    tagline: {
      cs: "Od nápadu k fungujícímu prototypu v řádu týdnů.",
      en: "From idea to a working prototype in weeks.",
    },
    summary: {
      cs: "Rychlé prototypy, MVP a SaaS nástroje. Díky AI-first workflow ověříte nápad na skutečných uživatelích dřív – a se základem, na kterém lze dál stavět.",
      en: "Rapid prototypes, MVPs and SaaS tools. With an AI-first workflow you can validate an idea with real users sooner — on a foundation you can keep building on.",
    },
    keywords: {
      cs: ["Prototypy", "MVP", "SaaS", "Produkty"],
      en: ["Prototypes", "MVP", "SaaS", "Products"],
    },
    intro: {
      cs: "U nového produktu rozhoduje rychlost ověření. Pomohu vám zúžit nápad na to podstatné, navrhnout první verzi a dodat ji tak, aby šla ukázat uživatelům nebo investorům. Zkratky volím vědomě: rychlost tam, kde nevadí, a pevný základ tam, kde by se později těžko opravoval.",
      en: "With a new product, speed of validation is everything. I'll help you narrow the idea down to what matters, design a first version and deliver it in a state you can show to users or investors. Shortcuts are deliberate: speed where it's harmless, a solid foundation where it would be hard to fix later.",
    },
    deliverables: {
      cs: [
        { title: "Klikací prototypy", text: "Rychlé ověření UX a toku aplikace před samotným vývojem." },
        { title: "MVP", text: "První funkční verze produktu s klíčovými funkcemi, nasazená a připravená k testování." },
        { title: "SaaS nástroje", text: "Webové aplikace s uživatelskými účty, správou dat a dalším rozvojem." },
        { title: "Technická konzultace", text: "Výběr technologií, architektura a odhad dalšího postupu." },
      ],
      en: [
        { title: "Clickable prototypes", text: "Fast validation of UX and app flow before the build starts." },
        { title: "MVP", text: "A first working version with the key features, deployed and ready for testing." },
        { title: "SaaS tools", text: "Web applications with user accounts, data management and room to grow." },
        { title: "Technical consulting", text: "Technology choices, architecture and a realistic plan for what comes next." },
      ],
    },
    useCases: {
      cs: [
        "Máte nápad na digitální produkt a chcete ho ověřit bez velkého týmu.",
        "Potřebujete funkční demo pro investory nebo první zákazníky.",
        "Interní nástroj, který si tým staví v tabulkách, chcete převést na aplikaci.",
      ],
      en: [
        "You have an idea for a digital product and want to validate it without a large team.",
        "You need a working demo for investors or early customers.",
        "You want to turn an internal tool your team runs in spreadsheets into an app.",
      ],
    },
    stack: ["Next.js", "React", "TypeScript", "ASP.NET Core", "SQL Server", "SQLite", "Azure"],
    relatedProjects: ["trade-replay", "insiders-app", "seasonality-app"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug) as ServiceSlug[];
