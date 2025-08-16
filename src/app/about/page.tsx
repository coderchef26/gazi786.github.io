import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import About from "@/slices/About";
import { createMockSlice } from "@/lib/mockData";

export const metadata: Metadata = {
	title: "About - PERSONNEL FILE | Alshafaraz Gazi",
	description:
		"Complete profile analysis including capabilities, background, and system specifications.",
};

export default async function AboutPage() {
	const client = createClient();

	try {
		// Try to fetch the about page from Prismic
		const page = await client.getByUID("page", "about");

		return (
			<div className="min-h-screen p-8">
				<SliceZone slices={page.data.slices} components={components} />
			</div>
		);
	} catch {
		// Fallback to mock data if Prismic page doesn't exist yet
		const mockSliceData = createMockSlice("about", {});

		return (
			<div className="min-h-screen p-8">
				<About
					slice={mockSliceData}
					index={0}
					slices={[mockSliceData]}
					context={{}}
				/>
			</div>
		);
	}
}
