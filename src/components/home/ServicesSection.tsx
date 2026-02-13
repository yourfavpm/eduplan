"use client";

import { Tile } from '@/components/ui/Tile';
import { Search, FileText, CheckCircle, Shield, BookOpen, BarChart } from 'lucide-react';

const services = [
    {
        icon: Search,
        title: "Course Matching",
        description: "Find programs that align with your goals, budget, and academic background",
        variant: "A" as const
    },
    {
        icon: FileText,
        title: "Admission Processing",
        description: "Complete application submission and follow-up with universities",
        variant: "B" as const
    },
    {
        icon: CheckCircle,
        title: "Document Review",
        description: "Professional review of SOPs, essays, and all application documents",
        variant: "C" as const
    },
    {
        icon: Shield,
        title: "Visa Support",
        description: "Guidance through visa application, interview prep, and documentation",
        variant: "A" as const
    },
    {
        icon: BookOpen,
        title: "English Test Support",
        description: "IELTS, TOEFL, PTE preparation resources and test booking assistance",
        variant: "B" as const
    },
    {
        icon: BarChart,
        title: "Application Tracking",
        description: "Real-time updates on your application status through your portal",
        variant: "C" as const
    },
];

export function ServicesSection() {
    return (
        <section className="py-20 md:py-24 bg-surface">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="font-semibold text-ink mb-6 relative inline-block">
                        How EduPlan Works with You
                        <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
                    </h2>
                    <p className="text-lg text-muted max-w-2xl">
                        Comprehensive support for every step of your study abroad journey
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Tile
                                key={index}
                                icon={<Icon className="w-6 h-6" />}
                                title={service.title}
                                description={service.description}
                                cta="Learn more →"
                                variant={service.variant}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
