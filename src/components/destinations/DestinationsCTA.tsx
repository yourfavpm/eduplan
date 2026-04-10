"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function DestinationsCTA() {
  return (
    <section className="py-24 md:py-32 bg-brand-700 relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full text-white/80 text-xs font-bold uppercase tracking-widest mb-8">
          <MessageCircle className="w-4 h-4" />
          Need Guidance?
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Not Sure Where to Start?
        </h2>
        <p className="text-lg text-brand-100 mb-10 max-w-xl mx-auto leading-relaxed">
          Our advisors will help you choose the best destination based on your goals, budget, and career aspirations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book-consultation"
            className="group inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-4 rounded-full font-bold text-base hover:bg-brand-50 transition-colors"
          >
            Book Consultation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portal/sign-up"
            className="group inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all"
          >
            Start Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
