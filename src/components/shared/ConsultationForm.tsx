"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

interface ConsultationFormProps {
  title?: string;
  source?: string;
}

export function ConsultationForm({ title = "Book Your Free Consultation", source = "direct" }: ConsultationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const error = await res.json();
        alert(error.error || "Submission failed. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-brand-900/10 border border-slate-100 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="font-bold text-2xl mb-4 text-slate-900">Request Sent!</h3>
        <p className="text-muted leading-relaxed mb-8">
          Thank you for reaching out. One of our expert academic advisors will contact you within 24 hours to schedule your session.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-brand-600 font-bold hover:text-brand-700 transition-colors"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl shadow-brand-900/10 border border-slate-100">
      <h3 className="font-bold text-2xl mb-2 text-slate-900">{title}</h3>
      <p className="text-muted mb-8 text-sm">Please fill in your details and we will get back to you shortly.</p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <input 
              required 
              name="full_name" 
              placeholder="e.g. John Doe" 
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 transition-all" 
            />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 transition-all" 
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  name="phone" 
                  placeholder="+234 800 000 0000" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 transition-all" 
                />
            </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Preferred Country</label>
                <select 
                  name="country_of_interest" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 transition-all"
                >
                  <option value="">Select Destination</option>
                  <option value="UK">United Kingdom</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Study Level</label>
                <select 
                  name="study_level" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 transition-all"
                >
                  <option value="">Select Level</option>
                  <option value="Undergraduate">Undergraduate (Bachelors)</option>
                  <option value="Postgraduate">Postgraduate (Masters)</option>
                  <option value="PhD">PhD / Research</option>
                  <option value="Foundations">Foundations / Pre-degree</option>
                </select>
            </div>
        </div>

        <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Tell us more (Optional)</label>
            <textarea 
              name="message" 
              rows={3}
              placeholder="Any specific questions or goals?" 
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-slate-900 transition-all resize-none" 
            />
        </div>

        <button 
          disabled={loading} 
          type="submit" 
          className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-600/20 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Book My Consultation
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed uppercase tracking-tighter">
            By submitting, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  );
}
