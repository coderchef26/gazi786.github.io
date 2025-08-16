import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Fallback data for when Prismic is not available
const fallbackProjects = {
	"mui-carousel": {
		title: "MUI Carousel Component",
		description:
			"A modern, customizable carousel component for React Material-UI with TypeScript support and comprehensive demo examples.",
		longDescription: `A powerful and flexible carousel component built specifically for React Material-UI applications. This open-source project provides a highly customizable carousel with smooth animations, touch/swipe support, and comprehensive theming options.

The project includes a complete demo application showcasing various configuration options and use cases. The demo is built with Next.js and deployed on GitHub Pages, demonstrating real-world implementation examples.`,
		technologies: [
			"React",
			"TypeScript",
			"Material-UI",
			"Next.js",
			"GitHub Pages",
		],
		features: [
			"Touch/Swipe Support",
			"Customizable Animations",
			"TypeScript Support",
			"Material-UI Integration",
			"Responsive Design",
			"Auto-play Functionality",
		],
		github: "https://github.com/gazi786/mui-carousel",
		demo: "https://gazi786.github.io/mui-carousel",
		image: "/images/projects/mui-carousel.jpg",
	},
};

export default async function ProjectPage({
	params,
}: {
	params: { slug: string };
}) {
	try {
		const client = createClient();
		const project = await client.getByUID("project", params.slug);

		return (
			<div className="min-h-screen bg-[#0a0a0f] text-[#00d4ff]">
				<SliceZone slices={project.data.slices} components={components} />
			</div>
		);
	} catch {
		// Fallback to static project data
		const project = fallbackProjects[params.slug as keyof typeof fallbackProjects];

		if (!project) {
			notFound();
		}

		return (
			<div className="min-h-screen bg-[#0a0a0f] text-[#00d4ff] relative overflow-hidden">
				{/* ATLAS Grid Background */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
								linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
							`,
							backgroundSize: "50px 50px",
						}}
					/>
				</div>

				{/* Scanning Lines */}
				<motion.div
					className="absolute inset-0 pointer-events-none"
					style={{
						background: "linear-gradient(transparent 0%, rgba(0, 212, 255, 0.05) 50%, transparent 100%)",
						height: "2px",
					}}
					animate={{
						y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
					}}
				/>

				<div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
					{/* Header */}
					<motion.div
						className="mb-12"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<Link href="/projects">
							<Button variant="ghost" className="mb-6">
								← BACK TO PROJECTS
							</Button>
						</Link>

						<div className="flex flex-col lg:flex-row gap-8 items-start">
							{/* Project Image */}
							<motion.div
								className="lg:w-1/2"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2, duration: 0.8 }}
							>
								<Card variant="holographic" className="overflow-hidden">
									<div className="relative h-64 lg:h-80">
										<Image
											src={project.image}
											alt={project.title}
											fill
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 to-transparent" />
									</div>
								</Card>
							</motion.div>

							{/* Project Info */}
							<motion.div
								className="lg:w-1/2 space-y-6"
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4, duration: 0.8 }}
							>
								{/* Technologies */}
								<div className="flex flex-wrap gap-2">
									{project.technologies.map((tech) => (
										<span
											key={tech}
											className="px-3 py-1 text-xs bg-[#00d4ff]/20 border border-[#00d4ff]/30 rounded-full text-[#00d4ff]"
										>
											{tech}
										</span>
									))}
								</div>

								<h1 className="text-3xl lg:text-4xl font-bold text-[#00d4ff] font-orbitron">
									{project.title}
								</h1>

								<p className="text-cyan-300/80 text-lg leading-relaxed">
									{project.description}
								</p>

								{/* Action Buttons */}
								<div className="flex flex-col sm:flex-row gap-4">
									<Link href={project.github} target="_blank">
										<Button variant="primary" className="w-full sm:w-auto">
											VIEW SOURCE
										</Button>
									</Link>
									<Link href={project.demo} target="_blank">
										<Button variant="outline" className="w-full sm:w-auto">
											LIVE DEMO
										</Button>
									</Link>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Project Details */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Description */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.8 }}
						>
							<Card variant="bordered">
								<CardContent>
									<h2 className="text-xl font-bold text-[#00d4ff] mb-4 font-orbitron">
										PROJECT DETAILS
									</h2>
									<div className="space-y-4 text-cyan-300/80 leading-relaxed">
										{project.longDescription.split('\n\n').map((paragraph, index) => (
											<p key={index}>{paragraph}</p>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>

						{/* Features */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.8 }}
						>
							<Card variant="bordered">
								<CardContent>
									<h2 className="text-xl font-bold text-[#00d4ff] mb-4 font-orbitron">
										KEY FEATURES
									</h2>
									<div className="space-y-3">
										{project.features.map((feature, index) => (
											<motion.div
												key={feature}
												className="flex items-center space-x-3"
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 1 + index * 0.1 }}
											>
												<div className="w-2 h-2 bg-[#26de81] rounded-full" />
												<span className="text-cyan-300/80">{feature}</span>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>

					{/* Technical Specifications */}
					<motion.div
						className="mt-8"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2, duration: 0.8 }}
					>
						<Card variant="holographic">
							<CardContent>
								<h2 className="text-xl font-bold text-[#00d4ff] mb-6 font-orbitron">
									TECHNICAL SPECIFICATIONS
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="space-y-2">
										<h3 className="text-sm font-semibold text-[#26de81]">FRAMEWORK</h3>
										<p className="text-cyan-300/80">React 18+</p>
										<p className="text-cyan-300/80">TypeScript 5+</p>
									</div>
									<div className="space-y-2">
										<h3 className="text-sm font-semibold text-[#26de81]">BUILD TOOLS</h3>
										<p className="text-cyan-300/80">Next.js 14</p>
										<p className="text-cyan-300/80">Webpack 5</p>
									</div>
									<div className="space-y-2">
										<h3 className="text-sm font-semibold text-[#26de81]">DEPLOYMENT</h3>
										<p className="text-cyan-300/80">GitHub Pages</p>
										<p className="text-cyan-300/80">CI/CD Pipeline</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>

					{/* Links */}
					<motion.div
						className="mt-8 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.4, duration: 0.8 }}
					>
						<h2 className="text-xl font-bold text-[#00d4ff] mb-4 font-orbitron">
							PROJECT LINKS
						</h2>
						<div className="flex flex-wrap justify-center gap-2">
							{project.technologies.map((tech) => (
								<span
									key={tech}
									className="px-3 py-1 text-xs bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-cyan-400/60"
								>
									{tech}
								</span>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		);
	}
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	try {
		const client = createClient();
		const project = await client.getByUID("project", params.slug);

		return {
			title: `${project.data.title} - Alshafaraz Gazi`,
			description: project.data.description,
		};
	} catch {
		const project = fallbackProjects[params.slug as keyof typeof fallbackProjects];

		return {
			title: project ? `${project.title} - Alshafaraz Gazi` : "Project Not Found",
			description: project?.description || "Project not found",
		};
	}
}