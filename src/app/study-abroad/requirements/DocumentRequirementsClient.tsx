"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { ChecklistBlock, CalloutBox } from "@/components/resources/ResourceBlocks";
import { AlertCircle, FileSearch, ShieldAlert } from "lucide-react";

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "academic", label: "Academic Documents" },
  { id: "identity", label: "Identity & Legal Documents" },
  { id: "supporting", label: "Supporting Documents" },
];

const QUICK_FACTS = [
  { label: "Criticality", value: "High Priority", icon: <AlertCircle className="w-4 h-4" /> },
  { label: "Top Rejection Reason", value: "Incomplete docs", icon: <ShieldAlert className="w-4 h-4" /> },
  { label: "Verification", value: "Strict auditing", icon: <FileSearch className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/process", label: "The Study Abroad Process" },
  { href: "/study-abroad/personal-statement", label: "Personal Statement Guide" },
  { href: "/study-abroad/interviews", label: "Preparing for Interviews" },
];

export function DocumentRequirementsClient() {
  return (
    <ResourceDashboardLayout
      title="Document Requirements"
      description="A complete guide to the documents you'll need for your study abroad applications."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="Vital Preparation">
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          Having the right documents ready is one of the most critical parts of your study abroad journey.
          Incomplete or incorrect documentation is the number one reason applications get delayed or rejected.
          Here&apos;s everything you need to prepare.
        </p>
        <CalloutBox
          title="Need help organising your documents?"
          text="Our advisors provide a personalised checklist based on your destination and program. We also review your documents before submission to ensure nothing is missing."
          variant="brand"
        />
      </DashboardSection>

      <DashboardSection 
        id="academic" 
        title="Academic Documents"
        description="Universities need to verify your academic history and qualifications. Make sure these are certified and translated if they're not in English."
      >
        <ChecklistBlock
          items={[
            "Official academic transcripts (all years)",
            "Degree certificates or provisional certificates",
            "English language proficiency scores (IELTS, TOEFL, PTE, or equivalent)",
            "Academic reference letters (1–2)",
            "Course syllabi or module descriptions (for credit transfer)",
          ]}
        />
      </DashboardSection>

      <DashboardSection 
        id="identity" 
        title="Identity & Legal Documents"
        description="These documents verify your identity and eligibility to travel and study internationally."
      >
        <ChecklistBlock
          items={[
            "Valid international passport (minimum 6 months validity)",
            "Birth certificate",
            "Passport-sized photographs (as per destination country specs)",
            "National ID card (where applicable)",
            "Police clearance certificate (for some countries)",
          ]}
        />
      </DashboardSection>

      <DashboardSection 
        id="supporting" 
        title="Supporting Documents"
        description="These vary by country and university but are typically required during the visa stage or admission confirmation."
      >
        <ChecklistBlock
          items={[
            "Personal statement / Statement of purpose",
            "CV or résumé",
            "Proof of financial capability (bank statements, scholarship letters, sponsor letters)",
            "Health / medical examination report",
            "Proof of accommodation (for visa applications)",
            "Travel insurance documentation",
          ]}
        />
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
