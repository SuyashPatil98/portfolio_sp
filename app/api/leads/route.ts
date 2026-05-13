import { appendRow, sendNotificationEmail } from "@/lib/notifications";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();
  const source = String(body.source ?? "contact-form").trim();

  if (!name || !email) {
    return Response.json({ error: "Name and email are required" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  if (name.length > 120 || email.length > 200 || message.length > 2000) {
    return Response.json({ error: "Field too long" }, { status: 400 });
  }

  const timestamp = new Date().toISOString();
  const ua = req.headers.get("user-agent") ?? "";

  try {
    await appendRow("Leads!A:G", [
      timestamp,
      name,
      email,
      company,
      message,
      source,
      ua,
    ]);
  } catch (err) {
    console.error("Sheet append failed:", err);
    return Response.json({ error: "Storage failed" }, { status: 500 });
  }

  await sendNotificationEmail(
    `New lead: ${name}`,
    `
      <h2>New lead on portfolio</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Company / role:</b> ${escapeHtml(company) || "—"}</p>
      <p><b>Message:</b><br>${escapeHtml(message).replace(/\n/g, "<br>") || "—"}</p>
      <hr>
      <p style="color:#666;font-size:12px">Source: ${escapeHtml(source)} · ${timestamp}</p>
    `,
  );

  return Response.json({ ok: true });
}
