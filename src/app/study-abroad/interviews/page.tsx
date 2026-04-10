import type { Metadata } from "next";
import { InterviewsClient } from "./InterviewsClient";

export const metadata: Metadata = {
  title: "Preparing for Interviews | EduPlan360",
  description:
    "Expert tips on preparing for university admission and visa interviews — what to expect, how to prepare, and sample questions.",
};

export default function InterviewsPage() {
  return (
    <main>
      <InterviewsClient />
    </main>
  );
}
