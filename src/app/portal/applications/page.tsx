import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "My Applications | Student Portal",
    description: "Track and manage your university applications.",
};

export default async function ApplicationsPage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <main>
            <h1>My Applications</h1>
            <section>
                <h2>Applications</h2>
                <p>List of applications with status</p>
                <ul>
                    <li>University name</li>
                    <li>Program</li>
                    <li>Status (draft, submitted, under review, accepted, rejected)</li>
                    <li>Application date</li>
                </ul>
            </section>
            <section>
                <h2>Start New Application</h2>
                <p>Button to create new application</p>
            </section>
        </main>
    );
}
