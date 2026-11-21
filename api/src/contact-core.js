/**
 * Contact form logic, independent of the Azure Functions runtime (testable).
 * Validation rules mirror src/lib/contact.ts used by the client — keep both in sync.
 */
const PROJECT_TYPES = ["software", "web", "ai", "mvp", "job", "other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v) => (typeof v === "string" ? v.trim() : "");

function validateContact(p) {
  const errors = [];
  const name = str(p.name);
  const email = str(p.email);
  const message = str(p.message);
  if (name.length < 2 || name.length > 120) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 200) errors.push("email");
  if (!PROJECT_TYPES.includes(p.type)) errors.push("type");
  if (message.length < 10 || message.length > 5000) errors.push("message");
  return errors;
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Best-effort in-memory rate limit (per function instance).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip, now = Date.now()) {
  if (hits.size > 1000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

/**
 * Handles a parsed request body. Returns { status, body }.
 * Never reports success unless the e-mail provider accepted the message.
 */
async function handleContact(raw, { ip = "unknown", env = process.env, fetchImpl = fetch, log = console } = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { status: 400, body: { error: "invalid_json" } };

  // Honeypot filled → accept silently without sending (bots only).
  if (typeof raw.hp_check === "string" && raw.hp_check.length > 0) return { status: 200, body: { ok: true } };

  const fields = validateContact(raw);
  if (fields.length) return { status: 422, body: { error: "validation", fields } };

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return { status: 503, body: { error: "not_configured" } };

  if (rateLimited(ip)) return { status: 429, body: { error: "rate_limited" } };

  const name = str(raw.name).replace(/[\r\n]+/g, " ");
  const email = str(raw.email);
  const message = str(raw.message);
  const type = raw.type;
  const locale = typeof raw.locale === "string" ? raw.locale.slice(0, 5) : "-";

  let res;
  try {
    res = await fetchImpl("https://api.resend.com/emails", {
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
    log.error("Contact form: e-mail provider unreachable", error && error.name);
    return { status: 502, body: { error: "send_failed" } };
  }
  if (!res.ok) {
    log.error("Contact form: e-mail provider responded", res.status);
    return { status: 502, body: { error: "send_failed" } };
  }
  return { status: 200, body: { ok: true } };
}

module.exports = { handleContact, validateContact, escapeHtml, _hits: hits };
