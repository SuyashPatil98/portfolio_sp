import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get("username")
    if (!username) {
      return NextResponse.json({ error: "username required" }, { status: 400 })
    }

    const res = await fetch(`https://www.codechef.com/users/${encodeURIComponent(username)}`, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; v0-portfolio/1.0; +https://v0.app) AppleWebKit/537.36 (KHTML, like Gecko)",
        accept: "text/html",
      },
    })
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error", status: res.status }, { status: 502 })
    }
    const html = await res.text()

    // Very basic parsing; robust enough for common structure
    const ratingMatch = html.match(/class="rating-number"[^>]*>([\d.]+)<\/div>/i)
    const starsMatch = html.match(/class="rating-star"[^>]*>([^<]+)</i)
    const highestMatch = html.match(/Highest Rating[^<]*<\/[^>]+>[^0-9]*([\d.]+)/i)
    const globalRankMatch = html.match(/Global Rank[^<]*<\/[^>]+>[^0-9#]*#?([\d,]+)/i)

    const data = {
      username,
      rating: ratingMatch ? Number(ratingMatch[1]) : null,
      stars: starsMatch ? starsMatch[1].trim() : null,
      highestRating: highestMatch ? Number(highestMatch[1]) : null,
      globalRank: globalRankMatch ? globalRankMatch[1] : null,
    }

    return NextResponse.json(data, { headers: { "cache-control": "s-maxage=3600, stale-while-revalidate=86400" } })
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
