"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { FeatureCards, CalloutBox } from "@/components/resources/ResourceBlocks";
import { Clock, CheckCircle2, ShieldCheck, Compass, FileCheck, FileText, MessageCircle, Languages } from "lucide-react";

/* ================================================================
   DATA
   ================================================================ */

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "core-services", label: "Core Services" },
  { id: "why-us", label: "Why Choose EduPlan360" },
];

const QUICK_FACTS = [
  { label: "Placement Rate", value: "98%", icon: <CheckCircle2 className="w-4 h-4" /> },
  { label: "End-to-end", value: "Full Support", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Processing Time", value: "Fast Track", icon: <Clock className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/process", label: "The Study Abroad Process" },
  { href: "/book-consultation", label: "Book a Consultation" },
  { href: "/portal/sign-up", label: "Start Application Now" },
];

const SERVICES = [
  {
    icon: Compass,
    title: "Course Matching & Selection",
    description: "We help identify suitable programs based on academic qualifications and career goals, matching your profile with universities.",
  },
  {
    icon: FileCheck,
    title: "Admission Processing",
    description: "Our advisors guide you through the application process and ensure all documents are submitted correctly and on time.",
  },
  {
    icon: FileText,
    title: "Document Review",
    description: "We rigorously review transcripts, personal statements, and reference letters to ensure they meet university standards.",
  },
  {
    icon: ShieldCheck,
    title: "Visa Support",
    description: "Receive full guidance on visa application procedures, financial evidence requirements, and interview preparation.",
  },
  {
    icon: MessageCircle,
    title: "Interview Preparation",
    description: "Mock interviews and guidance sessions help you prepare confidently for university or visa interviews.",
  },
  {
    icon: Languages,
    title: "English Test Support",
    description: "Guidance on English language tests such as IELTS, including preparation tips and practice resources.",
  },
];

/* ================================================================
   MAIN EXPORT
   ================================================================ */
export function AdmissionProcessingClient() {
  return (
    <ResourceDashboardLayout
      title="Admission Processing Services"
      description="Comprehensive services designed to help you successfully secure admission to international universities."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Overview">
         <p className="text-slate-600 leading-relaxed text-base mb-6">
           Securing admission to top-tier universities is competitive and complex. 
           <strong className="text-slate-900"> EduPlan360 provides comprehensive services</strong> designed to help
           students successfully navigate the international admission landscape. 
           From identifying the exact right program to tracking your final visa status, we handle the heavy lifting.
         </p>
         <CalloutBox
          title="We advocate for you"
          text="Our team works intimately with you to ensure that every stage of the application process is handled efficiently and professionally — so you can focus entirely on preparing for your future."
          variant="brand"
         />
      </DashboardSection>

      <DashboardSection 
        id="core-services" 
        title="Our Core Services"
        description="We provide end-to-end support for every stage of your educational journey."
       >
        <FeatureCards items={SERVICES} columns={2} />
      </DashboardSection>

      <DashboardSection id="why-us" title="Why Choose EduPlan360">
        <p className="text-slate-600 leading-relaxed text-base mb-8">
          We don’t just process applications — we advocate for our students. Our team brings years of experience, direct university relationships, and a genuine commitment to your long-term success.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
           {["Personalised advice tailored to your specific profile",
             "Direct university partnerships for prioritized processing",
             "Transparent timelines and automated progress updates",
             "Expert document review prior to formal submission",
             "Dedicated advisor assigned to manage your case"
           ].map((item, idx) => (
             <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
               <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
               <span className="text-sm text-slate-700 font-medium leading-relaxed">{item}</span>
             </div>
           ))}
        </div>
      </DashboardSection>

    </ResourceDashboardLayout>
  );
}
