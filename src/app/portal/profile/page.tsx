import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "My Profile | Student Portal",
    description: "Manage your account and personal information.",
};

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <main>
            <h1>My Profile</h1>
            <section>
                <h2>Personal Information</h2>
                <p>Profile form will go here</p>
                <ul>
                    <li>Name</li>
                    <li>Email</li>
                    <li>Phone</li>
                    <li>Date of birth</li>
                    <li>Nationality</li>
                    <li>Passport number</li>
                </ul>
            </section>
            <section>
                <h2>Study Preferences</h2>
                <ul>
                    <li>Education level</li>
                    <li>Field of interest</li>
                    <li>Preferred countries</li>
                    <li>Budget range</li>
                </ul>
            </section>
            <section>
                <h2>Account Settings</h2>
                <ul>
                    <li>Change password</li>
                    <li>Notification preferences</li>
                </ul>
            </section>
        </main>
    );
}
