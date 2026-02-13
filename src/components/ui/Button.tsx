"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-calm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-brand-700 text-white hover:bg-brand-800 active:scale-[0.98]",
            secondary: "bg-white text-brand-700 border-2 border-border hover:bg-brand-50 hover:border-brand-200 active:scale-[0.98]",
            tertiary: "text-brand-700 underline-offset-4 hover:underline"
        };

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
