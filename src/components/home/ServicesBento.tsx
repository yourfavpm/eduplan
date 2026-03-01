"use client";

import React from "react";
import { 
  Users, 
  Search, 
  MapPin, 
  FileCheck, 
  ShieldCheck, 
  PlaneTakeoff,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Career Counselling",
    description: "Expert guidance to help you choose the right path for your future career.",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    gridSpan: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Course Selection",
    description: "Finding programs that match your goals.",
    icon: Search,
    color: "bg-indigo-50 text-indigo-600",
    gridSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "School Selection",
    description: "Matching you with the best-fit universities worldwide.",
    icon: MapPin,
    color: "bg-sky-50 text-sky-600",
    gridSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Document Checks",
    description: "Ensuring your application materials are perfect and stand out.",
    icon: FileCheck,
    color: "bg-brand-50 text-brand-600",
    gridSpan: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Visa Support",
    description: "End-to-end documentation assistance for a stress-free visa approval.",
    icon: ShieldCheck,
    color: "bg-violet-50 text-violet-600",
    gridSpan: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Travel Support",
    description: "Pre-departure briefings and arrival assistance.",
    icon: PlaneTakeoff,
    color: "bg-cyan-50 text-cyan-600",
    gridSpan: "md:col-span-2 md:row-span-1",
  },
];

export function ServicesBento() {
  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Browse our services
            <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="mt-6 text-muted max-w-2xl">
            We help you with everything—from your first talk to landing safely in your new country. 
            Simplified, professional, and personalized for your success.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`
                group p-8 rounded-[32px] border border-slate-100 bg-slate-50/30
                hover:bg-white hover:border-brand-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]
                transition-all duration-300 flex flex-col justify-between relative overflow-hidden
                ${service.gridSpan}
              `}
            >
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 flex items-center text-brand-600 font-bold text-sm tracking-wide group/btn pt-4 border-t border-slate-100/50 group-hover:border-brand-100 transition-colors">
                Learn more
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
