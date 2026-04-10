"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

export function DestinationsHero() {
  return (
    <section className="relative bg-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#0f172a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-brand-100">
            🌍 Study Destinations
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
            Find Your Ideal{" "}
            <span className="text-brand-600">Study Destination</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore countries, compare opportunities, and choose the path that fits your future.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/portal/sign-up"
              className="group inline-flex items-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-brand-800 transition-colors"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/book-consultation"
              className="group inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-base hover:border-brand-300 hover:text-brand-700 transition-all"
            >
              Talk to an Advisor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Where do you want to study?"
              className="w-full bg-surface border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-full py-4 pl-14 pr-6 text-base focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all shadow-softer"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100" />
    </section>
  );
}
