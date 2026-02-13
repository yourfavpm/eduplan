"use client";

import { MessageCircle, School, FileCheck, Plane } from 'lucide-react';

const steps = [
    {
        number: 1,
        icon: MessageCircle,
        title: "Talk to an Advisor",
        description: "Get personalized guidance on universities and programs"
    },
    {
        number: 2,
        icon: School,
        title: "Choose Schools & Courses",
        description: "Select the perfect fit for your goals and budget"
    },
    {
        number: 3,
        icon: FileCheck,
        title: "Apply & Get Admitted",
        description: "We handle applications and track your progress"
    },
    {
        number: 4,
        icon: Plane,
        title: "Visa + Travel Prep",
        description: "Complete visa processing and travel arrangements"
    }
];

export function HowItWorksSection() {
    return (
        <section className="py-20 md:py-24 bg-surface">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="font-semibold text-ink mb-4">
                        How It Works
                    </h2>
                    <p className="text-muted max-w-2xl">
                        Your journey to studying abroad, simplified in four steps
                    </p>
                </div>

                {/* Timeline - Desktop Horizontal, Mobile Vertical */}
                <div className="relative">
                    {/* Connector Line - Desktop */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border"
                        style={{ left: '10%', right: '10%' }}></div>

                    {/* Connector Line - Mobile */}
                    <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

                    <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.number}
                                    className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0"
                                    style={{
                                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    {/* Number Circle */}
                                    <div className="relative flex-shrink-0 w-12 h-12 md:w-24 md:h-24 rounded-full bg-brand-700 text-white flex items-center justify-center font-semibold text-lg md:text-2xl shadow-softer z-10">
                                        {step.number}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 md:text-center md:mt-6 space-y-2">
                                        <div className="w-10 h-10 mx-auto hidden md:flex items-center justify-center rounded-lg bg-accent-50 text-accent-700 mb-3">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold text-ink">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </section>
    );
}
