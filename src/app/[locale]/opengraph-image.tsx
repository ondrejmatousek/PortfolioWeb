import { ImageResponse } from "next/og";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = "Ondřej Matoušek — software, web & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  const locale = hasLocale(value) ? value : defaultLocale;
  const h = getDictionary(locale).hero;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#07080a",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(255,138,76,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(138,168,255,0.22), transparent 45%)",
          color: "#ecedef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.18)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            om<span style={{ color: "#ff8a4c" }}>.</span>
          </div>
          <div style={{ fontSize: 28, color: "#a1a7b1" }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: 1000 }}>
            {`${h.titleA}${h.titleAccent}${h.titleB}`}
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#ff9d66", fontFamily: "monospace" }}>
            C# · .NET · SQL Server · Next.js · AI-first
          </div>
        </div>
      </div>
    ),
    size,
  );
}
