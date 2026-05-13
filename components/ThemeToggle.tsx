"use client";

import { useEffect, useState } from "react";
import { Moon, Sparkles } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isFun, setIsFun] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFun(document.documentElement.classList.contains("fun"));
  }, []);

  const toggle = () => {
    const next = !isFun;
    setIsFun(next);
    if (next) {
      document.documentElement.classList.add("fun");
      localStorage.setItem("theme", "fun");
    } else {
      document.documentElement.classList.remove("fun");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) {
    return <div aria-hidden className="h-8 w-8" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isFun ? "Switch to dark mode" : "Switch to fun mode"}
      title={isFun ? "Back to dark" : "Fun mode ✨"}
      className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-line text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
    >
      {isFun ? <Moon size={14} /> : <Sparkles size={14} />}
    </button>
  );
}
