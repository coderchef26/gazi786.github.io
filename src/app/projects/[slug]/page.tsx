"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import AtlasProvider from "@/components/atlas/AtlasProvider";
import AtlasPageWrapper from "@/components/atlas/AtlasPageWrapper";
import { useEffect, useState } from "react";
import Link from "next/link";

// Fallback data for when Prismic is not available
const fallbackProjects = {
	"mui-carousel": {
		title: "MUI Carousel Component",
		description:
			"A modern, customizable carousel component for React Material-UI with TypeScript support and comprehensive demo examples.",
		technologies: [
			"React",
			"TypeScript", 
			"Material-UI",
			"Next.js",
		],
		github: "https://github.com/gazi786/mui-carousel",
		demo: "https://gazi786.github.io/mui-carousel",
	},
};

export default function ProjectPage() {
	const params = useParams();
	const slug = params.slug as string;
	const [project, setProject] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const client = createClient();
				// Try to get project page - this might not exist in current Prismic setup
				const projectData = await client.getByUID("page" as any, slug);
				setProject({ type: 'prismic', data: projectData });
			} catch {
				// Fallback to static project data
				const fallbackProject = fallbackProjects[slug as keyof typeof fallbackProjects];
				setProject({ type: 'fallback', data: fallbackProject });
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [slug]);

	if (loading) {
		return (
			<div className="min-h-screen bg-[#0a0a0f] text-[#00d4ff] flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
			</div>
		);
	}

	if (project?.type === 'prismic') {
		return (
			<AtlasProvider>
				<AtlasPageWrapper pageData={project.data}>
					<SliceZone slices={(project.data.data as any).slices || []} components={components} />
				</AtlasPageWrapper>
			</AtlasProvider>
		);
	} else if (project?.type === 'fallback') {
		const fallbackProject = project.data;

		if (!fallbackProject) {
			notFound();
		}

		return (
			<AtlasProvider>
				<AtlasPageWrapper>
					<div className="min-h-screen bg-[#0a0a0f] text-[#00d4ff] p-8">
						<div className="max-w-4xl mx-auto">
							<Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
								← Back to Home
							</Link>
							
							<h1 className="text-4xl font-bold text-cyan-400 mb-4">
								{fallbackProject.title}
							</h1>
							
							<p className="text-cyan-300 mb-6">
								{fallbackProject.description}
							</p>
							
							<div className="flex gap-4 mb-8">
								<Link href={fallbackProject.github} target="_blank" className="bg-cyan-500 text-black px-6 py-2 rounded hover:bg-cyan-400">
									GitHub
								</Link>
								<Link href={fallbackProject.demo} target="_blank" className="border border-cyan-500 text-cyan-400 px-6 py-2 rounded hover:bg-cyan-500 hover:text-black">
									Live Demo
								</Link>
							</div>
							
							<div className="space-y-4">
								<h2 className="text-2xl font-semibold text-cyan-400">Technologies</h2>
								<div className="flex flex-wrap gap-2">
									{fallbackProject.technologies.map((tech: string) => (
										<span key={tech} className="bg-slate-800 px-3 py-1 rounded text-cyan-300">
											{tech}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</AtlasPageWrapper>
			</AtlasProvider>
		);
	}

	// If no project found at all
	return notFound();
}