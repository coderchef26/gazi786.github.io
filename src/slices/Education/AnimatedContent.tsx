"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedContentProps {
	children: React.ReactNode;
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
	const container = useRef(null);
	const isInView = useInView(container, { once: true, margin: "-50px" });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.2,
			},
		},
	};

	const upgradeVariants = {
		hidden: { 
			opacity: 0, 
			y: 100,
			rotateX: -90 
		},
		visible: {
			opacity: 1,
			y: 0,
			rotateX: 0,
			transition: {
				type: "spring" as const,
				stiffness: 80,
				damping: 20,
			},
		},
	};

	return (
		<motion.div
			ref={container}
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			className="relative"
			style={{ perspective: "1000px" }}
		>
			{/* Neural network background */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				{/* Neural connections */}
				<svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
					{[...Array(6)].map((_, i) => (
						<motion.line
							key={i}
							x1={`${10 + i * 15}%`}
							y1="10%"
							x2={`${20 + i * 15}%`}
							y2="90%"
							stroke="rgba(0, 212, 255, 0.3)"
							strokeWidth="1"
							initial={{ pathLength: 0, opacity: 0 }}
							animate={isInView ? { 
								pathLength: 1, 
								opacity: [0, 0.6, 0.3],
							} : {}}
							transition={{ 
								duration: 2, 
								delay: i * 0.2,
								ease: "easeInOut"
							}}
						/>
					))}
				</svg>

				{/* Neural nodes */}
				{[...Array(12)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-3 h-3 bg-[#00d4ff] rounded-full"
						style={{
							left: `${Math.random() * 90 + 5}%`,
							top: `${Math.random() * 80 + 10}%`,
						}}
						initial={{ scale: 0, opacity: 0 }}
						animate={isInView ? {
							scale: [0, 1.5, 1],
							opacity: [0, 1, 0.7],
						} : {}}
						transition={{
							duration: 1.5,
							delay: 0.5 + Math.random() * 1,
							ease: "easeOut",
						}}
					/>
				))}
			</div>

			{/* Knowledge transfer indicator */}
			<motion.div
				className="absolute top-4 right-4 z-20"
				initial={{ opacity: 0, scale: 0 }}
				animate={isInView ? { opacity: 1, scale: 1 } : {}}
				transition={{ delay: 0.8, type: "spring" }}
			>
				<div className="flex items-center space-x-2">
					<motion.div
						className="w-4 h-4 border-2 border-[#00d4ff] rounded-full relative"
						animate={{
							rotate: 360,
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "linear",
						}}
					>
						<div className="absolute inset-1 bg-[#00d4ff] rounded-full opacity-60" />
					</motion.div>
					<span className="text-xs text-[#00d4ff] font-mono">NEURAL SYNC</span>
				</div>
			</motion.div>

			{/* Data upload progress */}
			<motion.div
				className="absolute bottom-4 left-4 right-4 z-20"
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ delay: 1.2 }}
			>
				<div className="text-xs text-[#00d4ff]/70 mb-2 font-mono">KNOWLEDGE INTEGRATION</div>
				<div className="w-full h-1 bg-[#00d4ff]/20 rounded-full overflow-hidden">
					<motion.div
						className="h-full bg-gradient-to-r from-[#00d4ff] to-[#26de81] rounded-full"
						initial={{ width: "0%" }}
						animate={isInView ? { width: "100%" } : {}}
						transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
					/>
				</div>
			</motion.div>

			{/* Education content */}
			<motion.div variants={upgradeVariants}>
				{children}
			</motion.div>

			{/* Brain scan lines */}
			{[...Array(5)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#26de81] to-transparent"
					style={{ top: `${20 + i * 15}%` }}
					initial={{ opacity: 0, scaleX: 0 }}
					animate={isInView ? {
						opacity: [0, 0.8, 0],
						scaleX: [0, 1, 0],
					} : {}}
					transition={{
						duration: 2,
						delay: 0.5 + i * 0.3,
						ease: "easeInOut",
					}}
				/>
			))}
		</motion.div>
	);
}