import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Scholarships | EduPlan360",
    description: "Discover scholarships for international students. Search by country, level, funding type, and deadlines.",
};

export default function ScholarshipsPage() {
    return (
        <main>
            <h1>Scholarships</h1>
            <p>Scholarship discovery and search</p>
            <div>
                <h2>Search & Filters</h2>
                <ul>
                    <li>Country</li>
                    <li>Study Level</li>
                    <li>Funding Type (Full/Partial)</li>
                    <li>Deadline</li>
                </ul>
            </div>
            <div>
                <h2>Featured Scholarships</h2>
                <p>Scholarship cards will display here</p>
            </div>
        </main>
    );
}
