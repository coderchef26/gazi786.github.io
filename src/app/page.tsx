import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import ArcReactorClientWrapper from "@/components/navigation/ArcReactorClientWrapper";
import AtlasPageWrapper from "@/components/atlas/AtlasPageWrapper";
import AtlasHomepage from "@/components/atlas/AtlasHomepage";
import HolographicPhoneLayout from "@/components/layout/HolographicPhoneLayout";
import HolographicHero from "@/components/sections/HolographicHero";

export default async function Home() {
	const client = createClient();

	const homepage = await client.getSingle("home");

	// Tony Stark Phone UI with Prismic data integration
	return <SliceZone slices={homepage.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();

	const homepage = await client.getSingle("home");

	return {
		title: homepage.data.meta_title || "Alshafaraz Gazi - Full-Stack Developer",
		description:
			homepage.data.meta_description ||
			"Full-Stack Developer & Creative Problem Solver",
		openGraph: {
			title:
				homepage.data.meta_title || "Alshafaraz Gazi - Full-Stack Developer",
			description:
				homepage.data.meta_description ||
				"Full-Stack Developer & Creative Problem Solver",
			url: "https://gazi786.github.io",
			images: homepage.data.meta_image?.url
				? [homepage.data.meta_image.url]
				: [],
		},
	};
}
