"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="04"
          label="Experience"
          title="Production engineering across financial services."
        />

        <div className="space-y-6">
          {experience.map((job, idx) => (
            <motion.article
              key={job.role}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card-hairline p-6 md:p-8"
            >
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6 pb-5 border-b border-line">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="label-mono-accent">{job.tag}</span>
                  </div>
                  <h3 className="text-ink text-lg md:text-xl font-medium tracking-tight">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-ink-muted text-sm">
                    <span className="text-ink">{job.company}</span>
                    <span className="mx-1.5 text-ink-subtle">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} strokeWidth={1.5} className="text-ink-subtle" />
                      {job.location}
                    </span>
                    <span className="mx-1.5 text-ink-subtle">·</span>
                    {job.mode}
                  </p>
                </div>
                <div className="font-mono text-[12px] tracking-wider uppercase text-ink-muted md:text-right md:min-w-[180px]">
                  {job.period}
                </div>
              </div>

              {/* Bullets */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-10 md:gap-y-5">
                {job.points.map((p) => (
                  <div key={p.title} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <div>
                      <div className="font-mono text-[12px] tracking-wider uppercase text-ink mb-1">
                        {p.title}
                      </div>
                      <p className="text-[14px] text-ink-muted leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack chips */}
              <div className="mt-6 pt-5 border-t border-line flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10.5px] tracking-wider uppercase text-ink-muted px-2 py-1 rounded border border-line"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
