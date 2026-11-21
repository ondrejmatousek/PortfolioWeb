import type { Project } from "./types";

/**
 * Portfolio projects.
 *
 * Every technology and feature listed here was verified from the project's
 * own repository. Anything unknown is left empty or marked with `todo`,
 * which renders a visible placeholder notice on the case study page.
 *
 * To add a project: append an object below. Order = display order.
 */
export const projects: Project[] = [
  {
    slug: "gastropozice",
    name: "Gastropozice.cz",
    status: "live",
    featured: true,
    category: { cs: "Pracovní portál", en: "Job portal" },
    art: "jobs",
    color: "#ff8a4c",
    tagline: {
      cs: "Samoobslužný pracovní portál pro restaurace, hotely, bary a kavárny.",
      en: "A self-service job portal for restaurants, hotels, bars and cafés.",
    },
    problem: {
      cs: "Gastro provozy potřebují rychle a bez prostředníků oslovit lidi, kteří hledají práci právě v gastronomii. Obecné pracovní portály jsou pro ně drahé a nabídky v nich zapadnou.",
      en: "Hospitality businesses need to reach people looking for work in hospitality — quickly and without intermediaries. General job boards are expensive for them, and their listings get lost.",
    },
    solution: {
      cs: "Specializovaný portál, kde si firma sama vytvoří a spravuje inzeráty, uchazeči reagují přímo na nabídku a placené služby se hradí online. Samostatná administrační aplikace slouží ke správě uživatelů, obsahu a fakturace.",
      en: "A dedicated portal where companies create and manage their own listings, candidates respond directly to the ad, and paid services are settled online. A separate admin application handles users, content and invoicing.",
    },
    features: {
      cs: [
        "Inzeráty, balíčky inzerce a jednorázové inzeráty",
        "Reakce uchazečů přímo na konkrétní nabídku",
        "Firemní účet s přehledem inzerátů a transakcí",
        "Online platby přes platební bránu ThePay a zálohové faktury",
        "PDF faktury s QR kódem pro platbu",
        "Články a tipy, ceník, FAQ a právní stránky",
        "Oddělená administrace: uživatelé, inzeráty za zákazníka, obsah, faktury",
        "Bezpečné předání přihlášení mezi aplikacemi (jednorázový kód s PKCE)",
      ],
      en: [
        "Job listings, listing packages and one-off listings",
        "Candidate responses tied to a specific listing",
        "Company account with an overview of listings and transactions",
        "Online payments via the ThePay gateway, plus proforma invoices",
        "PDF invoices with a payment QR code",
        "Articles and tips, pricing, FAQ and legal pages",
        "Separate admin app: users, listings on behalf of customers, content, invoices",
        "Secure sign-in handoff between apps (one-time code bound to PKCE)",
      ],
    },
    stack: [
      "C#",
      "ASP.NET Core MVC",
      ".NET 8",
      "SQL Server / Azure SQL",
      "Dapper",
      "ASP.NET Core Identity",
      "ThePay",
      "Serilog",
      "xUnit",
      "Azure App Service (Linux)",
      "GitHub Actions",
    ],
    architecture: {
      cs: [
        "Dvě ASP.NET Core aplikace – veřejný portál a administrace – nad sdílenou databází",
        "Vrstvená architektura (doména, datová vrstva, služby, web) s Dapperem nad SQL Serverem",
        "CI/CD přes GitHub Actions s nasazením do Azure App Service a ověřením kompatibility Windows/Linux",
        "Přechod hostingu na Azure App Service pro Linux včetně analýzy nákladů",
      ],
      en: [
        "Two ASP.NET Core apps — the public portal and the admin — over a shared database",
        "Layered architecture (domain, data access, services, web) with Dapper on SQL Server",
        "CI/CD with GitHub Actions deploying to Azure App Service, plus a Windows/Linux compatibility check",
        "Hosting moved to Azure App Service for Linux, including a cost analysis",
      ],
    },
    liveUrl: "https://gastropozice.cz",
    services: ["software-development", "websites-ecommerce"],
    todo: {
      cs: "Doplňte svou roli v projektu, rok spuštění a skutečný screenshot (public/work/gastropozice.webp).",
      en: "Add your role in the project, launch year and a real screenshot (public/work/gastropozice.webp).",
    },
  },
  {
    slug: "trade-replay",
    name: "TradeReplay",
    status: "pilot",
    featured: true,
    category: { cs: "Trading · Backtesting", en: "Trading · Backtesting" },
    art: "replay",
    color: "#7aa2ff",
    tagline: {
      cs: "Manuální backtesting – přehrávání historického trhu svíčku po svíčce.",
      en: "Manual backtesting — replay historical markets candle by candle.",
    },
    problem: {
      cs: "Obchodník, který chce otestovat svou strategii ručně, potřebuje vidět trh tak, jak se vyvíjel – bez pohledu do budoucnosti – a mít ke každé testovací session vlastní kapitál, obchody a statistiky.",
      en: "A trader testing a strategy by hand needs to see the market as it unfolded — with no look-ahead — and keep separate capital, trades and statistics for each test session.",
    },
    solution: {
      cs: "Webová aplikace pro replay historických dat forexu, kovů, indexových CFD a futures. Uživatel krokuje nebo automaticky přehrává graf, zadává pozice se SL/TP přímo do grafu a průběžně vidí výsledky své session.",
      en: "A web app for replaying historical forex, metals, index CFD and futures data. The user steps through or auto-plays the chart, places positions with SL/TP directly on it, and sees the session's results as they go.",
    },
    features: {
      cs: [
        "Uložené replay session, každá s vlastním kapitálem",
        "Timeframy od 1m do 1M, krokování i autoplay 1×/2×/5×",
        "Nezávislý timeframe grafu a krok přehrávání",
        "Kreslicí nástroje: long/short pozice se SL/TP, trendová linie, úroveň, zóna",
        "Statistiky session: equity křivka, měsíční a denní P&L, win rate, drawdown",
        "Knihovna dat: import 1m bid/ask dat z Dukascopy a samostatný import futures",
        "Oddělené uživatelské účty s přihlášením přes Google",
      ],
      en: [
        "Saved replay sessions, each with its own capital",
        "Timeframes from 1m to 1M, step-through and 1×/2×/5× autoplay",
        "Chart timeframe independent of the replay step",
        "Drawing tools: long/short positions with SL/TP, trendline, level, zone",
        "Session stats: equity curve, monthly and daily P&L, win rate, drawdown",
        "Data library: 1m bid/ask import from Dukascopy plus a separate futures import",
        "Separate user accounts with Google sign-in",
      ],
    },
    stack: ["JavaScript", "Node.js", "Vite", "TradingView Lightweight Charts", "SQLite", "Docker Compose", "Caddy"],
    architecture: {
      cs: [
        "Node.js HTTP server a frontend sestavený přes Vite",
        "SQLite pro session, obchody a uživatele",
        "Nasazení přes Docker Compose s Caddy jako HTTPS reverse proxy na cloudovém VM",
      ],
      en: [
        "Node.js HTTP server with a Vite-built frontend",
        "SQLite for sessions, trades and users",
        "Deployed with Docker Compose and Caddy as the HTTPS reverse proxy on a cloud VM",
      ],
    },
    services: ["mvp-product"],
    todo: {
      cs: "Pilotní verze s přihlášením – doplňte veřejný odkaz nebo demo, pokud ho chcete zveřejnit.",
      en: "Pilot release behind sign-in — add a public link or demo if you want to share one.",
    },
  },
  {
    slug: "trade-watcher",
    name: "TradeWatcher",
    status: "placeholder",
    category: { cs: "Trading · Monitoring", en: "Trading · Monitoring" },
    art: "watcher",
    color: "#4fd1a5",
    tagline: {
      cs: "Aplikace pro monitoring obchodních příležitostí.",
      en: "An application for monitoring trading opportunities.",
    },
    problem: {
      cs: "[PLACEHOLDER] Popište problém, který TradeWatcher řeší.",
      en: "[PLACEHOLDER] Describe the problem TradeWatcher solves.",
    },
    solution: {
      cs: "[PLACEHOLDER] Popište řešení a hlavní funkce aplikace.",
      en: "[PLACEHOLDER] Describe the solution and the app's main features.",
    },
    features: { cs: [], en: [] },
    stack: [],
    services: ["mvp-product"],
    todo: {
      cs: "Repozitář TradeWatcher je zatím prázdný, takže zde nejsou žádné ověřené údaje. Doplňte popis, funkce a technologie.",
      en: "The TradeWatcher repository is currently empty, so there are no verified details yet. Add a description, features and technologies.",
    },
  },
  {
    slug: "seasonality-app",
    name: "SeasonalityApp",
    status: "live",
    featured: true,
    category: { cs: "Analýza trhů", en: "Market analytics" },
    art: "seasonality",
    color: "#b794f6",
    tagline: {
      cs: "Sezónní vzorce a COT data na jednom místě, s důrazem na statistickou stabilitu.",
      en: "Seasonal patterns and COT data in one place, with a focus on statistical stability.",
    },
    problem: {
      cs: "Sezónní grafy samy o sobě často klamou – průměr přes roky může skrývat, že vzorec v posledních letech nefunguje. Obchodník potřebuje vidět, jak stabilní daný sezónní interval skutečně je, a mít k tomu kontext pozic velkých hráčů.",
      en: "Seasonal charts on their own often mislead — an average across years can hide the fact that a pattern no longer works. A trader needs to see how stable a seasonal window really is, with context from large traders' positioning.",
    },
    solution: {
      cs: "Webová aplikace bez nutnosti přihlášení, která kombinuje sezónní grafy se statistikami stability intervalu, screener napříč trhy a COT indexy z dat CFTC.",
      en: "A web app with no sign-in required that combines seasonal charts with interval stability statistics, a cross-market screener and COT indexes built from CFTC data.",
    },
    features: {
      cs: [
        "Sezónní grafy a statistiky stability zvoleného intervalu",
        "Medián, 25./75. percentil, ořezaný průměr a srovnání 5/10/20 let",
        "Screener s filtry podle typu trhu a skupiny komodit, řazení a export do PNG",
        "COT indexy pro 26, 52 a 156 týdnů",
        "Indexy, komodity, forex, ETF, kryptoměny a akcie",
        "Možnost exportu frontendu jako statického webu nad JSON snapshoty",
      ],
      en: [
        "Seasonal charts with stability statistics for the selected window",
        "Median, 25th/75th percentiles, trimmed mean and 5/10/20-year comparisons",
        "Screener with market-type and commodity-group filters, sorting and PNG export",
        "COT indexes for 26, 52 and 156-week lookbacks",
        "Indices, commodities, forex, ETFs, crypto and stocks",
        "Frontend can be exported as a static site over JSON snapshots",
      ],
    },
    stack: ["C#", "ASP.NET Core MVC", ".NET 10", "Entity Framework Core", "Azure SQL", "Azure App Service", "Azure Static Web Apps", "Bicep", "GitHub Actions"],
    architecture: {
      cs: [
        "ASP.NET Core MVC aplikace s EF Core nad Azure SQL",
        "Import cenových dat a COT reportů z veřejných zdrojů",
        "Infrastruktura jako kód (Bicep) a nasazení přes GitHub Actions",
      ],
      en: [
        "ASP.NET Core MVC app with EF Core over Azure SQL",
        "Ingestion of price data and COT reports from public sources",
        "Infrastructure as code (Bicep) and deployment via GitHub Actions",
      ],
    },
    repoUrl: "https://github.com/ondrejmatousek/SeasonalityApp",
    services: ["software-development", "mvp-product"],
    todo: {
      cs: "Doplňte veřejnou adresu aplikace (liveUrl), pokud ji chcete zobrazit, a ověřte, že je repozitář veřejný.",
      en: "Add the public app URL (liveUrl) if you want it shown, and confirm the repository is public.",
    },
  },
  {
    slug: "insiders-app",
    name: "Insiders App",
    codename: "Gurus",
    status: "in-development",
    featured: true,
    category: { cs: "Tržní informace", en: "Market intelligence" },
    art: "insiders",
    color: "#ffd166",
    tagline: {
      cs: "Portfolia institucí z formulářů 13F a nákupy insiderů z formulářů SEC Form 4.",
      en: "Institutional portfolios from 13F filings and insider purchases from SEC Form 4.",
    },
    problem: {
      cs: "Veřejné údaje o tom, co nakupují velké fondy a vedení firem, jsou roztroušené v tisících podání na SEC EDGAR. Ruční procházení je pomalé a souvislosti – třeba více insiderů nakupujících ve stejné době – snadno zapadnou.",
      en: "Public data on what large funds and company insiders are buying is scattered across thousands of SEC EDGAR filings. Reading them by hand is slow, and patterns — like several insiders buying at the same time — are easy to miss.",
    },
    solution: {
      cs: "Collector v .NET stahuje a zpracovává podání 13F a Form 4, mapuje CUSIP na tickery a ukládá výsledky jako data pro rychlý React frontend. Aplikace ukazuje profily institucí, držitele akcií a nákupy insiderů včetně detekce clusterů.",
      en: "A .NET collector downloads and processes 13F and Form 4 filings, maps CUSIPs to tickers and stores the results as data for a fast React frontend. The app shows institution profiles, stock holders and insider purchases, including cluster detection.",
    },
    features: {
      cs: [
        "Sběr podání 13F z SEC EDGAR a mapování CUSIP → ticker přes OpenFIGI",
        "Profily institucí, držitelé a aktivita u jednotlivých akcií",
        "Nákupy insiderů z Form 4 s filtry podle role, hodnoty a clusterů",
        "Detekce clusterů – více insiderů nakupujících v krátkém časovém okně",
        "Průnik nákupů insiderů s konsenzem institucí z 13F",
        "Vyhledávání, řaditelné tabulky, světlý a tmavý režim",
      ],
      en: [
        "13F filing collection from SEC EDGAR with CUSIP → ticker mapping via OpenFIGI",
        "Institution profiles, plus holders and activity for each stock",
        "Form 4 insider purchases with role, value and cluster filters",
        "Cluster detection — several insiders buying within a short window",
        "Overlap between insider buying and 13F institutional consensus",
        "Search, sortable tables, light and dark themes",
      ],
    },
    stack: ["C#", ".NET 10", "React", "TypeScript", "Vite", "React Router", "xUnit", "Vitest", "Azure Static Web Apps", "GitHub Actions"],
    architecture: {
      cs: [
        "Konzolový collector v .NET generuje datové soubory – bez serveru a databáze za běhu",
        "Statický React + TypeScript frontend nasazený na Azure Static Web Apps",
        "Testy na obou stranách: xUnit pro collector, Vitest pro frontend",
      ],
      en: [
        "A .NET console collector generates data files — no server or database at runtime",
        "Static React + TypeScript frontend deployed to Azure Static Web Apps",
        "Tests on both sides: xUnit for the collector, Vitest for the frontend",
      ],
    },
    services: ["ai-automation", "mvp-product", "software-development"],
    todo: {
      cs: "Ověřte, že „Insiders App“ odpovídá repozitáři Gurus, a doplňte veřejný odkaz, pokud existuje. Aplikace slouží pouze k informačním účelům, nejde o investiční doporučení.",
      en: "Confirm that “Insiders App” corresponds to the Gurus repository and add a public link if there is one. The app is for information only and is not investment advice.",
    },
  },
  {
    slug: "wild-spirit",
    name: "Wild Spirit",
    status: "in-development",
    featured: true,
    category: { cs: "E-commerce", en: "E-commerce" },
    art: "shop",
    color: "#e9c7a0",
    tagline: {
      cs: "Prémiový vícejazyčný e-shop s designovým nábytkem, svítidly a ručně šitou kůží.",
      en: "A premium multilingual store for designer furniture, lighting and handmade leather goods.",
    },
    problem: {
      cs: "Designové a zakázkové produkty se neprodávají jako zboží z regálu – mají varianty, materiály, výrobu na zakázku a často začínají poptávkou. Běžné krabicové e-shopy to zvládají jen s kompromisy.",
      en: "Designer and made-to-order products don't sell like off-the-shelf goods — they have variants, materials, custom production and often start with an enquiry. Off-the-shelf store platforms handle that only with compromises.",
    },
    solution: {
      cs: "E-shop na míru v češtině, angličtině a němčině s katalogem variant a materiálů, objednávkami, poptávkami a nabídkami, výrobou na zakázku a vlastní administrací rozdělenou podle rolí.",
      en: "A custom store in Czech, English and German with a catalogue of variants and materials, orders, enquiries and quotes, made-to-order production and a role-based admin area.",
    },
    features: {
      cs: [
        "Katalog s variantami, volbami, materiály a barvami",
        "Košík, checkout, objednávky a skladové zásoby",
        "Poptávky, nabídky a výroba na zakázku",
        "Zákaznický účet, přihlášení přes Google a Facebook",
        "Administrace s rolemi a bezpečným nahráváním obrázků (převod do WebP)",
        "SEO: historie slugů, sitemap.xml, robots.txt",
        "Newsletter s double opt-in, recenze, galerie, obsahové stránky",
        "GDPR export dat, cookie consent, bezpečnostní hlavičky a CSP",
      ],
      en: [
        "Catalogue with variants, options, materials and colours",
        "Cart, checkout, orders and inventory",
        "Enquiries, quotes and made-to-order production",
        "Customer accounts with Google and Facebook sign-in",
        "Role-based admin with safe image uploads (converted to WebP)",
        "SEO: slug history, sitemap.xml, robots.txt",
        "Double opt-in newsletter, reviews, gallery, content pages",
        "GDPR data export, cookie consent, security headers and CSP",
      ],
    },
    stack: ["C#", ".NET 10", "ASP.NET Core MVC", "Entity Framework Core", "SQL Server", "ASP.NET Core Identity", "FluentValidation", "ImageSharp", "Playwright", "Docker"],
    architecture: {
      cs: [
        "Modulární monolit podle Clean Architecture (Domain / Application / Infrastructure / Web)",
        "Snapshoty objednávek a nabídek, peníze jako decimal, časy v UTC",
        "Unit, integrační a E2E testy (xUnit, Playwright)",
      ],
      en: [
        "Modular monolith following Clean Architecture (Domain / Application / Infrastructure / Web)",
        "Order and quote snapshots, money as decimal, timestamps in UTC",
        "Unit, integration and E2E tests (xUnit, Playwright)",
      ],
    },
    services: ["websites-ecommerce", "software-development"],
    todo: {
      cs: "Projekt je ve vývoji a zatím není veřejně nasazen. Doplňte odkaz po spuštění.",
      en: "The project is in development and not yet publicly deployed. Add the link after launch.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
