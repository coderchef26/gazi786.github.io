"use client";

import { motion } from "framer-motion";
import HolographicInterface from "@/components/effects/HolographicInterface";
import ArcReactor from "@/components/shared/ArcReactor";

interface LeftPanelProps {
	isActive?: boolean;
}

export const LeftPanel = ({ isActive = true }: LeftPanelProps) => {
	return (
		<div className="w-[20%] flex-shrink-0 relative overflow-hidden h-full">
			<HolographicInterface isActive={isActive}>
				<div className="h-full w-full relative z-0">
					{/* Arc Reactor Hub */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
						<ArcReactor
							variant="enhanced"
							size="md"
							showParticles={true}
							showPulse={true}
							showGlow={true}
						/>
					</div>

					{/* System Status Indicators */}
					<div className="absolute bottom-8 left-8 right-8 space-y-4 z-20">
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
										<span className="text-[#26de81] text-xs">ONLINE</span>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</HolographicInterface>
		</div>
	);
};
