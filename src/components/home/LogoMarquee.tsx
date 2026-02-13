"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Placeholder data for universities. 
// In a real scenario, these would be actual logo images.
const universities = [
    "University of Oxford",
    "Stanford University",
    "MIT",
    "Harvard University",
    "University of Cambridge",
    "Imperial College",
    "ETH Zurich",
    "University of Toronto",
    "University of Melbourne",
    "UCL",
    "Yale University",
    "Princeton University",
];

export function LogoMarquee() {
    return (
        <section className="py-10 bg-white border-b border-border overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-6 text-center">
                <p className="text-sm font-semibold text-muted uppercase tracking-wider">
                    In Partnership with Top Universities Worldwide
                </p>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient overlay for fade effect */}
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-white to-transparent" />

                {/* Marquee Track - Contains two sets of items for seamless loop */}
                <div className="flex animate-marquee whitespace-nowrap">
                    {/* Set 1 */}
                    <div className="flex gap-12 items-center px-6">
                        {universities.map((uni, idx) => (
                            <div key={`${uni}-${idx}`} className="text-xl md:text-2xl font-bold text-gray-300 hover:text-brand-500 transition-colors cursor-default select-none">
                                {uni}
                            </div>
                        ))}
                    </div>

                    {/* Set 2 (Duplicate) */}
                    <div className="flex gap-12 items-center px-6" aria-hidden="true">
                        {universities.map((uni, idx) => (
                            <div key={`dup-${uni}-${idx}`} className="text-xl md:text-2xl font-bold text-gray-300 hover:text-brand-500 transition-colors cursor-default select-none">
                                {uni}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
