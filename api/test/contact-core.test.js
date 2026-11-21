const { test } = require("node:test");
const assert = require("node:assert/strict");
const { handleContact, escapeHtml, _hits } = require("../src/contact-core");

const valid = { name: "Test User", email: "test@example.test", type: "web", message: "Hello, this is a test." };
const env = { RESEND_API_KEY: "test-key", CONTACT_TO_EMAIL: "to@example.test", CONTACT_FROM_EMAIL: "from@example.test" };
const silent = { error: () => {} };
let ipCounter = 0;
const opts = (extra = {}) => ({ ip: `10.0.0.${++ipCounter}`, log: silent, ...extra });

test("rejects non-object bodies", async () => {
  for (const raw of [null, [], "x", 5]) {
    assert.equal((await handleContact(raw, opts())).status, 400);
  }
});

test("rejects non-string fields with 422", async () => {
  const r = await handleContact({ name: 1, email: 2, type: "web", message: true }, opts({ env }));
  assert.equal(r.status, 422);
  assert.deepEqual(r.body.fields, ["name", "email", "message"]);
});

test("honeypot returns ok without sending", async () => {
  let called = false;
  const r = await handleContact({ ...valid, hp_check: "x" }, opts({ env, fetchImpl: () => { called = true; } }));
  assert.equal(r.status, 200);
  assert.equal(called, false);
});

test("never fakes success when not configured", async () => {
  const r = await handleContact(valid, opts({ env: {} }));
  assert.equal(r.status, 503);
  assert.equal(r.body.error, "not_configured");
});

test("reports 502 when provider fails or is unreachable", async () => {
  const failing = await handleContact(valid, opts({ env, fetchImpl: async () => ({ ok: false, status: 500 }) }));
  assert.equal(failing.status, 502);
  const unreachable = await handleContact(valid, opts({ env, fetchImpl: async () => { throw new TypeError("fetch failed"); } }));
  assert.equal(unreachable.status, 502);
});

test("succeeds only when provider accepts and escapes HTML", async () => {
  let sent;
  const r = await handleContact(
    { ...valid, name: "<b>Eve</b>" },
    opts({ env, fetchImpl: async (_url, init) => { sent = JSON.parse(init.body); return { ok: true, status: 200 }; } }),
  );
  assert.equal(r.status, 200);
  assert.ok(sent.html.includes("&lt;b&gt;Eve&lt;/b&gt;"));
  assert.equal(sent.reply_to, valid.email);
});

test("strips line breaks from the name used in the subject", async () => {
  let sent;
  await handleContact(
    { ...valid, name: "Eve\r\nBcc: x@example.test" },
    opts({ env, fetchImpl: async (_url, init) => { sent = JSON.parse(init.body); return { ok: true, status: 200 }; } }),
  );
  assert.ok(!/[\r\n]/.test(sent.subject));
});

test("rate limits after 5 attempts per IP", async () => {
  _hits.clear();
  const o = { ip: "192.0.2.1", env, log: silent, fetchImpl: async () => ({ ok: true, status: 200 }) };
  for (let i = 0; i < 5; i++) assert.equal((await handleContact(valid, o)).status, 200);
  assert.equal((await handleContact(valid, o)).status, 429);
});

test("unconfigured requests do not consume the rate limit", async () => {
  _hits.clear();
  const o = { ip: "192.0.2.2", env: {}, log: silent };
  for (let i = 0; i < 8; i++) assert.equal((await handleContact(valid, o)).status, 503);
});

test("escapeHtml escapes all special characters", () => {
  assert.equal(escapeHtml(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
});
