"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Share2, 
  Download, 
  Bookmark, 
  MessageCircle, 
  ChevronRight,
  HelpCircle,
  Lightbulb,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

/* ================================================================
   TYPES
   ================================================================ */
export interface TOCLink {
  id: string;
  label: string;
}

export interface QuickFact {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface RelatedLink {
  href: string;
  label: string;
}

interface LayoutProps {
  title: string;
  description?: string;
  tocLinks: TOCLink[];
  quickFacts: QuickFact[];
  relatedLinks: RelatedLink[];
  children: React.ReactNode;
}

/* ================================================================
   OVERALL LAYOUT COMPONENT
   ================================================================ */
export function ResourceDashboardLayout({
  title,
  description,
  tocLinks,
  quickFacts,
  relatedLinks,
  children,
}: LayoutProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Simple active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = tocLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200; // Offset for stickiness

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocLinks]);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* 1. TOP UTILITY BAR */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="max-w-3xl">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{description}</p>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Save Resource">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Share Resource">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors" title="Download Offline">
                <Download className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center bg-brand-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm active:scale-95"
              >
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3-COLUMN GRID STRUCTURE */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_320px] gap-8 items-start">
          
          {/* 2. LEFT SIDEBAR (TOC) */}
          <aside className="hidden lg:block sticky top-[100px]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-3">
              On this page
            </h3>
            <nav className="flex flex-col gap-1 pr-6 border-r border-slate-200/60 pb-8">
              {tocLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-sm py-2 px-3 rounded-lg transition-all ${
                    activeId === link.id
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* 3. MAIN CONTENT AREA */}
          <main className="min-w-0 pb-20">
            {children}

            {/* Bottom Section Continuation Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 bg-white border border-brand-100 rounded-2xl p-8 md:p-12 shadow-xl shadow-brand-900/5 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-50 via-white to-accent-50/20" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Start your study abroad journey</h3>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                  Our admissions experts are ready to review your profile and build a personalized application strategy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/portal/sign-up" className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md hover:bg-brand-700 transition-colors">
                    Start Application
                  </Link>
                  <Link href="/book-consultation" className="bg-white border border-slate-200 text-brand-700 px-8 py-3.5 rounded-xl font-bold text-sm shadow-sm hover:bg-brand-50 hover:border-brand-300 transition-colors">
                    Book Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </main>

          {/* 4. RIGHT SIDEBAR (Sticky Utilities) */}
          <aside className="sticky top-[100px] flex flex-col gap-6 w-full max-w-sm mx-auto xl:max-w-none">
            
            {/* Primary CTA Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h4 className="font-bold text-slate-900 text-lg mb-2">Ready to Apply?</h4>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                Connect with our advisors to secure your university spot.
              </p>
              <Link href="/book-consultation" className="flex items-center justify-center gap-2 w-full bg-brand-600 text-white py-3 rounded-xl text-sm font-bold shadow-xs hover:bg-brand-700 transition-colors">
                Book Consultation <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Summary Card */}
            {quickFacts.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-4 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent-500" /> Quick Facts
                </h4>
                <div className="flex flex-col gap-4">
                  {quickFacts.map((fact, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      {fact.icon && <div className="text-brand-500 shrink-0 mt-0.5">{fact.icon}</div>}
                      <div>
                        <div className="text-xs text-slate-500 font-medium">{fact.label}</div>
                        <div className="text-sm text-slate-900 font-bold mt-0.5">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Resources */}
            {relatedLinks.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-4">
                  Related Guides
                </h4>
                <div className="flex flex-col gap-3">
                  {relatedLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="group flex flex-col text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Help / Support Box */}
            <div className="bg-brand-50 rounded-2xl border border-brand-100 p-6 shadow-xs text-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs border border-brand-100/50">
                <MessageCircle className="w-5 h-5 text-brand-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Need help?</h4>
              <p className="text-xs text-slate-600 mb-4">Have questions about your timeline?</p>
              <button 
                onClick={() => {
                  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
                  window.open(`https://wa.me/${num}`, '_blank');
                }}
                className="w-full bg-white border border-brand-200 text-brand-700 py-2.5 rounded-lg text-sm font-bold shadow-xs hover:border-brand-400 hover:bg-brand-50 transition-colors"
               >
                Chat on WhatsApp
              </button>
            </div>
            
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   DASHBOARD SECTION (Modular Content Wrapper)
   ================================================================ */
export function DashboardSection({
  id,
  title,
  description,
  children
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[140px] mb-12 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-xs">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug break-words">
          {title}
        </h2>
        {description && (
          <p className="text-slate-500 mt-2 text-base leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
      <div>
        {children}
      </div>
    </section>
  );
}
