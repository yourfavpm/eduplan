import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `Blog Post | EduPlan360`,
        description: "Study abroad insights and expert advice.",
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    return (
        <main>
            <article>
                <h1>Blog Post Title</h1>
                <p>Post slug: {slug}</p>
                <p>Blog post content from CMS will display here</p>
            </article>
        </main>
    );
}
