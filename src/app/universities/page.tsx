import type { Metadata } from "next";
import { UniversityDirectoryClient } from "./UniversityDirectoryClient";

export const metadata: Metadata = {
  title: "University Directory | EduPlan360",
  description:
    "Explore universities worldwide. Filter by country, study level, and course. View details, rankings, and apply with EduPlan360.",
};

export default function UniversitiesPage() {
  return (
    <main>
      <UniversityDirectoryClient />
    </main>
  );
}
