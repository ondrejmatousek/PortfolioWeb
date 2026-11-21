/**
 * Global site configuration.
 *
 * Values marked `PLACEHOLDER` are unknown and must be filled in before launch.
 * Links set to `null` are hidden in the UI until you provide them.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL; // set automatically on Vercel
  const url = explicit ?? (vercel ? `https://${vercel}` : "http://localhost:3000");
  if (!explicit && !vercel && process.env.NODE_ENV === "production") {
    console.warn("[site] NEXT_PUBLIC_SITE_URL is not set: canonical URLs, sitemap and OG tags point to localhost.");
  }
  return url.replace(/\/$/, "");
}

export const site = {
  name: "Ondřej Matoušek", // PLACEHOLDER: confirm full name (derived from GitHub handle)
  shortName: "OM",
  role: { cs: "Software developer & web creator", en: "Software developer & web creator" },
  /** Absolute production URL — set NEXT_PUBLIC_SITE_URL in your hosting environment. */
  url: resolveSiteUrl(),
  yearsOfExperience: 7,
  links: {
    github: "https://github.com/ondrejmatousek",
    linkedin: null as string | null, // PLACEHOLDER: e.g. "https://www.linkedin.com/in/your-profile"
  },
  /** Public contact e-mail shown as a fallback next to the form. PLACEHOLDER — null hides it. */
  email: null as string | null,
} as const;
