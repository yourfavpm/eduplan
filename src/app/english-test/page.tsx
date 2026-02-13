import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "English Language Tests | EduPlan360",
    description: "Information about IELTS, TOEFL, PTE, and other English proficiency tests for studying abroad.",
};

export default function EnglishTestPage() {
    return (
        <main>
            <h1>English Language Tests</h1>
            <section>
                <h2>Test Types</h2>
                <ul>
                    <li>IELTS</li>
                    <li>TOEFL</li>
                    <li>PTE</li>
                    <li>Duolingo English Test</li>
                </ul>
            </section>
            <section>
                <h2>Preparation Resources</h2>
                <p>Test prep guidance and tips</p>
            </section>
            <section>
                <h2>Test Requirements by Country</h2>
                <p>Country-specific requirements</p>
            </section>
        </main>
    );
}
