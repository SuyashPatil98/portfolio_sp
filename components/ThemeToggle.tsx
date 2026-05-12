"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) {
    return <div aria-hidden className="h-8 w-8" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-line text-ink-muted hover:text-ink hover:border-line-strong transition-colors"
    >
      {isLight ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
