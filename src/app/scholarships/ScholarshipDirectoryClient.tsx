"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  X,
  Loader2,
  CheckCircle,
  ChevronDown,
  SlidersHorizontal,
  Trash2,
  Clock,
} from "lucide-react";

/* ================================================================
   TYPES
   ================================================================ */
type Scholarship = {
  id: string;
  title: string;
  country: string | null;
  level: string | null;
  type: string | null;
  deadline: string | null;
  description: string | null;
  eligibility: string | null;
  featured: boolean;
};

type InquiryForm = {
  full_name: string;
  email: string;
  phone: string;
  highest_qualification: string;
  gender: string;
  country_of_birth: string;
  city_of_residence: string;
};

const EMPTY_INQUIRY: InquiryForm = {
  full_name: "",
  email: "",
  phone: "",
  highest_qualification: "",
  gender: "",
  country_of_birth: "",
  city_of_residence: "",
};

const LEVEL_FILTERS = ["Undergraduate", "Master's", "PhD"];
const TYPE_FILTERS = [
  { value: "full", label: "Full Scholarship" },
  { value: "partial", label: "Partial Scholarship" },
  { value: "tuition_discount", label: "Tuition Discount" },
];

function typeLabel(t: string | null) {
  const labels: Record<string, string> = {
    full: "Full Scholarship",
    partial: "Partial Scholarship",
    tuition_discount: "Tuition Discount",
  };
  return labels[t ?? ""] ?? t ?? "—";
}

function formatDeadline(d: string | null) {
  if (!d) return null;
  try {
    const date = new Date(d);
    // Add logic to check if closing soon
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const isClosingSoon = diffDays > 0 && diffDays <= 14;

    return {
      text: date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      isClosingSoon,
    };
  } catch {
    return { text: d, isClosingSoon: false };
  }
}

/* ================================================================
   SKELETON CARDS
   ================================================================ */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
      <div className="h-5 bg-slate-100 rounded-lg w-3/4 mb-4" />
      <div className="flex gap-2 mb-5">
        <div className="h-6 bg-slate-50 rounded-lg w-20" />
        <div className="h-6 bg-slate-50 rounded-lg w-24" />
        <div className="h-6 bg-slate-50 rounded-lg w-24" />
      </div>
      <div className="h-10 bg-slate-50 rounded-lg w-full mb-4" />
      <div className="h-9 bg-slate-100 rounded-xl w-full" />
    </div>
  );
}

/* ================================================================
   DIRECTORY HEADER
   ================================================================ */
function DirectoryHeader({
  search,
  setSearch,
  resultCount,
  loading,
  onToggleMobileFilters,
}: {
  search: string;
  setSearch: (v: string) => void;
  resultCount: number;
  loading: boolean;
  onToggleMobileFilters: () => void;
}) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Scholarship Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Find scholarships by country, study level, and funding type
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile filter toggle */}
            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-300 transition-colors"
              />
            </div>
          </div>
        </div>
        {/* Result count */}
        <div className="mt-4 text-sm text-slate-500">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching...
            </span>
          ) : (
            <span>
              Showing{" "}
              <strong className="text-slate-900 font-semibold">{resultCount}</strong>{" "}
              scholarship{resultCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FILTER SIDEBAR
   ================================================================ */
function FilterSidebar({
  country,
  setCountry,
  level,
  setLevel,
  type,
  setType,
  countries,
  onClearAll,
  mobileOpen,
  onCloseMobile,
}: {
  country: string;
  setCountry: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  countries: string[];
  onClearAll: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const hasFilters = country || level || type;

  const content = (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Filters
        </h3>
        {hasFilters && (
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Country */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Country
        </label>
        <div className="relative">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="appearance-none w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-300 transition-colors"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Scholarship Level */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Study Level
        </label>
        <div className="flex flex-col gap-1.5">
          {LEVEL_FILTERS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(level === l ? "" : l)}
              className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                level === l
                  ? "bg-brand-50 text-brand-700 border border-brand-200"
                  : "text-slate-600 hover:bg-slate-50 border border-transparent"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Scholarship Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Scholarship Type
        </label>
        <div className="flex flex-col gap-1.5">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(type === t.value ? "" : t.value)}
              className={`text-left px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                type === t.value
                  ? "bg-brand-50 text-brand-700 border border-brand-200"
                  : "text-slate-600 hover:bg-slate-50 border border-transparent"
              }`}
            >
              <span>{t.label}</span>
              {type === t.value && <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block sticky top-8 self-start w-[260px] shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          {content}
        </div>
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={onCloseMobile}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[300px] bg-white z-50 overflow-y-auto shadow-2xl p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Filters</h3>
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================
   SCHOLARSHIP CARD
   ================================================================ */
function ScholarshipCard({
  item,
  onInquire,
}: {
  item: Scholarship;
  onInquire: (s: Scholarship) => void;
}) {
  const deadlineInfo = formatDeadline(item.deadline);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-5 pb-4 flex-1">
        {/* Top: Badges */}
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {item.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100">
              <Award className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {deadlineInfo?.isClosingSoon && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
              <Clock className="w-2.5 h-2.5" /> Closing Soon
            </span>
          )}
        </div>

        {/* Top: Title */}
        <h3 className="font-bold text-slate-900 text-[16px] leading-snug mb-3 group-hover:text-brand-700 transition-colors">
          {item.title}
        </h3>

        {/* Middle: Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.country && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <MapPin className="w-3 h-3 text-slate-400" /> {item.country}
            </span>
          )}
          {item.level && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <GraduationCap className="w-3 h-3 text-slate-400" /> {item.level}
            </span>
          )}
          {item.type && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <Award className="w-3 h-3 text-slate-400" /> {typeLabel(item.type)}
            </span>
          )}
          {deadlineInfo?.text && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
              <Calendar className="w-3 h-3 text-slate-400" /> {deadlineInfo.text}
            </span>
          )}
        </div>

        {/* Eligibility Text */}
        {item.eligibility && (
          <div className="p-3 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              <strong className="text-slate-800 font-semibold mr-1">Eligibility:</strong>
              {item.eligibility}
            </p>
          </div>
        )}
      </div>

      <div className="p-5 pt-0 mt-auto shrink-0">
        <button
          onClick={() => onInquire(item)}
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-brand-600 transition-colors active:scale-[0.98]"
        >
          Request Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ================================================================
   INQUIRY MODAL (Single Step)
   ================================================================ */
function InquiryModal({
  scholarship,
  onClose,
}: {
  scholarship: Scholarship;
  onClose: () => void;
}) {
  const [form, setForm] = useState<InquiryForm>({ ...EMPTY_INQUIRY });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function update(key: keyof InquiryForm, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.full_name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/scholarships/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scholarship_id: scholarship.id,
          scholarship_title: scholarship.title,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-300 bg-slate-50 focus:bg-white transition-colors";
  const labelClasses = "block text-xs font-semibold text-slate-700 mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-brand-600 mb-1.5">
                <Award className="w-3 h-3" /> Scholarship Details
              </div>
              <h3 className="font-bold text-slate-900 text-lg leading-snug">
                {scholarship.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors ml-4 shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-100"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Request Received!
              </h4>
              <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                Our counsellors will review the requirements and contact you shortly with the next steps.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-brand-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.full_name}
                      onChange={(e) => update("full_name", e.target.value)}
                      className={inputClasses}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={inputClasses}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClasses}
                    placeholder="+234 800 000 0000"
                  />
                </div>

                {/* Profile Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Highest Qualification</label>
                    <select
                      value={form.highest_qualification}
                      onChange={(e) => update("highest_qualification", e.target.value)}
                      className={inputClasses}
                    >
                      <option value="">Select Level</option>
                      <option value="SSCE/WAEC">SSCE / WAEC</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor's">Bachelor&apos;s Degree</option>
                      <option value="Master's">Master&apos;s Degree</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => update("gender", e.target.value)}
                      className={inputClasses}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Country of Birth</label>
                    <input
                      type="text"
                      value={form.country_of_birth}
                      onChange={(e) => update("country_of_birth", e.target.value)}
                      className={inputClasses}
                      placeholder="e.g. Nigeria"
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>City of Residence</label>
                    <input
                      type="text"
                      value={form.city_of_residence}
                      onChange={(e) => update("city_of_residence", e.target.value)}
                      className={inputClasses}
                      placeholder="e.g. Lagos"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brand-600 text-white px-7 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-700 disabled:opacity-50 transition-colors active:scale-95 flex items-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================================================================
   EMPTY STATE
   ================================================================ */
function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="text-center py-20 px-4">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-100">
        <Search className="w-7 h-7 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">No scholarships found</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        Try adjusting your filters or search query. New scholarship opportunities are added regularly.
      </p>
      <button
        onClick={onClearFilters}
        className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export function ScholarshipDirectoryClient() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [inquiring, setInquiring] = useState<Scholarship | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchScholarships = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (country) params.set("country", country);
    if (level) params.set("level", level);
    if (type) params.set("type", type);

    try {
      const res = await fetch(`/api/scholarships?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setScholarships(data);
      }
    } catch {
      console.error("Failed to fetch scholarships");
    } finally {
      setLoading(false);
    }
  }, [search, country, level, type]);

  // Fetch unique countries on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/scholarships");
        const data = await res.json();
        if (Array.isArray(data)) {
          const uniqueCountries = [
            ...new Set(data.map((s: Scholarship) => s.country).filter(Boolean)),
          ] as string[];
          setCountries(uniqueCountries.sort());
        }
      } catch {
        /* silent */
      }
    })();
  }, []);

  // Debounced fetch
  useEffect(() => {
    const timer = setTimeout(fetchScholarships, 300);
    return () => clearTimeout(timer);
  }, [fetchScholarships]);

  function clearAllFilters() {
    setSearch("");
    setCountry("");
    setLevel("");
    setType("");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <DirectoryHeader
        search={search}
        setSearch={setSearch}
        resultCount={scholarships.length}
        loading={loading}
        onToggleMobileFilters={() => setMobileFiltersOpen(true)}
      />

      {/* MAIN 2-COLUMN LAYOUT */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* LEFT: FILTERS */}
          <FilterSidebar
            country={country}
            setCountry={setCountry}
            level={level}
            setLevel={setLevel}
            type={type}
            setType={setType}
            countries={countries}
            onClearAll={clearAllFilters}
            mobileOpen={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          {/* RIGHT: RESULTS */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : scholarships.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {scholarships.map((s) => (
                    <ScholarshipCard key={s.id} item={s} onInquire={setInquiring} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Bottom CTA Banner */}
            {!loading && scholarships.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    Need Help With Your Global Funding Plan?
                  </h3>
                  <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
                    Speak with our financial aid advisors to map out a personalized strategy based on your profile and goals.
                  </p>
                  <Link
                    href="/book-consultation"
                    className="group inline-flex items-center gap-2 bg-brand-500 text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* SINGLE REQUEST MODAL */}
      <AnimatePresence>
        {inquiring && (
          <InquiryModal scholarship={inquiring} onClose={() => setInquiring(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
