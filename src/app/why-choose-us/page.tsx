import type { Metadata } from "next";
import { WhyChooseClient } from "./WhyChooseClient";

export const metadata: Metadata = {
  title: "Why Choose EduPlan360 | Study Abroad Simplified",
  description:
    "Discover why thousands of students trust EduPlan360 — experienced advisors, global university partnerships, transparent processes, and end-to-end support for your study abroad journey.",
  openGraph: {
    title: "Why Choose EduPlan360 | Study Abroad Simplified",
    description:
      "Discover why thousands of students trust EduPlan360 for their study abroad journey.",
    type: "website",
  },
};

export default function WhyChooseUsPage() {
  return (
    <main>
      <WhyChooseClient />
    </main>
  );
}
