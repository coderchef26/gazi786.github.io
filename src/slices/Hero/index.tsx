"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import ArcReactorLoader from "@/components/effects/ArcReactorLoader";
import StarkArcReactor from "@/components/navigation/StarkArcReactor";
import StarkBackground from "@/components/ui/StarkBackground";
import AnimatedContent from "./AnimatedContent";

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

	// Get data from Prismic or use defaults
	const fullTitle = slice.primary.name || "ALSHAFARAZ GAZI";
	const subtitle =
		slice.primary.job_title || "FULL-STACK DEVELOPER & SYSTEM ARCHITECT";



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
				<ArcReactorLoader text="INITIALISING ATLAS PROTOCOL..." />
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
			{/* Tony Stark 3D Holographic Grid Background */}
			<StarkBackground
				variant="hologram"
				intensity="high"
				animated={true}
				className="absolute inset-0 -z-10"
			/>

			{/* Main Container */}
			<div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8 min-h-[80vh]">
				{/* Left Side - System Status */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.1 }}
					className="w-full lg:w-1/4 flex flex-col items-start justify-center order-3 lg:order-1 mt-8 lg:mt-0"
				>
					<div className="space-y-4">
						<div className="text-xs text-cyan-400/80 uppercase tracking-wider font-mono">
							System Status
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
								<span className="text-xs text-slate-300">Core Online</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
								<span className="text-xs text-slate-300">Navigation Active</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
								<span className="text-xs text-slate-300">ATLAS Ready</span>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Center - Arc Reactor */}
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					className="w-full lg:w-1/2 flex items-center justify-center relative order-1 lg:order-2 py-8 lg:py-0"
				>
					<StarkArcReactor 
						size={300}
						powerLevel={100}
						className="drop-shadow-2xl"
					/>
				</motion.div>

				{/* Right Side - Name and Title */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="w-full lg:w-1/4 flex items-center justify-center lg:justify-end order-2 lg:order-3"
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
