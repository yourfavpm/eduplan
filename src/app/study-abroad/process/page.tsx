import type { Metadata } from "next";
import { StudyAbroadProcessClient } from "./StudyAbroadProcessClient";

export const metadata: Metadata = {
  title: "The Study Abroad Process | EduPlan360",
  description:
    "A step-by-step guide to studying abroad — from choosing your course and university to visa processing and departure.",
};

export default function ProcessPage() {
  return (
    <main>
      <StudyAbroadProcessClient />
    </main>
  );
}
