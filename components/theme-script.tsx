"use client";
import { useEffect } from "react";

export function ThemeScript() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const theme = stored || (mql.matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {
      console.error("ThemeScript error:", e);
    }
  }, []);

  return null; // no visible UI, just logic
}
