"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { personal, hero } from "@/lib/data";

const fadeStagger = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function trackResumeClick() {
  fetch("/api/resume-click", { method: "POST" }).catch(() => {});
}

export default function Hero() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const SESSION_KEY = "portfolio-view-counted";
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);
    const method = alreadyCounted ? "GET" : "POST";

    fetch("/api/views", { method })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.count === "number") setViews(d.count);
        if (!alreadyCounted) sessionStorage.setItem(SESSION_KEY, "1");
      })
      .catch(() => {});
  }, []);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative dotted grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container-edge relative pt-16 md:pt-28 pb-20 md:pb-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
        >
          {/* LEFT — primary content */}
          <div className="lg:col-span-8">
            <motion.div
              variants={fadeStagger}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 label-mono mb-6"
            >
              <span className="text-accent">01</span>
              <span className="h-px w-8 bg-line-strong" />
              <span>Index · Suyash Patil</span>
            </motion.div>

            <motion.h1
              variants={fadeStagger}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[40px] leading-[1.05] md:text-[64px] md:leading-[1.02] tracking-[-0.02em] font-medium text-ink"
            >
              {personal.name}
            </motion.h1>

            <motion.div
              variants={fadeStagger}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 md:mt-6 flex items-baseline gap-3 flex-wrap"
            >
              <span className="font-mono text-sm text-accent">{">"}</span>
              <h2 className="font-sans text-lg md:text-2xl text-ink-muted tracking-tight">
                Software Engineer{" "}
                <span className="text-ink">— Data &amp; AI Systems</span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeStagger}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-2xl text-base md:text-lg text-ink-muted leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* Badges */}
            <motion.div
              variants={fadeStagger}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {hero.badges.map((b) => (
                <span
                  key={b}
                  className="font-mono text-[11px] tracking-wider uppercase text-ink-muted px-2.5 py-1.5 rounded border border-line bg-bg-raised/40"
                >
                  {b}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeStagger}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a href="#projects" className="btn-primary">
                <span>View Projects</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackResumeClick}
                className="btn-bracket"
              >
                <Download size={14} />
                <span>Resume</span>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bracket"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bracket"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — system info card */}
          <motion.div
            variants={fadeStagger}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-4 lg:mt-2"
          >
            <div className="card-hairline p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                <span className="label-mono">SYSTEM_INFO</span>
                <span className="font-mono text-[10px] text-accent flex items-center gap-1.5">
                  <span className="status-dot" />
                  ONLINE
                </span>
              </div>
              <dl className="space-y-3 font-mono text-[12px]">
                <Row k="LOCATION" v={personal.location} />
                <Row k="ROLE" v="SDE / ML / Data & AI" />
                <Row k="EXPERIENCE" v="3.5+ years" />
                <Row k="EDUCATION" v="M.Tech, IIIT Bhopal" />
                <Row k="STATUS" v="Open to roles" highlight />
                <Row k="DSA" v="LeetCode 1875" />
                <Row
                  k="VIEWS"
                  v={views === null ? "..." : views.toLocaleString()}
                />
              </dl>
            </div>

            {/* Mini metric strip */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { v: "200GB", l: "Processed" },
                { v: "60%", l: "Deploy ↓" },
                { v: "1875", l: "LeetCode" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="card-hairline p-3 flex flex-col gap-0.5"
                >
                  <span className="font-mono text-sm text-ink">{m.v}</span>
                  <span className="label-mono text-[9px]">{m.l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({
  k,
  v,
  highlight,
}: {
  k: string;
  v: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-subtle">{k}</dt>
      <dd className={highlight ? "text-accent" : "text-ink"}>{v}</dd>
    </div>
  );
}
