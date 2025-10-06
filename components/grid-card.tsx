import type React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function GridCard({
  title,
  children,
  flipping,
  className,
}: {
  title: string;
  children: React.ReactNode;
  flipping?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card/70 p-4 shadow-sm backdrop-blur",
        className
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
      </div>

      <div
        className={cn(
          "text-sm md:text-base leading-relaxed mt-2",
          flipping && "animate-flip-y"
        )}
      >
        {children}
      </div>
    </Card>
  );
}
