"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Coins,
  HeadphonesIcon,
  CheckCircle,
  Briefcase,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  X,
  Loader2,
  Quote,
  ArrowRight,
} from "lucide-react";

/* ================================================================
   TYPES
   ================================================================ */
type ApplicationForm = {
  full_name: string;
  phone: string;
  email: string;
  occupation: string;
  city: string;
  country: string;
  gender: string;
  qualification: string;
};

const EMPTY_FORM: ApplicationForm = {
  full_name: "",
  phone: "",
  email: "",
  occupation: "",
  city: "",
  country: "",
  gender: "",
  qualification: "",
};

/* ================================================================
   1. INTRO
   ================================================================ */
function AssociateHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Become an EduPlan360 Associate
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Help students access global education opportunities while building a
              flexible income stream.
            </p>
            <ul className="space-y-4 mb-10">
              {['Flexible work schedule', 'Commission-based earnings', 'Full support system'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle className="w-5 h-5 text-brand-600" /> {item}
                </li>
              ))}
            </ul>
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-brand-800 transition-colors active:scale-[0.98]"
            >
              Apply Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
              alt="Professional working remotely"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   2. PURPOSE SECTION
   ================================================================ */
function PurposeSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
            EduPlan360 is expanding access to international education. We partner with
            motivated associates to reach more students globally and guide them toward
            their futures.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   3. BENEFITS SECTION (Structured Blocks)
   ================================================================ */
const BENEFITS = [
  {
    icon: Clock,
    title: "Flexible Work Schedule",
    desc: "Manage your own hours. Work from anywhere while building your professional network.",
  },
  {
    icon: Coins,
    title: "Competitive Commission Structure",
    desc: "Earn attractive, transparent commissions for every successful student placement.",
  },
  {
    icon: GraduationCap,
    title: "Training & Resources",
    desc: "Access comprehensive training materials to understand the study abroad landscape.",
  },
  {
    icon: HeadphonesIcon,
    title: "Ongoing Professional Support",
    desc: "Receive dedicated support from our central advisory team throughout the process.",
  },
];

function BenefitsSection() {
  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Program Benefits</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                  <b.icon className="w-6 h-6 text-brand-700" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   4. RESPONSIBILITIES
   ================================================================ */
const RESPONSIBILITIES = [
  "Connecting with prospective students in your network",
  "Introducing study abroad opportunities and universities",
  "Referring interested students to EduPlan advisors",
  "Supporting the collection of application documents",
  "Earning commissions upon successful enrollment",
];

function ResponsibilitiesSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Responsibilities</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              As an associate, you act as the bridge between ambitious students and 
              our expert counseling team.
            </p>
            <ul className="space-y-4">
              {RESPONSIBILITIES.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Briefcase className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 aspect-square flex flex-col justify-center">
             <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
               <Briefcase className="w-8 h-8 text-brand-600" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">Simple Process</h3>
             <p className="text-slate-600 leading-relaxed">
               You don&apos;t need to be an admissions expert. Focus on outreach and relationship building — our backend team handles the complex application mechanics.
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   5. HOW IT WORKS
   ================================================================ */
function HowItWorks() {
  const steps = [
    { title: "Apply", desc: "Submit your details via our online form." },
    { title: "Get Onboarded", desc: "Complete initial training." },
    { title: "Refer Students", desc: "Connect students with our team." },
    { title: "Earn Commissions", desc: "Receive payouts for placements." },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-slate-100 mix-blend-multiply" />
            
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg mb-6 border-4 border-white">
                  {i + 1}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   6. SOCIAL PROOF
   ================================================================ */
function TestimonialStrip() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Quote className="w-12 h-12 text-slate-300" />
          </div>
          <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed font-medium mb-10">
            &quot;Partnering with EduPlan360 allowed me to leverage my existing network to create a reliable income stream, all while helping students achieve their study abroad dreams.&quot;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
               <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150" alt="Associate" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h4 className="font-bold text-slate-900">Sarah M.</h4>
              <p className="text-sm text-slate-500">EduPlan Associate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   7 & 8. FORM SECTION
   ================================================================ */
function ApplicationSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const update = (key: keyof ApplicationForm, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const inputClasses = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <section id="apply" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Pre-Form CTA header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Start Your Journey as an EduPlan360 Associate</h2>
            <p className="text-slate-600">Submit your application below to begin the onboarding process.</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-10 shadow-sm">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Application Received</h3>
                <p className="text-slate-600 mb-8">
                  Your application has been received. Our team will contact you shortly regarding the next steps.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-brand-600' : 'bg-slate-200'}`} />
                  <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-brand-600' : 'bg-slate-200'}`} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClasses}>Full Name *</label>
                            <input type="text" required className={inputClasses} value={form.full_name} onChange={e => update("full_name", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelClasses}>Phone Number *</label>
                            <input type="tel" required className={inputClasses} value={form.phone} onChange={e => update("phone", e.target.value)} />
                          </div>
                        </div>
                        <div>
                          <label className={labelClasses}>Email Address *</label>
                          <input type="email" required className={inputClasses} value={form.email} onChange={e => update("email", e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClasses}>Current Occupation *</label>
                          <input type="text" required className={inputClasses} value={form.occupation} onChange={e => update("occupation", e.target.value)} />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClasses}>City of Residence *</label>
                            <input type="text" required className={inputClasses} value={form.city} onChange={e => update("city", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelClasses}>Country *</label>
                            <input type="text" required className={inputClasses} value={form.country} onChange={e => update("country", e.target.value)} />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className={labelClasses}>Gender *</label>
                            <select required className={inputClasses} value={form.gender} onChange={e => update("gender", e.target.value)}>
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelClasses}>Highest Qualification *</label>
                            <select required className={inputClasses} value={form.qualification} onChange={e => update("qualification", e.target.value)}>
                              <option value="">Select</option>
                              <option value="diploma">Diploma</option>
                              <option value="degree">Bachelor&apos;s Degree</option>
                              <option value="masters">Master&apos;s Degree</option>
                              <option value="phd">PhD</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                  ) : <div />}

                  {step < 2 ? (
                    <button type="button" onClick={() => setStep(s => s + 1)} className="inline-flex items-center gap-2 bg-brand-700 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-brand-800 transition-colors">
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 bg-brand-700 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-brand-800 disabled:opacity-50 transition-colors">
                      {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : "Submit Application"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export function BecomeAssociateClient() {
  return (
    <div className="bg-white">
      <AssociateHero />
      <PurposeSection />
      <BenefitsSection />
      <ResponsibilitiesSection />
      <HowItWorks />
      <TestimonialStrip />
      <ApplicationSection />
    </div>
  );
}
