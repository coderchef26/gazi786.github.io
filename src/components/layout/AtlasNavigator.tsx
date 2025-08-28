"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import EnhancedArcReactor from "@/components/effects/EnhancedArcReactor";
import Hero from "@/slices/Hero";
import About from "@/slices/About";
import Projects from "@/slices/Projects";
import Skills from "@/slices/Skills";
import Education from "@/slices/Education";
import Contact from "@/slices/Contact";
import { createMockSlice } from "@/lib/mockData";

export interface NavigationItem {
	id: string;
	label: string;
	icon: string;
	component: React.ComponentType<any>;
	description: string;
}

export default function AtlasNavigator() {
	const [activeView, setActiveView] = useState<string>("hero");
	const [isTransitioning, setIsTransitioning] = useState(false);

	const navigationItems: NavigationItem[] = [
		{
			id: "hero",
			label: "Home",
			icon: "🏠",
			component: Hero,
			description: "Welcome to ATLAS"
		},
		{
			id: "about",
			label: "About",
			icon: "👤",
			component: About,
			description: "About me"
		},
		{
			id: "projects", 
			label: "Projects",
			icon: "🚀",
			component: Projects,
			description: "My work"
		},
		{
			id: "skills",
			label: "Skills", 
			icon: "⚡",
			component: Skills,
			description: "Technical skills"
		},
		{
			id: "education",
			label: "Education",
			icon: "🎓", 
			component: Education,
			description: "Learning journey"
		},
		{
			id: "contact",
			label: "Contact",
			icon: "📧",
			component: Contact,
			description: "Get in touch"
		}
	];

	const handleViewChange = async (viewId: string) => {
		if (viewId === activeView || isTransitioning) return;

		setIsTransitioning(true);

		// Brief delay for transition effect
		setTimeout(() => {
			setActiveView(viewId);
			setIsTransitioning(false);
		}, 300);
	};

	const ActiveComponent =
		navigationItems.find((item) => item.id === activeView)?.component || Hero;
	const mockSliceData = createMockSlice(activeView, {});

	return (
		<div className="h-full w-full relative overflow-hidden">
			{/* Navigation Panel */}
			<div className="fixed left-4 top-1/2 -translate-y-1/2 z-[50] w-64">
				<div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-sm border border-[#00d4ff]/30 rounded-lg p-6">
					<div className="flex items-center mb-6">
						<EnhancedArcReactor
							size="sm"
							powerLevel={100}
							className="scale-75 mr-3"
						/>
						<div>
							<h2 className="text-lg font-bold stark-text text-[#00d4ff]">
								ATLAS
							</h2>
							<p className="text-xs text-cyan-400/70">Navigation Protocol</p>
						</div>
					</div>

					<div className="space-y-2">
						{navigationItems.map((item) => (
							<motion.button
								key={item.id}
								onClick={() => handleViewChange(item.id)}
								className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
									activeView === item.id
										? "bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff]"
										: "border-cyan-400/30 text-cyan-400/80 hover:border-cyan-400/50 hover:bg-cyan-400/5"
								}`}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								disabled={isTransitioning}
							>
								<div className="flex items-center">
									<span className="text-lg mr-3 filter grayscale hover:grayscale-0 transition-all">
										{item.icon}
									</span>
									<div>
										<div className="font-semibold text-sm">{item.label}</div>
										<div className="text-xs opacity-60">{item.description}</div>
									</div>
								</div>

								{activeView === item.id && (
									<motion.div
										className="absolute left-0 top-0 bottom-0 w-1 bg-[#00d4ff] rounded-r"
										layoutId="activeIndicator"
									/>
								)}
							</motion.button>
						))}
					</div>

					{/* Status Indicator */}
					<div className="mt-6 pt-4 border-t border-cyan-400/20">
						<div className="flex items-center justify-between text-xs">
							<span className="text-cyan-400/60">STATUS:</span>
							<div className="flex items-center">
								<motion.div
									className="w-2 h-2 bg-[#26de81] rounded-full mr-2"
									animate={{ opacity: [1, 0.3, 1] }}
									transition={{ duration: 2, repeat: Infinity }}
								/>
								<span className="text-[#26de81]">ONLINE</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="h-full w-full pl-72 pr-8">
				<AnimatePresence mode="wait">
					{!isTransitioning && (
						<motion.div
							key={activeView}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
							className="h-full w-full"
						>
							<div className="h-full overflow-y-auto overflow-x-hidden">
								<div className="min-h-full p-8">
									<ActiveComponent
										slice={mockSliceData}
										index={0}
										slices={[mockSliceData]}
										context={{}}
									/>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Transition Overlay */}
				<AnimatePresence>
					{isTransitioning && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-sm flex items-center justify-center z-[60]"
						>
							<div className="text-center">
								<motion.div
									animate={{ rotate: 360 }}
									transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
									className="mx-auto mb-4"
								>
									<EnhancedArcReactor size="md" powerLevel={100} />
								</motion.div>
								<p className="stark-text text-cyan-400">
									ATLAS TRANSITIONING...
								</p>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Quick Info Panel */}
			<div className="fixed bottom-4 right-4 z-[50]">
				<div className="bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-sm border border-[#00d4ff]/30 rounded-lg p-4">
					<div className="text-xs text-cyan-400/80">
						<div className="flex items-center justify-between mb-2">
							<span>ACTIVE VIEW:</span>
							<span className="text-[#00d4ff] font-semibold">
								{navigationItems.find((item) => item.id === activeView)?.label}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span>ATLAS CORE:</span>
							<span className="text-[#26de81]">STABLE</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
