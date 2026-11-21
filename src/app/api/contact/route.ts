import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * Sends e-mail through Resend's REST API (https://resend.com) — no SDK needed.
 * Required environment variables:
 *   RESEND_API_KEY     – API key
 *   CONTACT_TO_EMAIL   – where messages are delivered
 *   CONTACT_FROM_EMAIL – verified sender, e.g. "Portfolio <web@yourdomain.cz>"
 *
 * Without configuration the endpoint answers 503 and the form reports that
 * the message was NOT sent — it never fakes success.
 */

// Best-effort in-memory rate limit (per server instance).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  // Prune stale keys so the map cannot grow without bound.
  if (hits.size > 1000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const body = raw as Partial<Record<keyof ContactPayload, unknown>>;

  // Honeypot filled → silently accept without sending (bots only).
  if (typeof body.hp_check === "string" && body.hp_check.length > 0) return NextResponse.json({ ok: true });

  const fields = validateContact(body);
  if (fields.length) return NextResponse.json({ error: "validation", fields }, { status: 422 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const message = String(body.message).trim();
  const type = String(body.type);
  const locale = typeof body.locale === "string" ? body.locale.slice(0, 5) : "-";

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio: ${type} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nType: ${type}\nLocale: ${locale}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br/><strong>Email:</strong> ${escapeHtml(email)}<br/><strong>Type:</strong> ${escapeHtml(type)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Contact form: e-mail provider unreachable", error instanceof Error ? error.name : error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  if (!res.ok) {
    console.error("Contact form: e-mail provider responded", res.status);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
