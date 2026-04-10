"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { StepTimeline, ChecklistBlock, CalloutBox } from "@/components/resources/ResourceBlocks";
import { Target, Zap, Clock } from "lucide-react";

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "The Application Process" },
  { id: "checklist", label: "What You'll Need" },
];

const QUICK_FACTS = [
  { label: "Success Strategy", value: "Apply Early", icon: <Target className="w-4 h-4" /> },
  { label: "Our Service", value: "End-to-End Handling", icon: <Zap className="w-4 h-4" /> },
  { label: "Timeline", value: "Varies by Intake", icon: <Clock className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/process", label: "The Study Abroad Roadmap" },
  { href: "/study-abroad/requirements", label: "Document Checklist" },
  { href: "/study-abroad/personal-statement", label: "Writing a Statement" },
];

const APPLICATION_STEPS = [
  {
    title: "Book a Consultation",
    description:
      "Meet with an EduPlan360 advisor to discuss your goals, preferences, and eligibility. We'll assess your profile and recommend the best options.",
  },
  {
    title: "Choose Your Programs",
    description:
      "Based on your consultation, we'll shortlist 3–5 universities and programs that match your academic background, career goals, and budget.",
  },
  {
    title: "Prepare Your Documents",
    description:
      "Gather all required documents — transcripts, personal statement, references, and test scores. Our team reviews everything before submission.",
  },
  {
    title: "Submit Applications",
    description:
      "We submit your applications through official channels, track deadlines, and follow up with universities on your behalf.",
  },
  {
    title: "Accept Your Offer",
    description:
      "Once you receive offers, we help you compare, negotiate scholarships where applicable, and confirm your place.",
  },
  {
    title: "Visa & Pre-Departure",
    description:
      "We guide you through visa applications, mock interviews, financial documentation, and pre-departure preparation.",
  },
];

export function ApplyToStudyClient() {
  return (
    <ResourceDashboardLayout
      title="Apply to Study"
      description="Your application is the bridge between ambition and admission. We help you cross it with confidence."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Getting Started">
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Applying to study abroad involves multiple steps, deadlines, and documents. Without proper guidance,
          it&apos;s easy to miss something critical. At EduPlan360, we manage the entire process so you can focus
          on preparing for your new chapter.
        </p>
        <CalloutBox
          title="EduPlan360 manages the complexity"
          text="From shortlisting to submission to follow-up, our team handles the heavy lifting. You focus on your goals — we'll handle the paperwork, deadlines, and coordination."
          variant="brand"
        />
      </DashboardSection>

      <DashboardSection 
        id="process" 
        title="The Application Process"
        description="Here's how the application journey works when you apply with EduPlan360:"
      >
        <StepTimeline steps={APPLICATION_STEPS} />
      </DashboardSection>

      <DashboardSection 
        id="checklist" 
        title="What You'll Need"
        description="Before you begin, make sure you have the following ready. This will speed up the process significantly."
      >
        <ChecklistBlock
          items={[
            "Valid international passport",
            "Academic transcripts and certificates",
            "English language test scores (IELTS, TOEFL, PTE)",
            "Updated CV or résumé",
            "Personal statement or statement of purpose",
            "Two academic or professional references",
            "Proof of financial capacity",
          ]}
        />
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
