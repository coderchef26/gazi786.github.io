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
				staggerChildren: 0.15,
			},
		},
	};

	const projectVariants = {
		hidden: { 
			opacity: 0, 
			rotateY: -90,
			z: -100 
		},
		visible: {
			opacity: 1,
			rotateY: 0,
			z: 0,
			transition: {
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
				duration: 0.8,
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
			{/* Mission briefing UI overlay */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-60" />
			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent opacity-40" />
			
			{/* Target acquisition grid */}
			<div className="absolute inset-0 -z-10">
				<motion.div
					className="absolute inset-0 border-l border-t border-[#00d4ff]/20"
					animate={{
						borderColor: ["rgba(0, 212, 255, 0.2)", "rgba(0, 212, 255, 0.4)", "rgba(0, 212, 255, 0.2)"],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
					}}
				/>
				
				{/* Corner brackets */}
				<div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00d4ff]" />
				<div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#00d4ff]" />
				<div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#00d4ff]" />
				<div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#00d4ff]" />
			</div>

			{/* Mission status indicator */}
			<motion.div
				className="absolute top-4 right-4 flex items-center space-x-2 z-20"
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5, type: "spring" as const }}
			>
				<motion.div
					className="w-2 h-2 bg-[#26de81] rounded-full"
					animate={{ opacity: [1, 0.3, 1] }}
					transition={{ duration: 2, repeat: Infinity }}
				/>
				<span className="text-xs text-[#26de81] font-mono">MISSIONS ACTIVE</span>
			</motion.div>

			{/* Projects content */}
			<motion.div variants={projectVariants}>
				{children}
			</motion.div>

			{/* Targeting reticle animation */}
			<motion.div
				className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
				initial={{ opacity: 0, scale: 2 }}
				animate={isInView ? { 
					opacity: [0, 0.6, 0], 
					scale: [2, 1, 0.5],
					rotate: [0, 360]
				} : {}}
				transition={{ 
					duration: 2, 
					delay: 0.3,
					ease: "easeInOut"
				}}
			>
				<div className="absolute inset-0 border-2 border-[#ff6b6b] rounded-full" />
				<div className="absolute top-1/2 left-1/2 w-8 h-[2px] bg-[#ff6b6b] -translate-x-1/2 -translate-y-1/2" />
				<div className="absolute top-1/2 left-1/2 w-[2px] h-8 bg-[#ff6b6b] -translate-x-1/2 -translate-y-1/2" />
			</motion.div>
		</motion.div>
	);
}