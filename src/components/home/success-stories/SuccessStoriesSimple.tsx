"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  country: string;
  currentCountry: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Adewale Adebayo",
    country: "Nigeria",
    currentCountry: "United Kingdom",
    image: "/images/testimonials/adewale.png",
    quote: "EduPlan360 guided me from shortlist to visa approval — seamless, professional and caring. I'm now studying at the University of Manchester.",
  },
  {
    id: "2",
    name: "Chioma Okonkwo",
    country: "Nigeria",
    currentCountry: "Germany",
    image: "/images/testimonials/chioma.png",
    quote: "Their advisors matched me with the perfect program and helped secure my study permit. Highly recommend EduPlan360.",
  },
  {
    id: "3",
    name: "Tunde Bakare",
    country: "Nigeria",
    currentCountry: "Australia",
    image: "/images/testimonials/tunde.png",
    quote: "Scholarship counselling was thorough and effective. I received an award that made studying in Australia possible.",
  },
];

export function SuccessStoriesSimple() {
  return (
    <section className="py-24 md:py-32 bg-blue-50/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Success Stories
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-6 max-w-2xl mx-auto">
            Real feedback from students we&apos;ve guided abroad.
          </p>
        </div>

        {/* Testimonial Grid / Carousel */}
        <div className="relative">
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory pb-8 md:pb-0">
            {TESTIMONIALS.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="min-w-[85vw] md:min-w-0 snap-center bg-[#130057] rounded-[32px] p-8 md:p-10 shadow-xl relative overflow-hidden group border border-white/5"
              >
                <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-500 opacity-20 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-500/30">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-brand-300 text-sm font-medium">{testimonial.country}</p>
                    </div>
                  </div>

                  <blockquote className="text-slate-300 text-lg leading-relaxed italic mb-8 grow">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="mt-auto">
                    <span className="inline-block px-4 py-1.5 bg-white/5 text-white rounded-full text-xs font-semibold border border-white/10">
                      Currently in {testimonial.currentCountry}
                    </span>
                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-500/20 transition-colors" />
              </div>
            ))}
          </div>
          
          {/* Mobile Pagination Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {TESTIMONIALS.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-brand-500" : "bg-slate-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
