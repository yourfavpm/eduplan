import { createClient } from "@/lib/supabase/server";
import { GraduationCap, ShieldCheck, Zap, Heart, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Why Choose EduPlan360 | Study Abroad Simplified",
    description: "Discover the unique advantages of planning your international education journey with EduPlan360.",
};

export default async function WhyChooseUsPage() {
    const supabase = await createClient();
    const { data: settings } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['why_us_hero', 'about_why_us']);

    const content: Record<string, Record<string, string>> = {};
    settings?.forEach(s => { content[s.key] = s.value as Record<string, string> });

    const hero = content.why_us_hero || {};
    const benefits = content.about_why_us || {};

    const benefitIcons = [
        <ShieldCheck className="w-6 h-6" />,
        <Zap className="w-6 h-6" />,
        <Heart className="w-6 h-6" />,
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white pt-24 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                    <Sparkles className="w-full h-full text-white" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4 text-brand-400">Our Value</span>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            {hero.title || "Experience the EduPlan360 Advantage"}
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                            {hero.description || "We go beyond just applications. We provide a holistic approach to your study abroad journey, ensuring every step is simplified and optimized for your success."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((num, idx) => {
                        const title = benefits[`benefit_${num}_title`];
                        const body = benefits[`benefit_${num}_body`];
                        if (!title && !body) return null;

                        return (
                            <div key={idx} className="bg-white group p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-700 mb-6 group-hover:scale-110 transition-transform">
                                    {benefitIcons[idx] || <GraduationCap className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{title || `Advantage ${num}`}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {body || "Coming soon..."}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Values Section */}
                <div className="mt-24 bg-brand-700 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Our Commitment to You</h2>
                            <div className="space-y-6">
                                <div key="comm-1" className="flex gap-4">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <p className="text-white/80">Expert mentorship from experienced advisors who truly care.</p>
                                </div>
                                <div key="comm-2" className="flex gap-4">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <p className="text-white/80">Transparent processes with no hidden costs or complexities.</p>
                                </div>
                                <div key="comm-3" className="flex gap-4">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                    <p className="text-white/80">End-to-end support, from university choice to visa approval.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                            <h3 className="text-xl font-bold mb-4">Start your journey today</h3>
                            <p className="text-white/70 mb-8 text-sm leading-relaxed">Join thousands of successful students who have achieved their dreams with us.</p>
                            <Link href="/portal/sign-up" className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-4 rounded-2xl font-black hover:bg-brand-50 transition-all shadow-lg active:scale-95">
                                Start Your Application <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
