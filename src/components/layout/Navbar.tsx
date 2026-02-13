"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStudyAbroadOpen, setIsStudyAbroadOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/destinations", label: "Explore Destinations" },
        { href: "/study-abroad", label: "Study Abroad", hasMegaMenu: true },
        { href: "/programs", label: "Programs" },
        { href: "/scholarships", label: "Scholarships" },
        { href: "/services", label: "Services" },
    ];

    return (
        <nav className="border-b border-border bg-white sticky top-[42px] z-40 shadow-softer">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center hover:opacity-80 transition-calm">
                        <Image
                            src="/eduplan.png"
                            alt="EduPlan360"
                            width={180}
                            height={50}
                            priority
                            className="h-10 w-auto md:h-12"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <div key={link.href} className="relative group">
                                {link.hasMegaMenu ? (
                                    <button
                                        className="flex items-center gap-1 text-ink hover:text-brand-700 transition-calm font-medium"
                                        onMouseEnter={() => setIsStudyAbroadOpen(true)}
                                        onMouseLeave={() => setIsStudyAbroadOpen(false)}
                                    >
                                        {link.label}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`text-ink hover:text-brand-700 transition-calm font-medium ${pathname === link.href ? "text-brand-700" : ""
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        <Link
                            href="/book-consultation"
                            className="bg-brand-700 text-white px-6 py-2.5 rounded-lg hover:bg-brand-800 transition-calm active:scale-[0.98] font-medium"
                        >
                            Start Your Study
                        </Link>

                        <Link
                            href="/login"
                            className="text-ink hover:text-brand-700 transition-calm font-medium"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-ink hover:text-brand-700 transition-calm"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-ink hover:text-brand-700 transition-calm font-medium py-2 ${pathname === link.href ? "text-brand-700" : ""
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/book-consultation"
                                className="bg-brand-700 text-white px-6 py-3 rounded-lg hover:bg-brand-800 transition-calm text-center font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Start Your Study
                            </Link>
                            <Link
                                href="/login"
                                className="text-ink hover:text-brand-700 transition-calm font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
