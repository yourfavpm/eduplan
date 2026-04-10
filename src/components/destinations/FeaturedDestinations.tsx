"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { DESTINATIONS, type Destination } from "@/app/destinations/data";

const FEATURED = DESTINATIONS.slice(0, 6);

export function FeaturedDestinations() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURED[activeIdx];

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Featured Destinations
            <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-5 max-w-lg">
            Top countries our students are heading to right now.
          </p>
        </div>

        {/* Desktop: Tabs + Detail Panel */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr] gap-8">
          {/* Country Tabs */}
          <div className="space-y-2">
            {FEATURED.map((dest, i) => (
              <button
                key={dest.id}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl transition-all border ${
                  activeIdx === i
                    ? "bg-white border-brand-200 shadow-soft"
                    : "bg-transparent border-transparent hover:bg-white/60 hover:border-slate-100"
                }`}
              >
                <span className="text-3xl">{dest.flag}</span>
                <div>
                  <h4 className={`font-bold text-base ${activeIdx === i ? "text-brand-700" : "text-slate-900"}`}>
                    {dest.name}
                  </h4>
                  <p className="text-xs text-muted line-clamp-1">{dest.tagline}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{active.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{active.name}</h3>
                  <p className="text-muted text-sm">{active.tagline}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {active.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-surface rounded-xl p-4 border border-slate-50">
                  <span className="text-xs text-muted font-semibold uppercase tracking-wider block mb-1">Tuition</span>
                  <span className="text-sm font-bold text-slate-900">{active.tuitionRange}</span>
                </div>
                <div className="bg-surface rounded-xl p-4 border border-slate-50">
                  <span className="text-xs text-muted font-semibold uppercase tracking-wider block mb-1">Visa Success</span>
                  <span className="text-sm font-bold text-brand-700">{active.visaSuccessRate}</span>
                </div>
                <div className="bg-surface rounded-xl p-4 border border-slate-50">
                  <span className="text-xs text-muted font-semibold uppercase tracking-wider block mb-1">Work Rights</span>
                  <span className="text-sm font-bold text-slate-900">{active.workRights}</span>
                </div>
              </div>

              <Link
                href={`/destinations/${active.slug}`}
                className="group inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-brand-800 transition-colors"
              >
                Explore {active.name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: Swipeable Cards */}
        <div className="flex md:hidden gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6">
          {FEATURED.map((dest) => (
            <MobileDestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileDestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="min-w-[82vw] snap-center rounded-2xl bg-white p-7 border border-slate-100 shadow-soft">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">{destination.flag}</span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{destination.name}</h3>
          <p className="text-xs text-muted">{destination.tagline}</p>
        </div>
      </div>

      <div className="space-y-2.5 mb-6">
        {destination.highlights.map((h) => (
          <div key={h} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
            {h}
          </div>
        ))}
      </div>

      <Link
        href={`/destinations/${destination.slug}`}
        className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm"
      >
        Explore Country <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
