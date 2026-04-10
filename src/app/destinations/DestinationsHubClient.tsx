"use client";

import { DestinationsHero } from "@/components/destinations/DestinationsHero";
import { FeaturedDestinations } from "@/components/destinations/FeaturedDestinations";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { WhyDestinationMatters } from "@/components/destinations/WhyDestinationMatters";
import { ComparisonSnapshot } from "@/components/destinations/ComparisonSnapshot";
import { SuccessStoriesSimple } from "@/components/home/success-stories/SuccessStoriesSimple";
import { HigherEdNewsSection } from "@/components/home/news/HigherEdNewsSection";
import { NextStepsSection } from "@/components/home/NextStepsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export default function DestinationsHubClient() {
  return (
    <>
      <DestinationsHero />
      <FeaturedDestinations />
      <DestinationExplorer />
      <WhyDestinationMatters />
      <ComparisonSnapshot />
      <SuccessStoriesSimple />
      <HigherEdNewsSection />
      <NextStepsSection />
      <FinalCTASection />
    </>
  );
}
