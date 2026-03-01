"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Data Types & Mock Data
 */

export type NewsPost = {
  id: string;
  title: string;
  excerpt: string;
  category: "Visa Updates" | "Scholarships" | "University News" | "Admissions Tips" | "IELTS/Tests" | "Guides";
  date: string;
  imageUrl: string;
  slug: string;
  readTime: string;
  featured?: boolean;
};

const NEWS_DATA: NewsPost[] = [
  {
    id: "1",
    title: "UK Student Visa: New Maintenance Requirements for 2024",
    excerpt: "The UK Home Office has announced updated financial requirements for international students starting programs this winter.",
    category: "Visa Updates",
    date: "March 12, 2024",
    imageUrl: "/images/news/visa-uk.jpg",
    slug: "uk-student-visa-updates-2024",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Top 5 Fully Funded Scholarships for Nigerian Students",
    excerpt: "A curated list of master's and PhD scholarships that cover tuition, travel, and living expenses.",
    category: "Scholarships",
    date: "March 10, 2024",
    imageUrl: "/images/news/scholarships.jpg",
    slug: "top-scholarships-nigeria-2024",
    readTime: "6 min read",
  },
  {
    id: "3",
    title: "Canada to Cap International Study Permits: What You Need to Know",
    excerpt: "IRCC has introduced a temporary cap on study permits. We break down the provincial attestation process.",
    category: "Visa Updates",
    date: "March 08, 2024",
    imageUrl: "/images/news/canada-visa.jpg",
    slug: "canada-study-permit-cap-explained",
    readTime: "5 min read",
  },
  {
    id: "4",
    title: "IELTS vs. TOEFL: Which Test is Right for Your University Application?",
    excerpt: "Comparing format, scoring, and acceptance rates at top universities in the US and UK.",
    category: "IELTS/Tests",
    date: "March 05, 2024",
    imageUrl: "/images/news/ielts-guide.jpg",
    slug: "ielts-vs-toefl-comparison",
    readTime: "3 min read",
  },
  {
    id: "5",
    title: "University of Toronto Announces New Early Admission Deadlines",
    excerpt: "International candidates for the 2025 intake can now benefit from an earlier decision window.",
    category: "University News",
    date: "March 02, 2024",
    imageUrl: "/images/news/utoronto.jpg",
    slug: "u-of-t-admission-updates",
    readTime: "2 min read",
  },
  {
    id: "6",
    title: "How to Write a Winning Statement of Purpose for US Colleges",
    excerpt: "Expert tips on storytelling and structure that helped our students get into Harvard and Stanford.",
    category: "Admissions Tips",
    date: "Feb 28, 2024",
    imageUrl: "/images/news/sop-tips.jpg",
    slug: "winning-sop-guide",
    readTime: "8 min read",
  },
];

const CATEGORIES = ["All", "Visa Updates", "Scholarships", "Admissions Tips", "Guides"];

/**
 * Sub-Components
 */

const FeaturedNewsCard = ({ post }: { post: NewsPost }) => (
  <Link href={`/news/${post.slug}`} className="group block relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm transition-all hover:border-white/20">
    <div className="aspect-16/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-slate-800 animate-pulse group-hover:bg-slate-700 transition-colors" />
      <motion.div 
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full h-full"
      >
        <Image 
          src={post.imageUrl} 
          alt={post.title} 
          fill 
          className="object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
          onLoadingComplete={(img) => img.classList.remove("opacity-0")}
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#130057]/90 via-[#130057]/20 to-transparent" />
      </motion.div>
      
      <div className="absolute top-6 left-6 z-20">
        <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors line-clamp-2 leading-tight">
        {post.title}
      </h3>
      <p className="text-slate-300 mb-6 line-clamp-2 leading-relaxed">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-slate-400 text-sm">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
        </div>
        <span className="text-brand-400 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          Read article <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  </Link>
);

const NewsStreamItem = ({ post }: { post: NewsPost }) => (
  <Link 
    href={`/news/${post.slug}`} 
    className="group flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
  >
    <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-slate-800">
      <Image 
        src={post.imageUrl} 
        alt={post.title} 
        fill 
        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity" 
        onLoadingComplete={(img) => img.classList.remove("opacity-0")}
        unoptimized
      />
      <div className="absolute inset-0 bg-brand-500/5 group-hover:bg-brand-500/0 transition-colors" />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1">
        {post.category}
      </span>
      <h4 className="text-white font-bold leading-snug mb-2 line-clamp-2 group-hover:text-brand-300 transition-colors">
        {post.title}
      </h4>
      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
      </div>
    </div>
  </Link>
);

/**
 * Main Section Component
 */

export function HigherEdNewsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = NEWS_DATA.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  const featured = filteredNews.find(p => p.featured) || filteredNews[0];
  const stream = filteredNews.filter(p => p.id !== featured?.id).slice(0, 5);

  return (
    <section className="py-24 md:py-32 bg-[#130057] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 bg-brand-500/20 text-brand-300 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-500/30">
              Higher Education News
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
              Updates That Keep You Ahead
            </h2>
            <p className="text-slate-400 max-w-lg">
              Visa changes, scholarship openings, and admissions insights — all in one place.
            </p>
          </div>
          <Link 
            href="/news" 
            className="group flex items-center gap-2 text-brand-400 font-bold hover:text-brand-300 transition-colors"
          >
            View all news
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border",
                activeCategory === cat 
                  ? "bg-brand-500 text-white border-brand-500 shadow-lg shadow-brand-500/20" 
                  : "bg-white/5 text-slate-300 border-white/10 hover:border-brand-500/50 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Featured - Left */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {featured && (
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <FeaturedNewsCard post={featured} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stream - Right */}
          <div className="lg:col-span-1 border-l border-white/5 lg:pl-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Latest Updates</h3>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {stream.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <NewsStreamItem post={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {stream.length === 0 && (
              <div className="py-12 text-center text-slate-500 italic text-sm">
                No articles in this category yet.
              </div>
            )}
            
            {/* Newsletter Mini-Card */}
            <div className="mt-8 p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group shadow-sm">
              <div className="relative z-10">
                <h4 className="text-white font-bold mb-2">Join the inner circle</h4>
                <p className="text-xs text-slate-400 mb-4">Get the latest education updates directly in your inbox.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-brand-500 outline-none placeholder:text-slate-500"
                  />
                  <button className="bg-brand-500 text-white p-2 rounded-xl hover:bg-brand-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-brand-500/20 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
