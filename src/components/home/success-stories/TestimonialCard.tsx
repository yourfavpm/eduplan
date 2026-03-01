"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  country: string;
  currentCountry: string;
  quote: string;
  onNext: () => void;
  onPrev: () => void;
  direction: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  country,
  currentCountry,
  quote,
  onNext,
  onPrev,
  direction,
}) => {
  return (
    <div className="relative mt-24 md:mt-32 flex items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto px-4">
      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/20 transition-all group"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={name}
            custom={direction}
            initial={{ opacity: 0, y: 20, x: direction * 40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: -direction * 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-brand-600 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(37,99,235,0.2)] text-center relative overflow-hidden border border-white/10"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-400/20 rounded-full -ml-24 -mb-24 blur-3xl pointer-events-none" />

            <Quote className="absolute top-8 left-8 w-16 h-16 text-white opacity-10 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {name}
              </h3>
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-brand-100 font-medium text-sm md:text-base bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                  {country}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-300" />
                <span className="text-white font-semibold text-sm md:text-base">
                  Currently in {currentCountry}
                </span>
              </div>
              <blockquote className="text-blue-50 text-xl md:text-2xl leading-relaxed italic font-medium">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={onNext}
        className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/20 transition-all group"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};
