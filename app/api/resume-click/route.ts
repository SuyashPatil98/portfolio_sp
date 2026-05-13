import { appendRow, sendNotificationEmail } from "@/lib/notifications";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const timestamp = new Date().toISOString();
  const ua = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";

  try {
    await appendRow("Downloads!A:C", [timestamp, ua, referer]);
  } catch (err) {
    console.error("Sheet append failed:", err);
  }

  await sendNotificationEmail(
    "Resume downloaded",
    `
      <h2>Someone downloaded your resume</h2>
      <p><b>Time:</b> ${timestamp}</p>
      <p><b>User-Agent:</b> ${ua}</p>
      <p><b>Referer:</b> ${referer || "—"}</p>
    `,
  );

  return Response.json({ ok: true });
}
