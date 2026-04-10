import type { Metadata } from "next";
import { ChoosingUniversityClient } from "./ChoosingUniversityClient";

export const metadata: Metadata = {
  title: "Choosing a University | EduPlan360",
  description:
    "Key factors for choosing the right university abroad — rankings, cost, location, internships, student support, and more.",
};

export default function ChoosingUniversityPage() {
  return (
    <main>
      <ChoosingUniversityClient />
    </main>
  );
}
