import { Badge } from "@/components/ui/badge";

export function WorkExperience() {
  const fullExperience = [
    {
      role: "Associate Consultant - Capgemini, Mumbai, India",
      period: "May 2021 — Sept 2024",
      mode: "Hybrid",
      bullets: [
        `Built distributed batch and near real-time processing workflows using <strong>Python</strong> and <strong>Apache Spark</strong>, ensuring scalable handling of high-volume datasets with robust schema validation, monitoring, and fault tolerance.`,
        `Performed exploratory data analysis (EDA), statistical validation, and feature engineering to support predictive modeling initiatives; delivered insights that influenced product strategy and operational decision-making.`,
        `Implemented CI/CD-enabled data and ML workflows with automated testing and orchestration using <strong>Airflow</strong> and cloud infrastructure, reducing deployment time by <strong>60%</strong> and improving production reliability.`,
        `Collaborated directly with cross-functional teams and external clients to gather analytical requirements, present model findings, and translate insights into measurable business impact.`,
        `Mentored <strong>2+</strong> junior engineers and interns on data modeling, SQL optimization, and production-grade pipeline development, impacting team productivity and code quality standards by <strong>25%</strong>.`,
        `Recognized as a top performer for <strong>2 consecutive quarters</strong> and promoted twice within one year for delivering solutions that exceeded stakeholder expectations.`,
      ],
      tags: ["Python", "Apache Spark", "Airflow", "AWS", "ETL", "ML Pipelines"],
    },
    {
      role: "Data Science Intern - Capgemini, Pune, India",
      period: "July 2019 — Sept 2019",
      mode: "Onsite",
      bullets: [
        `Designed and implemented an automated ETL pipeline that streamlined data extraction and transformation, increasing workflow efficiency by <strong>40%</strong> and reducing manual intervention.`,
        `Built interactive dashboards with real-time analytics, cutting operational expenditure by <strong>35%</strong> and supporting leadership in strategic planning.`,
      ],
      tags: ["Python", "ETL", "Dashboards", "Data Analytics"],
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
