import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import ArcReactorClientWrapper from "@/components/navigation/ArcReactorClientWrapper";
import AtlasPageWrapper from "@/components/atlas/AtlasPageWrapper";
import AtlasHomepage from "@/components/atlas/AtlasHomepage";

export default async function Home() {
	const client = createClient();

	try {
		// Try to fetch homepage from Prismic
		const homepage = await client.getSingle("home");

		// If homepage exists in Prismic, render with ATLAS integration and Islamic greeting
		return (
			<AtlasHomepage pageData={homepage}>
				<SliceZone slices={homepage.data.slices} components={components} />
			</AtlasHomepage>
		);
	} catch {
		// Fallback to Arc Reactor navigation if no homepage in Prismic yet
		return <ArcReactorClientWrapper />;
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();

	try {
		const homepage = await client.getSingle("home");

		return {
			title:
				homepage.data.meta_title || "Alshafaraz Gazi - Full-Stack Developer",
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
	} catch {
		return {
			title: "Alshafaraz Gazi - Full-Stack Developer",
			description: "Full-Stack Developer & Creative Problem Solver",
			openGraph: {
				title: "Alshafaraz Gazi - Full-Stack Developer",
				description: "Full-Stack Developer & Creative Problem Solver",
				url: "https://gazi786.github.io",
			},
		};
	}
}
