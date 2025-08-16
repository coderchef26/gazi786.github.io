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
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const skillVariants = {
		hidden: { 
			opacity: 0, 
			scale: 0.3,
			filter: "blur(10px)"
		},
		visible: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				type: "spring",
				stiffness: 120,
				damping: 12,
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
		>
			{/* Power matrix background */}
			<div className="absolute inset-0 -z-10">
				{/* Matrix rain effect */}
				{[...Array(8)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-0.5 bg-gradient-to-b from-[#00d4ff] via-[#00d4ff]/50 to-transparent"
						style={{
							left: `${10 + i * 12}%`,
							height: "100%",
						}}
						initial={{ opacity: 0, scaleY: 0 }}
						animate={{ 
							opacity: [0, 1, 0],
							scaleY: [0, 1, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: i * 0.3,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Power grid */}
				<motion.div
					className="absolute inset-0 opacity-20"
					style={{
						backgroundImage: `
							radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
						`,
						backgroundSize: "40px 40px",
					}}
					animate={{
						backgroundPosition: ["0 0", "40px 40px"],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>

			{/* Power level indicators */}
			<div className="absolute top-4 left-4 space-y-2 z-20">
				{["CORE", "NET", "DB", "UI", "API"].map((system, i) => (
					<motion.div
						key={system}
						className="flex items-center space-x-2"
						initial={{ opacity: 0, x: -20 }}
						animate={isInView ? { opacity: 1, x: 0 } : {}}
						transition={{ delay: 0.2 + i * 0.1 }}
					>
						<motion.div
							className="w-2 h-2 bg-[#26de81] rounded-full"
							animate={{ 
								boxShadow: [
									"0 0 5px #26de81",
									"0 0 15px #26de81",
									"0 0 5px #26de81"
								]
							}}
							transition={{ 
								duration: 1.5, 
								repeat: Infinity,
								delay: i * 0.2
							}}
						/>
						<span className="text-xs text-[#26de81] font-mono">{system}</span>
						<motion.div
							className="w-8 h-1 bg-[#26de81]/30 rounded-full overflow-hidden"
						>
							<motion.div
								className="h-full bg-[#26de81] rounded-full"
								initial={{ width: "0%" }}
								animate={isInView ? { width: "100%" } : {}}
								transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
							/>
						</motion.div>
					</motion.div>
				))}
			</div>

			{/* Skills content */}
			<motion.div variants={skillVariants}>
				{children}
			</motion.div>

			{/* Energy pulse rings */}
			{[...Array(3)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute top-1/2 left-1/2 border border-[#00d4ff]/30 rounded-full pointer-events-none"
					style={{
						width: `${200 + i * 100}px`,
						height: `${200 + i * 100}px`,
						marginLeft: `${-100 - i * 50}px`,
						marginTop: `${-100 - i * 50}px`,
					}}
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.1, 0.3],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						delay: i * 0.5,
						ease: "easeInOut",
					}}
				/>
			))}
		</motion.div>
	);
}