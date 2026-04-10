"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronRight, CheckCircle, Lightbulb, type LucideIcon } from "lucide-react";

/* ================================================================
   HERO
   ================================================================ */
export function ResourceHero({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative bg-white pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="res-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#0f172a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#res-dots)" />
        </svg>
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link
            href="/study-abroad"
            className="inline-flex items-center gap-1.5 text-muted hover:text-brand-700 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>

          <div className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand-100">
            {badge}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-[1.15] tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-muted leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   INTRO BLOCK (larger text first paragraph)
   ================================================================ */
export function IntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-lg text-muted leading-relaxed mb-12">{children}</div>
  );
}

/* ================================================================
   SECTION HEADING
   ================================================================ */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 relative inline-block">
      {children}
    </h2>
  );
}

/* ================================================================
   PARAGRAPH
   ================================================================ */
export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-muted leading-relaxed mb-6">{children}</p>;
}

/* ================================================================
   CHECKLIST BLOCK
   ================================================================ */
export function ChecklistBlock({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div className="bg-surface rounded-2xl p-6 md:p-8 border border-slate-100 mb-8">
      {title && <h3 className="font-bold text-slate-900 mb-4 text-base">{title}</h3>}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
            <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================================================================
   CALLOUT BOX
   ================================================================ */
export function CalloutBox({
  title,
  text,
  variant = "brand",
}: {
  title?: string;
  text: string;
  variant?: "brand" | "neutral";
}) {
  const bg = variant === "brand" ? "bg-brand-50 border-brand-100" : "bg-surface border-slate-100";
  const iconColor = variant === "brand" ? "text-brand-600" : "text-slate-500";

  return (
    <div className={`rounded-2xl p-6 md:p-8 border mb-8 ${bg}`}>
      <div className="flex items-start gap-4">
        <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
        <div>
          {title && <h4 className="font-bold text-slate-900 mb-1 text-sm">{title}</h4>}
          <p className="text-sm text-muted leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SPLIT SECTION (text left, content right)
   ================================================================ */
export function SplitSection({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12 items-start">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

/* ================================================================
   STEPS / TIMELINE
   ================================================================ */
export function StepTimeline({
  steps,
}: {
  steps: { title: string; description: string; icon?: LucideIcon }[];
}) {
  return (
    <div className="space-y-0 mb-12">
      {steps.map((step, idx) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: idx * 0.06 }}
          className="relative flex gap-5"
        >
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center shrink-0 z-10 text-xs font-bold text-brand-700">
              {idx + 1}
            </div>
            {idx < steps.length - 1 && <div className="w-px h-full bg-slate-200 min-h-[48px]" />}
          </div>
          <div className="pb-8">
            <h4 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h4>
            <p className="text-sm text-muted leading-relaxed max-w-lg">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================================
   FEATURE CARDS (icon + title + description)
   ================================================================ */
export function FeatureCards({
  items,
  columns = 3,
}: {
  items: { icon: LucideIcon; title: string; description: string }[];
  columns?: 2 | 3 | 4;
}) {
  const colClass = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid ${colClass} gap-5 mb-12`}>
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: idx * 0.06 }}
          className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-brand-200 hover:shadow-soft transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
            <item.icon className="w-5 h-5 text-brand-600" />
          </div>
          <h4 className="font-bold text-slate-900 mb-1.5 text-sm">{item.title}</h4>
          <p className="text-xs text-muted leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================================
   DO'S AND DON'TS
   ================================================================ */
export function DosAndDonts({
  dos,
  donts,
}: {
  dos: string[];
  donts: string[];
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 mb-12">
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
        <h4 className="font-bold text-green-800 mb-3 text-sm">✓ Do&apos;s</h4>
        <ul className="space-y-2">
          {dos.map((d) => (
            <li key={d} className="text-sm text-green-700 flex items-start gap-2">
              <span className="text-green-500 mt-0.5">•</span> {d}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <h4 className="font-bold text-red-800 mb-3 text-sm">✗ Don&apos;ts</h4>
        <ul className="space-y-2">
          {donts.map((d) => (
            <li key={d} className="text-sm text-red-700 flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span> {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ================================================================
   RESOURCE CTA (end of every page)
   ================================================================ */
export function ResourceCTA() {
  return (
    <section className="py-20 md:py-28 bg-brand-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rcta-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rcta-dots)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-5 leading-tight">
          Ready to Take the Next Step?
        </h2>
        <p className="text-base text-brand-100 mb-9 max-w-lg mx-auto leading-relaxed">
          Our advisors will guide you through every stage of your study abroad journey.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book-consultation"
            className="group inline-flex items-center gap-2 bg-white text-brand-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-brand-50 transition-colors"
          >
            Book Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portal/sign-up"
            className="group inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 transition-all"
          >
            Start Application
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CONTENT WRAPPER (max-width container for editorial text)
   ================================================================ */
export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">{children}</div>
    </section>
  );
}
