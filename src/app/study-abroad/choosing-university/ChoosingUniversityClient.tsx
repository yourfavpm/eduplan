"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { FeatureCards, CalloutBox, ChecklistBlock } from "@/components/resources/ResourceBlocks";
import { Trophy, Wallet, MapPin, Briefcase, Users, Building, Search, LineChart, Target } from "lucide-react";

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "considerations", label: "Key Considerations" },
  { id: "questions", label: "Questions to Ask Yourself" },
];

const QUICK_FACTS = [
  { label: "Global Options", value: "10,000+ Universities", icon: <Search className="w-4 h-4" /> },
  { label: "Top Factor", value: "Employability", icon: <LineChart className="w-4 h-4" /> },
  { label: "Prep Time", value: "Recommended 12 Months", icon: <Target className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/choosing-course", label: "How to Choose a Course" },
  { href: "/study-abroad/process", label: "The Application Process" },
  { href: "/study-abroad/requirements", label: "Document Requirements" },
];

const CONSIDERATIONS = [
  {
    icon: Trophy,
    title: "Rankings & Reputation",
    description:
      "Global and subject-specific rankings can indicate teaching quality, research output, and employer recognition. But don't rely on rankings alone.",
  },
  {
    icon: Wallet,
    title: "Tuition & Living Costs",
    description:
      "Understand the total cost of attendance — tuition, accommodation, food, transport, and insurance. Look for scholarships and funding options.",
  },
  {
    icon: MapPin,
    title: "Location & Lifestyle",
    description:
      "Consider the city, climate, safety, public transport, and cost of living. Urban campuses offer different experiences to rural ones.",
  },
  {
    icon: Briefcase,
    title: "Internship & Work Opportunities",
    description:
      "Universities with strong industry connections and placement programs give you a head start in the job market. Check post-study work visa options too.",
  },
  {
    icon: Users,
    title: "Student Support Services",
    description:
      "Look for universities with dedicated international student support — orientation programs, mentoring, career services, and mental health resources.",
  },
  {
    icon: Building,
    title: "Campus & Facilities",
    description:
      "Modern labs, libraries, student unions, sports facilities, and accommodation options all contribute to your quality of life as a student.",
  },
];

export function ChoosingUniversityClient() {
  return (
    <ResourceDashboardLayout
      title="Choosing a University"
      description="The right university goes beyond rankings — it's about finding the best fit for your goals, budget, and lifestyle."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Strategic Selection">
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          With thousands of universities worldwide, choosing the right one requires careful thought. It&apos;s not
          just about prestige — the best university for you is one that aligns with your academic interests, career
          ambitions, financial situation, and personal preferences.
        </p>
        <CalloutBox
          title="Compare before you commit"
          text="We recommend shortlisting 3–5 universities and comparing them across multiple success factors. Our advisors can help you build a comparison matrix tailored to your priorities."
          variant="brand"
        />
      </DashboardSection>

      <DashboardSection 
        id="considerations" 
        title="Key Considerations"
        description="Here are the most important factors to weigh when evaluating universities:"
      >
        <FeatureCards items={CONSIDERATIONS} columns={3} />
      </DashboardSection>

      <DashboardSection 
        id="questions" 
        title="Questions to Ask Yourself"
        description="Run through this checklist to see if a university is truly the right match for you."
      >
        <ChecklistBlock
          items={[
            "Does this university have strong programs in my field of interest?",
            "Can I afford the total cost — or is financial aid available?",
            "Is the location somewhere I'd enjoy living for 1–4 years?",
            "What are the post-graduation employment rates for this program?",
            "Does the university offer support for international students?",
            "Are there alumni in my target industry or region?",
          ]}
        />
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
