const { app } = require("@azure/functions");
const { handleContact } = require("../contact-core");

/**
 * POST /api/contact — served by Azure Static Web Apps managed functions.
 * App settings (SWA → Environment variables): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 */
app.http("contact", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "contact",
  handler: async (request, context) => {
    let raw;
    try {
      raw = await request.json();
    } catch {
      return { status: 400, jsonBody: { error: "invalid_json" } };
    }
    const ip =
      request.headers.get("x-azure-clientip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const { status, body } = await handleContact(raw, { ip, log: { error: (...a) => context.error(...a) } });
    return { status, jsonBody: body };
  },
});
