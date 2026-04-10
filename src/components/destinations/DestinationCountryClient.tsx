"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DestinationContent } from "@/app/destinations/content";
import { CheckCircle2, ChevronRight, Loader2, Landmark, Trophy, FileCheck, Star, MapPin, Clock } from "lucide-react";

export function DestinationCountryClient({ data }: { data: DestinationContent }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* SECTION 1: HERO */}
      <HeroSection data={data} />

      {/* SECTION 2: AT A GLANCE */}
      <SnapshotSection data={data} />

      {/* SECTION 3: WHY STUDY */}
      <WhyStudySection data={data} />

      {/* SECTION 4 & 5: COURSES AND UNIVERSITIES */}
      <CoursesAndUnisSection data={data} />

      {/* SECTION 6 & 7: COSTS AND SCHOLARSHIPS */}
      <CostsAndScholarshipsSection data={data} />

      {/* SECTION 8 & 9: INTAKES AND REQUIREMENTS */}
      <IntakesAndRequirementsSection data={data} />

      {/* SECTION 11: WHY CHOOSE EDUPLAN */}
      <WhyChooseUsSection />

      {/* SECTION 13: FAQ */}
      {data.faqs && <FAQSection faqs={data.faqs} />}

      {/* SECTION 12: FINAL CTA */}
      <FinalCTASection data={data} />
    </div>
  );
}

function LeadForm({ data, title = "Get Free Admission Assessment" }: { data: DestinationContent, title?: string }) {
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
          country_of_interest: data.countryName,
          source: `Destination Page: ${data.countryName}`,
        }),
      });
      if (res.ok) setSuccess(true);
      else alert("Submission failed. Please try again.");
    } catch {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-bold text-xl mb-2">Request Received!</h3>
      <p className="text-muted text-sm">One of our expert counsellors for {data.countryName} will contact you shortly.</p>
    </div>
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="font-bold text-xl mb-6 text-slate-900">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required name="full_name" placeholder="Full Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm" />
        <div className="grid grid-cols-2 gap-4">
          <input required type="email" name="email" placeholder="Email Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm" />
          <input required type="tel" name="phone" placeholder="Phone Number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm" />
        </div>
        <select required name="study_level" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm">
          <option value="">Preferred Study Level</option>
          <option value="Undergraduate">Undergraduate (Bachelors)</option>
          <option value="Postgraduate">Postgraduate (Masters)</option>
          <option value="PhD">PhD / Research</option>
        </select>
        <button disabled={loading} type="submit" className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-lg hover:bg-brand-700 transition flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Free Admission Assessment"}
        </button>
      </form>
      <div className="mt-6 flex flex-wrap justify-between gap-y-2 text-xs text-slate-500 font-medium">
        <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-500" />12+ Yrs Experience</span>
        <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-500" />5k+ Students Placed</span>
        <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-500" />Direct Partnerships</span>
      </div>
    </div>
  );
}

function HeroSection({ data }: { data: DestinationContent }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b border-slate-800">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Cinematic destination background */}
        <Image src={`/images/destinations/${data.slug}.png`} alt={data.countryName} fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-slate-900/40" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 mb-6">
           <Link href="/destinations" className="text-brand-300 hover:text-white text-sm font-medium">Destinations</Link>
           <ChevronRight className="w-4 h-4 text-slate-500" />
           <span className="text-white text-sm">{data.countryName}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-1.5 rounded-full text-white font-bold text-sm mb-6">
              <span className="text-xl leading-none">{data.flag}</span> Study in {data.countryName}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {data.hero.headline}
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-brand-300 mb-6 leading-snug">
              {data.hero.subheadline}
            </h2>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
              {data.hero.text}
            </p>
            <div className="flex flex-wrap gap-4">
               <button onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})} className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                 Apply Now
               </button>
               <Link href="/book-consultation" className="bg-white/10 hover:bg-white/20 border border-slate-700 text-white font-bold px-8 py-3.5 rounded-full transition-colors">
                 Book Free Consultation
               </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            {/* Soft glow behind form */}
            <div className="absolute -inset-4 bg-brand-500/20 blur-3xl rounded-full" />
            <div className="relative">
              <LeadForm data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SnapshotSection({ data }: { data: DestinationContent }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          {data.countryName} at a Glance {data.flag}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.atAGlance.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{item.label}</div>
              <div className="text-base font-semibold text-brand-700">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyStudySection({ data }: { data: DestinationContent }) {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6">
         <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Study in {data.countryName}?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.whyStudy.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesAndUnisSection({ data }: { data: DestinationContent }) {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Courses */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Popular Courses</h2>
            <div className="flex flex-wrap gap-3">
              {data.popularCourses.map((course, i) => (
                <div key={i} className="bg-brand-50 text-brand-700 border border-brand-100 font-medium px-4 py-2 rounded-full text-sm">
                  {course}
                </div>
              ))}
            </div>
          </div>
          {/* Unis */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Top Universities</h2>
            <div className="space-y-4">
              {(data.dynamicUniversities && data.dynamicUniversities.length > 0) ? (
                data.dynamicUniversities.map((uni) => (
                  <div key={uni.id} className="flex gap-4 p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 overflow-hidden">
                      {uni.logo_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-contain p-2" />
                      ) : (
                        <Landmark className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-slate-900 leading-tight group-hover:text-brand-600 transition-colors truncate">{uni.name}</h3>
                        {uni.ranking && (
                          <span className="shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-50 text-brand-700 uppercase tracking-tight">
                            {uni.ranking}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {uni.location || data.countryName}
                      </p>
                      {uni.student_population && (
                        <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">
                          {uni.student_population} Students
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <ul className="space-y-4">
                  {data.topUniversities.map((uni, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50">
                      <Landmark className="w-5 h-5 text-slate-400" />
                      <span className="font-semibold text-slate-800">{uni}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CostsAndScholarshipsSection({ data }: { data: DestinationContent }) {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white">Cost of Studying</h2>
            <div className="space-y-8">
              {data.costs.map((cat, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-brand-300 mb-4 border-b border-slate-700 pb-2">{cat.title}</h3>
                  <ul className="space-y-3">
                    {cat.items.map((item, j) => (
                      <li key={j} className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">{item.label}</span>
                        <span className="font-semibold">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white text-center">Scholarship Opportunities</h2>
            <div className="space-y-4">
              {(data.dynamicScholarships && data.dynamicScholarships.length > 0) ? (
                data.dynamicScholarships.map((sch) => (
                  <div key={sch.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-white leading-tight">{sch.title}</h3>
                        <div className="flex gap-3 mt-2">
                           {sch.type && (
                             <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px] font-bold uppercase">
                               {sch.type.replace('_', ' ')}
                             </span>
                           )}
                           {sch.level && (
                             <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[10px] font-bold uppercase">
                               {sch.level}
                             </span>
                           )}
                        </div>
                      </div>
                      {sch.featured && <Star className="w-5 h-5 text-brand-400 fill-brand-400 shrink-0" />}
                    </div>
                    {sch.description && (
                      <p className="text-sm text-slate-300 mb-6 line-clamp-2 leading-relaxed">{sch.description}</p>
                    )}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-brand-400" />
                        Deadline: {sch.deadline || 'Ongoing'}
                      </div>
                      {sch.link ? (
                        <a href={sch.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-white transition-colors">
                          Apply Now <ChevronRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <button onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 hover:text-white transition-colors">
                          Enquire Now <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {data.scholarships.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 border border-white/10 rounded-xl bg-white/5">
                      <Trophy className="w-5 h-5 text-brand-400" />
                      <span className="font-medium text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntakesAndRequirementsSection({ data }: { data: DestinationContent }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Admission Requirements</h2>
            <ul className="space-y-4">
              {data.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          {data.intakes && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Main Intakes</h2>
              <div className="relative pl-8 border-l-2 border-slate-200 space-y-8">
                {data.intakes.map((intake, idx) => {
                  const [month, desc] = intake.split("—").map(s => s.trim());
                  return (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-brand-500 border-4 border-white" />
                      <h4 className="font-bold text-lg text-slate-900">{month}</h4>
                      {desc && <p className="text-sm text-slate-500 mt-1">{desc}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 text-center max-w-4xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Why Choose EduPlan360</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="p-6">
            <h4 className="font-bold text-xl mb-2 text-slate-900">12+ Years Experience</h4>
            <p className="text-slate-600 text-sm">Decades of combined expertise guiding students globally.</p>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-xl mb-2 text-slate-900">Direct Partnerships</h4>
            <p className="text-slate-600 text-sm">We are officially appointed by leading universities.</p>
          </div>
          <div className="p-6">
            <h4 className="font-bold text-xl mb-2 text-slate-900">Visa Support</h4>
            <p className="text-slate-600 text-sm">Industry-leading study visa approval rates.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <h4 className="font-bold text-lg text-slate-900 mb-2">{faq.question}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection({ data }: { data: DestinationContent }) {
  return (
    <section className="py-24 bg-brand-700">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Study <br/>in {data.countryName}?
            </h2>
            <p className="text-xl text-brand-200 mb-10 max-w-md">
              Apply now and get expert admission support from EduPlan360 to ensure your success.
            </p>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-3xl" />
             <div className="relative">
               <LeadForm data={data} title="Start Your Application" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
