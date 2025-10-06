export function PublicationsList() {
  const publications = [
    {
      title:
        "A Federated Transfer Learning Framework with Differential Privacy for Secure Monkeypox Diagnosis",
      venue: "SCEECS, 2025",
      link: "#",
    },
    {
      title:
        "Data Augmentation and Transfer Learning Strategies to Manage Class Imbalance in Pneumonia Detection",
      venue: "SCEECS, 2026",
      link: "#",
    },
    {
      title:
        "TriSpectralNet: A Deep Learning-Based Acoustic Monitoring of Insects in Agricultural Environments",
      venue: "Computer and Electronics in Agriculture, 2026 (Submitted)",
      link: "#",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {publications.map((pub, index) => (
        <a
          key={index}
          href={pub.link}
          className="block p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 hover:border-primary"
        >
          <h3 className="text-base md:text-lg font-semibold hover:text-primary">
            {pub.title}
          </h3>
          <p className="mt-1 text-gray-500 text-sm">{pub.venue}</p>
        </a>
      ))}
    </div>
  );
}
