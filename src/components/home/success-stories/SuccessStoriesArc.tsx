"use client";

import React, { useState, useCallback, useEffect } from "react";
import { DottedArcPath } from "./DottedArcPath";
import { AvatarNode } from "./AvatarNode";
import { TestimonialCard } from "./TestimonialCard";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Testimonial {
  id: string;
  name: string;
  country: string; // Home country
  currentCountry: string; // Destination country
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
  {
    id: "4",
    name: "Maria Fernandes",
    country: "Kenya",
    currentCountry: "Canada",
    image: "/images/testimonials/maria.png",
    quote: "From application to arrival, EduPlan360 delivered a premium experience. My advisor was with me every step.",
  },
  {
    id: "5",
    name: "Sarah Karanja",
    country: "Kenya",
    currentCountry: "USA",
    image: "/images/testimonials/sarah.png",
    quote: "I never thought I could get into a top-tier university, but their guidance on my personal statement was a game changer.",
  },
  {
    id: "6",
    name: "Ahmed Mansour",
    country: "Egypt",
    currentCountry: "Canada",
    image: "/images/testimonials/ahmed.png",
    quote: "The visa process was so intimidating until I met the team at EduPlan360. They made everything clear and simple.",
  },
  {
    id: "7",
    name: "Fatima Zara",
    country: "Nigeria",
    currentCountry: "Ireland",
    image: "/images/testimonials/adewale.png", // Reusing adewale as placeholder for quota limit
    quote: "Their support didn't stop at admission. They helped me find housing and settle in a new country effortlessly.",
  },
  {
    id: "8",
    name: "Samuel Okoro",
    country: "Nigeria",
    currentCountry: "USA",
    image: "/images/testimonials/tunde.png", // Reusing tunde as placeholder for quota limit
    quote: "A truly professional service. They found me a program that fit my career goals perfectly.",
  },
];

// Predefined coordinates along the quadratic bezier curve (M0,150 Q500,0 1000,150)
// Percentages: x from 0 to 100, y from 0 to 100 relative to 200px height
const ARC_POSITIONS = [
  { x: 10, y: 72 },
  { x: 22, y: 55 },
  { x: 34, y: 42 },
  { x: 46, y: 35 },
  { x: 54, y: 35 },
  { x: 66, y: 42 },
  { x: 78, y: 55 },
  { x: 90, y: 72 },
];

export const SuccessStoriesArc: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-scroll logic (continuous)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section 
      className="relative py-24 md:py-32 bg-blue-50/50 overflow-hidden" 
      aria-label="Success Stories"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 relative inline-block">
            Success Stories
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-brand-500 rounded-full" />
          </h2>
          <p className="text-muted mt-6 max-w-2xl mx-auto">
            Real feedback from students we&apos;ve guided abroad.
          </p>
        </div>

        {/* Arc Content */}
        <div className="relative max-w-5xl mx-auto h-[160px] md:h-[200px]">
          {/* SVG Path */}
          {!isMobile && <DottedArcPath />}

          {/* Avatar Nodes */}
          {TESTIMONIALS.map((item, i) => {
            const isActive = i === index;
            
            // On mobile, only show active + 2 on each side to prevent squeezing
            if (isMobile) {
              const distance = Math.min(
                Math.abs(i - index),
                Math.abs(i - index + TESTIMONIALS.length),
                Math.abs(i - index - TESTIMONIALS.length)
              );
              if (distance > 2) return null;
            }

            return (
              <AvatarNode
                key={item.id}
                image={item.image}
                name={item.name}
                isActive={isActive}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                position={ARC_POSITIONS[i]}
              />
            );
          })}
        </div>

        {/* Testimonial Card */}
        <TestimonialCard
          name={TESTIMONIALS[index].name}
          country={TESTIMONIALS[index].country}
          currentCountry={TESTIMONIALS[index].currentCountry}
          quote={TESTIMONIALS[index].quote}
          onNext={handleNext}
          onPrev={handlePrev}
          direction={direction}
        />
      </div>
    </section>
  );
};
