"use client";

import Image from 'next/image';
import { MessageCircle, Award, MapPin } from 'lucide-react';

const associates = [
    {
        name: "Ngozi Eze",
        title: "UK & Europe Specialist",
        location: "London, UK",
        experience: "8+ years",
        studentsHelped: "500+",
        image: "/images/advisors/advisor-1.jpg", // Using placeholder for now, would be generated one in real app but sticking to existing logic or new one
        whatsapp: "+1234567890"
    },
    {
        name: "Emeka Okafor",
        title: "USA & Canada Expert",
        location: "Toronto, Canada",
        experience: "10+ years",
        studentsHelped: "800+",
        image: "/images/advisors/advisor-2.jpg",
        whatsapp: "+1234567891"
    },
    {
        name: "Zainab Ahmed",
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
                <div className="mb-12">
                    <h2 className="font-semibold text-ink mb-6 relative inline-block">
                        Our Featured Associates
                        <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
                    </h2>
                    <p className="text-muted max-w-2xl">
                        Connect with our dedicated network of volunteers and referrals who share their first-hand study abroad experiences to guide your journey.
                    </p>
                </div>

                {/* Associates Scroll */}
                <div className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
                    {associates.map((associate, index) => (
                        <div
                            key={index}
                            className="group bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 min-w-[300px] md:min-w-[350px] snap-center flex flex-col"
                        >
                            {/* Image with Overlay Details */}
                            <div className="relative h-80 overflow-hidden bg-gradient-to-br from-brand-100 to-accent-100">
                                <Image
                                    src={associate.image}
                                    alt={associate.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div>

                                {/* Overlay Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium text-brand-200 mb-2 uppercase tracking-wider">Volunteer Associate</p>
                                    <p className="text-xs text-white/80 leading-relaxed line-clamp-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        "I love helping students navigate the challenges I faced. My goal is to make your transition to {associate.location.split(',')[1]} as smooth as possible."
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
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
                                    className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-brand-800 transition-all duration-300 active:scale-[0.98] group/btn"
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
