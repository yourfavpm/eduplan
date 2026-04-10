import type { Metadata } from "next";
import { ChoosingCourseClient } from "./ChoosingCourseClient";

export const metadata: Metadata = {
  title: "Choosing a Course | EduPlan360",
  description:
    "How to choose the right course for your study abroad journey — factors to consider, career alignment, and expert advice.",
};

export default function ChoosingCoursePage() {
  return (
    <main>
      <ChoosingCourseClient />
    </main>
  );
}
