"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, personal } from "@/lib/data";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive("#" + visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-line"
          : "bg-transparent",
      )}
    >
      <div className="container-edge flex h-14 items-center justify-between">
        {/* Monogram */}
        <Link
          href="#top"
          className="font-mono text-sm tracking-tight text-ink hover:text-accent transition-colors"
          aria-label="Home"
        >
          {personal.monogram}
          <span className="text-accent ml-0.5">/</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-md font-mono text-[12px] tracking-wider uppercase transition-colors",
                active === item.href
                  ? "text-accent bg-accent/10"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-ink-muted">
            <span className="status-dot" />
            <span>Available</span>
          </div>
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md border border-line text-ink-muted"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-bg">
          <nav className="container-edge py-4 flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2 rounded-md font-mono text-[13px] tracking-wider uppercase",
                  active === item.href
                    ? "text-accent bg-accent/10"
                    : "text-ink-muted",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
