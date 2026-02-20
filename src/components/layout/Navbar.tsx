"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

    const navLinks = [
        { href: "/", label: "Home" },

        {
            href: "/about",
            label: "About",
            children: [
                { href: "/about", label: "Who We Are" },
                { href: "/why-choose-us", label: "Why You Should Choose Us" }
            ]
        },
        {
            href: "/destinations",
            label: "Explore Destinations",
            isGrid: true,
            children: [
                { href: "/destinations/usa", label: "USA 🇺🇸" },
                { href: "/destinations/uk", label: "UK 🇬🇧" },
                { href: "/destinations/canada", label: "Canada 🇨🇦" },
                { href: "/destinations/australia", label: "Australia 🇦🇺" },
                { href: "/destinations/poland", label: "Poland 🇵🇱" },
                { href: "/destinations/hungary", label: "Hungary 🇭🇺" },
                { href: "/destinations/germany", label: "Germany 🇩🇪" },
                { href: "/destinations/ireland", label: "Ireland 🇮🇪" },
                { href: "/destinations/spain", label: "Spain 🇪🇸" },
                { href: "/destinations/dubai", label: "Dubai 🇦🇪" },
                { href: "/destinations/new-zealand", label: "New Zealand 🇳🇿" },
                { href: "/destinations/japan", label: "Japan 🇯🇵" },
                { href: "/destinations/south-korea", label: "South Korea 🇰🇷" },
                { href: "/destinations/france", label: "France 🇫🇷" },
                { href: "/destinations/finland", label: "Finland 🇫🇮" },
                { href: "/destinations/malta", label: "Malta 🇲🇹" },
                { href: "/destinations/greece", label: "Greece 🇬🇷" },
                { href: "/destinations/netherlands", label: "Netherlands 🇳🇱" },
                { href: "/destinations/turkey", label: "Turkey 🇹🇷" },
            ]
        },
        {
            href: "/study-abroad",
            label: "Resources",
            hasMegaMenu: true,
            isGrid: true,
            children: [
                { href: "/study-abroad/why", label: "Why Study Abroad" },
                { href: "/study-abroad/process", label: "The Study Abroad Process" },
                { href: "/study-abroad/requirements", label: "Document Requirement" },
                { href: "/study-abroad/interviews", label: "Preparing for Interviews" },
                { href: "/study-abroad/personal-statement", label: "Personal Statement Guideline" },
                { href: "/study-abroad/choosing-course", label: "Choosing a Course" },
                { href: "/study-abroad/choosing-university", label: "Choosing a University" },
                { href: "/study-abroad/apply", label: "Apply to Study" }
            ]
        },
        { href: "/programs", label: "Programs" },
        { href: "/scholarships", label: "Scholarships" },
        {
            href: "/english-test",
            label: "English Test",
            mobileOnly: true,
            children: [
                { name: "About PeopleCert", href: "/english-test/about", label: "About PeopleCert" },
                { name: "Book Your Test", href: "/english-test/book", label: "Book Your Test" },
                { name: "Result Guidance", href: "/english-test/results", label: "Result Guidance" },
                { name: "Download Materials", href: "/english-test/materials", label: "Download Materials" },
            ]
        },
    ];

    return (
        <nav className="bg-brand-700 shadow-md">
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
                            className="h-10 w-auto md:h-12 brightness-0 invert"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.filter(link => !link.mobileOnly).map((link) => (
                            <div key={link.href} className="relative group">
                                {link.children ? (
                                    <>
                                        <button className="flex items-center gap-1 text-white/90 hover:text-white transition-calm text-[10px] font-bold uppercase tracking-wide py-2">
                                            {link.label}
                                            <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                                        </button>
                                        <div className={`absolute top-full left-0 bg-white shadow-xl rounded-xl border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50 overflow-hidden ${link.isGrid ? 'w-[600px] p-4' : 'w-64'}`}>
                                            <div className={`${link.isGrid ? 'grid grid-cols-3 gap-2' : 'py-2'}`}>
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className={`block text-sm text-ink hover:text-brand-700 hover:bg-brand-50 transition-colors ${link.isGrid ? 'p-2 rounded-lg' : 'px-4 py-2.5'}`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`text-white/90 hover:text-white transition-calm text-[10px] font-bold uppercase tracking-wide ${pathname === link.href ? "text-white underline underline-offset-4" : ""
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        <Link
                            href="/portal/sign-up"
                            className="bg-white text-brand-700 px-6 py-2.5 rounded-lg hover:bg-brand-50 transition-calm active:scale-[0.98] font-semibold text-sm"
                        >
                            Start Your Study
                        </Link>

                        <Link
                            href="/portal/sign-in"
                            className="text-white/90 hover:text-white transition-calm text-[10px] font-bold uppercase tracking-wide"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-white hover:text-white/80 transition-calm"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Drawer Portal */}
                {typeof document !== 'undefined' && createPortal(
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <>
                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="fixed inset-0 bg-black/50 z-60 lg:hidden backdrop-blur-sm"
                                />

                                {/* Drawer */}
                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed right-0 top-0 bottom-0 w-[280px] bg-white z-60 lg:hidden shadow-2xl flex flex-col"
                                >
                                    <div className="p-4 border-b border-border flex items-center justify-between">
                                        <span className="font-semibold text-lg text-ink">Menu</span>
                                        <button
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="p-2 text-muted hover:text-ink hover:bg-surface rounded-full transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
                                        {navLinks.map((link) => (
                                            <div key={link.href}>
                                                {link.children ? (
                                                    <div className="flex flex-col">
                                                        <button
                                                            onClick={() => setExpandedMobileItem(expandedMobileItem === link.label ? null : link.label)}
                                                            className={`text-ink hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors font-medium py-2.5 px-4 text-sm flex items-center justify-between w-full ${expandedMobileItem === link.label ? "text-brand-700 bg-brand-50" : ""}`}
                                                        >
                                                            {link.label}
                                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileItem === link.label ? "rotate-180" : ""}`} />
                                                        </button>
                                                        <AnimatePresence>
                                                            {expandedMobileItem === link.label && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden pl-4"
                                                                >
                                                                    <div className="flex flex-col">
                                                                        {link.children.map((child) => (
                                                                            <Link
                                                                                key={child.href}
                                                                                href={child.href}
                                                                                className="block text-muted hover:text-brand-700 rounded-lg transition-colors text-sm py-2 px-4"
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                            >
                                                                                {child.label}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        className={`block text-ink hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors font-medium py-2.5 px-4 text-sm ${pathname === link.href ? "text-brand-700 bg-brand-50" : ""}`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t border-border mt-auto">
                                        <Link
                                            href="/portal/sign-in"
                                            className="block bg-brand-700 text-white hover:bg-brand-800 rounded-lg transition-colors font-medium py-3 px-4 text-sm text-center shadow-sm"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </div>
        </nav>
    );
}
