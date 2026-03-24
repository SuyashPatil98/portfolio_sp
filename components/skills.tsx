import { Badge } from "@/components/ui/badge";

export function Skills() {
  const skillCategories = [
    {
      category: "Programming and Data Engineering",
      skills: [
        { name: "Python", icon: "🐍" },
        { name: "Pandas", icon: "🐼" },
        { name: "NumPy", icon: "🔢" },
        { name: "Scikit-learn", icon: "🤖" },
        { name: "SQL", icon: "🗄️" },
        { name: "NoSQL", icon: "📊" },
        { name: "PostgreSQL", icon: "🐘" },
      ],
    },
    {
      category: "Big Data Frameworks",
      skills: [
        { name: "Apache Spark", icon: "⚡" },
        { name: "Databricks", icon: "🧱" },
        { name: "Apache Airflow", icon: "🌊" },
        { name: "Kafka", icon: "📨" },
      ],
    },
    {
      category: "Cloud and Data Platforms",
      skills: [
        { name: "AWS EC2", icon: "☁️" },
        { name: "AWS S3", icon: "🪣" },
        { name: "AWS EMR", icon: "📊" },
        { name: "AWS Kinesis", icon: "🌊" },
        { name: "AWS Lambda", icon: "λ" },
        { name: "Snowflake", icon: "❄️" },
        { name: "DBT", icon: "🔧" },
      ],
    },
    {
      category: "Data Science and Analysis",
      skills: [
        { name: "AWS Sagemaker", icon: "🤖" },
        { name: "Tableau", icon: "📈" },
        { name: "AWS Redshift", icon: "🗃️" },
        { name: "AWS Athena", icon: "🔍" },
        { name: "AWS S3", icon: "🪣" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {skillCategories.map((category, idx) => (
        <div key={idx} className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            {category.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium"
              >
                <span className="mr-1.5">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
