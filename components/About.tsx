"use client";

import { motion } from "framer-motion";
import { Code2, Database, Cpu, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { about } from "@/lib/data";

const ICONS = [Code2, Database, Cpu, Sparkles];

export default function About() {
  return (
    <section id="about" className="section-pad border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="02"
          label="Positioning"
          title="I work where software engineering meets data systems and applied ML."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <p className="text-base md:text-lg text-ink-muted leading-relaxed">
              {about.intro}
            </p>
            <p className="mt-6 text-base md:text-lg text-ink-muted leading-relaxed">
              The result is a profile that sits comfortably in{" "}
              <span className="text-ink">software engineering</span>,{" "}
              <span className="text-ink">data engineering</span>,{" "}
              <span className="text-ink">ML systems</span>, and{" "}
              <span className="text-ink">GenAI</span> — without pretending to be
              a researcher or a generic full-stack dev.
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {about.intersection.map((item, i) => {
              const Icon = ICONS[i] ?? Code2;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="card-hairline p-5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-line bg-bg-raised text-ink group-hover:border-accent/40 group-hover:text-accent transition-colors">
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-ink-subtle">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-ink text-base font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
