import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | EduPlan360",
    description: "Access your student portal to track applications, upload documents, and manage your study abroad journey.",
};

export default function LoginPage() {
    return (
        <main>
            <h1>Login</h1>
            <p>Student portal authentication</p>
            <div>
                <h2>Sign In</h2>
                <p>Login form will go here</p>
                <ul>
                    <li>Email/Password login</li>
                    <li>Google OAuth</li>
                    <li>Forgot password link</li>
                    <li>Create account link</li>
                </ul>
            </div>
        </main>
    );
}
