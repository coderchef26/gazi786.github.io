"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EnhancedArcReactor from "@/components/effects/EnhancedArcReactor";
import Link from "next/link";

interface NavigationNode {
	id: string;
	label: string;
	href: string;
	angle: number;
	icon: string;
	preview: {
		title: string;
		description: string;
		stats?: string;
	};
}

const navigationNodes: NavigationNode[] = [
	{
		id: "projects",
		label: "MISSION ARCHIVE",
		href: "/projects",
		angle: 0, // 12 o'clock
		icon: "🎯",
		preview: {
			title: "PROJECT PORTFOLIO",
			description:
				"Completed missions and active deployments. Advanced systems and cutting-edge solutions.",
			stats: "12+ PROJECTS",
		},
	},
	{
		id: "about",
		label: "PERSONNEL FILE",
		href: "/about",
		angle: 72, // 2:24 o'clock
		icon: "👤",
		preview: {
			title: "IDENTITY & BACKGROUND",
			description:
				"Complete profile analysis including capabilities, background, and system specifications.",
			stats: "CLASSIFIED",
		},
	},
	{
		id: "experience",
		label: "MISSION HISTORY",
		href: "/experience",
		angle: 144, // 4:48 o'clock
		icon: "🏢",
		preview: {
			title: "OPERATIONAL HISTORY",
			description:
				"Detailed record of previous assignments, responsibilities, and achievements.",
			stats: "5+ YEARS",
		},
	},
	{
		id: "skills",
		label: "POWER MATRIX",
		href: "/skills",
		angle: 216, // 7:12 o'clock
		icon: "⚡",
		preview: {
			title: "TECHNICAL CAPABILITIES",
			description:
				"Comprehensive analysis of technical skills, programming languages, and system proficiencies.",
			stats: "95% EFFICIENCY",
		},
	},
	{
		id: "education",
		label: "NEURAL UPGRADES",
		href: "/education",
		angle: 288, // 9:36 o'clock
		icon: "🧠",
		preview: {
			title: "LEARNING PROTOCOLS",
			description:
				"Educational background, certifications, and continuous learning initiatives.",
			stats: "ONGOING",
		},
	},
];

export default function ArcReactorHub() {
	const [hoveredNode, setHoveredNode] = useState<string | null>(null);
	const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
	const reactorRef = useRef<HTMLDivElement>(null);

	const handleNodeHover = (nodeId: string | null) => {
		setHoveredNode(nodeId);
		setSideDrawerOpen(nodeId !== null);
	};

	const currentPreview = navigationNodes.find(
		(node) => node.id === hoveredNode
	)?.preview;

	return (
		<div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
			{/* Central Arc Reactor */}
			<div
				ref={reactorRef}
				className="relative"
				style={{ width: "400px", height: "400px" }}
			>
				{/* Main Arc Reactor */}
				<div className="absolute inset-0 flex items-center justify-center">
					<EnhancedArcReactor
						size="lg"
						powerLevel={hoveredNode ? 120 : 100}
						className="scale-150"
					/>
				</div>

				{/* Navigation Nodes around the reactor */}
				{navigationNodes.map((node) => {
					const radius = 180; // Distance from center
					const radian = (node.angle * Math.PI) / 180;
					const x = Math.cos(radian - Math.PI / 2) * radius;
					const y = Math.sin(radian - Math.PI / 2) * radius;

					return (
						<Link key={node.id} href={node.href}>
							<motion.div
								className="absolute cursor-pointer group"
								style={{
									left: `50%`,
									top: `50%`,
									transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
								}}
								onHoverStart={() => handleNodeHover(node.id)}
								onHoverEnd={() => handleNodeHover(null)}
								whileHover={{
									scale: 1.2,
									rotate: 10,
								}}
								whileTap={{ scale: 0.9 }}
							>
								{/* Node Container */}
								<motion.div
									className={`
                    relative w-16 h-16 rounded-full border-2 transition-all duration-300
                    ${
											hoveredNode === node.id
												? "border-[#00d4ff] bg-[#00d4ff]/20 shadow-lg shadow-[#00d4ff]/50"
												: "border-cyan-400/50 bg-[#1a1a2e]/80"
										}
                    backdrop-blur-sm flex items-center justify-center
                  `}
									animate={{
										boxShadow:
											hoveredNode === node.id
												? "0 0 30px rgba(0, 212, 255, 0.6)"
												: "0 0 10px rgba(100, 255, 218, 0.2)",
									}}
								>
									{/* Icon */}
									<span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">
										{node.icon}
									</span>

									{/* Pulse Ring */}
									<motion.div
										className="absolute inset-0 rounded-full border border-[#00d4ff]/30"
										animate={{
											scale: [1, 1.5, 1],
											opacity: [0.5, 0, 0.5],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											delay: node.angle / 72, // Stagger based on position
										}}
									/>

									{/* Connection Line to Center */}
									<motion.div
										className="absolute w-px bg-gradient-to-r from-cyan-400/20 to-transparent"
										style={{
											height: `${radius - 32}px`,
											left: "50%",
											bottom: "100%",
											transformOrigin: "bottom",
											transform: `translateX(-50%) rotate(${-node.angle}deg)`,
										}}
										animate={{
											opacity: hoveredNode === node.id ? 0.8 : 0.2,
										}}
									/>
								</motion.div>

								{/* Label */}
								<motion.div
									className="absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
									animate={{
										opacity: hoveredNode === node.id ? 1 : 0.6,
										y: hoveredNode === node.id ? 0 : 5,
									}}
								>
									<div className="text-xs stark-text text-cyan-400 font-semibold">
										{node.label}
									</div>
								</motion.div>
							</motion.div>
						</Link>
					);
				})}

				{/* Central Info Display */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center pointer-events-none"
					animate={{
						opacity: hoveredNode ? 0 : 1,
					}}
				>
					<div className="text-center uppercase">
						<h1 className="text-2xl font-bold stark-text text-[#00d4ff] mb-2">
							ALSHAFARAZ GAZI
						</h1>
						<p className="text-sm text-cyan-400/80">
							FULL-STACK DEVELOPER & SYSTEM ARCHITECT
						</p>
						<div className="mt-4 text-xs text-cyan-400/60">
							ATLAS PROTOCOL ACTIVE
						</div>
					</div>
				</motion.div>
			</div>

			{/* Side Drawer Preview */}
			<AnimatePresence>
				{sideDrawerOpen && currentPreview && (
					<motion.div
						initial={{ x: "100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: "100%", opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed right-0 top-1/2 -translate-y-1/2 w-80 z-[60]"
					>
						<div className="bg-gradient-to-br from-[#1a1a2e]/95 to-[#16213e]/95 backdrop-blur-sm border-l border-[#00d4ff]/30 p-6 h-96">
							{/* Header */}
							<div className="flex items-center mb-4">
								<motion.div
									className="w-3 h-3 bg-[#00d4ff] rounded-full mr-3"
									animate={{ opacity: [1, 0.3, 1] }}
									transition={{ duration: 1.5, repeat: Infinity }}
								/>
								<h3 className="text-lg font-bold stark-text text-[#00d4ff]">
									{currentPreview.title}
								</h3>
							</div>

							{/* Content */}
							<div className="space-y-4">
								<p className="text-sm text-cyan-400/80 leading-relaxed">
									{currentPreview.description}
								</p>

								{currentPreview.stats && (
									<div className="border-t border-cyan-400/20 pt-4">
										<div className="flex justify-between items-center">
											<span className="text-xs text-cyan-400/60">STATUS:</span>
											<span className="text-sm font-semibold text-[#26de81]">
												{currentPreview.stats}
											</span>
										</div>
									</div>
								)}

								{/* Action Hint */}
								<div className="mt-6 text-xs text-cyan-400/50 text-center">
									CLICK TO ACCESS DETAILED VIEW
								</div>
							</div>

							{/* Side Panel Accent */}
							<div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Status Indicators */}
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[50]">
				<div className="flex items-center space-x-6 text-xs text-cyan-400/60">
					<div className="flex items-center">
						<motion.div
							className="w-2 h-2 bg-[#26de81] rounded-full mr-2"
							animate={{ opacity: [1, 0.3, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<span>ATLAS CORE: OPERATIONAL</span>
					</div>
					<div>NAVIGATION NODES: {navigationNodes.length}</div>
					<div>HOVER TO PREVIEW • CLICK TO ACCESS</div>
				</div>
			</div>
		</div>
	);
}
