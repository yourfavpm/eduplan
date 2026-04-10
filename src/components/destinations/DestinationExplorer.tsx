"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DESTINATIONS, FILTER_TAGS, type Destination } from "@/app/destinations/data";

export function DestinationExplorer() {
  const [activeTag, setActiveTag] = useState<string>("Popular");

  const filtered = activeTag === "All"
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.tags.includes(activeTag));

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Explore Destinations Based on Your Goals
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-5 max-w-lg mx-auto">
            Filter by what matters most to you.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                activeTag === tag
                  ? "bg-brand-700 text-white border-brand-700"
                  : "bg-surface text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-600"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Destination Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ExplorerCard destination={dest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 italic">
            No destinations match this filter.
          </div>
        )}
      </div>
    </section>
  );
}

function ExplorerCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block bg-surface rounded-2xl p-7 border border-slate-100 hover:border-brand-200 hover:shadow-lg shadow-softer transition-all"
    >
      <div className="flex items-center gap-4 mb-5">
        <span className="text-4xl">{destination.flag}</span>
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
            {destination.name}
          </h3>
          <p className="text-xs text-muted font-medium">{destination.tagline.slice(0, 50)}...</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {destination.highlights.slice(0, 3).map((h) => (
          <div key={h} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
            {h}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-brand-600 font-bold text-sm group-hover:gap-3 transition-all">
        Learn more <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
