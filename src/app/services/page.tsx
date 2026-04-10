import type { Metadata } from "next";
import { AdmissionProcessingClient } from "./AdmissionProcessingClient";

export const metadata: Metadata = {
  title: "Admission Processing | EduPlan360",
  description:
    "Comprehensive admission processing services — course matching, document review, visa support, interview prep, and application tracking for international students.",
};

export default function ServicesPage() {
  return (
    <main>
      <AdmissionProcessingClient />
    </main>
  );
}
