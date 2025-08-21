"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedContentProps {
	children: React.ReactNode;
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
	const container = useRef(null);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0, scale: 0.8 },
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut" as const,
			},
		},
	};

	const reactorVariants = {
		hidden: { scale: 0, rotate: -180 },
		visible: {
			scale: 1,
			rotate: 0,
			transition: {
				type: "spring" as "spring",
				stiffness: 100,
				damping: 15,
				duration: 1.2,
			},
		},
	};

	return (
		<motion.div
			ref={container}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="relative overflow-hidden"
		>
			{/* Hero Background Effects */}
			<div className="absolute inset-0 -z-10">
				{/* Energy particles */}
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-[#00d4ff] rounded-full"
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							opacity: 0,
						}}
						animate={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}
			</div>


			{/* Main Content */}
			<motion.div variants={itemVariants} className="relative z-20">
				{children}
			</motion.div>

			{/* Scanning line effect */}
			<motion.div
				className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"
				initial={{ y: 0, opacity: 0 }}
				animate={{
					y: typeof window !== "undefined" ? window.innerHeight : 800,
					opacity: [0, 0.8, 0],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "linear" as const,
					delay: 1,
				}}
			/>
		</motion.div>
	);
}
