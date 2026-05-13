import { google } from "googleapis";

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY");
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendRow(range: string, row: (string | number)[]) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("Missing GOOGLE_SHEET_ID");

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export async function sendNotificationEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn("Skipping email — RESEND_API_KEY or NOTIFY_EMAIL missing");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
  }
}
