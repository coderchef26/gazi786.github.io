"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedArcReactorProps {
	size?: "sm" | "md" | "lg" | "xl";
	powerLevel?: number; // 0-100
	isActive?: boolean;
	showPowerBeams?: boolean;
	className?: string;
}

export default function EnhancedArcReactor({
	size = "lg",
	powerLevel = 100,
	isActive = true,
	showPowerBeams = true,
	className = "",
}: EnhancedArcReactorProps) {
	const [energyPulses, setEnergyPulses] = useState<number[]>([]);
	const [particleCount, setParticleCount] = useState(0);

	const sizes = {
		sm: { reactor: 80, core: 16, rings: [60, 45, 30] },
		md: { reactor: 120, core: 24, rings: [90, 67, 45] },
		lg: { reactor: 160, core: 32, rings: [120, 90, 60] },
		xl: { reactor: 200, core: 40, rings: [150, 112, 75] },
	};

	const config = sizes[size];

	useEffect(() => {
		if (isActive) {
			const interval = setInterval(() => {
				setParticleCount((prev) => (prev + 1) % 20);
			}, 100);
			return () => clearInterval(interval);
		}
	}, [isActive]);

	useEffect(() => {
		// Generate energy pulses based on power level
		const pulseCount = Math.floor((powerLevel / 100) * 8);
		setEnergyPulses(Array.from({ length: pulseCount }, (_, i) => i));
	}, [powerLevel]);

	const coreIntensity = (powerLevel / 100) * 100;
	const glowColor =
		powerLevel > 80 ? "#00d4ff" : powerLevel > 50 ? "#00a8cc" : "#006680";

	return (
		<div
			className={`relative ${className}`}
			style={{ width: config.reactor, height: config.reactor }}
		>
			{/* Outer energy field */}
			<AnimatePresence>
				{isActive && (
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{
							opacity: [0.2, 0.4, 0.2],
							scale: [1, 1.2, 1],
						}}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute inset-0 rounded-full"
						style={{
							background: `radial-gradient(circle, ${glowColor}20 0%, transparent 70%)`,
						}}
					/>
				)}
			</AnimatePresence>

			{/* Rotating rings */}
			{config.rings.map((ringSize, index) => (
				<motion.div
					key={index}
					animate={isActive ? { rotate: 360 } : {}}
					transition={{
						duration: 3 + index,
						repeat: Infinity,
						ease: "linear",
					}}
					className="absolute top-1/2 left-1/2"
					style={{
						width: ringSize,
						height: ringSize,
						marginLeft: -ringSize / 2,
						marginTop: -ringSize / 2,
					}}
				>
					<svg width={ringSize} height={ringSize} className="text-cyan-400">
						<circle
							cx={ringSize / 2}
							cy={ringSize / 2}
							r={ringSize / 2 - 2}
							stroke="currentColor"
							strokeWidth="1"
							fill="none"
							strokeDasharray={`${10 - index * 2} ${5 - index}`}
							opacity={0.3 + index * 0.2}
							style={{
								filter: `drop-shadow(0 0 ${5 + index * 2}px ${glowColor})`,
							}}
						/>
					</svg>
				</motion.div>
			))}

			{/* Power beams */}
			{showPowerBeams &&
				isActive &&
				energyPulses.map((pulse, index) => (
					<motion.div
						key={pulse}
						initial={{ opacity: 0, scale: 0 }}
						animate={{
							opacity: [0, 1, 0],
							scale: [0.5, 1.5, 0.5],
							rotate: 360,
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: index * 0.2,
							ease: "easeInOut",
						}}
						className="absolute top-1/2 left-1/2"
						style={{
							width: 2,
							height: config.reactor / 2,
							marginLeft: -1,
							marginTop: -config.reactor / 4,
							transformOrigin: "50% 100%",
							transform: `rotate(${index * 45}deg)`,
						}}
					>
						<div
							className="w-full h-full bg-gradient-to-t from-transparent via-cyan-400 to-transparent"
							style={{
								boxShadow: `0 0 10px ${glowColor}`,
							}}
						/>
					</motion.div>
				))}

			{/* Central core */}
			<motion.div
				animate={
					isActive
						? {
								scale: [1, 1.1, 1],
								opacity: [0.8, 1, 0.8],
							}
						: {}
				}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="absolute top-1/2 left-1/2"
				style={{
					width: config.core,
					height: config.core,
					marginLeft: -config.core / 2,
					marginTop: -config.core / 2,
				}}
			>
				<div
					className="w-full h-full rounded-full bg-white"
					style={{
						background: `radial-gradient(circle, white 0%, ${glowColor} 50%, ${glowColor}80 100%)`,
						boxShadow: `
              0 0 ${config.core / 2}px ${glowColor},
              0 0 ${config.core}px ${glowColor},
              0 0 ${config.core * 1.5}px ${glowColor}80,
              inset 0 0 ${config.core / 4}px white
            `,
						filter: `brightness(${coreIntensity}%)`,
					}}
				/>
			</motion.div>

			{/* Energy particles */}
			{isActive &&
				[...Array(8)].map((_, index) => (
					<motion.div
						key={index}
						animate={{
							rotate: 360,
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: index * 0.3,
							ease: "linear",
						}}
						className="absolute top-1/2 left-1/2"
						style={{
							width: config.reactor * 0.8,
							height: config.reactor * 0.8,
							marginLeft: -config.reactor * 0.4,
							marginTop: -config.reactor * 0.4,
						}}
					>
						<div
							className="absolute w-1 h-1 bg-cyan-400 rounded-full"
							style={{
								top: 0,
								left: "50%",
								marginLeft: -2,
								boxShadow: `0 0 6px ${glowColor}`,
							}}
						/>
					</motion.div>
				))}

			{/* Power level indicator */}
			<div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
				<div className="flex items-center gap-2">
					<div className="w-16 h-1 bg-cyan-900/30 rounded-full overflow-hidden">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${powerLevel}%` }}
							transition={{ duration: 1, ease: "easeOut" }}
							className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300"
						/>
					</div>
					<span className="text-xs text-cyan-400 jarvis-text">
						{powerLevel}%
					</span>
				</div>
			</div>

			{/* Status indicator */}
			<div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
				<motion.div
					animate={isActive ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.2 }}
					transition={{ duration: 1, repeat: Infinity }}
					className={`w-2 h-2 rounded-full ${isActive ? "bg-green-400" : "bg-red-400"}`}
				/>
				<span className="text-xs jarvis-text text-cyan-400">
					{isActive ? "ONLINE" : "OFFLINE"}
				</span>
			</div>
		</div>
	);
}
