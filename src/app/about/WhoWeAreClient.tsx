"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  BookOpen,
} from "lucide-react";
import { FinalCTASection } from "@/components/home/FinalCTASection";

/* ================================================================
   SECTION 1 — HERO
   ================================================================ */
function AboutHero() {
  return (
    <section className="bg-white pt-24 pb-12">
      <div className="w-[96%] max-w-[1440px] mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="relative rounded-[32px] overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-center px-6 py-16 md:p-16 lg:p-20 shadow-xl shadow-brand-900/5 bg-brand-900"
        >
          {/* Background Image */}
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-2/3">
            <Image
              src="/images/why-choose-us/hero-student.png"
              alt="EduPlan360 successful student"
              fill
              className="object-cover object-right-top"
              priority
            />
          </div>

          {/* Modern Solid/Gradient Overlay (Fading left-to-right) */}
          <div className="absolute inset-0 bg-linear-to-r from-brand-900 via-brand-900/90 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-brand-900/80 lg:from-transparent to-transparent hidden sm:block" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl text-white">
            <div className="inline-block px-4 py-1.5 bg-brand-800/50 text-brand-100 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand-700">
              Our Story
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
              Guiding Students Toward{" "}
              <span className="text-brand-300">Global Opportunities</span>
            </h1>

            <p className="text-base sm:text-lg text-brand-50/90 leading-relaxed mb-10 max-w-lg">
              We&apos;re a trusted education consultancy helping ambitious students navigate the path to world-class universities and fulfilling careers abroad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="group inline-flex justify-center items-center gap-2 bg-white text-brand-900 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-brand-50 transition-colors shadow-lg active:scale-[0.98]"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portal/sign-up"
                className="group inline-flex justify-center items-center gap-2 bg-white/10 text-white border border-white/20 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/20 transition-all active:scale-[0.98]"
              >
                Start Application
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — INTRO STORY
   ================================================================ */
function IntroStory() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
              Who We Are
              <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
            </h2>

            <p className="text-muted leading-relaxed pt-2">
              <strong className="text-slate-900">EduPlan360 is a trusted international education consultancy</strong>{" "}
              dedicated to helping students achieve their academic dreams abroad. With years of experience and a deep
              understanding of global education systems, we simplify the complex journey of studying overseas.
            </p>

            <p className="text-muted leading-relaxed">
              Our team of experienced advisors works one-on-one with every student, ensuring{" "}
              <strong className="text-slate-900">personalised guidance</strong> tailored to their unique goals, academic
              background, and career aspirations. We don&apos;t believe in one-size-fits-all — every journey is different.
            </p>

            <p className="text-muted leading-relaxed">
              From initial consultation to arrival at your destination university, we provide{" "}
              <strong className="text-slate-900">end-to-end support</strong> that covers admission, documentation,
              visa processing, and pre-departure preparation — so you can focus on what matters most: your future.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full max-w-[500px] mx-auto mix-blend-multiply"
          >
            <Image
              src="/images/eduplan-360-illustration.png"
              alt="EduPlan360 abstract educational illustration"
              fill
              className="object-contain mix-blend-multiply"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3 — MISSION STATEMENT
   ================================================================ */
function MissionStatement() {
  return (
    <section className="py-24 md:py-32 bg-brand-50">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-xl bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center justify-center mx-auto mb-8">
            <Compass className="w-6 h-6 text-brand-600" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
            Our Mission
          </h2>

          <div className="w-16 h-px bg-brand-500 mx-auto mb-8" />

          <p className="text-xl md:text-2xl text-muted leading-relaxed font-medium italic">
            &ldquo;Our mission is simple: to make global education accessible, transparent, and achievable for students everywhere.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 — WHAT WE DO
   ================================================================ */
const WHAT_WE_DO = [
  {
    icon: Compass,
    title: "Discover the Right Path",
    description:
      "We assess your goals, preferences, and qualifications to recommend the best countries, universities, and programs for you.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Dedicated advisors walk you through every decision — from shortlisting to applications — with honest, personalised advice.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description:
      "Access our network of 50+ university partners across the UK, Canada, Australia, Europe, and beyond.",
  },
  {
    icon: Briefcase,
    title: "Career-Focused Planning",
    description:
      "We help you choose programs with strong career outcomes, internship pathways, and post-study work opportunities.",
  },
];

function WhatWeDo() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            What We Do
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-5 max-w-lg mx-auto">
            A structured approach to your study abroad journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {WHAT_WE_DO.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-brand-200 hover:shadow-soft transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                <item.icon className="w-5 h-5 text-brand-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 text-base">{item.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 — GLOBAL PRESENCE
   ================================================================ */
const REGIONS = [
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇺🇸", name: "United States" },
];

function GlobalPresence() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 relative text-black">
        <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
          <div className="relative">
            {/* Global Map Illustration fading behind text */}
            <div className="absolute -left-20 -top-20 md:-left-40 md:-top-32 opacity-[0.15] pointer-events-none text-brand-400">
              <Globe className="w-[400px] h-[400px] md:w-[700px] md:h-[700px]" strokeWidth={0.5} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block mb-6 z-10">
              Our Global Presence
              <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
            </h2>
            <p className="text-muted leading-relaxed max-w-md relative z-10 font-medium">
              We partner with reputable universities and institutions across multiple continents, giving you access to
              world-class education in your destination of choice.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {REGIONS.map((region) => (
              <div
                key={region.name}
                className="bg-surface rounded-2xl p-5 border border-slate-100 text-center hover:border-brand-200 hover:shadow-soft transition-all"
              >
                <span className="text-3xl block mb-2">{region.flag}</span>
                <span className="text-sm font-bold text-slate-900">{region.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 — WHO WE HELP
   ================================================================ */
const SEGMENTS = [
  {
    icon: BookOpen,
    title: "Undergraduate Students",
    description:
      "First-time applicants seeking bachelor's degrees at top international universities. We guide you from school-leaving exams to your first semester abroad.",
  },
  {
    icon: GraduationCap,
    title: "Postgraduate Students",
    description:
      "Master's and PhD candidates looking for research opportunities, funded programs, and career-advancing qualifications in globally recognised institutions.",
  },
  {
    icon: Briefcase,
    title: "Professional Programs",
    description:
      "Working professionals pursuing MBAs, professional certifications, and short courses that advance their careers without putting life on hold.",
  },
];

function WhoWeHelp() {
  return (
    <section className="py-24 md:py-32 bg-brand-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-white relative inline-block">
            Who We Help
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-brand-100/90 mt-5 max-w-lg mx-auto">
            Whether you&apos;re just starting or advancing your career, we meet you where you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SEGMENTS.map((seg, idx) => (
            <motion.div
              key={seg.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-brand-800/40 rounded-2xl p-8 border border-white/5 hover:bg-brand-800/80 hover:border-brand-500/30 transition-all text-center shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-700/50 flex items-center justify-center mx-auto mb-5 ring-1 ring-white/10">
                <seg.icon className="w-6 h-6 text-brand-300" />
              </div>
              <h4 className="font-bold text-white mb-3 text-lg">{seg.title}</h4>
              <p className="text-sm text-brand-100/80 leading-relaxed">{seg.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhoWeAreClient() {
  return (
    <>
      <AboutHero />
      <IntroStory />
      <MissionStatement />
      <WhatWeDo />
      <GlobalPresence />
      <WhoWeHelp />
      <FinalCTASection />
    </>
  );
}
