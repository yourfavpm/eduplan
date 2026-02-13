import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Associates | EduPlan360",
    description: "Meet our network of education consultants helping students worldwide.",
};

export default function AssociatesPage() {
    return (
        <main>
            <h1>Our Associates</h1>
            <p>Directory of associates</p>
            <section>
                <h2>Associate Network</h2>
                <p>Associate profiles and locations</p>
            </section>
            <section>
                <h2>Become an Associate</h2>
                <p>Call-to-action to join the network</p>
            </section>
        </main>
    );
}
