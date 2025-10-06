export function Certifications() {
  const certs = [
    { title: "OCI Data Science (Oracle)" },
    { title: "OCI Generative AI (Oracle)" },
    { title: "AZ-900 Azure Fundamentals (Microsoft)" },
    { title: "Deep Learning Specialization (DeeplearningAI)" },
    { title: "Databases and SQL in Python (IBM)" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {certs.map((cert, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white"
        >
          <div className="flex items-center space-x-3">
            <span className="inline-block w-3 h-3 bg-primary rounded-full"></span>
            <span className="font-medium text-gray-800">{cert.title}</span>
          </div>
          <span className="text-muted-foreground text-sm">{cert.year}</span>
        </div>
      ))}
    </div>
  );
}
