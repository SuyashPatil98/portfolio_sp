import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KEY = "portfolio:views";

function getRedis() {
  return Redis.fromEnv();
}

export async function GET() {
  try {
    const redis = getRedis();
    const count = (await redis.get<number>(KEY)) ?? 0;
    return Response.json({ count });
  } catch (err) {
    console.error("views GET error:", err);
    return Response.json({ count: null }, { status: 200 });
  }
}

export async function POST() {
  try {
    const redis = getRedis();
    const count = await redis.incr(KEY);
    return Response.json({ count });
  } catch (err) {
    console.error("views POST error:", err);
    return Response.json({ count: null }, { status: 200 });
  }
}
