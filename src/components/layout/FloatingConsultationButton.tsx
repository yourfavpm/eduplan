"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function FloatingConsultationButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 100px
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed bottom-6 w-full flex justify-center z-40 pointer-events-none px-4 lg:hidden"
                >
                    <Link
                        href="/book-consultation"
                        className="pointer-events-auto bg-brand-700/90 backdrop-blur-sm text-white px-6 py-3 rounded-full shadow-lg shadow-brand-700/20 flex items-center gap-2 hover:bg-brand-800 transition-all hover:scale-105 active:scale-95 font-medium border border-white/10"
                    >
                        <span>Book Consultation</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
