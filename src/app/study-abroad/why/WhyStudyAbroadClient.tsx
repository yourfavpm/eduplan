"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { FeatureCards, CalloutBox } from "@/components/resources/ResourceBlocks";
import { Globe, Briefcase, Users, Heart, GraduationCap, MapPin, Award, UserCheck } from "lucide-react";

const BENEFITS = [
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Immerse yourself in a new culture, build an international network, and develop a truly global perspective.",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    description: "Gain access to international job markets, build connections with global employers, and unlock rare paths.",
  },
  {
    icon: Heart,
    title: "Personal Growth",
    description: "Develop independence, resilience, and confidence. Living abroad builds life skills that no classroom can teach.",
  },
  {
    icon: GraduationCap,
    title: "World-Class Education",
    description: "Study at globally ranked universities with cutting-edge curricula, research opportunities, and top-tier faculty.",
  },
  {
    icon: Users,
    title: "Cultural Immersion",
    description: "Experience new traditions, languages, and ways of thinking. Cultural fluency is a major asset today.",
  },
];

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "benefits", label: "Key Benefits of Studying Abroad" },
  { id: "suitability", label: "Is it Right for You?" },
];

const QUICK_FACTS = [
  { label: "Top Destinations", value: "UK, USA, Canada, Australia", icon: <MapPin className="w-4 h-4" /> },
  { label: "Visa Success Rate", value: "Average 95% Approval", icon: <Award className="w-4 h-4" /> },
  { label: "Students Placed", value: "1,200+ globally", icon: <UserCheck className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/process", label: "The Application Process" },
  { href: "/study-abroad/choosing-course", label: "How to Choose a Course" },
  { href: "/study-abroad/requirements", label: "Standard Requirements" },
];

export function WhyStudyAbroadClient() {
  return (
    <ResourceDashboardLayout
      title="Why Study Abroad?"
      description="The ultimate guide to understanding how an international education accelerates your career and personal growth."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection 
        id="overview" 
        title="Overview"
      >
        <div className="grid md:grid-cols-[1fr_250px] gap-8">
          <p className="text-slate-600 leading-relaxed text-base">
            Every year, millions of students choose to pursue their education in a different country. 
            They return with more than a degree — they come back with a broader worldview, deeper self-awareness, 
            and a competitive edge in the global job market.<br/><br/>
            Whether you&apos;re pursuing a bachelor&apos;s, master&apos;s, or professional qualification, 
            studying overseas opens doors that simply aren&apos;t available locally. It is often cited as a 
            transformational pivot in young professionals&apos; lives.
          </p>
          <div className="bg-brand-50 rounded-2xl p-5 border border-brand-100 flex flex-col justify-center text-center">
             <div className="text-3xl font-black text-brand-700 mb-1">6M+</div>
             <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Students abroad globally</div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection 
        id="benefits" 
        title="Key Benefits of Studying Abroad"
        description="The advantages of an international education extend far beyond the classroom."
      >
        {/* We reuse FeatureCards from ResourceBlocks since it maps correctly to the user's card request */}
        <FeatureCards items={BENEFITS} columns={3} />
      </DashboardSection>

      <DashboardSection 
        id="suitability" 
        title="Is Studying Abroad Right for You?"
      >
        <div className="flex flex-col gap-6">
          <p className="text-slate-600 leading-relaxed text-base">
            If you&apos;re ambitious, curious, and ready for a challenge, studying abroad could be the single best
            investment in your future. It&apos;s not just about getting a qualification — it&apos;s about becoming
            a more capable, adaptable, and globally-minded individual.
          </p>

          <CalloutBox
            title="Not sure where to start?"
            text="Our advisors help you assess your goals, recommend destinations, and build a personalised plan. Book a free consultation to get started."
            variant="brand"
          />
        </div>
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
