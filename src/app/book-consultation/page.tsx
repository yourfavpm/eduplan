import type { Metadata } from "next";
import { ConsultationForm } from "@/components/shared/ConsultationForm";
import { Globe, Clock, CheckCircle2, Shield } from "lucide-react";

export const metadata: Metadata = {
    title: "Book Free Consultation | EduPlan360",
    description: "Schedule a free 30-minute consultation with our expert advisors. Get personalized guidance for your study abroad journey.",
};

export default function BookConsultationPage() {
    return (
        <main className="bg-slate-50 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Content Section */}
                    <div className="lg:sticky lg:top-32">
                        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                           Expert Guidance
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                            Start Your Journey with a <span className="text-brand-600">Free Strategy Session</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                            Our advisors have helped thousands of students secure admissions at top universities worldwide. In this 30-minute session, we&apos;ll map out your entire study abroad strategy.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {[
                                { icon: Clock, title: "30-Minute Session", desc: "Focused strategy planning" },
                                { icon: Globe, title: "Global Network", desc: "Access 500+ Universities" },
                                { icon: Shield, title: "Visa Success", desc: "98% Approval rate track" },
                                { icon: CheckCircle2, title: "Personalised", desc: "No generic advice" },
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                                        <feature.icon className="w-5 h-5 text-brand-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-brand-900 rounded-3xl text-white relative overflow-hidden">
                             <div className="relative z-10">
                                <p className="text-brand-200 text-sm font-medium mb-2 uppercase tracking-widest italic">Trusted Partner</p>
                                <h4 className="text-xl font-bold mb-4">Official Representative of Top Global Institutions</h4>
                                <p className="text-brand-100/70 text-sm leading-relaxed">
                                    We are certified partners with universities across the UK, Canada, USA, and Australia, ensuring your application gets priority processing.
                                </p>
                             </div>
                             {/* Abstract decoration */}
                             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl -mr-16 -mt-16 rounded-full" />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div>
                        <div className="relative">
                            {/* Decorative glow */}
                            <div className="absolute -inset-10 bg-brand-500/10 blur-[80px] rounded-full opacity-50 pointer-events-none" />
                            <ConsultationForm title="Schedule Your Session" source="booking_page" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
