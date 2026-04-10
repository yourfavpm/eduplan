"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { ChecklistBlock, CalloutBox } from "@/components/resources/ResourceBlocks";
import { Users, FileQuestion, Sparkles } from "lucide-react";

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "what-to-expect", label: "What to Expect" },
  { id: "questions", label: "Sample Questions" },
  { id: "how-to-prepare", label: "How to Prepare" },
];

const QUICK_FACTS = [
  { label: "Format", value: "Video or In-Person", icon: <Users className="w-4 h-4" /> },
  { label: "Duration", value: "15-30 Minutes", icon: <FileQuestion className="w-4 h-4" /> },
  { label: "Impact", value: "High Impression value", icon: <Sparkles className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/process", label: "The Application Process" },
  { href: "/study-abroad/personal-statement", label: "Personal Statement Guide" },
];

const SAMPLE_QUESTIONS = [
  "Why did you choose this course and university?",
  "How will this program help your career goals?",
  "Tell us about your academic background and achievements.",
  "How do you plan to finance your studies?",
  "What are your plans after graduation?",
  "Why did you choose this country as your study destination?",
  "Can you describe a challenge you overcame and what you learned?",
  "What extracurricular activities are you involved in?",
];

const TIPS = [
  "Research the university and program thoroughly before the interview",
  "Practise common questions with a friend or advisor",
  "Dress professionally — first impressions matter",
  "Be honest and authentic in your responses",
  "Prepare 2–3 thoughtful questions to ask the interviewer",
  "Stay calm, speak clearly, and maintain eye contact",
  "Follow up with a thank-you email after the interview",
];

export function InterviewsClient() {
  return (
    <ResourceDashboardLayout
      title="Preparing for Interviews"
      description="A confident, well-prepared interview can make all the difference in your admission and visa outcomes."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Why Interviews Matter">
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Some universities and most visa processes include an interview stage. This is your chance to demonstrate
          your motivation, readiness, and fit — beyond what&apos;s written on paper. With the right preparation,
          interviews become an opportunity, not a hurdle.
        </p>
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Interviews help admissions officers and visa officials assess your communication skills, clarity of
          purpose, and genuine intent. A strong interview can compensate for weaker areas of your application, while
          a poor one can undermine even the strongest academic profile.
        </p>
      </DashboardSection>

      <DashboardSection 
        id="what-to-expect" 
        title="What to Expect"
      >
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Most admission interviews last 15–30 minutes and can be conducted in person, via video call, or by
          phone. Visa interviews are typically shorter and more structured, focusing on your plans, finances, and
          ties to your home country.
        </p>
      </DashboardSection>

      <DashboardSection 
        id="questions" 
        title="Sample Interview Questions"
        description="While every interview is different, these are commonly asked questions across universities and visa offices."
      >
        <ChecklistBlock items={SAMPLE_QUESTIONS} />
      </DashboardSection>

      <DashboardSection 
        id="how-to-prepare" 
        title="How to Prepare"
      >
        <ChecklistBlock title="Interview Preparation Tips" items={TIPS} />
        
        <CalloutBox
          title="EduPlan360 Interview Coaching"
          text="We provide one-on-one mock interview sessions to help you feel confident and prepared. Our advisors simulate real interview conditions and give you honest, actionable feedback."
          variant="brand"
        />
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
