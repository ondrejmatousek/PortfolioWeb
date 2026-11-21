import type { Metadata } from "next";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { site } from "@/content/site";

/** Shared metadata for a page: canonical URL, hreflang alternates and Open Graph. */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/cs${path}` },
    },
    openGraph: {
      type: "website",
      locale: localeNames[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeNames[l].og),
      url: `/${locale}${path}`,
      siteName: site.name,
      title: title ?? undefined,
      description,
    },
    twitter: { card: "summary_large_image", title: title ?? undefined, description },
  };
}
