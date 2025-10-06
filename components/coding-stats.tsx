"use client";

import useSWR from "swr";

type LeetBadge = { name: string; icon: string };
type LeetData = {
  username: string;
  ranking?: number;
  totalSolved?: number;
  easy?: number;
  medium?: number;
  hard?: number;
  badges?: LeetBadge[];
};
type CodechefData = {
  username: string;
  rating?: number;
  globalRank?: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// Replace with your handles
const LEETCODE_USERNAME = "babawick66";
const CODECHEF_USERNAME = "suyash_66";

// Convert rating to stars (like CodeChef)
const getStars = (rating?: number) => {
  if (!rating) return "No stars";
  if (rating >= 2000) return "⭐⭐⭐⭐⭐";
  if (rating >= 1800) return "⭐⭐⭐⭐";
  if (rating >= 1600) return "⭐⭐⭐";
  if (rating >= 1400) return "⭐⭐";
  if (rating >= 1200) return "⭐";
  return "No stars";
};

export function CodingStats() {
  const {
    data: leet,
    isLoading: leetLoading,
    error: leetErr,
  } = useSWR<LeetData>(
    LEETCODE_USERNAME
      ? `/api/leetcode?username=${encodeURIComponent(LEETCODE_USERNAME)}`
      : null,
    fetcher
  );

  const {
    data: cc,
    isLoading: ccLoading,
    error: ccErr,
  } = useSWR<CodechefData>(
    CODECHEF_USERNAME
      ? `/api/codechef?username=${encodeURIComponent(CODECHEF_USERNAME)}`
      : null,
    fetcher
  );

  return (
    <div className="grid gap-4">
      {/* LeetCode Card */}
      <div className="rounded-md border bg-secondary/50 p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium">LeetCode</h4>
          {leet?.ranking != null && (
            <span className="text-xs text-muted-foreground">
              Rank #{leet.ranking}
            </span>
          )}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <Stat
            label="Solved"
            value={leet?.totalSolved}
            loading={leetLoading}
          />
          <Stat label="Medium" value={leet?.medium} loading={leetLoading} />
          <Stat label="Hard" value={leet?.hard} loading={leetLoading} />
        </div>

        {/* Badges */}
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">Badges</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {leetLoading && <SkeletonCircle />}
            {leetErr && (
              <p className="text-xs text-destructive">
                Couldn’t load LeetCode.
              </p>
            )}
            {leet?.badges?.length
              ? leet.badges.map((b) => {
                  const badgeUrl = b.icon
                    ? b.icon.startsWith("http")
                      ? b.icon
                      : `https://leetcode.com${b.icon}`
                    : "/placeholder.svg";

                  const isKnight = b.name.toLowerCase() === "knight";

                  return (
                    <div
                      key={b.name}
                      className={`flex items-center gap-2 rounded border bg-card px-2 py-1 flex-shrink-0 transition-transform ${
                        isKnight
                          ? "scale-125 border-yellow-400 shadow-lg animate-pulse"
                          : ""
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={badgeUrl}
                        width={isKnight ? 28 : 20}
                        height={isKnight ? 28 : 20}
                        alt={b.name}
                        className={`h-${isKnight ? 7 : 5} w-${
                          isKnight ? 7 : 5
                        } shrink-0 rounded`}
                        loading="lazy"
                      />
                      <span
                        className={`text-xs ${
                          isKnight ? "font-semibold text-yellow-500" : ""
                        }`}
                      >
                        {b.name}
                      </span>
                    </div>
                  );
                })
              : !leetLoading && (
                  <p className="text-xs text-muted-foreground">
                    No badges found.
                  </p>
                )}
          </div>
        </div>

        <a
          href={
            LEETCODE_USERNAME
              ? `https://leetcode.com/${LEETCODE_USERNAME}/`
              : "#"
          }
          className="mt-3 inline-block text-xs underline decoration-primary/40 underline-offset-4 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
      </div>

      {/* CodeChef Card */}
      <div className="rounded-md border bg-secondary/50 p-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium">CodeChef</h4>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <Stat label="Rating" value={cc?.rating} loading={ccLoading} />
          <Stat
            label="Stars"
            value={getStars(cc?.rating)}
            loading={ccLoading}
          />
          <Stat label="Global" value={cc?.globalRank} loading={ccLoading} />
        </div>

        <a
          href={
            CODECHEF_USERNAME
              ? `https://www.codechef.com/users/${CODECHEF_USERNAME}`
              : "#"
          }
          className="mt-3 inline-block text-xs underline decoration-primary/40 underline-offset-4 hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>

        {ccErr && (
          <p className="mt-2 text-xs text-destructive">
            Couldn’t load CodeChef.
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  loading,
}: {
  label: string;
  value?: string | number | null;
  loading?: boolean;
}) {
  return (
    <div className="rounded bg-card px-2 py-3">
      <div className="text-lg font-semibold">
        {loading ? "—" : value ?? "—"}
      </div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function SkeletonCircle() {
  return (
    <div
      className="h-6 w-6 animate-pulse rounded-full bg-muted"
      aria-hidden="true"
    />
  );
}
