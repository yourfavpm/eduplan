"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Globe,
  Users,
  Languages,
  Home,
  CheckCircle,
  X,
  Loader2,
  Building,
} from "lucide-react";

/* ================================================================
   TYPES
   ================================================================ */
type PartnershipForm = {
  full_name: string;
  email: string;
  phone: string;
  organization_name: string;
  role: string;
  country: string;
  organization_type: string;
  message: string;
};

const EMPTY_FORM: PartnershipForm = {
  full_name: "",
  email: "",
  phone: "",
  organization_name: "",
  role: "",
  country: "",
  organization_type: "",
  message: "",
};

/* ================================================================
   1. HERO / INTRO SECTION
   ================================================================ */
function PartnerHero({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Partner With EduPlan360
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-4 leading-relaxed font-medium">
              We collaborate with institutions and organizations committed to expanding access to global education opportunities.
            </p>
            <p className="text-base text-slate-500 mb-10 leading-relaxed">
              Join our growing network of trusted education partners worldwide.
            </p>
            <div>
              <button
                onClick={onOpenModal}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-slate-800 transition-colors shadow-sm"
              >
                Contact Us
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative lg:h-[500px] rounded-2xl overflow-hidden bg-slate-100"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
              alt="Global Partnership Strategy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. PARTNERSHIP OVERVIEW
   ================================================================ */
function PartnershipOverview() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
          EduPlan360 works with global education stakeholders to connect students with quality international opportunities. Our ecosystem thrives on <strong className="text-brand-700">collaboration</strong>, enabling unprecedented <strong className="text-brand-700">student access</strong> and <strong className="text-brand-700">global reach</strong>.
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   3. WHO WE PARTNER WITH
   ================================================================ */
const PARTNER_TYPES = [
  {
    icon: Building,
    title: "Universities & Institutions",
    desc: "Connect your institution with qualified, motivated students globally.",
  },
  {
    icon: Globe,
    title: "Education Agencies",
    desc: "Collaborate on student recruitment and joint market penetration.",
  },
  {
    icon: Users,
    title: "Student Service Providers",
    desc: "Integrate financial, insurance, and guidance tools into our ecosystem.",
  },
  {
    icon: Languages,
    title: "Language Training",
    desc: "Provide necessary IELTS, TOEFL, or PTE preparation programs.",
  },
  {
    icon: Home,
    title: "Accommodation & Travel",
    desc: "Facilitate secure housing and safe transit for relocating students.",
  },
];

function WhoWePartnerWith() {
  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Eligible Partners</h2>
            <p className="text-slate-600 text-lg">We welcome structured collaborations across the international education spectrum.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {PARTNER_TYPES.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   4. BENEFITS OF PARTNERSHIP
   ================================================================ */
const BENEFITS = [
  "Expanded recruitment channels",
  "Access to diverse, high-intent student markets",
  "Strategic marketing and co-branded initiatives",
  "Dedicated professional account representation",
  "Long-term, secure institutional relationships",
];

function PartnershipBenefits() {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Corporate Advantages</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              A partnership with EduPlan360 is an extension of your operating capabilities. We provide the infrastructure and market reach so your programs can scale.
            </p>
          </div>
          <div>
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
               <ul className="space-y-6">
                  {BENEFITS.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-slate-800 shrink-0" />
                      <span className="text-base text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. HOW PARTNERSHIP WORKS
   ================================================================ */
function HowItWorks() {
  const steps = [
    { title: "Inquiry", desc: "Submit partnership inquiry." },
    { title: "Review", desc: "Initial alignment discussion." },
    { title: "Onboard", desc: "Integration and strategy planning." },
    { title: "Action", desc: "Active market collaboration begins." },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">Partnership Lifecycle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
             <div className="hidden lg:block absolute top-6 left-24 right-24 h-0.5 bg-slate-200 z-0" />
             {steps.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col pt-2 border-t-2 sm:border-t-0 sm:pt-0 sm:block border-slate-200">
                   <div className="w-12 h-12 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center font-bold text-slate-700 mb-6 mx-auto sm:mx-0">
                      {i + 1}
                   </div>
                   <h3 className="text-base font-bold text-slate-900 mb-2 text-center sm:text-left">{step.title}</h3>
                   <p className="text-sm text-slate-600 text-center sm:text-left">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. TRUST & CREDIBILITY
   ================================================================ */
function TrustCredibility() {
  return (
    <section className="py-24 bg-slate-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Network Impact</h2>
          <p className="text-lg text-slate-400 mb-12">
            EduPlan360 maintains a rapidly expanding global presence, focusing on measurable student impact and operational reliability for our institutional partners.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-xl">
               <div className="text-4xl font-bold text-white mb-2">120+</div>
               <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Global Destinations</div>
            </div>
            <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-xl">
               <div className="text-4xl font-bold text-white mb-2">94%</div>
               <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Placement Rate</div>
            </div>
            <div className="p-6 border border-slate-700 bg-slate-800/50 rounded-xl">
               <div className="text-4xl font-bold text-white mb-2">24/7</div>
               <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Partner Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   7. CALL TO ACTION 
   ================================================================ */
function CTASection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Let&apos;s Build Global Education Opportunities Together</h2>
          <p className="text-lg text-slate-600 mb-10">
            Reach out to our strategic relations team to explore concrete partnership opportunities. 
          </p>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 bg-brand-700 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-brand-800 transition-colors shadow-sm"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   8. INQUIRY MODAL (B2B Form)
   ================================================================ */
function PartnershipModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<PartnershipForm>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const update = (key: keyof PartnershipForm, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/partner-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors shadow-sm";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-50 w-full sm:max-w-2xl sm:rounded-xl shadow-2xl h-full sm:h-auto max-h-screen overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white sticky top-0 z-10">
            <h3 className="font-bold text-slate-900 text-lg">Partnership Inquiry</h3>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="p-12 text-center bg-white min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3">Inquiry Received</h4>
              <p className="text-slate-600 max-w-sm mx-auto mb-8 leading-relaxed text-sm">
                Thank you for your interest. A member of our strategic relations team will contact you within 1-2 business days.
              </p>
              <button
                onClick={onClose}
                className="bg-slate-900 text-white px-8 py-2.5 rounded-md font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 bg-slate-50">
               <div>
                  <h4 className="text-slate-800 font-bold mb-4">Contact Information</h4>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>Full Name <span className="text-red-500">*</span></label>
                      <input type="text" required className={inputClasses} value={form.full_name} onChange={(e) => update("full_name", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address <span className="text-red-500">*</span></label>
                      <input type="email" required className={inputClasses} value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                  </div>
               </div>

               <div>
                 <h4 className="text-slate-800 font-bold mb-4">Organization Details</h4>
                 <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClasses}>Organization Name <span className="text-red-500">*</span></label>
                      <input type="text" required className={inputClasses} value={form.organization_name} onChange={(e) => update("organization_name", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClasses}>Organization Type <span className="text-red-500">*</span></label>
                      <select required className={inputClasses} value={form.organization_type} onChange={(e) => update("organization_type", e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="University/Institution">University / Institution</option>
                        <option value="Education Agency">Education Agency</option>
                        <option value="Service Provider">Service Provider</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                 </div>
                 <div className="grid sm:grid-cols-3 gap-5">
                    <div>
                      <label className={labelClasses}>Role / Position</label>
                      <input type="text" className={inputClasses} value={form.role} onChange={(e) => update("role", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClasses}>Phone Number</label>
                      <input type="tel" className={inputClasses} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClasses}>Country <span className="text-red-500">*</span></label>
                      <input type="text" required className={inputClasses} value={form.country} onChange={(e) => update("country", e.target.value)} />
                    </div>
                 </div>
               </div>

               <div>
                  <h4 className="text-slate-800 font-bold mb-4">Inquiry Details</h4>
                  <label className={labelClasses}>Message</label>
                  <textarea 
                    rows={4} 
                    className={inputClasses} 
                    value={form.message} 
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Briefly describe your partnership proposal..."
                  />
               </div>

               <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-brand-600 text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-brand-700 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Submit Inquiry"}
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
   MAIN EXPORT
   ================================================================ */
export function PartnerWithUsClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen">
      <PartnerHero onOpenModal={() => setIsModalOpen(true)} />
      <PartnershipOverview />
      <WhoWePartnerWith />
      <PartnershipBenefits />
      <HowItWorks />
      <TrustCredibility />
      <CTASection onOpenModal={() => setIsModalOpen(true)} />

      {isModalOpen && <PartnershipModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
