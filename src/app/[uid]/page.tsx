import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ArcReactorLoader from "@/components/effects/ArcReactorLoader";
import { Suspense } from "react";
import * as prismic from "@prismicio/client";
import HolographicPhoneLayout from "@/components/layout/HolographicPhoneLayout";
import HolographicText from "@/components/ui/HolographicText";
import HolographicCard from "@/components/ui/HolographicCard";

type Params = { uid: string };

function LoadingPage() {
	return (
		<HolographicPhoneLayout>
			<div className="min-h-screen flex items-center justify-center">
				<ArcReactorLoader text="LOADING PAGE..." />
			</div>
		</HolographicPhoneLayout>
	);
}

export default async function Page({ params }: { params: Promise<Params> }) {
	const { uid } = await params;
	const client = createClient();

	try {
		const page = await client.getByUID("page", uid);

		return (
			<HolographicPhoneLayout>
				<Suspense fallback={<LoadingPage />}>
					<article className="min-h-screen relative">
						{/* Holographic Page Header */}
						<section className="relative py-20 mb-12">
							<div className="container mx-auto px-4 relative z-10">
								<div className="max-w-4xl mx-auto text-center">
									<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
										<div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
										<HolographicText variant="data">
											PAGE LOADED
										</HolographicText>
									</div>

									<HolographicText variant="heading" glowEffect typewriter>
										{page.data.title || "PAGE"}
									</HolographicText>

									{page.data.description && (
										<div className="mt-6 max-w-2xl mx-auto">
											<HolographicText variant="subheading">
												{page.data.description}
											</HolographicText>
										</div>
									)}
								</div>
							</div>
						</section>

						{/* Page Content with Holographic Cards */}
						<section className="container mx-auto px-4 pb-20">
							<div className="max-w-6xl mx-auto">
								<SliceZone slices={page.data.slices} components={components} />
							</div>
						</section>
					</article>
				</Suspense>
			</HolographicPhoneLayout>
		);
	} catch {
		// If page not found, return 404
		notFound();
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const client = createClient();

	try {
		const { uid } = await params;
		const page = await client.getByUID("page", uid);

		return {
			title: page.data.meta_title || "",
			description: page.data.meta_description || "",
			openGraph: {
				title: page.data.meta_title || "",
				description: page.data.meta_description || "",
				images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
			},
		};
	} catch {
		return {
			title: "Page Not Found",
			description: "The requested page could not be found.",
		};
	}
}

export async function generateStaticParams() {
	const client = createClient();

	try {
		/**
		 * Query all Documents from the API, except the homepage.
		 */
		const pages = await client.getAllByType("page", {
			predicates: [prismic.filter.not("my.page.uid", "home")],
		});

		/**
		 * Define a path for every Document.
		 */
		return pages.map((page) => {
			return { uid: page.uid };
		});
	} catch {
		return [];
	}
}
