import type { Domain } from "../portfolio-home";
import { Badge } from "@/components/ui/badge";

export function WorkExperience({ domain }: { domain: Domain }) {
  const tags =
    domain === "DevOps"
      ? ["Kubernetes", "Jenkins", "CI/CD", "AWS"]
      : domain === "Data Science"
      ? ["Python", "SQL", "PySpark", "DataBricks", "MLOps"]
      : ["MERN", "Javascript", "Redis", "Docker"];

  const dataScienceKeywords = [
    "Apache Spark",
    "Predictive Modeling",
    "Data Driven Insights",
  ];

  const fullExperience = [
    {
      role: "Associate Consultant - Capgemini, Mumbai, India",
      period: "2021 — 2024",
      mode: "Hybrid",
      bullets: [
        `Back-End & API: Built and optimized backend systems and 15+ REST APIs with Redis caching, improving performance by <strong>40–50%</strong>.`,
        `DevOps & Scalability: Implemented CI/CD pipelines and resolved 50+ issues, boosting deployment speed and system efficiency by <strong>30–60%</strong>.`,
      ],
      tags,
    },
    {
      role: "Data Science Intern - Capgemini, Pune, India",
      period: "July 2019 — Sept 2019",
      mode: "Onsite",
      bullets: [
        `ETL & Automation: Developed an ETL model that automated data extraction, streamlining workflows and improving output by <strong>40%</strong>.`,
        `Analytics & Dashboards: Created Python/R scripts and real-time dashboards, enhancing decision-making and reducing operational expenditure by <strong>35%</strong>.`,
      ],
      tags: dataScienceKeywords,
    },
  ];

  return (
    <div className="space-y-6">
      {fullExperience.map((exp, idx) => (
        <div key={idx} className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{exp.role}</p>
              <p className="text-xs text-muted-foreground">{exp.period}</p>
            </div>
            <p className="text-xs text-muted-foreground">{exp.mode}</p>
          </div>

          <ul className="list-disc list-inside space-y-2 text-sm text-pretty">
            {exp.bullets.map((b, idx2) => (
              <li
                key={idx2}
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: b }}
              />
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="bg-primary/10 text-primary"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
