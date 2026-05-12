"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { metrics } from "@/lib/data";

export default function Metrics() {
  return (
    <section id="impact" className="section-pad bg-bg-alt border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="03"
          label="Impact"
          title="Selected metrics from production work and research projects."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (i % 4) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative bg-bg-raised p-5 md:p-6 flex flex-col justify-between min-h-[160px] group hover:bg-bg-raised/70 transition-colors"
            >
              <span className="font-mono text-[10px] tracking-wider uppercase text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="mt-4">
                <div className="font-mono text-2xl md:text-3xl text-ink tracking-tight">
                  {m.value}
                </div>
                <div className="mt-2 label-mono text-ink-muted">{m.label}</div>
                <p className="mt-2 text-[12.5px] text-ink-subtle leading-snug">
                  {m.context}
                </p>
              </div>

              {/* corner accent */}
              <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] tracking-wider uppercase text-ink-subtle">
          // Numbers reflect personal contributions; some bands provided as
          ranges to avoid overclaim.
        </p>
      </div>
    </section>
  );
}
