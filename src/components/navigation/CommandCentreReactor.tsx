"use client";

import React from "react";
import EnhancedArcReactor from "@/components/effects/EnhancedArcReactor";

interface CommandCentreReactorProps {
	powerLevel?: number;
	className?: string;
	showNavigation?: boolean;
}

/**
 * CommandCentreReactor - Main navigation hub reactor for ATLAS system
 * This is the central command interface that powers the navigation system
 */
export const CommandCentreReactor: React.FC<CommandCentreReactorProps> = ({
	powerLevel = 100,
	className = "",
	showNavigation = false,
}) => {
	// Boost power when navigation is active
	const currentPowerLevel = showNavigation ? Math.min(powerLevel + 20, 150) : powerLevel;
	
	return (
		<div className="command-centre-reactor relative">
			<EnhancedArcReactor
				size="lg"
				powerLevel={currentPowerLevel}
				className={`${className} ${showNavigation ? 'scale-110' : 'scale-100'} transition-transform duration-300`}
			/>
			
			{/* Command Centre Label */}
			<div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-cyan-400/60 whitespace-nowrap font-mono">
				COMMAND CENTRE
			</div>
		</div>
	);
};

export default CommandCentreReactor;