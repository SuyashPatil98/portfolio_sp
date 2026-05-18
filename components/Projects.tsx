"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText, Github, Lock } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Open Project", "Research", "Professional Case Study"] as const;
type Filter = (typeof FILTERS)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.kind === filter);

  return (
    <section id="projects" className="section-pad bg-bg-alt border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="05"
          label="Featured Projects"
          title="Real systems shipped — open source, research, and production case studies."
        />

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-md font-mono text-[11px] tracking-wider uppercase border transition-all",
                filter === f
                  ? "border-accent text-accent bg-accent/10"
                  : "border-line text-ink-muted hover:text-ink hover:border-line-strong",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {visible.map((p, idx) => (
              <ProjectCard key={p.title} project={p} idx={idx} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const kindColor = {
    "Open Project": "text-accent border-accent/30",
    Research: "text-blue-400 border-blue-400/30",
    "Professional Case Study": "text-amber-400 border-amber-400/30",
  }[project.kind];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.45,
        delay: idx * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="card-hairline p-6 md:p-7 flex flex-col"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={cn(
            "font-mono text-[10px] tracking-wider uppercase px-2 py-1 rounded border",
            kindColor,
          )}
        >
          {project.kind}
        </span>
        <span className="font-mono text-[10px] tracking-wider uppercase text-ink-subtle">
          {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <h3 className="text-ink text-lg md:text-xl font-medium tracking-tight">
        {project.title}
      </h3>
      <p className="mt-1.5 text-sm text-ink-muted">{project.tagline}</p>

      <p className="mt-4 text-[14px] text-ink-muted leading-relaxed">
        {project.description}
      </p>

      {/* Architecture */}
      <div className="mt-5">
        <div className="label-mono mb-2.5">Architecture</div>
        <ul className="space-y-1.5">
          {project.architecture.map((a) => (
            <li
              key={a}
              className="flex gap-2 text-[13px] text-ink-muted leading-relaxed"
            >
              <span className="text-accent font-mono shrink-0">└─</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics row */}
      {project.metrics.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-2">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-md border border-line bg-bg/40 p-3"
            >
              <div className="font-mono text-base text-ink">{m.value}</div>
              <div className="font-mono text-[10px] tracking-wider uppercase text-ink-subtle mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stack */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[10.5px] tracking-wider uppercase text-ink-muted px-2 py-1 rounded border border-line"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-5 border-t border-line flex flex-wrap gap-2 mt-auto">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bracket"
          >
            <Github size={13} />
            <span>Demo</span>
            <ArrowUpRight size={12} />
          </a>
        )}
        {project.paperLink && (
          <a
            href={project.paperLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bracket"
          >
            <FileText size={13} />
            <span>Paper</span>
            <ArrowUpRight size={12} />
          </a>
        )}
        {!project.link && !project.paperLink && (
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-ink-subtle px-3 py-2 rounded-md border border-dashed border-line">
            <Lock size={12} />
            Closed source · described from professional experience
          </span>
        )}
      </div>
    </motion.article>
  );
}
