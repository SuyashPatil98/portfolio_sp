"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-form" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Submission failed");
      setStatus("success");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="card-hairline p-6 md:p-8 mt-6"
    >
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-line">
        <div className="flex items-center gap-3">
          <span className="label-mono-accent">DROP_A_NOTE</span>
          <span className="font-mono text-[11px] text-ink-subtle">
            // takes 20 seconds
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-wider uppercase text-accent flex items-center gap-1.5">
          <span className="status-dot" />
          OPEN
        </span>
      </div>

      {status === "success" ? (
        <div className="flex items-start gap-3 py-4">
          <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
          <div>
            <div className="text-ink font-medium">Got it — message received.</div>
            <p className="text-ink-muted text-[13px] mt-1">
              I&apos;ll get back to you at the email you provided. Thanks for
              reaching out.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-3 font-mono text-[11px] tracking-wider uppercase text-accent hover:underline"
            >
              ← Send another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="NAME *"
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            required
            maxLength={120}
          />
          <Field
            label="EMAIL *"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            required
            maxLength={200}
          />
          <div className="md:col-span-2">
            <Field
              label="COMPANY / ROLE"
              value={form.company}
              onChange={update("company")}
              placeholder="Optional — what you do"
              maxLength={200}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block label-mono mb-2">MESSAGE</label>
            <textarea
              value={form.message}
              onChange={update("message")}
              placeholder="Optional — context, role, or what you'd like to chat about"
              rows={4}
              maxLength={2000}
              className="w-full bg-bg/40 border border-line rounded-md px-3 py-2.5 text-[14px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/60 transition-colors resize-none font-sans"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              {status === "loading" ? "Sending..." : "Send Note"}
            </button>
            {status === "error" && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-red-400">
                <AlertCircle size={12} />
                {error}
              </span>
            )}
            <span className="font-mono text-[11px] text-ink-subtle">
              // your details land in my inbox — no marketing, ever
            </span>
          </div>
        </form>
      )}
    </motion.div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block label-mono mb-2">{label}</label>
      <input
        {...props}
        className="w-full bg-bg/40 border border-line rounded-md px-3 py-2.5 text-[14px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/60 transition-colors font-sans"
      />
    </div>
  );
}
