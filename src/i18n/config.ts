export const locales = ["cs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "cs";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A value translated into every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export const t = <T,>(value: Localized<T>, locale: Locale): T => value[locale];

export const localeNames: Record<Locale, { short: string; long: string; htmlLang: string; og: string }> = {
  cs: { short: "CS", long: "Čeština", htmlLang: "cs", og: "cs_CZ" },
  en: { short: "EN", long: "English", htmlLang: "en", og: "en_US" },
};

/** Builds a locale-prefixed path, e.g. href("cs", "/work") -> "/cs/work". */
export const href = (locale: Locale, path = "") =>
  `/${locale}${path === "/" ? "" : path}`;
