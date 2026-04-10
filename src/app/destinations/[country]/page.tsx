import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESTINATION_DETAILS } from "../content";
import { DestinationCountryClient } from "@/components/destinations/DestinationCountryClient";

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
    const data = DESTINATION_DETAILS[country];

    if (!data) {
        notFound();
    }

    return (
        <main>
           <DestinationCountryClient data={data} />
        </main>
    );
}
