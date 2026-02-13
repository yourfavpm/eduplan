import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Partner With Us | EduPlan360",
    description: "Collaborate with EduPlan360. Partnership opportunities for universities, agencies, and education service providers.",
};

export default function PartnerPage() {
    return (
        <main>
            <h1>Partner With Us</h1>
            <p>Partnership opportunities and contact</p>
            <section>
                <h2>Partnership Opportunities</h2>
                <ul>
                    <li>Universities & Institutions</li>
                    <li>Education Agencies</li>
                    <li>Service Providers</li>
                </ul>
            </section>
            <section>
                <h2>Benefits of Partnership</h2>
                <p>Partnership benefits will be listed here</p>
            </section>
            <section>
                <h2>Get in Touch</h2>
                <p>Partnership inquiry form</p>
            </section>
        </main>
    );
}
