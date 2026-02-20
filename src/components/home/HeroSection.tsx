"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';

const PHRASES = [
    "Your journey to world-class education starts here",
    "Study abroad with expert guidance",
    "Transform your future with global education",
    "Get into top universities worldwide"
];

export function HeroSection() {
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = PHRASES[phraseIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentPhrase.length) {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(currentPhrase.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setPhraseIndex((prevIndex) => (prevIndex + 1) % PHRASES.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, phraseIndex]);

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-white via-brand-50/30 to-white pt-10 pb-12 md:pt-28 md:pb-24">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="text-center lg:text-left">
                        {/* Main Headline with Typewriter Effect */}
                        <h1 className="text-ink mb-4 min-h-[90px] md:min-h-[100px] font-sans font-bold text-3xl md:text-5xl">
                            {displayText}
                            <span className="inline-block w-1 h-8 md:h-14 bg-brand-700 ml-1 animate-pulse"></span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-muted leading-relaxed max-w-2xl lg:max-w-none mb-6 text-sm md:text-base animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Expert guidance from university selection to visa approval.
                            We make studying abroad simple, affordable, and achievable.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

                            {/* Desktop Button */}
                            <button
                                onClick={() => window.location.href = '/portal/sign-up'}
                                className="hidden md:inline-flex group relative items-center justify-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-full font-semibold text-base overflow-hidden hover:bg-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                            >
                                <span className="relative z-10">Start Your Study</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Mobile Button (Simple Underline) */}
                            <button
                                onClick={() => window.location.href = '/portal/sign-up'}
                                className="md:hidden inline-flex items-center justify-center gap-2 text-brand-700 font-semibold text-base hover:text-brand-800 transition-colors"
                            >
                                <span className="underline underline-offset-4">Start Your Study</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => {
                                    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
                                    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
                                }}
                                className="hidden sm:inline-flex group items-center justify-center gap-2 bg-white text-brand-700 border-2 border-brand-200 px-8 py-4 rounded-full font-semibold text-base hover:border-brand-700 hover:bg-brand-50 transition-all duration-300 shadow-sm active:scale-[0.98]"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>Chat on WhatsApp</span>
                            </button>
                        </div>

                        {/* Trust Stats Row - Desktop Only */}
                        <div className="hidden lg:grid grid-cols-3 gap-6 pt-8">
                            <div className="flex items-center gap-3 group">
                                <div>
                                    <div className="text-xl font-bold text-brand-700">95%</div>
                                    <div className="text-xs text-muted">Visa Success</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div>
                                    <div className="text-xl font-bold text-brand-700">200+</div>
                                    <div className="text-xs text-muted">Universities</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group">
                                <div>
                                    <div className="text-xl font-bold text-brand-700">5,000+</div>
                                    <div className="text-xs text-muted">Applicants</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image with Organic Shape */}
                    <div className="relative h-[300px] md:h-[500px] lg:h-[600px] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        {/* Organic Blob Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-brand-100 to-accent-100"
                            style={{
                                clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)',
                                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                            }}>
                        </div>

                        {/* Image Container with Organic Shape */}
                        <div className="absolute inset-4 overflow-hidden shadow-xl"
                            style={{
                                clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)',
                                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                            }}>
                            <Image
                                src="/hero.jpg"
                                alt="Student studying abroad - international education guidance"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-br from-brand-700/20 to-transparent"></div>
                        </div>

                        {/* UK — top right */}
                        <div className="absolute top-6 -right-2 md:-right-8 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-border animate-float">
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg md:text-2xl">🇬🇧</span>
                                <span className="text-xs md:text-sm font-semibold text-ink">UK</span>
                            </div>
                        </div>

                        {/* Canada — upper left */}
                        <div className="absolute top-24 left-2 md:-left-6 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-border animate-float" style={{ animationDelay: '0.5s' }}>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg md:text-2xl">🇨🇦</span>
                                <span className="text-xs md:text-sm font-semibold text-ink">Canada</span>
                            </div>
                        </div>

                        {/* USA — middle right */}
                        <div className="absolute top-1/2 -right-2 md:-right-12 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-border animate-float" style={{ animationDelay: '1s' }}>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg md:text-2xl">🇺🇸</span>
                                <span className="text-xs md:text-sm font-semibold text-ink">USA</span>
                            </div>
                        </div>

                        {/* Australia — lower left */}
                        <div className="absolute bottom-16 left-2 md:-left-8 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-border animate-float" style={{ animationDelay: '1.5s' }}>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg md:text-2xl">🇦🇺</span>
                                <span className="text-xs md:text-sm font-semibold text-ink">Australia</span>
                            </div>
                        </div>

                        {/* Germany — bottom right */}
                        <div className="absolute bottom-6 right-6 md:right-8 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-border animate-float" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-1.5">
                                <span className="text-lg md:text-2xl">🇩🇪</span>
                                <span className="text-xs md:text-sm font-semibold text-ink">Germany</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Stats Row - Mobile Only */}
                <div className="lg:hidden grid grid-cols-3 gap-4 mt-12 max-w-xl mx-auto">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-brand-700 mb-1">95%</div>
                        <div className="text-xs text-muted">Visa Success</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-brand-700 mb-1">200+</div>
                        <div className="text-xs text-muted">Universities</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-brand-700 mb-1">5,000+</div>
                        <div className="text-xs text-muted">Applicants</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
