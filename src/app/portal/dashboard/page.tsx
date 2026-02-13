import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Dashboard | Student Portal",
    description: "Overview of your study abroad journey and application status.",
};

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <main>
            <h1>Dashboard</h1>
            <p>Student: {session.user?.name || session.user?.email}</p>
            <section>
                <h2>Quick Stats</h2>
                <ul>
                    <li>Applications in progress</li>
                    <li>Pending documents</li>
                    <li>Upcoming deadlines</li>
                </ul>
            </section>
            <section>
                <h2>Recent Activity</h2>
                <p>Timeline of recent actions</p>
            </section>
        </main>
    );
}
