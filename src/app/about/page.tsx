import type { Metadata } from "next";
import { WhoWeAreClient } from "./WhoWeAreClient";

export const metadata: Metadata = {
  title: "Who We Are | EduPlan360",
  description:
    "Learn about EduPlan360 — a trusted international education consultancy guiding students toward global opportunities with expert advice, university partnerships, and end-to-end support.",
  openGraph: {
    title: "Who We Are | EduPlan360",
    description:
      "Learn about EduPlan360 — a trusted international education consultancy guiding students toward global opportunities.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      <WhoWeAreClient />
    </main>
  );
}
