import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Student Portal | EduPlan360",
    description: "Your personal dashboard for tracking applications and managing documents.",
};

export default async function PortalPage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <main>
            <h1>Student Portal</h1>
            <p>Redirecting to dashboard...</p>
        </main>
    );
}
