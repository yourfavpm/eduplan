import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Documents | Student Portal",
    description: "Upload and manage your application documents.",
};

export default async function DocumentsPage() {
    const session = await auth();

    if (!session) {
        redirect('/login');
    }

    return (
        <main>
            <h1>My Documents</h1>
            <section>
                <h2>Upload Documents</h2>
                <p>Document upload interface</p>
                <ul>
                    <li>Passport</li>
                    <li>Academic transcripts</li>
                    <li>CV/Resume</li>
                    <li>Statement of Purpose</li>
                    <li>Letters of Recommendation</li>
                    <li>English test results</li>
                </ul>
            </section>
            <section>
                <h2>Uploaded Documents</h2>
                <p>List of uploaded documents with download/delete options</p>
            </section>
        </main>
    );
}
