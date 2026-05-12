"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  label: string;
  title?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  index,
  label,
  title,
  align = "left",
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-12 md:mb-16 flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3 label-mono">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span>{label}</span>
      </div>
      {title && (
        <h2 className="font-sans text-2xl md:text-4xl font-medium tracking-tight text-ink max-w-3xl">
          {title}
        </h2>
      )}
    </motion.div>
  );
}
