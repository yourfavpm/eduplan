import { createClient } from "@/lib/supabase/server";
import { GraduationCap, Target, BookOpen, Users, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "About EduPlan360 | Our Story & Mission",
    description: "Learn about EduPlan360's journey and our commitment to making international education accessible for everyone.",
};

export default async function AboutPage() {
    const supabase = await createClient();
    const { data: settings } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['about_hero', 'about_mission', 'about_story']);

    const content: Record<string, Record<string, string>> = {};
    settings?.forEach(s => { content[s.key] = s.value as Record<string, string> });

    const hero = content.about_hero || {};
    const mission = content.about_mission || {};
    const story = content.about_story || {};

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="pt-32 pb-20 bg-brand-50/50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-2xl">
                            <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Our Story</span>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                                {hero.headline || "Empowering Global Ambitions Since Day One"}
                            </h1>
                            <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8">
                                {hero.subtext || "We're more than just a consultancy; we're your dedicated partners in navigating the complexities of international education."}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <Users className="w-5 h-5 text-brand-600" />
                                    <span className="font-bold text-slate-800 italic">5000+ Students Helped</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <GraduationCap className="w-5 h-5 text-brand-600" />
                                    <span className="font-bold text-slate-800 italic">50+ Country Partners</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square lg:aspect-4/3 rounded-[40px] overflow-hidden shadow-2xl">
                            <Image 
                                src={hero.image_url || "/images/about-hero.jpg"} 
                                alt="EduPlan360 Team" 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Story */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                    {/* Mission */}
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-brand-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
                            <Target className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">
                            {mission.mission_title || "Our Mission"}
                        </h2>
                        <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                            {mission.mission_body || "To bridge the gap between global education opportunities and aspiring students through expert guidance, transparent processes, and unwavering support."}
                        </div>
                    </div>

                    {/* Story */}
                    <div className="space-y-6">
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">
                            {story.story_title || "How We Started"}
                        </h2>
                        <div className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                            {story.story_body || "Founded on the principles of accessibility and excellence, EduPlan360 began as a small initiative to help local students reach international universities. Today, we've grown into a global network."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Banner */}
            <div className="container mx-auto px-4 pb-24">
                <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-white text-center relative overflow-hidden">
                    <Compass className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-white/5 pointer-events-none" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Guiding You Toward A Brighter Future</h2>
                        <p className="text-white/60 text-lg mb-10 leading-relaxed">
                            Our team of experts is ready to help you navigate every step of your study abroad journey.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/portal/sign-up" className="bg-brand-700 text-white px-10 py-4 rounded-2xl font-black hover:bg-brand-800 transition-all shadow-xl">
                                Join EduPlan360
                            </Link>
                            <Link href="/why-choose-us" className="bg-white/10 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-all backdrop-blur-sm">
                                Why Choose Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
