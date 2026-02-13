import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events & Webinars | EduPlan360",
    description: "Join our upcoming study abroad webinars, university fairs, and information sessions.",
};

export default function EventsPage() {
    return (
        <main>
            <h1>Events & Webinars</h1>
            <section>
                <h2>Upcoming Events</h2>
                <p>Event cards will display here</p>
            </section>
            <section>
                <h2>Past Events</h2>
                <p>Archive of previous events</p>
            </section>
        </main>
    );
}
