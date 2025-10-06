"use client";

import { useMemo, useState } from "react";
import { DomainSwitcher } from "./domain-switcher";
import { BentoGrid } from "./bento-grid";
import { ThemeToggle } from "./theme-toggle";
import AnimatedName from "./animated-name";

export type Domain = "DevOps" | "Data Science" | "Software Development";

export default function PortfolioHome() {
  const [domain, setDomain] = useState<Domain>("DevOps");

  const domainTagline = useMemo(() => {
    switch (domain) {
      case "DevOps":
        return "Automating delivery, observability, and reliable platforms.";
      case "Data Science":
        return "Turning data into decisions with ML and clear narratives.";
      case "Software Development":
        return "Building robust, accessible, and performant web apps.";
    }
  }, [domain]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 md:mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            <AnimatedName name="Suyash Patil" className="align-baseline" />
          </h1>
          <p className="text-pretty text-muted-foreground md:text-lg">
            {domainTagline}
          </p>

          <div
            className="mt-3 flex items-center gap-3"
            aria-label="Social profiles"
          >
            {/* GitHub */}
            <a
              href="https://github.com/SuyashPatil98"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
              title="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                className="fill-current"
              >
                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.4-3.9-1.4-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.74 0-1.27.46-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.21 1.19a11.18 11.18 0 0 1 5.85 0c2.22-1.5 3.2-1.19 3.2-1.19.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.11 0 4.46-2.72 5.44-5.31 5.73.41.35.78 1.03.78 2.08v3.08c0 .31.2.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/suyashpatil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
              title="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
                className="fill-current"
              >
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5Zm-.75 6h3.5v11h-3.5v-11ZM9.75 9.5h3.36v1.5h.05c.47-.9 1.6-1.85 3.3-1.85 3.53 0 4.18 2.32 4.18 5.34V20.5h-3.5v-5.18c0-1.24-.02-2.83-1.73-2.83-1.73 0-1.99 1.35-1.99 2.74v5.27h-3.5v-11Z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>

            {/* Resume */}
            <a
              href="https://drive.google.com/file/d/135DRVqamIlf6Qg1QhcHuBRS3eULfo3Od/view?usp=sharing" // replace with actual path in /public folder
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              title="Resume"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <ThemeToggle />
          <DomainSwitcher value={domain} onChange={setDomain} />
        </div>
      </header>

      <BentoGrid domain={domain} />
    </main>
  );
}
