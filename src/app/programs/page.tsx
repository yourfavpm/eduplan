import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Programs & Courses | EduPlan360",
    description: "Find the perfect program for your studies abroad. Filter by country, level, field of study, and budget.",
};

export default function ProgramsPage() {
    return (
        <main>
            <h1>Programs & Courses</h1>
            <p>Filterable program listing</p>
            <div>
                <h2>Filters</h2>
                <ul>
                    <li>Level (Undergraduate, Masters, PhD)</li>
                    <li>Country</li>
                    <li>Field of Study</li>
                    <li>Budget Range</li>
                </ul>
            </div>
            <div>
                <h2>Program Results</h2>
                <p>Program cards will display here</p>
            </div>
        </main>
    );
}
