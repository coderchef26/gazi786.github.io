"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion, AnimatePresence } from "framer-motion";
import ArcReactorLoader from "@/components/effects/ArcReactorLoader";
import CommandCentreReactor from "@/components/navigation/CommandCentreReactor";
import AnimatedContent from "./AnimatedContent";
import Link from "next/link";
import { createClient } from "@/prismicio";
import {
	FaProjectDiagram,
	FaUser,
	FaBolt,
	FaBrain,
	FaBriefcase,
	FaRocket,
	FaCode,
	FaGraduationCap,
} from "react-icons/fa";

import { BiTargetLock } from "react-icons/bi";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
	const [isInitialized, setIsInitialized] = useState(false);
	const [typedText, setTypedText] = useState("");
	const [showNavigation, setShowNavigation] = useState(false);
	const [navigationItems, setNavigationItems] = useState<any[]>([]);

	// Get data from Prismic or use defaults
	const fullTitle = slice.primary.name || "ALSHAFARAZ GAZI";
	const subtitle =
		slice.primary.job_title || "FULL-STACK DEVELOPER & SYSTEM ARCHITECT";

	// Function to render the appropriate React Icon
	const renderIcon = (iconName: string, size = 20) => {
		const iconProps = { size, className: "text-current" };

		// Log the icon name for debugging
		console.log("Rendering icon:", iconName);

		switch (iconName?.toLowerCase()) {
			case "target":
			case "🎯":
			case "projects":
				return <BiTargetLock {...iconProps} />;
			case "user":
			case "👤":
			case "about":
				return <FaUser {...iconProps} />;
			case "bolt":
			case "⚡":
			case "skills":
				return <FaBolt {...iconProps} />;
			case "brain":
			case "🧠":
			case "education":
				return <FaBrain {...iconProps} />;
			case "briefcase":
			case "🏢":
			case "experience":
				return <FaBriefcase {...iconProps} />;
			case "rocket":
				return <FaRocket {...iconProps} />;
			case "code":
				return <FaCode {...iconProps} />;
			case "graduation":
				return <FaGraduationCap {...iconProps} />;
			default:
				return <FaProjectDiagram {...iconProps} />;
		}
	};

	// Fetch navigation from settings
	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const client = createClient();
				const settings = await client.getSingle("settings");
				if (settings.data.navigation) {
					console.log(
						"Loaded navigation from Prismic:",
						settings.data.navigation
					);
					setNavigationItems(settings.data.navigation);
				}
			} catch {
				// Fallback navigation if settings not available
				console.log("Using fallback navigation");
				setNavigationItems([
					{
						n_id: "projects",
						label: "MISSION ARCHIVE",
						icon: "target",
						component: "/projects",
						description: "Completed missions and active deployments",
					},
					{
						n_id: "about",
						label: "PERSONNEL FILE",
						icon: "user",
						component: "/about",
						description: "Complete profile analysis",
					},
					{
						n_id: "skills",
						label: "POWER MATRIX",
						icon: "bolt",
						component: "/skills",
						description: "Technical capabilities",
					},
					{
						n_id: "education",
						label: "NEURAL UPGRADES",
						icon: "brain",
						component: "/education",
						description: "Learning protocols",
					},
					{
						n_id: "experience",
						label: "MISSION HISTORY",
						icon: "briefcase",
						component: "/experience",
						description: "Operational history",
					},
				]);
			}
		};
		fetchSettings();
	}, []);

	useEffect(() => {
		setTimeout(() => setIsInitialized(true), 2000);
	}, []);

	useEffect(() => {
		if (isInitialized && typedText.length < fullTitle.length) {
			const timeout = setTimeout(() => {
				setTypedText(fullTitle.slice(0, typedText.length + 1));
			}, 50);
			return () => clearTimeout(timeout);
		}
	}, [isInitialized, typedText, fullTitle]);

	if (!isInitialized) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<ArcReactorLoader size="lg" text="INITIALISING ATLAS PROTOCOL..." />
			</div>
		);
	}

	return (
		<AnimatedContent>
			<section
				data-slice-type={slice.slice_type}
				data-slice-variation={slice.variation}
				className="relative min-h-screen flex items-center justify-center overflow-hidden"
			>
			{/* Background Grid */}
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

			{/* Main Container */}
			<div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8">
				{/* Left Side - System Details */}

				{/* Center - Arc Reactor */}
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					className="w-full lg:w-1/3 flex items-center justify-center relative order-2 lg:order-1 py-8 lg:py-0"
					onMouseEnter={() => setShowNavigation(true)}
					onMouseLeave={() => setShowNavigation(false)}
					onClick={() => setShowNavigation(!showNavigation)}
				>
					<div className="cursor-pointer">
						<CommandCentreReactor
							powerLevel={100}
							showNavigation={showNavigation}
							className="scale-75 md:scale-100 lg:scale-125"
						/>
					</div>

					{/* Navigation Nodes */}
					<AnimatePresence>
						{showNavigation && (
							<div className="absolute inset-0 flex items-center justify-center">
								{navigationItems.map((item, index) => {
									const angle = (index * 360) / navigationItems.length;
									const radius = window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 120 : 150;
									const radian = (angle * Math.PI) / 180;
									const x = Math.cos(radian - Math.PI / 2) * radius;
									const y = Math.sin(radian - Math.PI / 2) * radius;

									return (
										<motion.div
											key={item.n_id}
											initial={{ opacity: 0, scale: 0 }}
											animate={{
												opacity: 1,
												scale: 1,
												x,
												y,
											}}
											exit={{ opacity: 0, scale: 0 }}
											transition={{
												duration: 0.3,
												delay: index * 0.05,
											}}
											className="absolute"
										>
											<Link href={item.component || `#${item.n_id}`}>
												<motion.div
													whileHover={{ scale: 1.2 }}
													whileTap={{ scale: 0.9 }}
													className="group relative"
												>
													{/* Node */}
													<div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border-2 border-cyan-400/50 bg-[#1a1a2e]/80 backdrop-blur-sm flex items-center justify-center hover:border-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all duration-300">
														{renderIcon(item.icon || item.n_id, window.innerWidth < 768 ? 16 : window.innerWidth < 1024 ? 20 : 24)}
													</div>

													{/* Label on hover */}
													<div className="absolute top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
														<div className="text-xs text-cyan-400 font-semibold">
															{item.label}
														</div>
													</div>

													{/* Connection line */}
													<svg
														className="absolute inset-0 w-full h-full pointer-events-none"
														style={{
															left: "50%",
															top: "50%",
															transform: "translate(-50%, -50%)",
														}}
													>
														<line
															x1="0"
															y1="0"
															x2={-x * 0.6}
															y2={-y * 0.6}
															stroke="rgba(0, 212, 255, 0.3)"
															strokeWidth="1"
															strokeDasharray="5,5"
														/>
													</svg>
												</motion.div>
											</Link>
										</motion.div>
									);
								})}
							</div>
						)}
					</AnimatePresence>

					{/* Hover hint */}
					{!showNavigation && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-cyan-400/60 whitespace-nowrap"
						>
							HOVER OR CLICK TO ACCESS NAVIGATION
						</motion.div>
					)}
				</motion.div>

				{/* Right Side - Name and Title */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="w-full lg:w-1/3 flex items-center justify-center lg:justify-end order-1 lg:order-2 lg:pr-8"
				>
					<div className="space-y-4 text-center lg:text-right">
						{/* Status Indicator */}
						<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5">
							<div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
							<span className="text-xs azmara-text text-cyan-400">
								ATLAS PROTOCOL ACTIVE
							</span>
						</div>

						{/* Name with typing effect */}
						<h1
							className="text-2xl md:text-4xl lg:text-5xl font-bold azmara-text leading-tight"
							style={{
								background: "linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								textShadow: "0 0 40px rgba(0, 212, 255, 0.5)",
							}}
						>
							{typedText}
							<span className="animate-pulse">|</span>
						</h1>

						{/* Job Title */}
						<p className="text-sm md:text-base lg:text-lg text-cyan-300 azmara-text max-w-sm mx-auto lg:ml-auto">
							{subtitle}
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-end">
							<button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-sm">
								VIEW PROJECTS
							</button>
							<button className="px-4 py-2 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 text-sm">
								DOWNLOAD CV
							</button>
						</div>
					</div>
				</motion.div>
			</div>

				{/* Bottom gradient line */}
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
			</section>
		</AnimatedContent>
	);
};

export default Hero;
