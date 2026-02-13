import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Become an Associate | EduPlan360",
    description: "Join our network of education consultants. Earn commissions while helping students achieve their study abroad dreams.",
};

export default function BecomeAssociatePage() {
    return (
        <main>
            <h1>Become an Associate</h1>
            <p>Associate recruitment and application</p>
            <section>
                <h2>Why Become an Associate?</h2>
                <ul>
                    <li>Flexible working schedule</li>
                    <li>Competitive commission structure</li>
                    <li>Comprehensive training provided</li>
                    <li>Support from experienced team</li>
                </ul>
            </section>
            <section>
                <h2>What You'll Do</h2>
                <ul>
                    <li>Connect students with opportunities</li>
                    <li>Guide application process</li>
                    <li>Earn for successful referrals</li>
                </ul>
            </section>
            <section>
                <h2>Application Form</h2>
                <p>Form fields: Name, Email, Phone, Location, Experience, Why Join</p>
            </section>
            <section>
                <h2>Our Associates</h2>
                <p>List of current associates (optional showcase)</p>
            </section>
        </main>
    );
}
