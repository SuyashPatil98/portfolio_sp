"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Code2,
  Download,
  ArrowUpRight,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import LeadForm from "./LeadForm";
import { personal } from "@/lib/data";

function trackResumeClick() {
  fetch("/api/resume-click", { method: "POST" }).catch(() => {});
}

const CHANNELS = [
  {
    Icon: Mail,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "/in/suyash-patil",
    href: personal.linkedin,
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "@suyashpatil",
    href: personal.github,
  },
  {
    Icon: Code2,
    label: "LeetCode",
    value: "Rating 1875",
    href: personal.leetcode,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad border-t border-line">
      <div className="container-edge">
        <SectionHeader
          index="10"
          label="Contact"
          title="Best way to reach me — for roles, collaboration, or interesting problems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — channels */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHANNELS.map((c, idx) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="card-hairline p-5 group flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 inline-flex items-center justify-center rounded-md border border-line bg-bg-raised text-ink-muted group-hover:text-accent group-hover:border-accent/40 transition-colors shrink-0">
                    <c.Icon size={16} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="label-mono">{c.label}</div>
                    <div className="mt-0.5 text-ink text-[14px] truncate">
                      {c.value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-ink-subtle group-hover:text-accent transition-colors shrink-0"
                />
              </motion.a>
            ))}
          </div>

          {/* Right — resume CTA panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 card-hairline p-6 md:p-7 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-line">
              <span className="label-mono">RESUME.PDF</span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-accent flex items-center gap-1.5">
                <span className="status-dot" />
                CURRENT
              </span>
            </div>
            <p className="text-ink-muted text-[14px] leading-relaxed mb-5 flex-1">
              One-page resume detailing my experience in distributed data
              ingestion, ML pipelines, MLOps orchestration, and GenAI systems —
              with metrics and stack.
            </p>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackResumeClick}
              className="btn-primary self-start"
            >
              <Download size={14} />
              Download Resume
            </a>
            <div className="mt-6 pt-5 border-t border-line">
              <div className="label-mono mb-2">CURRENTLY</div>
              <p className="text-[13px] text-ink-muted">
                {personal.status}. Based in{" "}
                <span className="text-ink">{personal.location}</span>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Inline lead-capture form */}
        <LeadForm />
      </div>
    </section>
  );
}
