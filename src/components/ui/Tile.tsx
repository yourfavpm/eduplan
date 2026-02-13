"use client";

import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TileProps {
    href?: string;
    icon?: ReactNode;
    title: string;
    description: string;
    cta?: string;
    variant?: 'A' | 'B' | 'C' | 'D';
    onClick?: () => void;
    backgroundImage?: string;
}

export function Tile({
    href,
    icon,
    title,
    description,
    cta = "Learn more →",
    variant = 'A',
    onClick,
    backgroundImage
}: TileProps) {
    const variants = {
        A: 'rounded-eduTileA',
        B: 'rounded-eduTileB',
        C: 'rounded-eduTileC',
        D: 'rounded-eduTileD'
    };

    const content = (
        <div className="relative z-10">
            {icon && (
                <div className={cn(
                    "transition-calm mb-3",
                    backgroundImage ? "text-white group-hover:text-accent-200" : "text-muted group-hover:text-brand-700"
                )}>
                    {icon}
                </div>
            )}
            <h3 className={cn(
                "text-xl font-semibold mb-2 transition-calm",
                backgroundImage ? "text-white group-hover:text-accent-200" : "text-ink group-hover:text-brand-700"
            )}>
                {title}
            </h3>
            <p className={cn(
                "text-sm leading-relaxed mb-4 transition-calm",
                backgroundImage ? "text-white/80" : "text-muted"
            )}>
                {description}
            </p>
            {cta && (
                <span className={cn(
                    "text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200",
                    backgroundImage ? "text-accent-200" : "text-brand-700"
                )}>
                    {cta}
                </span>
            )}
        </div>
    );

    const className = cn(
        "group relative block p-8 border border-border bg-white transition-all duration-500 overflow-hidden",
        "hover:border-brand-200 hover:-translate-y-1 shadow-sm hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        variants[variant]
    );

    const containerStyle = backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};

    return (
        <div
            className={className}
            style={containerStyle}
            onClick={onClick}
            role={onClick || href ? "button" : undefined}
        >
            {backgroundImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20 group-hover:via-ink/50 transition-all duration-500" />
            )}
            {href ? (
                <Link href={href}>
                    {content}
                </Link>
            ) : content}
        </div>
    );
}

// Removing previous logic for simplicity as Tile now handles both Link and Button internally
/*
    if (href) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        );
    }

    return (
        <div className={className} onClick={onClick} role={onClick ? "button" : undefined}>
            {content}
        </div>
    );
*/
