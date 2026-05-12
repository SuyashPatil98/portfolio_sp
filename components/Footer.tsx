"use client";

import { personal } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-edge py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div>
            <div className="label-mono mb-1.5">SUYASH PATIL</div>
            <p className="text-[13px] text-ink-muted">
              Software Engineer · Data &amp; AI Systems
            </p>
          </div>

          <div className="font-mono text-[11px] tracking-wider uppercase text-ink-subtle space-y-1.5">
            <div>
              BUILD: {year}.05.12
              <span className="mx-2">·</span>
              {personal.location.toUpperCase()}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="status-dot" />
              STATUS: AVAILABLE
            </div>
            <div>NODE: V1.0.0 · NEXT.JS · TAILWIND</div>
          </div>

          <div className="font-mono text-[11px] tracking-wider uppercase text-ink-subtle md:text-right">
            © {year} Suyash P. Patil
            <br />
            <a
              href={`mailto:${personal.email}`}
              className="text-ink-muted hover:text-accent transition-colors normal-case tracking-normal font-sans text-[13px]"
            >
              {personal.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
