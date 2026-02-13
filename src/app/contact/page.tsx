import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | EduPlan360",
    description: "Get in touch with EduPlan360. Call, email, or visit our offices.",
};

export default function ContactPage() {
    return (
        <main>
            <h1>Contact Us</h1>
            <section>
                <h2>Get in Touch</h2>
                <div>
                    <h3>Phone</h3>
                    <p>Contact number</p>
                </div>
                <div>
                    <h3>Email</h3>
                    <p>Contact email</p>
                </div>
                <div>
                    <h3>WhatsApp</h3>
                    <p>WhatsApp number</p>
                </div>
                <div>
                    <h3>Office Locations</h3>
                    <p>Office addresses</p>
                </div>
            </section>
            <section>
                <h2>Send Us a Message</h2>
                <p>Contact form will go here</p>
            </section>
        </main>
    );
}
