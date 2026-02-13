import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Policies | EduPlan360",
    description: "Privacy policy, terms of service, and other legal policies.",
};

export default function PoliciesPage() {
    return (
        <main>
            <h1>Policies</h1>
            <section>
                <h2>Our Policies</h2>
                <ul>
                    <li><a href="/policies/privacy">Privacy Policy</a></li>
                    <li><a href="/policies/terms">Terms of Service</a></li>
                    <li><a href="/policies/refund">Refund Policy</a></li>
                    <li><a href="/policies/cookies">Cookie Policy</a></li>
                </ul>
            </section>
        </main>
    );
}
