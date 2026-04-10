import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESTINATION_DETAILS } from "../content";
import { DestinationCountryClient } from "@/components/destinations/DestinationCountryClient";

import { getPublicUniversitiesByCountry, getPublicScholarshipsByCountry } from "@/lib/supabase/admin";

type Props = {
    params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { country } = await params;
    const data = DESTINATION_DETAILS[country];

    if (!data) return { title: "Destination Not Found" };

    return {
        title: `Study in ${data.countryName} | EduPlan360`,
        description: data.hero.text,
    };
}

export default async function CountryPage({ params }: Props) {
    const { country } = await params;
    const baseData = DESTINATION_DETAILS[country];

    if (!baseData) {
        notFound();
    }

    // Fetch dynamic data from Supabase
    const [universities, scholarships] = await Promise.all([
        getPublicUniversitiesByCountry(country),
        getPublicScholarshipsByCountry(country)
    ]);

    const data = {
        ...baseData,
        dynamicUniversities: universities,
        dynamicScholarships: scholarships
    };

    return (
        <main>
           <DestinationCountryClient data={data} />
        </main>
    );
}
