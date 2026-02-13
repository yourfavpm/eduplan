import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country } = await params;
    const countryName = country.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
        title: `Study in ${countryName} | EduPlan360`,
        description: `Discover universities, scholarships, and admission requirements for studying in ${countryName}.`,
    };
}

export default async function CountryPage({ params }: Props) {
    const { country } = await params;
    const countryName = country.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <main>
            <h1>Study in {countryName}</h1>
            <p>Country-specific information will go here</p>
            <ul>
                <li>Overview</li>
                <li>Top Universities</li>
                <li>Popular Courses</li>
                <li>Tuition & Cost of Living</li>
                <li>Visa Requirements</li>
                <li>Intakes</li>
            </ul>
        </main>
    );
}
