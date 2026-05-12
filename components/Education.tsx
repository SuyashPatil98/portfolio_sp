"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section className="section-pad bg-bg-alt border-t border-line">
      <div className="container-edge">
        <SectionHeader index="09" label="Education" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((e, idx) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="card-hairline p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-line bg-bg-raised text-ink-muted">
                  <GraduationCap size={18} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-wider uppercase text-ink-muted">
                  {e.period}
                </span>
              </div>
              <h3 className="text-ink text-base md:text-lg font-medium tracking-tight">
                {e.degree}
              </h3>
              <p className="mt-1 text-[14px] text-ink-muted">{e.school}</p>
              <p className="mt-3 font-mono text-[12px] text-ink-subtle">
                {e.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
