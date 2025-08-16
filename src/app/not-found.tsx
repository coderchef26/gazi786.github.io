"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import ArcReactorLoader from "@/components/effects/ArcReactorLoader";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
			{/* ATLAS Grid Background */}
			<div className="absolute inset-0 opacity-20">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
						`,
						backgroundSize: "50px 50px",
					}}
				/>
			</div>

			{/* Scanning effect */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: "linear-gradient(transparent 0%, rgba(0, 212, 255, 0.05) 50%, transparent 100%)",
					height: "200px",
				}}
				animate={{
					y: ["-100%", "100vh"],
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: "linear",
				}}
			/>

			<div className="relative z-10 max-w-2xl mx-auto px-4">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Arc Reactor Icon */}
					<motion.div
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
						className="mb-8 flex justify-center"
					>
						<ArcReactorLoader size="lg" text="" />
					</motion.div>

					{/* Error Code */}
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="mb-8"
					>
						<h1
							className="text-8xl md:text-9xl font-bold mb-4"
							style={{
								fontFamily: "var(--font-orbitron)",
								background: "linear-gradient(135deg, #00d4ff 0%, #ff6b6b 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								textShadow: "0 0 60px rgba(0, 212, 255, 0.5)",
							}}
						>
							404
						</h1>
					</motion.div>

					{/* Error Message */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						className="mb-8"
					>
						<h2 className="text-2xl md:text-3xl font-bold text-[#00d4ff] mb-4">
							SYSTEM ERROR: PAGE NOT FOUND
						</h2>
						<p className="text-cyan-300/70 text-lg max-w-md mx-auto">
							The requested protocol endpoint does not exist in the ATLAS navigation matrix.
						</p>
					</motion.div>

					{/* Status Messages */}
					<motion.div
						className="mb-8 space-y-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.6 }}
					>
						<div className="text-sm text-cyan-400/60 font-mono">
							{">"} SCANNING DATABASE... NOT FOUND
						</div>
						<div className="text-sm text-cyan-400/60 font-mono">
							{">"} CHECKING ARCHIVES... NOT FOUND
						</div>
						<div className="text-sm text-red-400/60 font-mono">
							{">"} ERROR: INVALID NAVIGATION COORDINATES
						</div>
					</motion.div>

					{/* Action Buttons */}
					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.6 }}
					>
						<Link href="/">
							<Button variant="primary" size="lg" className="min-w-[150px]">
								RETURN HOME
							</Button>
						</Link>
						<Button
							variant="outline"
							size="lg"
							className="min-w-[150px]"
							onClick={() => window.history.back()}
						>
							GO BACK
						</Button>
					</motion.div>

					{/* System Status */}
					<motion.div
						className="mt-12 flex items-center justify-center gap-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.2 }}
					>
						<div className="w-2 h-2 bg-[#26de81] rounded-full animate-pulse" />
						<span className="text-xs text-cyan-400/60">ATLAS PROTOCOL ACTIVE</span>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}