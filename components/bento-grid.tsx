"use client";

import { useEffect, useRef, useState } from "react";
import type { Domain } from "./portfolio-home";
import { GridCard } from "./grid-card";
import { AboutMe } from "./about-me";
import { EducationList } from "./education-list";
import { WorkExperience } from "./work-experience";
import { ProjectsGrid } from "./projects-grid";
import { PublicationsList } from "./publications-list";
import { Achievements } from "./achievements";
import { CodingStats } from "./coding-stats";
import { Certifications } from "./certifications";
import { ContactForm } from "./contact-form";

export function BentoGrid({ domain }: { domain: Domain }) {
  const [displayDomain, setDisplayDomain] = useState<Domain>(domain);
  const [flipping, setFlipping] = useState(false);
  const flipTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // trigger flip: animate, swap content mid-flip, end animation
    setFlipping(true);
    if (flipTimer.current) clearTimeout(flipTimer.current);
    flipTimer.current = setTimeout(() => {
      setDisplayDomain(domain);
    }, 300); // swap content at 50% of 600ms flip
    const end = setTimeout(() => setFlipping(false), 600);
    return () => {
      if (flipTimer.current) clearTimeout(flipTimer.current);
      clearTimeout(end);
    };
  }, [domain]);

  return (
    <section
      id={`grid-${displayDomain}`}
      aria-live="polite"
      className="grid grid-cols-1 auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-6"
    >
      <GridCard
        title="About me"
        flipping={flipping}
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <AboutMe domain={displayDomain} />
      </GridCard>

      <GridCard
        title="Education"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <EducationList />
      </GridCard>

      <GridCard
        title="DSA and Competitive Programming"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <CodingStats />
      </GridCard>

      <GridCard
        title="Work experience"
        flipping={flipping}
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <WorkExperience domain={displayDomain} />
      </GridCard>

      <GridCard
        title="Projects"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <ProjectsGrid domain={displayDomain} />
      </GridCard>

      <GridCard
        title="Publications"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <PublicationsList />
      </GridCard>

      <GridCard
        title="Achievements"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <Achievements />
      </GridCard>

      <GridCard
        title="Certifications"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <Certifications />
      </GridCard>

      <GridCard
        title="Contact"
        flipping={flipping}
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <ContactForm />
      </GridCard>
    </section>
  );
}
