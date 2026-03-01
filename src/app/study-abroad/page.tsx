import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ChevronRight, GraduationCap, FileText, Compass, Send } from "lucide-react";

export const metadata = {
    title: "Study Abroad Guide | EduPlan360",
    description: "Complete guide to studying abroad - from choosing a university to getting your visa.",
};

export default async function StudyAbroadPage() {
    const supabase = await createClient();
    const { data: settings } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['resources_hero', 'resources_getting_started', 'resources_application_prep']);

    const content: Record<string, Record<string, string>> = {};
    settings?.forEach(s => { content[s.key] = s.value });

    const hero = content.resources_hero || {};
    const started = content.resources_getting_started || {};
    const prep = content.resources_application_prep || {};

    const sections = [
        {
            title: "Getting Started",
            icon: <Compass className="w-5 h-5" />,
            links: [
                { href: "/study-abroad/why", label: started.step_1_title || "Why Study Abroad" },
                { href: "/study-abroad/process", label: started.step_2_title || "The Study Abroad Process" },
                { href: "/study-abroad/apply", label: started.step_3_title || "Apply to Study" },
            ]
        },
        {
            title: "Application Preparation",
            icon: <FileText className="w-5 h-5" />,
            links: [
                { href: "/study-abroad/requirements", label: prep.guide_1_title || "Document Requirements" },
                { href: "/study-abroad/personal-statement", label: prep.guide_2_title || "Personal Statement Guide" },
                { href: "/study-abroad/interviews", label: prep.guide_3_title || "Preparing for Interviews" },
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-brand-700 text-white pt-24 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                    <GraduationCap className="w-full h-full text-white" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Resources Center</span>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            {hero.headline || "Your Journey to Global Education Starts Here"}
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
                            {hero.subtext || "Unlock world-class opportunities with our comprehensive guides, expert tips, and personalized support for study abroad aspirants."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="container mx-auto px-4 -mt-10 mb-24">
                <div className="grid md:grid-cols-2 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-brand-50 rounded-xl text-brand-700">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                            </div>
                            <div className="grid gap-3">
                                {section.links.map((link, lIdx) => (
                                    <Link 
                                        key={lIdx} 
                                        href={link.href}
                                        className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                                    >
                                        <span className="text-slate-600 font-medium group-hover:text-brand-700">{link.label}</span>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-700 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Choosing & Planning Banner */}
                <div className="mt-12 bg-slate-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="max-w-md text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-4">Planning Your Studies</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Not sure where to start? Check our dedicated guides on choosing the right path for your future.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <Link href="/study-abroad/choosing-course" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">Choosing a Course</Link>
                            <Link href="/study-abroad/choosing-university" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors">Choosing a University</Link>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <Send className="w-32 h-32 text-white/5 opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    );
}
