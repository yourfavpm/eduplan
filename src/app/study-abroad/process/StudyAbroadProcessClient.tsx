"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { StepTimeline, CalloutBox } from "@/components/resources/ResourceBlocks";
import { Clock, CheckCircle2, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    title: "Choose Your Course & University",
    description: "Research programs that align with your career goals, academic background, and interests. Consider factors like ranking, tuition, location, and post-study opportunities.",
  },
  {
    title: "Prepare Your Documents",
    description: "Gather academic transcripts, certificates, a valid passport, English test scores, personal statement, and recommendation letters. Each university has specific requirements.",
  },
  {
    title: "Submit Your Applications",
    description: "Apply to your shortlisted universities through their official portals or through EduPlan360. We help you prepare strong, compelling applications.",
  },
  {
    title: "Receive Admission Offers",
    description: "Once accepted, you'll receive conditional or unconditional offers. We help you compare offers, understand conditions, and make the best choice.",
  },
  {
    title: "Visa Processing",
    description: "Prepare your visa application with financial documentation, acceptance letters, and travel plans. Our team provides coaching and mock interview preparation.",
  },
  {
    title: "Pre-Departure & Travel",
    description: "Attend our pre-departure briefings covering accommodation, culture, banking, healthcare, and what to expect on arrival at your destination.",
  },
];

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "the-journey", label: "Your Journey, Step by Step" },
];

const QUICK_FACTS = [
  { label: "Average Duration", value: "3 – 6 Months", icon: <Clock className="w-4 h-4" /> },
  { label: "Steps Handled by Us", value: "100%", icon: <CheckCircle2 className="w-4 h-4" /> },
  { label: "Support Level", value: "End-to-End Tracking", icon: <ShieldCheck className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/requirements", label: "Document Requirements" },
  { href: "/study-abroad/choosing-university", label: "Choosing a University" },
  { href: "/study-abroad/interviews", label: "Preparing for Interviews" },
];

export function StudyAbroadProcessClient() {
  return (
    <ResourceDashboardLayout
      title="The Study Abroad Process"
      description="A clear, structured roadmap from your first inquiry to landing at your dream university."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Overview">
         <p className="text-slate-600 leading-relaxed text-base mb-6">
          Studying abroad can feel overwhelming, but it doesn&apos;t have to be. When you break the journey into
          manageable steps — and have expert guidance at each one — it becomes straightforward and even exciting.
         </p>
         <CalloutBox
          title="EduPlan360 handles the complexity"
          text="You don't need to navigate this alone. Our advisors manage timelines, track deadlines, and ensure nothing falls through the cracks. Focus on your goals — we'll manage the process."
          variant="brand"
         />
      </DashboardSection>

      <DashboardSection 
        id="the-journey" 
        title="Your Journey, Step by Step"
        description="Here's an overview of the process from start to finish. At EduPlan360, we support you at every single stage."
       >
        <StepTimeline steps={STEPS} />
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
