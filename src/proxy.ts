import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

const knownSlugs: Record<string, Set<string>> = {
  work: new Set(projects.map((p) => p.slug)),
  services: new Set(services.map((s) => s.slug)),
};

/** Picks the best supported locale from the Accept-Language header. */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (hasLocale(lang)) return lang;
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [first = "", section, slug, ...extra] = pathname.split("/").filter(Boolean);
  if (hasLocale(first)) {
    // Unknown case-study / service slugs would otherwise be served from the
    // partially prerendered fallback shell with HTTP 200 (a "soft 404").
    // Rewriting to an unmatched path yields a real 404 status.
    if (section && slug && knownSlugs[section] && (!knownSlugs[section].has(slug) || extra.length)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}/__not-found`;
      return NextResponse.rewrite(url);
    }
    return;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (sitemap.xml, robots.txt, images…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
