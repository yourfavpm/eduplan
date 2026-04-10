"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  HeartHandshake,
  Globe,
  ShieldCheck,
  Eye,
  Award,
  MessageCircle,
  FileCheck,
  GraduationCap,
  Plane,
  CheckCircle,
} from "lucide-react";
import { SuccessStoriesSimple } from "@/components/home/success-stories/SuccessStoriesSimple";
import { FinalCTASection } from "@/components/home/FinalCTASection";

/* ================================================================
   FLOATING STAT CARDS DATA
   ================================================================ */
const HERO_STATS = [
  { value: "5,000+", label: "Students Placed Abroad", icon: Users },
  { value: "95%", label: "Visa Success Rate", icon: ShieldCheck },
  { value: "50+", label: "Partner Universities", icon: GraduationCap },
  { value: "10+", label: "Years Experience", icon: Award },
];

/* ================================================================
   SUCCESS BADGE DATA (floating on image)
   ================================================================ */
const SUCCESS_BADGES = [
  { text: "Visa Approved", emoji: "✅", delay: 0.6 },
  { text: "Offer Letter Received", emoji: "🎓", delay: 0.9 },
  { text: "CAS Issued", emoji: "🇬🇧", delay: 1.2 },
];

/* ================================================================
   UNIVERSITY LOGOS FOR TRUST STRIP
   ================================================================ */
const UNIVERSITY_FLAGS = [
  { country: "United Kingdom", flag: "🇬🇧" },
  { country: "Canada", flag: "🇨🇦" },
  { country: "United States", flag: "🇺🇸" },
  { country: "Australia", flag: "🇦🇺" },
  { country: "Ireland", flag: "🇮🇪" },
  { country: "Germany", flag: "🇩🇪" },
  { country: "Poland", flag: "🇵🇱" },
  { country: "Finland", flag: "🇫🇮" },
];

/* ================================================================
   SECTION 1 — PREMIUM HERO (Split Layered Light Layout)
   ================================================================ */
function WhyChooseHero() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pt-10 pb-16 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* ━━━ LEFT COLUMN — Visual (Flat and Fading) ━━━ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative h-[350px] md:h-[450px] lg:h-[550px] order-2 lg:order-1"
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <Image
                  src="/images/why-choose-us/hero-student.png"
                  alt="Successful EduPlan360 graduate student abroad"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Edge Fades into white background */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-white" />
                <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                <div className="absolute inset-0 bg-linear-to-b from-white/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-linear-to-l from-white/30 via-transparent to-transparent" />
              </div>

              {/* Floating Success Badges */}
              {SUCCESS_BADGES.map((badge, idx) => (
                <div
                  key={badge.text}
                  className={`absolute z-10 ${
                    idx === 0
                      ? "top-6 -right-2 md:-right-6"
                      : idx === 1
                      ? "top-1/2 -right-2 md:-right-8"
                      : "bottom-16 left-2 md:-left-4"
                  } animate-float`}
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                  <div className="bg-white px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-1.5 shadow-sm border border-slate-100" style={{ borderRadius: '12px' }}>
                    <span className="text-lg md:text-xl">{badge.emoji}</span>
                    <span className="text-xs md:text-sm font-semibold text-slate-800 whitespace-nowrap">{badge.text}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ━━━ RIGHT COLUMN — Content ━━━ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              <p className="text-sm font-bold tracking-widest uppercase text-brand-600 mb-4 inline-block">
                Why Choose Us
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-[1.2]">
                A Proven Partner for Your <span className="text-brand-600">Study Abroad Journey</span>
              </h1>

              <p className="text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
                From admissions to visa approval, our process is built on transparency, experience, and real results. We ensure that every step of your international education journey is smooth and successful.
              </p>

              {/* 2x2 Stats Grid nested in the right column below text */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                {HERO_STATS.map((stat) => {
                   const Icon = stat.icon;
                   return (
                     <div key={stat.label} className="bg-slate-50 border border-slate-100 p-4 flex flex-col items-center lg:items-start text-center lg:text-left transition-colors hover:bg-white hover:border-slate-200" style={{ borderRadius: '10px' }}>
                       <Icon className="w-5 h-5 text-brand-600 mb-2" strokeWidth={1.5} />
                       <div className="text-2xl font-bold text-slate-900 mb-0.5">{stat.value}</div>
                       <div className="text-xs font-medium text-slate-500">{stat.label}</div>
                     </div>
                   );
                })}
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-brand-800 transition-colors"
                >
                  Book a Free Consultation
                </Link>
                <Link
                  href="/study-abroad/process"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-full font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  See How It Works <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ TRUST STRIP (University destinations + testimonial) ━━━ */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          {/* University destinations */}
          <div className="py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted whitespace-nowrap">
              Students placed in
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {UNIVERSITY_FLAGS.map((uni) => (
                <div
                  key={uni.country}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-slate-100 text-sm text-slate-600"
                >
                  <span className="text-lg">{uni.flag}</span>
                  <span className="font-medium text-xs hidden sm:inline">{uni.country}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial snippet */}
          <div className="border-t border-slate-100 py-6 md:py-8">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-base md:text-lg text-slate-600 italic leading-relaxed">
                &ldquo;They handled everything — I got my visa in 3 weeks.&rdquo;
              </p>
              <p className="text-xs text-muted mt-2 font-semibold uppercase tracking-wider">
                — EduPlan360 Student, UK 2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================================================================
   SECTION 2 — VALUE PROPOSITION
   ================================================================ */
const VALUES = [
  {
    icon: Users,
    title: "Experienced Advisors",
    description:
      "Our team brings years of hands-on experience in international admissions, ensuring expert advice at every step.",
  },
  {
    icon: HeartHandshake,
    title: "Personalised Guidance",
    description:
      "No two students are the same. We tailor every recommendation to your unique profile, goals, and budget.",
  },
  {
    icon: Globe,
    title: "Global University Partnerships",
    description:
      "Direct relationships with 50+ universities across the UK, Canada, Australia, Europe, and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Support",
    description:
      "From first consultation to airport departure — we handle admissions, documentation, visa, and pre-departure prep.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    description:
      "No hidden fees, no guesswork. You'll always know where your application stands and what comes next.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "Thousands of students successfully placed in top universities worldwide with high visa approval rates.",
  },
];

function ValueProposition() {
  return (
    <div className="bg-white">
      <section className="py-24 md:py-32 bg-brand-700 relative overflow-hidden rounded-t-[32px] md:rounded-t-[48px]">
        {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="adv-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adv-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-white relative inline-block">
            The EduPlan360 Advantage
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-accent-400 rounded-full" />
          </h2>
          <p className="text-brand-200 mt-5 max-w-lg mx-auto">
            What sets us apart from the rest.
          </p>
        </div>

        {/* Staggered layout — 2 columns with offset */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {VALUES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className={`group bg-white/10 rounded-2xl p-7 border border-white/10 hover:border-white/25 hover:bg-white/15 transition-all backdrop-blur-sm ${
                idx % 2 === 1 ? "md:translate-y-6" : ""
              }`}
            >
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  <item.icon className="w-5 h-5 text-accent-300" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1.5 text-base">{item.title}</h4>
                  <p className="text-sm text-brand-200 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}

/* ================================================================
   SECTION 4 — PROCESS CONFIDENCE
   ================================================================ */
const PROCESS_STEPS = [
  {
    icon: MessageCircle,
    title: "Consultation",
    description: "Understand your goals and preferences through a free, no-obligation advisory session.",
  },
  {
    icon: FileCheck,
    title: "Application",
    description: "We shortlist programs, prepare documents, and submit strong applications on your behalf.",
  },
  {
    icon: GraduationCap,
    title: "Admission",
    description: "Receive offer letters and guidance on choosing the right program and funding options.",
  },
  {
    icon: ShieldCheck,
    title: "Visa Processing",
    description: "Expert visa coaching, document preparation, and mock interview sessions for high approval rates.",
  },
  {
    icon: Plane,
    title: "Departure",
    description: "Pre-departure briefings, accommodation guidance, and ongoing support even after you land.",
  },
];

function ProcessConfidence() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Your Journey With Us
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-5 max-w-lg mx-auto">
            A clear, confident path from first conversation to campus arrival.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-0">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative flex gap-6 group"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center shrink-0 group-hover:border-brand-500 transition-colors z-10">
                  <step.icon className="w-4 h-4 text-brand-600" />
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="w-px h-full bg-slate-200 min-h-[60px]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-10">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
                    Step {idx + 1}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">{step.title}</h4>
                <p className="text-sm text-muted leading-relaxed max-w-md">{step.description}</p>
              </div>
            </motion.div>
          ))}

          {/* Completion marker */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-brand-700 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="pt-2">
              <span className="text-sm font-bold text-brand-700">You&apos;re on campus! 🎉</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export function WhyChooseClient() {
  return (
    <>
      <WhyChooseHero />
      <ValueProposition />
      <ProcessConfidence />
      <SuccessStoriesSimple />
      <FinalCTASection />
    </>
  );
}
