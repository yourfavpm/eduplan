import type { Metadata } from "next";
import DestinationsHubClient from "./DestinationsHubClient";

export const metadata: Metadata = {
  title: "Study Destinations | EduPlan360",
  description:
    "Explore top study abroad destinations worldwide. Compare countries, discover opportunities, and find the perfect path for your international education journey.",
  openGraph: {
    title: "Study Destinations | EduPlan360",
    description:
      "Explore top study abroad destinations worldwide. Compare countries, discover opportunities, and find the perfect path for your international education journey.",
    type: "website",
  },
};

export default function DestinationsPage() {
  return (
    <main>
      <DestinationsHubClient />
    </main>
  );
}
