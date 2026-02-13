import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Track Your Application | EduPlan360",
    description: "Track the status of your study abroad application in real-time.",
};

export default function TrackApplicationPage() {
    return (
        <main>
            <h1>Track Application</h1>
            <p>Application tracking interface</p>
            <div>
                <h2>Enter Application Details</h2>
                <p>Application ID or Email lookup form</p>
            </div>
        </main>
    );
}
