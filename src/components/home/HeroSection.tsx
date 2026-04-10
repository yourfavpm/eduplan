"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, MessageCircle, User } from 'lucide-react';

const PHRASES = [
    "Your journey to world-class education starts here",
    "Study abroad with expert guidance",
    "Transform your future with global education",
    "Get into top universities worldwide"
];

/* 
=============================================================================
   HERO SECTION V1 (Commented out for safekeeping as requested)
=============================================================================
export function HeroSectionV1() {
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = PHRASES[phraseIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentPhrase.length) {
                    setDisplayText(currentPhrase.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
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
            <div className="absolute top-20 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-ink mb-4 min-h-[90px] md:min-h-[100px] font-sans font-bold text-3xl md:text-5xl">
                            {displayText}
                            <span className="inline-block w-1 h-8 md:h-14 bg-brand-700 ml-1 animate-pulse"></span>
                        </h1>
                        <p className="text-muted leading-relaxed max-w-2xl lg:max-w-none mb-6 text-sm md:text-base animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Expert guidance from university selection to visa approval.
                            We make studying abroad simple, affordable, and achievable.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={() => window.location.href = '/portal/sign-up'}
                                className="hidden md:inline-flex group relative items-center justify-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-full font-semibold text-base overflow-hidden hover:bg-brand-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                            >
                                <span className="relative z-10">Start Your Study</span>
                                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                    <div className="relative h-[300px] md:h-[500px] lg:h-[600px] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="absolute inset-4 overflow-hidden shadow-xl"
                            style={{
                                clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)',
                                borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                            }}>
                            <Image src="/hero.jpg" alt="Student" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
*/

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
                    setTimeout(() => setIsDeleting(true), 2500);
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
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, phraseIndex]);

    return (
        <section className="bg-white pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
            <div className="w-[96%] max-w-[1440px] mx-auto">
                {/* Main Bento Hero Wrapper */}
                <div className="relative w-full">
                    
                    {/* Inner rounded clip container for background visuals */}
                    <div className="absolute inset-0 rounded-[24px] lg:rounded-[40px] overflow-hidden bg-slate-900 shadow-2xl">
                        {/* Background Image Container */}
                        <div className="absolute inset-0 w-full h-full lg:left-1/4 lg:w-3/4">
                            <Image
                                src="/hero-graduates.jpg"
                                alt="Graduates celebrating success abroad"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>

                        {/* Gradient Overlay for Text Readability - Solid dark left fading out toward the right */}
                        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/95 to-transparent z-0" />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 lg:from-transparent to-transparent z-0 hidden sm:block" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-12 lg:p-24 max-w-4xl text-white w-full min-h-[500px] md:min-h-[600px] lg:h-[680px] flex flex-col justify-center">
                        {/* Pre-headline / Breadcrumb styling */}
                        <div className="inline-block self-start px-4 py-1.5 bg-brand-500/20 text-brand-100 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand-400/30">
                            EduPlan360
                        </div>

                        {/* Main Headline with Typewriter Effect */}
                        <h1 className="mb-6 min-h-[140px] md:min-h-[160px] lg:min-h-[180px] font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
                            {displayText}
                            <span className="inline-block w-1.5 h-10 md:h-12 lg:h-14 bg-brand-500 ml-2 animate-pulse align-middle"></span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-slate-200 leading-relaxed max-w-2xl mb-10 text-base md:text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Expert guidance from university selection to visa approval.
                            We make studying abroad simple, affordable, and achievable.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <button
                                onClick={() => window.location.href = '/portal/sign-up'}
                                className="group inline-flex items-center justify-center gap-2 bg-brand-500 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25 active:scale-[0.98]"
                            >
                                Start Your Study
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => {
                                    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
                                    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
                                }}
                                className="group inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all backdrop-blur-md active:scale-[0.98]"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Chat on WhatsApp
                            </button>
                        </div>
                    </div>

                    {/* Trust Card Floating Over the Bottom Right Corner - Cutout Effect */}
                    <div className="hidden lg:flex absolute -bottom-8 -right-8 xl:-bottom-10 xl:-right-10 bg-[#5A45FF] rounded-[32px] border-[14px] xl:border-[18px] border-white p-6 lg:p-8 items-center gap-5 shadow-none z-20 w-[420px]">
                        <div className="flex -space-x-3">
                            <div className="w-12 h-12 rounded-full border-2 border-brand-600 bg-slate-800 flex items-center justify-center relative overflow-hidden">
                                <User className="w-6 h-6 text-brand-200" />
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-brand-600 bg-slate-700 flex items-center justify-center relative overflow-hidden">
                                <User className="w-6 h-6 text-brand-200" />
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-brand-600 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                                <User className="w-6 h-6 text-brand-200" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-white text-lg">Trusted by 1.2k+ students</div>
                            <div className="flex gap-1 text-yellow-400 text-xs mt-1 font-semibold tracking-wider">
                                ★★★★★ <span className="text-brand-100/90 ml-1.5 font-medium">4.9/5 Rating</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Metrics aligned cleanly below the bento box */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-12 md:mt-20 max-w-5xl mx-auto px-4 lg:px-0">
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start group cursor-default">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 transition-transform group-hover:-translate-y-1">95%</div>
                        <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest leading-relaxed">Visa Success<br/>Rate</div>
                    </div>
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start group cursor-default">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 transition-transform group-hover:-translate-y-1">1,200+</div>
                        <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest leading-relaxed">Students<br/>Served</div>
                    </div>
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start group cursor-default">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 transition-transform group-hover:-translate-y-1">25+</div>
                        <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest leading-relaxed">Global<br/>Destinations</div>
                    </div>
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start group cursor-default">
                        <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 transition-transform group-hover:-translate-y-1">50+</div>
                        <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest leading-relaxed">University<br/>Partners</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
