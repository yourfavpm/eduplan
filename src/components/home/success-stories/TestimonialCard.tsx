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
    <div className="relative mt-20 md:mt-32 max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        {/* Mobile Navigation Row (Top) - Hidden on Desktop */}
        <div className="flex md:hidden items-center justify-between w-full mb-4">
          <button
            onClick={onPrev}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex gap-1.5">
            {[0, 1, 2].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/30"}`} />
            ))}
          </div>

          <button
            onClick={onNext}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Desktop Previous Button */}
        <button
          onClick={onPrev}
          className="hidden md:flex shrink-0 w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg items-center justify-center hover:bg-white/20 transition-all group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <div className="flex-1 w-full min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={name}
              custom={direction}
              initial={{ opacity: 0, y: 20, x: direction * 40 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-brand-600 rounded-[32px] md:rounded-[40px] p-6 md:p-12 shadow-[0_20px_60px_rgba(37,99,235,0.2)] text-center relative overflow-hidden border border-white/10"
            >
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/5 rounded-full -mr-24 -mt-24 md:-mr-32 md:-mt-32 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-brand-400/20 rounded-full -ml-16 -mb-16 md:-ml-24 md:-mb-24 blur-3xl pointer-events-none" />

              <Quote className="absolute top-6 left-6 md:top-8 md:left-8 w-12 h-12 md:w-16 md:h-16 text-white opacity-10 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                  {name}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <span className="text-brand-100 font-medium text-xs md:text-base bg-white/10 px-3 md:px-4 py-1 rounded-full backdrop-blur-sm border border-white/5">
                    {country}
                  </span>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-300" />
                  <span className="text-white font-semibold text-xs md:text-base">
                    Currently in {currentCountry}
                  </span>
                </div>
                <blockquote className="text-blue-50 text-lg md:text-2xl leading-relaxed italic font-medium">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Next Button */}
        <button
          onClick={onNext}
          className="hidden md:flex shrink-0 w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-lg items-center justify-center hover:bg-white/20 transition-all group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};
