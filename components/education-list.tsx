export function EducationList() {
  return (
    <ul className="grid gap-4 text-sm">
      {/* M.Tech Entry */}
      <li>
        <div className="flex items-start justify-between">
          <span className="font-medium">M.Tech Data Science</span>
          <span className="text-muted-foreground">2024 — 2026</span>
        </div>
        <p className="text-muted-foreground">
          Indian Institute of Information Technology Bhopal · GPA 9.12/10
        </p>
        <p className="text-muted-foreground">Ongoing</p>
      </li>

      {/* B.E. Entry */}
      <li>
        <div className="flex items-start justify-between">
          <span className="font-medium">B.E. Computer Science</span>
          <span className="text-muted-foreground">2016 — 2020</span>
        </div>
        <p className="text-muted-foreground">
          Savitribai Phule Pune University
        </p>
      </li>
    </ul>
  );
}
