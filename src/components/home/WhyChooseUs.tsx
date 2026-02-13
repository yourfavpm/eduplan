"use client";

import { GraduationCap, Phone, Target, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this import is correct relative to the file

const flagIcons = [
    { country: "UK", emoji: "🇬🇧" },
    { country: "US", emoji: "🇺🇸" },
    { country: "CA", emoji: "🇨🇦" },
    { country: "AU", emoji: "🇦🇺" },
    { country: "DE", emoji: "🇩🇪" },
    { country: "IE", emoji: "🇮🇪" },
    { country: "FR", emoji: "🇫🇷" },
    { country: "NZ", emoji: "🇳🇿" },
];

export function WhyChooseUs() {
    return (
        <section className="py-24 md:py-32 bg-[#F9FAFB] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-16 text-center">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#0F172A]">
                            Here's why we're a top choice for students
                        </h2>
                    </div>

                    {/* Bento Grid Layout - Redesigned */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 min-h-[600px]">

                        {/* Card 1: 100% Scholarships */}
                        <div className="flex-1 bg-[#0F172A] rounded-[32px] p-8 md:p-10 flex flex-col justify-between text-white group hover:scale-[1.01] transition-transform duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                    100%
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-white font-medium text-lg">Scholarship Success</p>
                                    <p className="text-white/60 text-sm leading-relaxed max-w-[260px]">
                                        We've helped students secure over $2M in funding through merit-based and need-based applications worldwide.
                                    </p>
                                </div>
                                <ul className="grid grid-cols-1 gap-2 pt-4">
                                    {['Full Funding', 'Automatic Consideration', 'Ivy League Prep'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-xs text-white/40">
                                            <div className="w-1 h-1 rounded-full bg-brand-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card 2: Partners (Previously Card 4 Bottom) */}
                        <div className="flex-1 bg-white rounded-[32px] p-8 md:p-10 flex flex-col border border-[#E2E8F0] shadow-sm group hover:scale-[1.01] transition-transform duration-300 overflow-hidden relative">
                            <div className="flex-1 space-y-2 relative z-10 mb-8">
                                <h3 className="text-2xl font-bold text-[#0F172A] leading-tight">
                                    PARTNERED WITH<br />50+ UNIVERSITIES
                                </h3>
                                <p className="text-muted text-sm">
                                    Direct access to top global research institutions.
                                </p>
                            </div>

                            {/* Floating Flag Icons */}
                            <div className="grid grid-cols-4 gap-4 relative z-0">
                                {flagIcons.map((flag, i) => (
                                    <div
                                        key={flag.country}
                                        className={cn(
                                            "w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-2xl transition-all duration-500 hover:scale-110",
                                            i % 2 === 0 ? "mt-4" : "mt-0"
                                        )}
                                        style={{
                                            animation: `float ${3 + i % 2}s ease-in-out infinite alternate`,
                                            animationDelay: `${i * 0.2}s`
                                        }}
                                    >
                                        {flag.emoji}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3: Free Consultation (Previously Card 4) */}
                        <div className="flex-1 bg-white rounded-[32px] p-8 md:p-10 flex flex-col border border-[#E2E8F0] shadow-sm group hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden">
                            {/* Subtle decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -translate-y-16 translate-x-16" />

                            <div className="relative z-10 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-700">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-[#0F172A] leading-tight flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                            FREE CONSULTATION
                                        </h3>
                                    </div>
                                    <p className="text-muted text-sm leading-relaxed max-w-[200px]">
                                        Speak with our experts today and map out your global future.
                                    </p>
                                </div>

                                <button className="mt-8 inline-flex items-center justify-between w-full bg-[#1D4ED8] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#1E40AF] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-500/20 active:scale-[0.98]">
                                    Book A Call
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Card 4: Visa Success (Previously Card 3) */}
                        <div className="flex-1 bg-[#E0F2FE] rounded-[32px] p-8 md:p-10 flex flex-col justify-between border border-[#E2E8F0] shadow-sm group hover:scale-[1.01] transition-transform duration-300">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-[#1D4ED8]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-4xl md:text-5xl font-bold text-[#0F172A]">
                                    95%+
                                </h3>
                                <p className="text-[#0F172A]/70 text-base font-medium">
                                    Visa Success Rate
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    from { transform: translateY(0px); }
                    to { transform: translateY(-8px); }
                }
            `}</style>
        </section>
    );
}
