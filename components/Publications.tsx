"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { publications, type Publication } from "@/lib/data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Publication["status"], string> = {
  Published: "text-accent border-accent/40 bg-accent/5",
  "Under Review": "text-amber-400 border-amber-400/30 bg-amber-400/5",
  Submitted: "text-blue-400 border-blue-400/30 bg-blue-400/5",
};

export default function Publications() {
  return (
    <section id="publications" className="section-pad border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="06"
          label="Publications"
          title="Research published, under review, and submitted."
        />

        <div className="card-hairline overflow-hidden">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-bg/40 border-b border-line">
            <div className="col-span-6 label-mono">Title</div>
            <div className="col-span-3 label-mono">Venue</div>
            <div className="col-span-1 label-mono">Year</div>
            <div className="col-span-2 label-mono text-right">Status</div>
          </div>

          {publications.map((pub, idx) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className={cn(
                "grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-5 md:py-6 transition-colors hover:bg-bg/30",
                idx > 0 && "border-t border-line",
              )}
            >
              <div className="md:col-span-6">
                <div className="text-ink text-[15px] leading-snug">
                  {pub.title}
                </div>
              </div>
              <div className="md:col-span-3 text-ink-muted text-[14px] italic">
                {pub.venue}
              </div>
              <div className="md:col-span-1 font-mono text-[13px] text-ink-muted">
                {pub.year}
              </div>
              <div className="md:col-span-2 flex md:justify-end items-center gap-2">
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded border",
                    STATUS_STYLES[pub.status],
                  )}
                >
                  {pub.status}
                </span>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open paper"
                    className="h-7 w-7 inline-flex items-center justify-center rounded-md border border-line text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
