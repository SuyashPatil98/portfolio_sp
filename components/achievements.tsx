export function Achievements() {
  const items = [
    "National Hackathon runner-up as the Team Leader – Smart India Hackathon 2024",
    "Capgemini Rockstar Award for 2 consecutive quarters – 2023",
    "Acheived Rank <50 Twice – CodeChef",
    "Data Science Research Lead at an Institute of National Importance",
  ];
  return (
    <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
      {items.map((it) => (
        <li key={it} className="text-pretty">
          {it}
        </li>
      ))}
    </ul>
  );
}
