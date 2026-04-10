"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  GraduationCap,
  MapPin,
  Users,
  Trophy,
  Calendar,
  BookOpen,
  X,
  Loader2,
  CheckCircle,
  ChevronDown,
  ExternalLink,
  SlidersHorizontal,
  Trash2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Star,
} from "lucide-react";

/* ================================================================
   TYPES
   ================================================================ */
type Course = { name: string; level: string; duration: string; fees?: string };

type University = {
  id: string;
  name: string;
  slug: string;
  country: string;
  location: string | null;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  ranking: string | null;
  student_population: string | null;
  courses: Course[];
  intakes: string[];
  featured: boolean;
};

type ApplicationForm = {
  full_name: string;
  email: string;
  phone: string;
  highest_qualification: string;
  intended_level: string;
  gender: string;
  country_of_birth: string;
  city_of_residence: string;
};

const EMPTY_FORM: ApplicationForm = {
  full_name: "",
  email: "",
  phone: "",
  highest_qualification: "",
  intended_level: "",
  gender: "",
  country_of_birth: "",
  city_of_residence: "",
};

const LEVEL_FILTERS = ["Undergraduate", "Postgraduate", "PhD / Research", "Foundation"];

const FIELD_SUGGESTIONS = [
  "Engineering",
  "Business",
  "Computer Science",
  "Medicine",
  "Law",
  "Arts & Design",
  "Health Sciences",
  "Social Sciences",
];

/* ================================================================
   SKELETON CARDS
   ================================================================ */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 animate-pulse">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
          <div className="h-3 bg-slate-100 rounded-lg w-1/2" />
        </div>
      </div>
      <div className="flex gap-2 mb-5">
        <div className="h-6 bg-slate-50 rounded-lg w-20" />
        <div className="h-6 bg-slate-50 rounded-lg w-16" />
        <div className="h-6 bg-slate-50 rounded-lg w-24" />
      </div>
      <div className="h-9 bg-slate-100 rounded-xl w-28" />
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
              University Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Find universities by country, course, and study level
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
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
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
              universit{resultCount !== 1 ? "ies" : "y"}
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
  courseFilter,
  setCourseFilter,
  countries,
  onClearAll,
  mobileOpen,
  onCloseMobile,
}: {
  country: string;
  setCountry: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  courseFilter: string;
  setCourseFilter: (v: string) => void;
  countries: string[];
  onClearAll: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const hasFilters = country || level || courseFilter;

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

      {/* Study Level */}
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

      {/* Course / Field */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Course / Field
        </label>
        <input
          type="text"
          placeholder="e.g. Engineering, Business..."
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-300 transition-colors mb-2"
        />
        <div className="flex flex-wrap gap-1.5">
          {FIELD_SUGGESTIONS.slice(0, 5).map((f) => (
            <button
              key={f}
              onClick={() => setCourseFilter(f)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                courseFilter === f
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-8 self-start w-[260px] shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          {content}
        </div>
      </aside>

      {/* Mobile drawer overlay */}
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
   UNIVERSITY CARD
   ================================================================ */
function UniversityCard({
  item,
  onView,
}: {
  item: University;
  onView: (u: University) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top: Name & Country */}
      <div className="p-5 pb-0">
        <div className="flex items-start gap-4">
          {item.logo_url ? (
            <img
              src={item.logo_url}
              alt=""
              className="w-12 h-12 rounded-xl bg-slate-50 object-contain shrink-0 border border-slate-100"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-slate-50 shrink-0 flex items-center justify-center border border-slate-100">
              <GraduationCap className="w-6 h-6 text-slate-300" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">
                {item.country}
                {item.location ? `, ${item.location}` : ""}
              </span>
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 mt-3.5 flex-wrap">
          {item.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />{" "}
              Featured
            </span>
          )}
          {item.ranking && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
              <Trophy className="w-2.5 h-2.5" /> {item.ranking}
            </span>
          )}
        </div>
      </div>

      {/* Middle: Quick Facts */}
      <div className="px-5 py-4 mt-1 border-t border-slate-50 flex items-center gap-4 text-[11px] text-slate-500 font-medium">
        {item.student_population && (
          <span className="inline-flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" /> {item.student_population}
          </span>
        )}
        {Array.isArray(item.courses) && item.courses.length > 0 && (
          <span className="inline-flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-slate-400" /> {item.courses.length} Courses
          </span>
        )}
        {Array.isArray(item.intakes) && item.intakes.length > 0 && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />{" "}
            {item.intakes.slice(0, 2).join(", ")}
          </span>
        )}
      </div>

      {/* Bottom: CTA */}
      <div className="px-5 pb-5">
        <button
          onClick={() => onView(item)}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-brand-700 transition-colors active:scale-[0.98]"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

/* ================================================================
   UNIVERSITY DRAWER (Slide-in from right)
   ================================================================ */
function UniversityDrawer({
  university,
  onClose,
  onApply,
}: {
  university: University;
  onClose: () => void;
  onApply: (u: University) => void;
}) {
  const displayCourses = Array.isArray(university.courses)
    ? university.courses.slice(0, 6)
    : [];

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col"
      >
        {/* DRAWER HEADER */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-start gap-4 min-w-0">
            {university.logo_url ? (
              <img
                src={university.logo_url}
                alt=""
                className="w-14 h-14 rounded-xl bg-slate-50 object-contain border border-slate-100 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                <GraduationCap className="w-7 h-7 text-slate-300" />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                {university.name}
              </h2>
              <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {university.country}
                {university.location ? `, ${university.location}` : ""}
              </p>
              {university.website_url && (
                <a
                  href={university.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline mt-1.5 font-medium"
                >
                  Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors shrink-0 ml-3"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* About */}
          {university.description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                About
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {university.description}
              </p>
            </div>
          )}

          {/* Key Info Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Key Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {university.ranking && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <Trophy className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">{university.ranking}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-0.5">
                    Ranking
                  </p>
                </div>
              )}
              {university.student_population && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">
                    {university.student_population}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-0.5">
                    Students
                  </p>
                </div>
              )}
              {Array.isArray(university.courses) && university.courses.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <BookOpen className="w-5 h-5 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">
                    {university.courses.length}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-0.5">
                    Courses
                  </p>
                </div>
              )}
              {Array.isArray(university.intakes) && university.intakes.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                  <Calendar className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">
                    {university.intakes.join(", ")}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide font-medium mt-0.5">
                    Enrolment Cycles
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Popular Courses */}
          {displayCourses.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Popular Courses
              </h3>
              <div className="grid gap-2.5">
                {displayCourses.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 border border-slate-100 hover:border-brand-100 transition-colors"
                  >
                    <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md font-medium border border-brand-100">
                        {c.level}
                      </span>
                      {c.duration && (
                        <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100">
                          {c.duration}
                        </span>
                      )}
                      {c.fees && (
                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-md border border-green-100">
                          {c.fees}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FIXED BOTTOM CTA */}
        <div className="p-6 border-t border-slate-100 bg-white shrink-0">
          <button
            onClick={() => onApply(university)}
            className="group w-full inline-flex items-center justify-center gap-2 bg-brand-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors shadow-sm active:scale-[0.98]"
          >
            Apply with EduPlan360
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.aside>
    </>
  );
}

/* ================================================================
   MULTI-STEP APPLICATION MODAL
   ================================================================ */
const STEP_TITLES = ["Basic Info", "Personal Details", "Academic Info", "Review & Submit"];

function MultiStepApplicationModal({
  university,
  onClose,
}: {
  university: University;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>({ ...EMPTY_FORM });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function update(key: keyof ApplicationForm, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function canAdvance(): boolean {
    if (step === 1) return !!(form.full_name.trim() && form.email.trim());
    return true;
  }

  function handleNext() {
    if (!canAdvance()) {
      setError("Please fill in the required fields.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, 4));
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/universities/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          university_id: university.id,
          university_name: university.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setError(data.error || "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-300 bg-white transition-colors";

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
          {/* Modal Header */}
          <div className="flex items-start justify-between p-6 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Apply with EduPlan360</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {university.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            /* ---- SUCCESS ---- */
            <div className="p-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-100">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </motion.div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Application Submitted!
              </h4>
              <p className="text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                Our admissions team will contact you shortly to begin the process for{" "}
                <strong className="text-slate-700">{university.name}</strong>.
              </p>
              <button
                onClick={onClose}
                className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* ---- PROGRESS BAR ---- */}
              <div className="px-6 pt-5 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700">
                    Step {step} of 4
                  </span>
                  <span className="text-xs text-slate-400">{STEP_TITLES[step - 1]}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-600 rounded-full"
                    initial={false}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* ---- STEP CONTENT ---- */}
              <div className="p-6 min-h-[280px]">
                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
                    {error}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.full_name}
                            onChange={(e) => update("full_name", e.target.value)}
                            className={inputClasses}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputClasses}
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className={inputClasses}
                            placeholder="+234 800 000 0000"
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Gender
                          </label>
                          <select
                            value={form.gender}
                            onChange={(e) => update("gender", e.target.value)}
                            className={inputClasses}
                          >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Country of Birth
                          </label>
                          <input
                            type="text"
                            value={form.country_of_birth}
                            onChange={(e) => update("country_of_birth", e.target.value)}
                            className={inputClasses}
                            placeholder="e.g. Nigeria"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            City of Residence
                          </label>
                          <input
                            type="text"
                            value={form.city_of_residence}
                            onChange={(e) => update("city_of_residence", e.target.value)}
                            className={inputClasses}
                            placeholder="e.g. Lagos"
                          />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Highest Qualification
                          </label>
                          <select
                            value={form.highest_qualification}
                            onChange={(e) =>
                              update("highest_qualification", e.target.value)
                            }
                            className={inputClasses}
                          >
                            <option value="">Select</option>
                            <option value="SSCE/WAEC">SSCE / WAEC</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor's">Bachelor&apos;s Degree</option>
                            <option value="Master's">Master&apos;s Degree</option>
                            <option value="PhD">PhD</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1.5">
                            Intended Study Level
                          </label>
                          <select
                            value={form.intended_level}
                            onChange={(e) => update("intended_level", e.target.value)}
                            className={inputClasses}
                          >
                            <option value="">Select</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Postgraduate">Postgraduate</option>
                            <option value="PhD / Research">PhD / Research</option>
                            <option value="Foundation">Foundation</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-4">
                          Review Your Information
                        </h4>
                        <div className="bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100">
                          {[
                            ["Full Name", form.full_name],
                            ["Email", form.email],
                            ["Phone", form.phone],
                            ["Gender", form.gender],
                            ["Country of Birth", form.country_of_birth],
                            ["City of Residence", form.city_of_residence],
                            ["Qualification", form.highest_qualification],
                            ["Intended Level", form.intended_level],
                          ]
                            .filter(([, val]) => val)
                            .map(([label, val]) => (
                              <div
                                key={label}
                                className="flex items-center justify-between px-4 py-3"
                              >
                                <span className="text-xs text-slate-500 font-medium">
                                  {label}
                                </span>
                                <span className="text-sm text-slate-900 font-semibold">
                                  {val}
                                </span>
                              </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-4 text-center">
                          Applying to{" "}
                          <strong className="text-slate-600">{university.name}</strong>
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ---- FOOTER BUTTONS ---- */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 bg-brand-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-700 transition-colors active:scale-[0.98]"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-brand-600 text-white px-7 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-700 disabled:opacity-50 transition-colors active:scale-[0.98]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>Submit Application</>
                    )}
                  </button>
                )}
              </div>
            </>
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
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-100">
        <Search className="w-7 h-7 text-slate-300" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">No universities found</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        Try adjusting your filters or search query. Our directory is continuously updated with new partner universities.
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
export function UniversityDirectoryClient() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [drawerUniversity, setDrawerUniversity] = useState<University | null>(null);
  const [applyingTo, setApplyingTo] = useState<University | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchUniversities = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (country) params.set("country", country);
    if (level) params.set("level", level);
    if (courseFilter) params.set("course", courseFilter);

    try {
      const res = await fetch(`/api/universities?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) setUniversities(data);
    } catch {
      console.error("Failed to fetch universities");
    } finally {
      setLoading(false);
    }
  }, [search, country, level, courseFilter]);

  // Bootstrap countries on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/universities");
        const data = await res.json();
        if (Array.isArray(data)) {
          const unique = [
            ...new Set(data.map((u: University) => u.country).filter(Boolean)),
          ] as string[];
          setCountries(unique.sort());
        }
      } catch {
        /* silent */
      }
    })();
  }, []);

  // Debounced fetch
  useEffect(() => {
    const timer = setTimeout(fetchUniversities, 300);
    return () => clearTimeout(timer);
  }, [fetchUniversities]);

  function clearAllFilters() {
    setSearch("");
    setCountry("");
    setLevel("");
    setCourseFilter("");
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <DirectoryHeader
        search={search}
        setSearch={setSearch}
        resultCount={universities.length}
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
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
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
            ) : universities.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {universities.map((u) => (
                    <UniversityCard
                      key={u.id}
                      item={u}
                      onView={setDrawerUniversity}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Bottom CTA Banner */}
            {!loading && universities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-white border border-brand-100 rounded-2xl p-8 md:p-12 shadow-lg shadow-brand-900/5 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                    Not Sure Which University Is Right for You?
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                    Our advisors can recommend universities based on your profile, budget,
                    and career goals.
                  </p>
                  <Link
                    href="/book-consultation"
                    className="group inline-flex items-center gap-2 bg-brand-600 text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors shadow-sm"
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

      {/* DRAWER */}
      <AnimatePresence>
        {drawerUniversity && (
          <UniversityDrawer
            university={drawerUniversity}
            onClose={() => setDrawerUniversity(null)}
            onApply={(u) => {
              setDrawerUniversity(null);
              setApplyingTo(u);
            }}
          />
        )}
      </AnimatePresence>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {applyingTo && (
          <MultiStepApplicationModal
            university={applyingTo}
            onClose={() => setApplyingTo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
