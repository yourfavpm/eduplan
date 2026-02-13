import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Study Abroad Guide | EduPlan360",
    description: "Complete guide to studying abroad - from choosing a university to getting your visa. Expert resources and step-by-step guidance.",
};

export default function StudyAbroadPage() {
    return (
        <main>
            <h1>Study Abroad</h1>
            <p>Hub page with grouped content sections</p>
            <section>
                <h2>Getting Started</h2>
                <ul>
                    <li>Why Study Abroad</li>
                    <li>Study Abroad Process</li>
                    <li>Apply to Study</li>
                </ul>
            </section>
            <section>
                <h2>Prepare Your Application</h2>
                <ul>
                    <li>Documentation Checklist</li>
                    <li>Personal Statement Guide</li>
                    <li>Interview Prep</li>
                </ul>
            </section>
            <section>
                <h2>Plan Your Studies</h2>
                <ul>
                    <li>Choosing a Course</li>
                    <li>Choosing a University</li>
                </ul>
            </section>
        </main>
    );
}
