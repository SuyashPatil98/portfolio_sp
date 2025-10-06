"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type AnimatedNameProps = {
  name: string
  className?: string
  // Emphasize a slice with brand color
  highlight?: { start: number; end: number } // inclusive start, exclusive end
  // Base delay between letters
  stepMs?: number
}

export function AnimatedName({ name, className, highlight, stepMs = 60 }: AnimatedNameProps) {
  const chars = React.useMemo(() => Array.from(name), [name])

  return (
    <span
      aria-label={name}
      className={cn("animated-name inline-flex flex-wrap items-baseline text-balance leading-tight", className)}
    >
      {chars.map((ch, i) => {
        const isSpace = ch === " "
        const style = { ["--i" as any]: i.toString(), ["--step" as any]: `${stepMs}ms` }
        const emphasized = highlight && i >= highlight.start && i < highlight.end

        return (
          <span
            key={`${ch}-${i}`}
            className={cn(
              "animated-letter inline-block",
              emphasized ? "text-primary" : "text-foreground",
              isSpace && "w-2 md:w-2.5",
            )}
            style={style as React.CSSProperties}
          >
            {!isSpace ? ch : "\u00A0"}
          </span>
        )
      })}
    </span>
  )
}

export default AnimatedName
