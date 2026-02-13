import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Free Consultation | EduPlan360",
    description: "Schedule a free consultation with our expert advisors. Get personalized guidance for your study abroad journey.",
};

export default function BookConsultationPage() {
    return (
        <main>
            <h1>Book Free Consultation</h1>
            <p>Consultation booking form will go here</p>
            <div>
                <h2>What to Expect</h2>
                <ul>
                    <li>30-minute personalized consultation</li>
                    <li>Expert advice on universities and programs</li>
                    <li>Scholarship opportunities</li>
                    <li>Application timeline planning</li>
                </ul>
            </div>
            <div>
                <h2>Booking Form</h2>
                <p>Form fields: Name, Email, Phone, Country of Interest, Study Level, Preferred Date/Time, Message</p>
            </div>
        </main>
    );
}
