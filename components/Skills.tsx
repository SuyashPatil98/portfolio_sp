"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section-pad bg-bg-alt border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="07"
          label="Technical Stack"
          title="The actual tools — not the buzzword cloud."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.45,
                delay: (idx % 3) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card-hairline p-5 group"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                <span className="label-mono text-ink group-hover:text-accent transition-colors">
                  {group.title}
                </span>
                <span className="font-mono text-[10px] text-ink-subtle">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11.5px] tracking-wider text-ink-muted px-2 py-1 rounded border border-line bg-bg/30 hover:text-ink hover:border-line-strong transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
