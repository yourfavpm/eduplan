import type { Metadata } from "next";
import { ScholarshipDirectoryClient } from "./ScholarshipDirectoryClient";

export const metadata: Metadata = {
  title: "Scholarships | EduPlan360",
  description:
    "Discover scholarships for international students. Search by country, level, funding type, and deadlines. Get expert guidance on your scholarship application.",
};

export default function ScholarshipsPage() {
  return (
    <main>
      <ScholarshipDirectoryClient />
    </main>
  );
}
