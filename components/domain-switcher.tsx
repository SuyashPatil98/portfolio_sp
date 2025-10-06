"use client"

import type { Domain } from "./portfolio-home"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DOMAINS: Domain[] = ["DevOps", "Data Science", "Software Development"]

export function DomainSwitcher({
  value,
  onChange,
}: {
  value: Domain
  onChange: (d: Domain) => void
}) {
  return (
    <div role="tablist" aria-label="Portfolio domain" className="inline-flex rounded-lg bg-secondary p-1">
      {DOMAINS.map((d) => {
        const selected = value === d
        return (
          <Button
            key={d}
            role="tab"
            aria-selected={selected}
            aria-controls={`grid-${d}`}
            onClick={() => onChange(d)}
            variant="ghost"
            className={cn(
              "rounded-md px-3 py-2 text-sm md:text-base",
              selected
                ? "bg-primary text-primary-foreground shadow"
                : "text-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {d}
          </Button>
        )
      })}
    </div>
  )
}
