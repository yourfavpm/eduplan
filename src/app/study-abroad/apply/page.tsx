import type { Metadata } from "next";
import { ApplyToStudyClient } from "./ApplyToStudyClient";

export const metadata: Metadata = {
  title: "Apply to Study | EduPlan360",
  description:
    "How to apply to study abroad with EduPlan360 — a step-by-step application guide with expert support at every stage.",
};

export default function ApplyToStudyPage() {
  return (
    <main>
      <ApplyToStudyClient />
    </main>
  );
}
