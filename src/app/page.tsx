import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { AdvisorsSection } from "@/components/home/AdvisorsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { NextStepsSection } from "@/components/home/NextStepsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

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
      <HowItWorks />
      <DestinationsSection />
      <ServicesSection />
      <SuccessStoriesSection />
      <AdvisorsSection />
      <StatsSection />
      <WhyChooseUs />
      <NextStepsSection />
      <FinalCTASection />
    </>
  );
}
