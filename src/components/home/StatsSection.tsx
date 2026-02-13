"use client";

import { useState, useEffect, useRef } from 'react';

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
        <div ref={counterRef}>
            {count.toLocaleString()}{suffix}
        </div>
    );
}

export function StatsSection() {
    const stats = [
        {
            number: 10000,
            suffix: '+',
            label: "Students Helped"
        },
        {
            number: 50,
            suffix: '+',
            label: "Partner Countries"
        },
        {
            number: 300,
            suffix: '+',
            label: "University Partners"
        },
        {
            number: 98,
            suffix: '%',
            label: "Visa Success Rate"
        }
    ];

    return (
        <section className="py-16 md:py-20 bg-brand-50/30">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Headline */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                            <span className="text-ink">Trusted by</span>
                            <br />
                            <span className="text-brand-700">students worldwide</span>
                        </h2>
                    </div>

                    {/* Right Side: Stats Grid */}
                    <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="space-y-1"
                            >
                                <div className="text-4xl md:text-5xl font-semibold text-ink">
                                    <Counter end={stat.number} suffix={stat.suffix} />
                                </div>
                                <div className="text-muted text-sm font-normal uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
