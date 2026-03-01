"use client";

import React from "react";

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

            <div className="space-y-8">
                {/* Line 1: Scroll Left */}
                <div className="relative flex overflow-hidden group">
                    <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-linear-to-r from-white to-transparent" />
                    <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-linear-to-l from-white to-transparent" />

                    <div className="flex animate-marquee whitespace-nowrap">
                        <div className="flex gap-12 items-center px-6">
                            {universities.slice(0, universities.length / 2).map((uni, idx) => (
                                <div key={`${uni}-${idx}`} className="text-xl md:text-2xl font-bold text-gray-300 hover:text-brand-500 transition-colors cursor-default select-none">
                                    {uni}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-12 items-center px-6" aria-hidden="true">
                            {universities.slice(0, universities.length / 2).map((uni, idx) => (
                                <div key={`dup-${uni}-${idx}`} className="text-xl md:text-2xl font-bold text-gray-300 hover:text-brand-500 transition-colors cursor-default select-none">
                                    {uni}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Line 2: Scroll Right */}
                <div className="relative flex overflow-hidden group">
                    <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-linear-to-r from-white to-transparent" />
                    <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-linear-to-l from-white to-transparent" />

                    <div className="flex animate-marquee-reverse whitespace-nowrap">
                        <div className="flex gap-12 items-center px-6">
                            {universities.slice(universities.length / 2).map((uni, idx) => (
                                <div key={`${uni}-${idx}`} className="text-xl md:text-2xl font-bold text-gray-300 hover:text-brand-500 transition-colors cursor-default select-none">
                                    {uni}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-12 items-center px-6" aria-hidden="true">
                            {universities.slice(universities.length / 2).map((uni, idx) => (
                                <div key={`dup-${uni}-${idx}`} className="text-xl md:text-2xl font-bold text-gray-300 hover:text-brand-500 transition-colors cursor-default select-none">
                                    {uni}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 50s linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 50s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
            `}</style>
        </section>
    );
}
