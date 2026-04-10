"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { FeatureCards, CalloutBox } from "@/components/resources/ResourceBlocks";
import { Target, Heart, TrendingUp, BookOpen, Compass, SearchCheck } from "lucide-react";

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "factors", label: "Key Factors to Consider" },
  { id: "practical", label: "Practical Considerations" },
];

const QUICK_FACTS = [
  { label: "Core Strategy", value: "Match passion to demand", icon: <Compass className="w-4 h-4" /> },
  { label: "Career Focus", value: "High Priority", icon: <Target className="w-4 h-4" /> },
  { label: "Evaluation", value: "Curriculum review", icon: <SearchCheck className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/choosing-university", label: "Choosing a University" },
  { href: "/study-abroad/process", label: "The Application Process" },
  { href: "/study-abroad/requirements", label: "Document Requirements" },
];

const FACTORS = [
  {
    icon: Target,
    title: "Career Goals",
    description:
      "Choose a course that directly aligns with the career you want. Research job market demand, salary expectations, and industry trends in your chosen field.",
  },
  {
    icon: Heart,
    title: "Genuine Interest",
    description:
      "Passion sustains motivation. Pick a subject you're genuinely curious about — you'll perform better and enjoy the experience more.",
  },
  {
    icon: TrendingUp,
    title: "Industry Demand",
    description:
      "Consider fields with growing global demand — technology, healthcare, business analytics, sustainability. High-demand fields offer better job prospects post-graduation.",
  },
  {
    icon: BookOpen,
    title: "Course Structure",
    description:
      "Look at the curriculum, teaching style, assessments, and practical components. Some programs emphasise research, others focus on applied skills and internships.",
  },
];

export function ChoosingCourseClient() {
  return (
    <ResourceDashboardLayout
      title="Choosing a Course"
      description="The course you choose shapes your entire study abroad experience — and your career trajectory afterward."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Finding Your Path">
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          With thousands of programs available across hundreds of universities worldwide, choosing the right course
          can feel overwhelming. But it doesn&apos;t have to be. When you focus on the right factors, the decision
          becomes much clearer.
        </p>
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Your course determines what you study, how you learn, and what career doors open for you after graduation.
          A well-chosen program aligns your passions with market opportunities — giving you both fulfilment and
          competitive advantage.
        </p>
      </DashboardSection>

      <DashboardSection 
        id="factors" 
        title="Key Factors to Consider"
        description="Filter your endless options by focusing on these core pillars."
      >
        <FeatureCards items={FACTORS} columns={2} />
      </DashboardSection>

      <DashboardSection 
        id="practical" 
        title="Practical Considerations"
      >
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Beyond passion and career fit, think about practical elements. What&apos;s the tuition cost? Is the course
          available part-time or online? Are there scholarship opportunities? Does the program include a placement
          year or international exchange? These details can significantly impact your experience and outcomes.
        </p>
        <CalloutBox
          title="Not sure which course is right for you?"
          text="Our advisors help you map your interests, skills, and career goals to the best programs available. We'll shortlist options tailored to your profile."
          variant="brand"
        />
      </DashboardSection>

    </ResourceDashboardLayout>
  );
}
