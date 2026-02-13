import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | EduPlan360",
    description: "Study abroad tips, university guides, scholarship news, and expert advice for international students.",
};

export default function BlogPage() {
    return (
        <main>
            <h1>Blog</h1>
            <p>Blog posts from CMS</p>
            <section>
                <h2>Latest Articles</h2>
                <p>Blog post cards will display here</p>
            </section>
            <section>
                <h2>Categories</h2>
                <ul>
                    <li>Study Tips</li>
                    <li>Destination Guides</li>
                    <li>Application Advice</li>
                    <li>Scholarships</li>
                    <li>Student Stories</li>
                </ul>
            </section>
        </main>
    );
}
