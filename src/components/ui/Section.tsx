"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    children: ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    background?: 'white' | 'surface';
}

export function Section({
    children,
    className,
    padding = 'md',
    background = 'white'
}: SectionProps) {
    const paddings = {
        sm: 'py-16',
        md: 'py-20 md:py-24',
        lg: 'py-24 md:py-28'
    };

    const backgrounds = {
        white: 'bg-white',
        surface: 'bg-surface'
    };

    return (
        <section className={cn(paddings[padding], backgrounds[background], className)}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
}
