import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import ArcReactorLoader from "@/components/effects/ArcReactorLoader";
import { Suspense } from "react";
import * as prismic from "@prismicio/client";

type Params = { uid: string };

function LoadingPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<ArcReactorLoader size="lg" text="LOADING PAGE..." />
		</div>
	);
}

export default async function Page({ params }: { params: Promise<Params> }) {
	const { uid } = await params;
	const client = createClient();

	try {
		const page = await client.getByUID("page", uid);

		return (
			<Suspense fallback={<LoadingPage />}>
				<article className="min-h-screen relative">
					{/* Page Header with ATLAS styling */}
					<div className="relative overflow-hidden py-20 mb-12">
						<div className="absolute inset-0 opacity-20">
							<div
								className="absolute inset-0"
								style={{
									backgroundImage: `
                  linear-gradient(cyan 1px, transparent 1px),
                  linear-gradient(90deg, cyan 1px, transparent 1px)
                `,
									backgroundSize: "50px 50px",
									maskImage:
										"radial-gradient(ellipse at center, black, transparent 70%)",
								}}
							/>
						</div>

						<div className="container mx-auto px-4 relative z-10">
							<div className="max-w-4xl mx-auto text-center">
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
									<div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
									<span className="text-xs jarvis-text text-cyan-400">
										PAGE LOADED
									</span>
								</div>

								<h1 className="text-4xl md:text-6xl font-bold jarvis-text glow-text mb-4">
									{page.data.title || "PAGE"}
								</h1>

								{page.data.description && (
									<p className="text-lg text-cyan-300/80 jarvis-text max-w-2xl mx-auto">
										{page.data.description}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Page Content */}
					<div className="container mx-auto px-4 pb-20">
						<div className="max-w-6xl mx-auto">
							<SliceZone slices={page.data.slices} components={components} />
						</div>
					</div>

					{/* Bottom decoration */}
					<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
				</article>
			</Suspense>
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
