import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get("username")
    if (!username) {
      return NextResponse.json({ error: "username required" }, { status: 400 })
    }

    const query = `
      query userPublicProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile { ranking }
          submitStats {
            acSubmissionNum { difficulty count }
          }
          badges {
            id
            displayName
            icon
          }
        }
      }
    `

    const resp = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: "https://leetcode.com/",
      },
      body: JSON.stringify({ query, variables: { username } }),
      // Important: do not use credentials; public data fetch
    })

    if (!resp.ok) {
      return NextResponse.json({ error: "Upstream error", status: resp.status }, { status: 502 })
    }
    const json = (await resp.json()) as any
    const m = json?.data?.matchedUser

    const counts: Record<string, number> = {}
    for (const item of m?.submitStats?.acSubmissionNum ?? []) {
      counts[item?.difficulty ?? ""] = item?.count ?? 0
    }
    const data = {
      username: m?.username ?? username,
      ranking: m?.profile?.ranking ?? null,
      totalSolved: counts["All"] ?? null,
      easy: counts["Easy"] ?? null,
      medium: counts["Medium"] ?? null,
      hard: counts["Hard"] ?? null,
      badges:
        (m?.badges ?? [])
          .filter((b: any) => b?.icon && b?.displayName)
          .map((b: any) => ({ name: b.displayName as string, icon: b.icon as string })) ?? [],
    }

    return NextResponse.json(data, { headers: { "cache-control": "s-maxage=3600, stale-while-revalidate=86400" } })
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}
