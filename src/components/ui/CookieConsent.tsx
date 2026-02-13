"use client";

import { useEffect, useState } from "react";
import { X, Cookie } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "false");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 md:max-w-md bg-white rounded-2xl shadow-2xl border border-border p-6 flex flex-col gap-4"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                                <Cookie className="w-5 h-5 text-brand-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-ink text-sm mb-1">We value your privacy</h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-muted hover:text-ink transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 md:justify-end">
                        <button
                            onClick={handleDecline}
                            className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-border text-sm font-medium text-ink hover:bg-neutral-50 transition-colors"
                        >
                            Decline
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-brand-600 text-sm font-medium text-white hover:bg-brand-700 transition-colors shadow-sm"
                        >
                            Accept Cookies
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
