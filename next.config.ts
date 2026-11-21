import type { NextConfig } from "next";

/**
 * Static export for Azure Static Web Apps (Free tier).
 * - No Node server: locale redirect, 404 handling and security headers live in
 *   public/staticwebapp.config.json.
 * - The contact form is served by the managed Azure Function in /api.
 */
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  experimental: {
    globalNotFound: true,
  },
  images: {
    // The default image optimizer needs a server; static export serves files as-is.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
