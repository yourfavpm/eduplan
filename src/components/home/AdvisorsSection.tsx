"use client";

import Image from 'next/image';
import { MessageCircle, Award, MapPin } from 'lucide-react';

const associates = [
    {
        name: "Sarah Johnson",
        title: "UK & Europe Specialist",
        location: "London, UK",
        experience: "8+ years",
        studentsHelped: "500+",
        image: "/images/advisors/advisor-1.jpg",
        whatsapp: "+1234567890" // Replace with actual number
    },
    {
        name: "David Chen",
        title: "USA & Canada Expert",
        location: "Toronto, Canada",
        experience: "10+ years",
        studentsHelped: "800+",
        image: "/images/advisors/advisor-2.jpg",
        whatsapp: "+1234567891"
    },
    {
        name: "Priya Sharma",
        title: "Australia & Asia Guide",
        location: "Melbourne, Australia",
        experience: "6+ years",
        studentsHelped: "400+",
        image: "/images/advisors/advisor-3.jpg",
        whatsapp: "+1234567892"
    }
];

export function AdvisorsSection() {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <h2 className="font-semibold text-ink mb-4">
                        Our Featured Associates
                    </h2>
                    <p className="text-muted max-w-2xl">
                        Connect with experienced education consultants who have helped thousands of students achieve their study abroad dreams
                    </p>
                </div>

                {/* Associates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {associates.map((associate, index) => (
                        <div
                            key={index}
                            className="group bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-brand-100 to-accent-100">
                                <Image
                                    src={associate.image}
                                    alt={associate.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Name & Title */}
                                <div className="mb-4">
                                    <h3 className="font-semibold text-ink mb-1">
                                        {associate.name}
                                    </h3>
                                    <p className="text-brand-700 font-medium text-sm mb-2">
                                        {associate.title}
                                    </p>

                                    {/* Details */}
                                    <div className="flex items-center gap-4 text-xs text-muted">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{associate.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Award className="w-3.5 h-3.5" />
                                            <span>{associate.experience}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => window.open(`https://wa.me/${associate.whatsapp}`, '_blank')}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-brand-800 transition-all duration-300 active:scale-[0.98] group/btn"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Talk to {associate.name.split(' ')[0]}</span>
                                    <span className="ml-auto group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-sm text-muted mb-4">
                        Want to become an associate? Join our team of education experts
                    </p>
                    <button
                        onClick={() => window.location.href = '/become-associate'}
                        className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all duration-300 relative group"
                    >
                        <span className="relative">
                            Learn More About Becoming an Associate
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-700 group-hover:w-full transition-all duration-300"></span>
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
