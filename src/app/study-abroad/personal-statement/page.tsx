import type { Metadata } from "next";
import { PersonalStatementClient } from "./PersonalStatementClient";

export const metadata: Metadata = {
  title: "Personal Statement Guidelines | EduPlan360",
  description:
    "How to write a compelling personal statement for university applications — structure, tips, do's and don'ts.",
};

export default function PersonalStatementPage() {
  return (
    <main>
      <PersonalStatementClient />
    </main>
  );
}
