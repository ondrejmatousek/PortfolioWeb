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
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot filled → silently accept without sending (bots only).
  if (body.company) return NextResponse.json({ ok: true });

  const fields = validateContact(body);
  if (fields.length) return NextResponse.json({ error: "validation", fields }, { status: 422 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const message = body.message!.trim();
  const type = body.type!;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Portfolio: ${type} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${type}\nLocale: ${body.locale ?? "-"}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br/><strong>Email:</strong> ${escapeHtml(email)}<br/><strong>Type:</strong> ${escapeHtml(type)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: e-mail provider responded", res.status);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
