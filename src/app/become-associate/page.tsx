import type { Metadata } from "next";
import { BecomeAssociateClient } from "./BecomeAssociateClient";

export const metadata: Metadata = {
  title: "Become an Associate | EduPlan360",
  description:
    "Join the EduPlan360 associate network. Help students access international education opportunities while earning competitive commissions with flexible working.",
};

export default function BecomeAssociatePage() {
  return (
    <main>
      <BecomeAssociateClient />
    </main>
  );
}
