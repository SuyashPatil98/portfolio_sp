"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Theme = "light" | "dark"

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null
      const systemDark =
        typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      const initial = stored || (systemDark ? "dark" : "light")
      setTheme(initial)
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", initial)
      }
    } catch {}
  }, [])

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light"
    setTheme(next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className={className}
    >
      {theme === "light" ? (
        // moon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.64 13.02A9 9 0 0 1 11 2.36a1 1 0 0 0-1.33 1.33A7 7 0 1 0 20.3 14.35a1 1 0 0 0 1.34-1.33z" />
        </svg>
      ) : (
        // sun
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.76 4.84l-1.8-1.79-1.42 1.41 1.79 1.8 1.43-1.42zm10.48 0l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM12 4h-1v3h2V4h-1zm0 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm8 1h-3v2h3v-2zm-16 0H1v2h3v-2zm13.24 1.16l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM4.22 18.95l-1.8 1.8 1.42 1.41 1.79-1.79-1.41-1.42zM12 17h-1v3h2v-3h-1z" />
        </svg>
      )}
      <span className="sr-only">Theme toggle</span>
    </Button>
  )
}
