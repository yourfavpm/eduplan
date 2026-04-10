import type { Metadata } from "next";
import { DocumentRequirementsClient } from "./DocumentRequirementsClient";

export const metadata: Metadata = {
  title: "Document Requirements | EduPlan360",
  description:
    "A comprehensive checklist of documents required for studying abroad — academic, identity, and supporting documents.",
};

export default function RequirementsPage() {
  return (
    <main>
      <DocumentRequirementsClient />
    </main>
  );
}
