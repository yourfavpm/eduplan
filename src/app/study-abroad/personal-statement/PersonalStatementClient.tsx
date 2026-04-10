"use client";

import {
  ResourceDashboardLayout,
  DashboardSection,
} from "@/components/resources/ResourceDashboardLayout";
import { ChecklistBlock, CalloutBox, DosAndDonts } from "@/components/resources/ResourceBlocks";
import { FileText, SpellCheck, Trophy } from "lucide-react";

const TOC_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "what-to-include", label: "What to Include" },
  { id: "structure", label: "How to Structure It" },
  { id: "dos-donts", label: "Do's and Don'ts" },
];

const QUICK_FACTS = [
  { label: "Word Count", value: "Typically 500-1000", icon: <FileText className="w-4 h-4" /> },
  { label: "Tone", value: "Professional yet Personal", icon: <SpellCheck className="w-4 h-4" /> },
  { label: "Impact", value: "Differentiator", icon: <Trophy className="w-4 h-4" /> },
];

const RELATED_LINKS = [
  { href: "/study-abroad/process", label: "The Application Process" },
  { href: "/study-abroad/requirements", label: "Document Requirements" },
];

export function PersonalStatementClient() {
  return (
    <ResourceDashboardLayout
      title="Personal Statement Guidelines"
      description="Your personal statement is your chance to tell your story — make it compelling, authentic, and memorable."
      tocLinks={TOC_LINKS}
      quickFacts={QUICK_FACTS}
      relatedLinks={RELATED_LINKS}
    >
      <DashboardSection id="overview" title="The Story of You">
        <p className="text-slate-600 leading-relaxed text-base mb-6">
          A personal statement is a written essay submitted as part of your university application. It&apos;s your
          opportunity to go beyond grades and test scores — to show admissions teams who you are, why you&apos;re
          passionate about your chosen field, and what makes you a strong candidate.
        </p>
      </DashboardSection>

      <DashboardSection 
        id="what-to-include" 
        title="What to Include"
        description="A great personal statement covers several key areas. Think of it as answering: “Why this course, why this university, and why you?”"
      >
        <ChecklistBlock
          items={[
            "Why you chose this specific course — your genuine motivation",
            "Why this university — what attracted you beyond just ranking",
            "Your academic background — relevant subjects, projects, and achievements",
            "Relevant work experience, internships, or volunteering",
            "Your career goals — how this program fits into your long-term plan",
            "Personal qualities — leadership, resilience, teamwork, curiosity",
            "Extracurricular activities that show breadth and commitment",
          ]}
        />
      </DashboardSection>

      <DashboardSection 
        id="structure" 
        title="How to Structure It"
        description="Structure it with a clear opening, a detailed middle that covers your motivations, and a strong conclusion."
      >
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">1. Opening</h4>
            <p className="text-sm text-slate-600">Start with something engaging — a personal anecdote, a defining moment, or a bold statement about your goals. Avoid clichéd phrases like “I have always been passionate about…”</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">2. Middle</h4>
            <p className="text-sm text-slate-600">This is the substance. Connect your academic background, experiences, and skills to the course. Use specific examples rather than vague claims.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-2">3. Conclusion</h4>
            <p className="text-sm text-slate-600">End confidently. Summarise your key motivations and express enthusiasm for the opportunity. Leave the reader with a strong impression.</p>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection id="dos-donts" title="Do's and Don'ts">
        <DosAndDonts
          dos={[
            "Be authentic — write in your own voice",
            "Use specific examples and evidence",
            "Show genuine enthusiasm for the subject",
            "Proofread multiple times for errors",
            "Tailor it to each university when possible",
            "Get feedback from a mentor or advisor",
          ]}
          donts={[
            "Copy or plagiarise from online templates",
            "Use overly complex or flowery language",
            "List achievements without context or reflection",
            "Exceed the word limit",
            "Submit without proofreading",
            "Make it generic — one size fits all rarely works",
          ]}
        />
        
        <CalloutBox
          title="Need help writing yours?"
          text="Our team reviews and provides detailed feedback on personal statements. We'll help you craft a compelling narrative that stands out — without writing it for you."
          variant="brand"
        />
      </DashboardSection>
    </ResourceDashboardLayout>
  );
}
