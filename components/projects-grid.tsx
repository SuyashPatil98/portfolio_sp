import type { Domain } from "../portfolio-home";
import { Card } from "@/components/ui/card";

const byDomain: Record<Domain, { title: string; summary: string }[]> = {
  DevOps: [
    {
      title: " bugAlert.io",
      summary: "AI-Powered Code Bug Prediction Platform",
    },
    {
      title: "CrossLing Search",
      summary: "Cross-Language Information Retrieval System",
    },
  ],
  "Data Science": [
    {
      title: " bugAlert.io",
      summary: "AI-Powered Code Bug Prediction Platform",
    },
    {
      title: "CrossLing Search",
      summary: "Cross-Language Information Retrieval System",
    },
  ],
  "Software Development": [
    {
      title: " bugAlert.io",
      summary: "AI-Powered Code Bug Prediction Platform",
    },
    {
      title: "CrossLing Search",
      summary: "Cross-Language Information Retrieval System",
    },
  ],
};

export function ProjectsGrid({ domain }: { domain: Domain }) {
  const projects = byDomain[domain];
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {projects.map((p) => (
        <Card
          key={p.title}
          className="rounded-lg border bg-card/60 p-3 transition hover:shadow-md"
          role="article"
          aria-labelledby={`proj-${p.title}`}
        >
          <div className="aspect-[16/9] w-full rounded-md bg-secondary" />
          <h4 id={`proj-${p.title}`} className="mt-3 text-sm font-medium">
            {p.title}
          </h4>
          <p className="text-xs text-muted-foreground">{p.summary}</p>
        </Card>
      ))}
    </div>
  );
}
