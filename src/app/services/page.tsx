import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | EduPlan360",
    description: "Comprehensive study abroad services - from course selection to visa support. Get expert guidance every step of the way.",
};

export default function ServicesPage() {
    return (
        <main>
            <h1>Our Services</h1>
            <p>Outcome-focused service offerings</p>
            <section>
                <h2>What We Offer</h2>
                <ul>
                    <li>Course Matching & Selection</li>
                    <li>Admission Processing</li>
                    <li>Document Review & Assistance</li>
                    <li>Visa Support</li>
                    <li>Interview Preparation</li>
                    <li>English Test Support</li>
                    <li>Application Tracking</li>
                </ul>
            </section>
        </main>
    );
}
