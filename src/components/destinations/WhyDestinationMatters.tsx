"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Home,
  Heart,
} from "lucide-react";

const FACTORS = [
  {
    icon: Wallet,
    title: "Cost of Living",
    description: "Understand the true cost of studying and living abroad.",
  },
  {
    icon: ShieldCheck,
    title: "Visa Success Rate",
    description: "Choose countries with high visa approval rates.",
  },
  {
    icon: Briefcase,
    title: "Work Opportunities",
    description: "Work part-time during studies and after graduation.",
  },
  {
    icon: GraduationCap,
    title: "Education Quality",
    description: "Access world-ranked universities and programs.",
  },
  {
    icon: Home,
    title: "PR Opportunities",
    description: "Pathways to permanent residency post-graduation.",
  },
  {
    icon: Heart,
    title: "Lifestyle & Culture",
    description: "Culture, safety, and quality of life considerations.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function WhyDestinationMatters() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Headline */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block mb-6">
              Choosing the Right Country Matters
              <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
            </h2>
            <p className="text-muted leading-relaxed max-w-md">
              Your study destination shapes your education, career prospects, and life experience.
              We help you weigh what matters most so you make a confident decision.
            </p>
          </div>

          {/* Right: Factor Cards */}
          <motion.div
            className="grid sm:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {FACTORS.map((factor) => (
              <motion.div
                key={factor.title}
                variants={itemVariants}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-brand-200 hover:shadow-soft transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                  <factor.icon className="w-5 h-5 text-brand-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1.5 text-base">{factor.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{factor.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
