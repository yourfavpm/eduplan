"use client";

import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
    {
        name: "Sarah Johnson",
        destination: "United Kingdom",
        university: "University of Manchester",
        image: "/images/testimonials/sarah.jpg",
        quote: "EduPlan360 made my dream of studying in the UK a reality. Their guidance through the visa process was invaluable.",
        status: "Visa Approved"
    },
    {
        name: "Michael Chen",
        destination: "Canada",
        university: "University of Toronto",
        image: "/images/testimonials/michael.jpg",
        quote: "From choosing the right program to getting my study permit, the team supported me every step of the way.",
        status: "Visa Approved"
    },
    {
        name: "Priya Patel",
        destination: "Australia",
        university: "University of Melbourne",
        image: "/images/testimonials/priya.jpg",
        quote: "The scholarship guidance helped me secure funding. I couldn't have done it without their expertise.",
        status: "Visa Approved"
    },
];

export function SuccessStoriesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const testimonial = testimonials[currentIndex];

    return (
        <section className="py-20 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-12 flex items-end justify-between text-left">
                    <div className="max-w-2xl">
                        <h2 className="font-semibold text-ink mb-4">
                            Success Stories
                        </h2>
                        <p className="text-muted">
                            Join thousands of students who've achieved their study abroad dreams
                        </p>
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors active:scale-95"
                            aria-label="Previous story"
                        >
                            <ChevronLeft className="w-5 h-5 text-ink" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors active:scale-95"
                            aria-label="Next story"
                        >
                            <ChevronRight className="w-5 h-5 text-ink" />
                        </button>
                    </div>
                </div>

                {/* Bento Box Carousel */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Desktop Carousel */}
                    <div
                        key={currentIndex}
                        className="hidden md:block bg-brand-50/50 rounded-[2.5rem] overflow-hidden"
                    >
                        <div className="grid md:grid-cols-2 gap-0 items-center">
                            {/* Left: Student Image Box */}
                            <div className="relative h-[400px] md:h-[500px] bg-brand-100 flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-200 to-accent-100 opacity-30"></div>

                                {/* Placeholder for student image */}
                                <div className="relative w-64 h-64 rounded-3xl bg-white shadow-xl flex items-center justify-center text-8xl font-bold text-brand-700 overflow-hidden transform rotate-3">
                                    <div className="absolute inset-0 bg-brand-50 flex items-center justify-center">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-8 left-8 bg-white px-4 py-2 rounded-full text-sm font-semibold text-brand-700 shadow-sm border border-brand-100">
                                    {testimonial.status}
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center text-left">
                                <Quote className="w-12 h-12 text-brand-200 mb-8" />

                                <blockquote className="text-xl md:text-2xl text-ink leading-relaxed italic mb-8 font-light">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="mt-auto">
                                    <h4 className="text-xl font-semibold text-ink">{testimonial.name}</h4>
                                    <p className="text-muted text-base mb-1">{testimonial.university}</p>
                                    <p className="text-sm text-brand-700 font-medium">
                                        Now studying in {testimonial.destination}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Sliding Carousel */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
                        {testimonials.map((t, i) => (
                            <div key={i} className="flex-none w-[85%] snap-center bg-brand-50/50 rounded-3xl p-6 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl font-bold text-brand-700 overflow-hidden shrink-0">
                                        <div className="bg-brand-50 w-full h-full flex items-center justify-center">
                                            {t.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-ink text-sm">{t.name}</h4>
                                        <p className="text-xs text-muted line-clamp-1">{t.university}</p>
                                        <span className="inline-block mt-1 text-[10px] bg-white px-2 py-0.5 rounded-full text-brand-700 border border-brand-100 font-medium whitespace-nowrap">
                                            {t.status}
                                        </span>
                                    </div>
                                </div>

                                <Quote className="w-5 h-5 text-brand-200 mb-3" />

                                <blockquote className="text-sm text-ink leading-relaxed italic mb-4 font-light flex-grow">
                                    "{t.quote}"
                                </blockquote>

                                <div className="mt-auto pt-4 border-t border-brand-100/50">
                                    <p className="text-xs text-brand-700 font-medium">
                                        Now in {t.destination}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
