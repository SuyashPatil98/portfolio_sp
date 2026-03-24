"use client";

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
import { Skills } from "./skills";

export function BentoGrid() {

  return (
    <section
      aria-live="polite"
      className="grid grid-cols-1 auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-6"
    >
      <GridCard
        title="About me"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <AboutMe />
      </GridCard>

      <GridCard
        title="Education"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <EducationList />
      </GridCard>

      <GridCard
        title="Technical Skills"
        className="md:col-span-6 md:row-span-2 border-4 border-primary/50"
      >
        <Skills />
      </GridCard>

      <GridCard
        title="DSA and Competitive Programming"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <CodingStats />
      </GridCard>

      <GridCard
        title="Work experience"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <WorkExperience />
      </GridCard>

      <GridCard
        title="Projects"
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <ProjectsGrid />
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
        className="md:col-span-3 md:row-span-2 border-4 border-primary/50"
      >
        <ContactForm />
      </GridCard>
    </section>
  );
}
