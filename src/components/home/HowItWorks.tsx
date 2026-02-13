"use client";

import { MessageCircle, School, FileCheck, Plane } from 'lucide-react';

const steps = [
    {
        number: "01",
        icon: MessageCircle,
        title: "Talk to an Advisor",
        description: "Get personalized guidance on universities and programs.",
        color: "text-brand-600",
        bg: "bg-brand-50"
    },
    {
        number: "02",
        icon: School,
        title: "Choose Schools & Courses",
        description: "Select the perfect fit for your goals and budget.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        number: "03",
        icon: FileCheck,
        title: "Apply & Get Admitted",
        description: "We handle applications and track your progress.",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        number: "04",
        icon: Plane,
        title: "Visa + Travel Prep",
        description: "Complete visa processing and travel arrangements.",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    }
];

export function HowItWorks() {
    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20 max-w-3xl mx-auto space-y-4">

                    <h2 className="text-3xl md:text-4xl font-bold text-ink uppercase tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-muted text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Your journey to studying abroad, simplified in four guided steps.
                    </p>
                </div>

                {/* Steps Row */}
                <div className="relative">
                    {/* Dashed Arrows - Desktop */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full px-[12.5%] pointer-events-none">
                        <div className="flex justify-between items-start">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1 px-4">
                                    <svg width="100%" height="40" viewBox="0 0 200 40" fill="none" className="text-muted/20 animate-pulse-slow">
                                        <path
                                            d="M10 20C40 5 160 5 190 20"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeDasharray="6 6"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M185 15L195 20L185 25"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 lg:px-4">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className="group relative flex flex-col items-center text-center space-y-6 transition-all duration-[200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1"
                                >
                                    {/* Icon Container */}
                                    <div className="relative">
                                        <div className={`w-20 h-20 rounded-full ${step.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-md`}>
                                            <Icon className={`w-8 h-8 ${step.color} transition-transform duration-300 group-hover:rotate-6`} />
                                        </div>
                                        {/* Step Number Badge */}
                                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-xs font-semibold text-muted/50 group-hover:text-brand-700 transition-colors duration-[200ms]">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-medium text-ink group-hover:text-brand-700 transition-colors duration-200">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted text-sm leading-relaxed max-w-[240px] mx-auto">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-pulse-slow {
                    animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
            `}</style>
        </section>
    );
}
