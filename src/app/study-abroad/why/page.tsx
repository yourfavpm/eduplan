import type { Metadata } from "next";
import { WhyStudyAbroadClient } from "./WhyStudyAbroadClient";

export const metadata: Metadata = {
  title: "Why Study Abroad | EduPlan360",
  description:
    "Discover the life-changing benefits of studying abroad — global exposure, career advancement, personal growth, and cultural immersion.",
};

export default function WhyStudyAbroadPage() {
  return (
    <main>
      <WhyStudyAbroadClient />
    </main>
  );
}
