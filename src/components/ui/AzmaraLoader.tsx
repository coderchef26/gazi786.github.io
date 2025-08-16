"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AzmaraLoaderProps {
	isLoading: boolean;
	onLoadingComplete?: () => void;
}

export const AzmaraLoader = ({
	isLoading,
	onLoadingComplete,
}: AzmaraLoaderProps) => {
	useEffect(() => {
		if (!isLoading) return;

		// Auto-hide after the animation sequence completes
		const hideTimeout = setTimeout(() => {
			onLoadingComplete?.();
		}, 5000); // 4.8s animation + 200ms buffer

		return () => {
			clearTimeout(hideTimeout);
		};
	}, [isLoading, onLoadingComplete]);

	if (!isLoading) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className="fixed inset-0 z-50 bg-[#0a0a0f] flex items-center justify-center"
			>
				<div className="absolute inset-0 stark-grid opacity-20" />
				<div className="absolute inset-0 circuit-pattern opacity-10" />

				<div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
					{/* Arc Reactor Core */}
					<motion.div
						className="relative mb-8"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						<div className="w-32 h-32 rounded-full border-4 border-[#00d4ff] relative">
							<div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0099cc] energy-core animate-pulse" />
							<div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
						</div>
					</motion.div>

					{/* ATLAS Title */}
					<motion.div
						className="text-center mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 1.2 }}
					>
						<h1 className="text-6xl font-bold text-[#00d4ff] tracking-wider">
							ATLAS
						</h1>
						<p className="text-xl text-cyan-300/70 mt-2">
							Advanced Technical Logic & Assistance System
						</p>
					</motion.div>

					{/* Runtime Log */}
					<motion.div
						className="space-y-2 pt-2"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 2.4 }}
					>
						<div className="text-cyan-300/90 font-bold">RUNTIME LOG</div>
						<motion.div
							className="text-green-400"
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							transition={{ delay: 2.8, duration: 0.8 }}
						>
							{">"} Initializing ATLAS...
						</motion.div>
						<motion.div
							className="text-yellow-400"
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							transition={{ delay: 3.2, duration: 0.8 }}
						>
							{">"} Loading neural modules...
						</motion.div>
						<motion.div
							className="text-cyan-400"
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							transition={{ delay: 3.6, duration: 0.8 }}
						>
							{">"} Arc Reactor online...
						</motion.div>
						<motion.div
							className="text-green-400 animate-pulse"
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							transition={{ delay: 4.0, duration: 0.8 }}
						>
							{">"} System ready...
						</motion.div>
					</motion.div>

					{/* Scanning line effect */}
					<motion.div
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								"linear-gradient(transparent 0%, rgba(0, 212, 255, 0.05) 50%, transparent 100%)",
							height: "2px",
						}}
						animate={{
							y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
						}}
						transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					/>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};
