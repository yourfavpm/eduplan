import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesBento } from "@/components/home/ServicesBento";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { SuccessStoriesSimple } from "@/components/home/success-stories/SuccessStoriesSimple";
import { StatsSection } from "@/components/home/StatsSection";
import { NextStepsSection } from "@/components/home/NextStepsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { HigherEdNewsSection } from "@/components/home/news/HigherEdNewsSection";

export const metadata: Metadata = {
  title: "EduPlan360 | Study Abroad Simplified",
  description: "Expert guidance for your international education journey. Get admitted to top universities worldwide with visa support and scholarship assistance.",
  openGraph: {
    title: "EduPlan360 | Study Abroad Simplified",
    description: "Expert guidance for your international education journey. Get admitted to top universities worldwide with visa support and scholarship assistance.",
    type: "website",
  }
};



export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesBento />
      <DestinationsSection />
      <SuccessStoriesSimple />
      <StatsSection />
      <LogoMarquee />
      <HigherEdNewsSection />
      <NextStepsSection />
      <FinalCTASection />
    </>
  );
}
