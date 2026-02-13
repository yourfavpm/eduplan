"use client";

import { Tile } from '@/components/ui/Tile';

const destinations = [
    {
        flag: "🇬🇧",
        name: "United Kingdom",
        slug: "united-kingdom",
        description: "World-class universities and rich academic tradition",
        variant: "A" as const,
        image: "/images/destinations/uk.png"
    },
    {
        flag: "🇺🇸",
        name: "United States",
        slug: "united-states",
        description: "Premier research institutions and diverse programs",
        variant: "B" as const,
        image: "/images/destinations/usa.png"
    },
    {
        flag: "🇨🇦",
        name: "Canada",
        slug: "canada",
        description: "Affordable education with excellent quality of life",
        variant: "C" as const,
        image: "/images/destinations/canada.png"
    },
    {
        flag: "🇦🇺",
        name: "Australia",
        slug: "australia",
        description: "Innovative universities and welcoming culture",
        variant: "A" as const,
        image: "/images/destinations/australia.png"
    },
    {
        flag: "🇩🇪",
        name: "Germany",
        slug: "germany",
        description: "Low tuition fees and engineering excellence",
        variant: "B" as const,
        image: "/images/destinations/germany.png"
    },
    {
        flag: "🇮🇪",
        name: "Ireland",
        slug: "ireland",
        description: "English-speaking EU country with tech opportunities",
        variant: "C" as const,
        image: "/images/destinations/ireland.png"
    },
];

export function DestinationsSection() {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-16">
                    <h2 className="font-semibold text-ink mb-6 relative inline-block">
                        Let's Find Your Dream Study Destination
                        <div className="absolute -bottom-3 left-0 w-1/2 h-1 bg-brand-500 rounded-full" />
                    </h2>
                    <p className="text-muted max-w-2xl">
                        Explore top countries for your international education
                    </p>
                </div>

                {/* Flat Tile Grid with Hybrid Corners */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {destinations.map((destination) => (
                        <Tile
                            key={destination.slug}
                            href={`/destinations/${destination.slug}`}
                            icon={<span className="text-4xl">{destination.flag}</span>}
                            title={destination.name}
                            description={destination.description}
                            cta={`Study in ${destination.name} →`}
                            variant={destination.variant}
                            backgroundImage={destination.image}
                        />
                    ))}
                </div>


                {/* Modern Minimal CTA */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => window.location.href = '/destinations'}
                        className="group inline-flex items-center gap-2 text-brand-700 font-semibold text-lg hover:gap-3 transition-all duration-300 relative"
                    >
                        <span className="relative">
                            View All Destinations
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-700 group-hover:w-full transition-all duration-300"></span>
                        </span>
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
