"use client";

import React from "react";
import { motion } from "framer-motion";

interface ArcReactorLoaderProps {
	size?: "sm" | "md" | "lg";
	text?: string;
}

export default function ArcReactorLoader({
	size = "md",
	text = "INITIALISING...",
}: ArcReactorLoaderProps) {
	const sizes = {
		sm: 60,
		md: 100,
		lg: 150,
	};

	const dimension = sizes[size];

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="relative" style={{ width: dimension, height: dimension }}>
				{/* Outer rotating ring */}
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
					className="absolute inset-0"
				>
					<svg width={dimension} height={dimension} className="text-cyan-400">
						<circle
							cx={dimension / 2}
							cy={dimension / 2}
							r={dimension / 2 - 5}
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeDasharray="10 5"
							opacity="0.5"
						/>
					</svg>
				</motion.div>

				{/* Middle rotating ring */}
				<motion.div
					animate={{ rotate: -360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className="absolute inset-0"
				>
					<svg width={dimension} height={dimension} className="text-cyan-300">
						<circle
							cx={dimension / 2}
							cy={dimension / 2}
							r={dimension / 2 - 20}
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeDasharray="8 3"
							opacity="0.6"
						/>
					</svg>
				</motion.div>

				{/* Inner rotating ring */}
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
					className="absolute inset-0"
				>
					<svg width={dimension} height={dimension} className="text-cyan-200">
						<circle
							cx={dimension / 2}
							cy={dimension / 2}
							r={dimension / 2 - 35}
							stroke="currentColor"
							strokeWidth="2"
							fill="none"
							strokeDasharray="5 2"
							opacity="0.7"
						/>
					</svg>
				</motion.div>

				{/* Core with pulsing glow */}
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.8, 1, 0.8],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					style={{
						width: dimension / 5,
						height: dimension / 5,
					}}
				>
					<div
						className="w-full h-full rounded-full bg-white"
						style={{
							boxShadow: `
                0 0 ${dimension / 10}px #00d4ff,
                0 0 ${dimension / 5}px #00d4ff,
                0 0 ${dimension / 3}px #00a8cc,
                inset 0 0 ${dimension / 10}px #00d4ff
              `,
						}}
					/>
				</motion.div>

				{/* Energy beams */}
				{[0, 60, 120, 180, 240, 300].map((rotation, index) => (
					<motion.div
						key={rotation}
						animate={{
							opacity: [0, 1, 0],
							scale: [0.8, 1.2, 0.8],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: index * 0.1,
							ease: "easeInOut",
						}}
						className="absolute top-1/2 left-1/2 w-full h-px"
						style={{
							transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
							transformOrigin: "center",
						}}
					>
						<div
							className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
							style={{ width: dimension / 2 }}
						/>
					</motion.div>
				))}
			</div>

			{/* Loading text */}
			{text && (
				<motion.div
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
					className="jarvis-text text-cyan-400 text-sm tracking-wider"
				>
					{text}
				</motion.div>
			)}
		</div>
	);
}
