"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AzmaraLoader } from "@/components/ui/AzmaraLoader";
import HolographicInterface from "@/components/effects/HolographicInterface";

interface AzmaraLayoutProps {
	children: React.ReactNode;
}

export const AzmaraLayout = ({ children }: AzmaraLayoutProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showInterface, setShowInterface] = useState(false);

	const handleLoadingComplete = () => {
		setIsLoading(false);
		setTimeout(() => setShowInterface(true), 500);
	};

	return (
		<div className="h-screen w-screen relative overflow-hidden m-3">
			{/* Background Layers */}
			<div className="fixed inset-0 z-0">
				{/* Base Grid */}
				<div className="absolute inset-0 azmara-grid opacity-10" />

				{/* Circuit Pattern */}
				<div className="absolute inset-0 circuit-pattern opacity-5" />

				{/* Animated Background Elements */}
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d4ff] rounded-full opacity-5 blur-[100px] animate-blob" />
				<div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#ff6b6b] rounded-full opacity-5 blur-[120px] animate-blob animation-delay-2000" />
				<div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#26de81] rounded-full opacity-5 blur-[110px] animate-blob animation-delay-4000" />
			</div>

			{/* Holographic Scan Lines */}
			<div className="fixed inset-0 pointer-events-none z-[2]">
				<motion.div
					className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30"
					animate={{
						y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
					}}
					transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent opacity-20"
					animate={{
						y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "linear",
						delay: 2,
					}}
				/>
			</div>

			{/* Loader */}
			<AzmaraLoader
				isLoading={isLoading}
				onLoadingComplete={handleLoadingComplete}
			/>

			{/* Main Interface */}
			{showInterface && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="relative z-10 h-full w-full"
				>
					{/* Side-by-Side Layout for Big Screens */}
					<div className="flex h-[calc(100vh-3rem)] min-h-[calc(100vh-3rem)]">
						{/* Left Panel - Holographic Interface */}
						<div className="w-80 flex-shrink-0 relative overflow-hidden h-full">
							<HolographicInterface isActive={true}>
								<div className="h-full w-full relative">
									{/* Arc Reactor Hub - Moved to left panel */}
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
										<motion.div
											className="w-24 h-24 rounded-full border-2 border-[#00d4ff] relative"
											animate={{ rotate: 360 }}
											transition={{
												duration: 8,
												repeat: Infinity,
												ease: "linear",
											}}
										>
											<div className="absolute inset-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0099cc] energy-core animate-pulse" />
											<div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
										</motion.div>
									</div>

									{/* System Status Indicators */}
									<div className="absolute top-8 left-8 right-8 space-y-4 z-20">
										<div className="text-center">
											<h3 className="text-lg font-bold text-[#00d4ff] mb-2">
												ATLAS CONTROL
											</h3>
											<div className="text-xs text-cyan-300/70">
												Advanced Tactical Logic & Assistance System
											</div>
										</div>

										<div className="space-y-2">
											{[
												"NEURAL INTERFACE",
												"POWER CORE",
												"DEFENSE GRID",
												"TARGETING SYS",
											].map((system, i) => (
												<motion.div
													key={system}
													className="flex items-center justify-between text-xs"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: i * 0.2 }}
												>
													<span className="text-cyan-300/80">{system}</span>
													<div className="flex items-center space-x-2">
														<div className="w-1.5 h-1.5 bg-[#26de81] rounded-full animate-pulse" />
														<span className="text-[#26de81] text-xs">
															ONLINE
														</span>
													</div>
												</motion.div>
											))}
										</div>
									</div>

									{/* Bottom Status Panel */}
									<div className="absolute bottom-8 left-8 right-8 space-y-3 z-20">
										<div className="border border-[#00d4ff]/30 rounded p-3 bg-[#0a0a0f]/50 backdrop-blur-sm">
											<div className="text-xs text-cyan-300/90 mb-2">
												SYSTEM STATUS
											</div>
											<div className="space-y-1">
												<div className="flex justify-between text-xs">
													<span className="text-cyan-300/70">Energy</span>
													<span className="text-[#26de81]">100%</span>
												</div>
												<div className="flex justify-between text-xs">
													<span className="text-cyan-300/70">Network</span>
													<span className="text-[#26de81]">STABLE</span>
												</div>
												<div className="flex justify-between text-xs">
													<span className="text-cyan-300/70">Security</span>
													<span className="text-[#26de81]">ACTIVE</span>
												</div>
											</div>
										</div>

										<div className="text-center text-xs text-cyan-300/50">
											{new Date().toLocaleTimeString()}
										</div>
									</div>
								</div>
							</HolographicInterface>
						</div>

						{/* Right Panel - Main Content */}
						<div className="flex-1 relative overflow-hidden h-full">
							{/* Corner UI Elements for main content area */}
							<div className="absolute inset-0 pointer-events-none z-[30]">
								<div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#00d4ff] opacity-40" />
								<div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#00d4ff] opacity-40" />
								<div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#00d4ff] opacity-40" />
								<div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#00d4ff] opacity-40" />
							</div>

							{/* Main Content */}
							<div className="relative z-10 h-full w-full p-8 overflow-auto">
								{children}
							</div>
						</div>
					</div>

					{/* Global Bottom Status Bar */}
					<div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] border-t-2 border-[#00d4ff] z-[100] float-right">
						<div className="h-full flex items-center justify-between px-12">
							<div className="flex items-center space-x-4">
								<div className="w-2 h-2 bg-[#26de81] rounded-full animate-pulse" />
								<span className="text-xs azmara-text">
									ATLAS PROTOCOL ACTIVE
								</span>
							</div>

							<div className="flex items-center space-x-6">
								<div className="text-xs azmara-text">
									NEURAL INTERFACE: STABLE
								</div>
								<div className="text-xs azmara-text">ENERGY: OPTIMAL</div>
								<div className="text-xs azmara-text">DEFENSE: READY</div>
							</div>

							<div className="text-xs azmara-text">
								{new Date().toLocaleTimeString()}
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};
