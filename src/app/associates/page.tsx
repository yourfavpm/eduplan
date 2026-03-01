import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Our Associates | EduPlan360",
    description: "Meet our network of education consultants helping students worldwide.",
};

import { AdvisorsSection } from "@/components/home/AdvisorsSection";

export default function AssociatesPage() {
    return (
        <main className="pt-20">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-black text-slate-900 mb-4">Our Associate Network</h1>
                <p className="text-slate-600 max-w-2xl leading-relaxed">
                    Meet our network of dedicated volunteers and education consultants helping students worldwide achieve their study abroad dreams.
                </p>
            </div>
            
            <AdvisorsSection />

            <div className="container mx-auto px-4 py-16 border-t border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Become an Associate</h2>
                <div className="max-w-3xl mx-auto bg-brand-50 rounded-3xl p-8 md:p-12 text-center">
                    <p className="text-brand-800 text-lg mb-8 leading-relaxed">
                        Are you passionate about international education? Join our team of experts and help guide the next generation of global students.
                    </p>
                    <Link
                        href="/become-associate"
                        className="inline-block bg-brand-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-800 transition-all shadow-md"
                    >
                        Learn More & Apply
                    </Link>
                </div>
            </div>
        </main>
    );
}
