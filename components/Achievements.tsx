"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { achievements, certifications } from "@/lib/data";

const ACH_ICONS = [Trophy, Award, Award, Award, Award];

export default function Achievements() {
  return (
    <section className="section-pad border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="08"
          label="Credentials"
          title="Achievements and certifications."
        />

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {achievements.map((a, idx) => {
            const Icon = ACH_ICONS[idx] ?? Award;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: (idx % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card-hairline p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-accent/30 bg-accent/5 text-accent">
                    <Icon size={15} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-ink-subtle">
                    Achievement
                  </span>
                </div>
                <h3 className="text-ink text-base font-medium tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-0.5 label-mono">{a.subtitle}</p>
                <p className="mt-3 text-[13px] text-ink-muted leading-relaxed">
                  {a.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mb-5 label-mono">Certifications</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certifications.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: (idx % 3) * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card-hairline p-4 flex items-start gap-3"
            >
              <div className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-line bg-bg-raised text-ink-muted shrink-0">
                <BadgeCheck size={14} strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <div className="text-ink text-[13.5px] leading-snug">
                  {c.title}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="label-mono">{c.issuer}</span>
                  <span className="font-mono text-[10px] text-ink-subtle">·</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-ink-subtle">
                    {c.code}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
