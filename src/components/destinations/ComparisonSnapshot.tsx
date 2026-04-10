"use client";

import React from "react";
import { motion } from "framer-motion";
import { DESTINATIONS } from "@/app/destinations/data";

const COMPARE_IDS = ["uk", "ca", "de", "au"];
const COMPARED = DESTINATIONS.filter((d) => COMPARE_IDS.includes(d.id));

const COLUMNS = [
  { key: "tuitionRange", label: "Tuition Range" },
  { key: "visaSuccessRate", label: "Visa Success" },
  { key: "workRights", label: "Work Rights" },
] as const;

export function ComparisonSnapshot() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Compare Top Destinations
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-5 max-w-lg mx-auto">
            A quick comparison to help you decide.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <motion.div
            className="bg-surface rounded-2xl border border-slate-100 overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Header Row */}
            <div className="grid grid-cols-5 border-b border-slate-100 bg-white">
              <div className="p-5 font-bold text-xs text-slate-400 uppercase tracking-wider">
                Country
              </div>
              {COLUMNS.map((col) => (
                <div key={col.key} className="p-5 font-bold text-xs text-slate-400 uppercase tracking-wider text-center">
                  {col.label}
                </div>
              ))}
              <div className="p-5 font-bold text-xs text-slate-400 uppercase tracking-wider text-center">
                Popular Courses
              </div>
            </div>

            {/* Data Rows */}
            {COMPARED.map((dest, idx) => (
              <div
                key={dest.id}
                className={`grid grid-cols-5 items-center ${
                  idx !== COMPARED.length - 1 ? "border-b border-slate-50" : ""
                } hover:bg-white transition-colors`}
              >
                <div className="p-5 flex items-center gap-3">
                  <span className="text-2xl">{dest.flag}</span>
                  <span className="font-bold text-slate-900 text-sm">{dest.name}</span>
                </div>
                {COLUMNS.map((col) => (
                  <div key={col.key} className="p-5 text-center text-sm text-slate-600 font-medium">
                    {col.key === "visaSuccessRate" ? (
                      <span className="text-brand-700 font-bold">{dest[col.key]}</span>
                    ) : (
                      dest[col.key]
                    )}
                  </div>
                ))}
                <div className="p-5 text-center">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {dest.popularCourses.slice(0, 3).map((c) => (
                      <span key={c} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-medium border border-brand-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="flex md:hidden gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4">
          {COMPARED.map((dest) => (
            <div
              key={dest.id}
              className="min-w-[80vw] snap-center bg-surface rounded-2xl p-6 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{dest.flag}</span>
                <h3 className="text-lg font-bold text-slate-900">{dest.name}</h3>
              </div>
              <div className="space-y-4">
                {COLUMNS.map((col) => (
                  <div key={col.key} className="flex justify-between items-center">
                    <span className="text-sm text-muted font-medium">{col.label}</span>
                    <span className={`text-sm font-bold ${col.key === "visaSuccessRate" ? "text-brand-700" : "text-slate-900"}`}>
                      {dest[col.key]}
                    </span>
                  </div>
                ))}
                <div>
                  <span className="text-sm text-muted font-medium block mb-2">Popular Courses</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.popularCourses.slice(0, 3).map((c) => (
                      <span key={c} className="text-xs bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-medium border border-brand-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
