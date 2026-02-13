import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About EduPlan360",
    description: "Learn about EduPlan360's mission to simplify international education and help students achieve their study abroad dreams.",
};

export default function AboutPage() {
    return (
        <main>
            <h1>About EduPlan360</h1>
            <section>
                <h2>Our Mission</h2>
                <p>Mission statement</p>
            </section>
            <section>
                <h2>Our Story</h2>
                <p>Company background</p>
            </section>
            <section>
                <h2>Our Team</h2>
                <p>Advisor profiles and team photos</p>
            </section>
            <section>
                <h2>Why Choose Us</h2>
                <ul>
                    <li>Expert guidance</li>
                    <li>Proven track record</li>
                    <li>Personalized support</li>
                </ul>
            </section>
        </main>
    );
}
