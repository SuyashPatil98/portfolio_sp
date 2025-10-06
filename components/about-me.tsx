import type { Domain } from "../portfolio-home";

export function AboutMe({ domain }: { domain: Domain }) {
  const focus =
    domain === "DevOps"
      ? "scalable infrastructure, automated deployments, reliable operations, and performance insights."
      : domain === "Data Science"
      ? "data-driven insights, predictive solutions, and evidence-based strategies."
      : "end-to-end product development, scalable engineering, and user-centric design.";

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-3xl">
      <p className="text-base md:text-lg font-medium">
        I’m a software developer turned data scientist who loves building
        systems that don’t just predict, they perform. My work sits at the
        crossroads of code and intelligence, where robust engineering meets
        statistical insight.
      </p>
      <p className="text-sm md:text-base">
        Whether it’s deploying scalable ML pipelines or crafting end-to-end
        applications, I’m driven by one question:{" "}
        <span className="font-semibold">
          how far can we push what’s possible with data?
        </span>
      </p>
      <p className="text-sm md:text-base italic">
        My current focus is on <span className="font-medium">{focus}</span>.
      </p>
    </div>
  );
}
