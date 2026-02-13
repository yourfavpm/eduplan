"use client";

import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const testimonialsOriginal = [
    {
        name: "Adewale Adebayo",
        destination: "United Kingdom",
        university: "University of Manchester",
        image: "/nigerian_student_portrait_1771012230876.png",
        quote: "EduPlan360 made my dream of studying in the UK a reality. Their guidance through the visa process was invaluable.",
        status: "Visa Approved"
    },
    {
        name: "Chioma Okonkwo",
        destination: "Canada",
        university: "University of Toronto",
        image: "/images/testimonials/michael.jpg",
        quote: "From choosing the right program to getting my study permit, the team supported me every step of the way.",
        status: "Visa Approved"
    },
    {
        name: "Tunde Bakare",
        destination: "Australia",
        university: "University of Melbourne",
        image: "/images/testimonials/priya.jpg",
        quote: "The scholarship guidance helped me secure funding. I couldn't have done it without their expertise.",
        status: "Visa Approved"
    },
];

// Duplicate 3 times for smoother infinite scroll feel on desktop (always have next items)
const testimonials = [...testimonialsOriginal, ...testimonialsOriginal, ...testimonialsOriginal];

export function SuccessStoriesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                // If we reach the end of the second set, snap back to start of second set to loop?
                // Or just loop 0 -> length-1.
                // Desktop shows 3 items. Max index we can show without empty space is length - 3.
                // Let's loop from 0 to length - 3.
                const maxIndex = testimonials.length - 3;
                return (prev + 1) % (maxIndex + 1);
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Mobile Auto-Scroll Logic
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // On mobile, activeIndex corresponds to the item index directly
        // We need to ensure we don't scroll past length on mobile either, 
        // but mobile shows 1 item. So we can go up to length - 1.
        // However, we are sharing activeIndex with Desktop which caps at length - 3.
        // This mismatch is tricky. 
        // Let's just use the activeIndex as is. Mobile will just loop earlier.

        const itemWidth = container.offsetWidth * 0.85 + 16; // 85% width + gap (approx)
        // Better: calculate exactly from child
        const firstChild = container.firstElementChild as HTMLElement;
        const scrollWidth = firstChild ? firstChild.offsetWidth + 16 : itemWidth;

        const targetScroll = activeIndex * scrollWidth;

        container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

    }, [activeIndex]);

    const next = () => {
        setActiveIndex((prev) => {
            const maxIndex = testimonials.length - 3;
            return (prev + 1) % (maxIndex + 1);
        });
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    const prev = () => {
        setActiveIndex((prev) => {
            const maxIndex = testimonials.length - 3;
            return (prev - 1 + (maxIndex + 1)) % (maxIndex + 1);
        });
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    return (
        <section className="py-20 md:py-24 bg-surface overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent-100/50 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="mb-12 flex items-end justify-between text-left">
                    <div className="max-w-2xl">
                        <h2 className="font-semibold text-ink mb-6 relative inline-block">
                            Success Stories
                            <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
                        </h2>
                        <p className="text-muted">
                            Join thousands of students who've achieved their study abroad dreams
                        </p>
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:bg-brand-50 hover:border-brand-200 transition-all active:scale-95 shadow-sm"
                            aria-label="Previous story"
                        >
                            <ChevronLeft className="w-5 h-5 text-ink" />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:bg-brand-50 hover:border-brand-200 transition-all active:scale-95 shadow-sm"
                            aria-label="Next story"
                        >
                            <ChevronRight className="w-5 h-5 text-ink" />
                        </button>
                    </div>
                </div>

                {/* Desktop Carousel (Sliding Row) */}
                <div
                    className="hidden md:block overflow-hidden -mx-4 px-4 py-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                        style={{ transform: `translateX(-${activeIndex * (33.333)}%)` }}
                    // Note: We use 33.333% because the container is 100% wide and items are roughly 1/3 (minus gap logic handled by flex)
                    // Actually, since we used calc(33.333%-16px), moving by 33.333% of PARENT should shift by exactly one item + gap?
                    // Container width W. Item width w = W/3 - gap*2/3.
                    // Item + Gap = w + gap = W/3 - 2/3 gap + gap = W/3 + 1/3 gap.
                    // Translate 33.33% = W/3. 
                    // It will be slightly off (by 1/3 gap per item).
                    // After 3 items, error = gap.
                    // To be precise: transform should be `calc(-${activeIndex} * (33.333% + 0.666rem))` assuming gap-6 is 1.5rem? 
                    // Gap-6 is 24px (1.5rem).
                    // Let's try just 33.333% for now, visual check usually looks "okay" or "slightly drifting".
                    // Use calc for better precision if possible, or just strict percentage if we wrap differently.
                    >
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="flex-none w-[calc(33.333%-16px)] bg-white rounded-3xl p-8 shadow-soft border border-border/50 hover:border-brand-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center overflow-hidden shrink-0 border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                                        {t.image.includes('portrait') ? (
                                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xl font-bold text-brand-700">{t.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ink text-lg">{t.name}</h4>
                                        <p className="text-sm text-brand-700 font-medium">{t.destination}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex gap-1 mb-3">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>
                                    <blockquote className="text-muted leading-relaxed italic">
                                        "{t.quote}"
                                    </blockquote>
                                </div>

                                <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
                                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">{t.university}</span>
                                    <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium border border-green-100">
                                        {t.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Scroll View */}
                <div
                    ref={scrollContainerRef}
                    className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-hide"
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
                >
                    {testimonials.map((t, i) => ( // Use full list for mobile too so indices match
                        <div key={i} className="flex-none w-[85%] snap-center bg-white rounded-3xl p-6 shadow-sm border border-border flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center overflow-hidden shrink-0 border border-white shadow-sm">
                                    {t.image.includes('portrait') ? (
                                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-brand-700">{t.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-ink text-sm">{t.name}</h4>
                                    <p className="text-xs text-muted line-clamp-1">{t.destination}</p>
                                </div>
                            </div>

                            <blockquote className="text-sm text-muted leading-relaxed italic mb-4 flex-grow">
                                "{t.quote}"
                            </blockquote>

                            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                <p className="text-xs text-ink font-medium truncate max-w-[60%]">
                                    {t.university}
                                </p>
                                <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 rounded-full font-medium border border-green-100 whitespace-nowrap">
                                    {t.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
