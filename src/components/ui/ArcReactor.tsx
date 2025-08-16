"use client";

import { motion } from "framer-motion";

interface ArcReactorProps {
	size?: "small" | "medium" | "large";
	showOuterRing?: boolean;
	showEnergyBeams?: boolean;
}

export const ArcReactor = ({ 
	size = "medium", 
	showOuterRing = true,
	showEnergyBeams = true 
}: ArcReactorProps) => {
	const sizes = {
		small: { core: "w-16 h-16", outer: "w-24 h-24", center: "w-2 h-2" },
		medium: { core: "w-24 h-24", outer: "w-32 h-32", center: "w-3 h-3" },
		large: { core: "w-32 h-32", outer: "w-40 h-40", center: "w-4 h-4" },
	};

	const currentSize = sizes[size];

	return (
		<div className="relative">
			{/* Outer Ring */}
			{showOuterRing && (
				<motion.div
					className={`${currentSize.outer} rounded-full border border-[#00d4ff]/30 absolute -inset-4`}
					animate={{ rotate: -360 }}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			)}
			
			{/* Main Reactor Core */}
			<motion.div
				className={`${currentSize.core} rounded-full relative`}
				animate={{ rotate: 360 }}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "linear",
				}}
			>
				{/* Triple Ring Design */}
				<div className="absolute inset-0 rounded-full border-2 border-[#00d4ff]" />
				<div className="absolute inset-2 rounded-full border border-[#00d4ff]/60" />
				<div className="absolute inset-4 rounded-full border border-[#00d4ff]/40" />
				
				{/* Energy Core */}
				<div className="absolute inset-6 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#0099cc] to-[#00d4ff] animate-pulse shadow-[0_0_30px_#00d4ff]" />
				
				{/* Center Point */}
				<div className={`absolute top-1/2 left-1/2 ${currentSize.center} bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#ffffff]`} />
				
				{/* Energy Beams */}
				{showEnergyBeams && [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
					<div
						key={deg}
						className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent"
						style={{
							transform: `translate(-50%, -50%) rotate(${deg}deg)`,
						}}
					/>
				))}
			</motion.div>
		</div>
	);
};