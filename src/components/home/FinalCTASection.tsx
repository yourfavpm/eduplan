"use client";

import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';

export function FinalCTASection() {
    return (
        <section className="py-16 md:py-20 bg-surface">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Flat Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left: Content */}
                        <div className="flex flex-col justify-center">
                            <h2 className="font-semibold text-ink mb-6">
                                Let's Build Your Study Abroad Plan
                            </h2>

                            <p className="text-muted leading-relaxed mb-10">
                                Create an account to access your student portal, submit documents, and follow your application progress.
                            </p>

                            {/* CTA */}
                            <div>
                                <button
                                    onClick={() => window.location.href = '/signup'}
                                    className="group inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-800 transition-colors active:scale-[0.98]"
                                >
                                    <span>Create Student Account</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Image with Organic Shape */}
                        <div className="relative h-[300px] lg:h-[500px]">
                            {/* Organic Blob Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-accent-100"
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
                                    src="/prefooter.jpg"
                                    alt="Study abroad consultation"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-700/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
