export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checked = [
    "GOOGLE_SHEET_ID",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
    "RESEND_API_KEY",
    "RESEND_FROM",
    "NOTIFY_EMAIL",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
  ];

  const presence = Object.fromEntries(
    checked.map((k) => {
      const v = process.env[k];
      return [
        k,
        {
          present: typeof v === "string" && v.length > 0,
          length: v?.length ?? 0,
        },
      ];
    }),
  );

  const allGoogleKeys = Object.keys(process.env)
    .filter((k) => k.toLowerCase().includes("google") || k.toLowerCase().includes("sheet"))
    .sort();

  return Response.json(
    { presence, allGoogleOrSheetEnvKeys: allGoogleKeys },
    { headers: { "cache-control": "no-store" } },
  );
}
