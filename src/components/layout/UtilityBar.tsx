"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, MessageCircle, FileSearch, Users, Handshake, ChevronDown, Globe } from 'lucide-react';

export function UtilityBar() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
    const [isRegionsOpen, setIsRegionsOpen] = useState(false);
    const [isEnglishTestOpen, setIsEnglishTestOpen] = useState(false);

    const englishTestLinks = [
        { name: "About PeopleCert", href: "/english-test/about" },
        { name: "Book Your Test", href: "/english-test/book" },
        { name: "Result Guidance", href: "/english-test/results" },
        { name: "Download Materials", href: "/english-test/materials" },
    ];

    const regions = [
        { name: "All Regions", href: "/regions" },
        { name: "Northern Africa", href: "/regions/northern-africa" },
        { name: "Southern Africa", href: "/regions/southern-africa" },
        { name: "East Africa", href: "/regions/east-africa" },
        { name: "West Africa", href: "/regions/west-africa" },
        { name: "Central Africa", href: "/regions/central-africa" },
        { name: "Asia", href: "/regions/asia" },
    ];

    return (
        <div className="border-b border-border bg-surface sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 md:gap-6 py-2.5 text-sm">
                    {/* Left side - Regions Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsRegionsOpen(!isRegionsOpen)}
                            onMouseEnter={() => setIsRegionsOpen(true)}
                            onMouseLeave={() => setIsRegionsOpen(false)}
                            className="flex items-center gap-1.5 text-muted hover:text-brand-700 transition-calm"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Regions</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {/* Dropdown Menu */}
                        {isRegionsOpen && (
                            <div
                                className="absolute left-0 top-full mt-2 w-56 bg-white border border-border rounded-lg shadow-lg py-2 z-50"
                                onMouseEnter={() => setIsRegionsOpen(true)}
                                onMouseLeave={() => setIsRegionsOpen(false)}
                            >
                                {regions.map((region) => (
                                    <Link
                                        key={region.href}
                                        href={region.href}
                                        className="block px-4 py-2 text-sm text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors"
                                    >
                                        {region.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Left side - English Test Dropdown */}
                    <div className="relative ml-6 hidden sm:block">
                        <button
                            onClick={() => setIsEnglishTestOpen(!isEnglishTestOpen)}
                            onMouseEnter={() => setIsEnglishTestOpen(true)}
                            onMouseLeave={() => setIsEnglishTestOpen(false)}
                            className="flex items-center gap-1.5 text-muted hover:text-brand-700 transition-calm"
                        >
                            <FileSearch className="w-3.5 h-3.5" />
                            <span>English Test</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>

                        {/* Dropdown Menu */}
                        {isEnglishTestOpen && (
                            <div
                                className="absolute left-0 top-full mt-2 w-56 bg-white border border-border rounded-lg shadow-lg py-2 z-50"
                                onMouseEnter={() => setIsEnglishTestOpen(true)}
                                onMouseLeave={() => setIsEnglishTestOpen(false)}
                            >
                                {englishTestLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block px-4 py-2 text-sm text-ink hover:bg-brand-50 hover:text-brand-700 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right side - Existing Links */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <a
                            href="tel:+1234567890"
                            className="flex items-center gap-1.5 text-muted hover:text-brand-700 transition-calm"
                        >
                            <Phone className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Call</span>
                        </a>
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex items-center gap-1.5 text-muted hover:text-brand-700 transition-calm"
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        <Link
                            href="/become-associate"
                            className="flex items-center gap-1.5 text-muted hover:text-brand-700 transition-calm"
                        >
                            <Users className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Become an Associate</span>
                        </Link>
                        <Link
                            href="/partner"
                            className="flex items-center gap-1.5 text-muted hover:text-brand-700 transition-calm"
                        >
                            <Handshake className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Partner With Us</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
