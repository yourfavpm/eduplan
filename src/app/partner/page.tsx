import type { Metadata } from "next";
import { PartnerWithUsClient } from "./PartnerWithUsClient";

export const metadata: Metadata = {
  title: "Partner With Us | EduPlan360",
  description:
    "Collaborate with EduPlan360 — partnership opportunities for universities, education agencies, language providers, and student service companies.",
};

export default function PartnerPage() {
  return (
    <main>
      <PartnerWithUsClient />
    </main>
  );
}
