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

	const commVariants = {
		hidden: { 
			opacity: 0, 
			scale: 0.8,
			filter: "blur(5px)"
		},
		visible: {
			opacity: 1,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				type: "spring" as const,
				stiffness: 100,
				damping: 15,
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
			{/* Communication array background */}
			<div className="absolute inset-0 -z-10">
				{/* Radar sweep */}
				<motion.div
					className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
					animate={{
						rotate: 360,
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
					}}
				>
					<div 
						className="w-full h-full rounded-full border border-[#00d4ff]/20"
						style={{
							background: `conic-gradient(from 0deg, transparent 70%, rgba(0, 212, 255, 0.3) 100%)`,
						}}
					/>
				</motion.div>

				{/* Concentric circles */}
				{[...Array(4)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute top-1/2 left-1/2 border border-[#00d4ff]/20 rounded-full"
						style={{
							width: `${100 + i * 50}px`,
							height: `${100 + i * 50}px`,
							marginLeft: `${-50 - i * 25}px`,
							marginTop: `${-50 - i * 25}px`,
						}}
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.2, 0.4, 0.2],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: i * 0.5,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Signal waves */}
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-[#26de81] rounded-full"
						style={{
							left: `${20 + i * 12}%`,
							top: "50%",
						}}
						animate={{
							y: [-10, 10, -10],
							opacity: [0.3, 1, 0.3],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: i * 0.2,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* Communication status */}
			<motion.div
				className="absolute top-4 left-4 z-20"
				initial={{ opacity: 0, x: -20 }}
				animate={isInView ? { opacity: 1, x: 0 } : {}}
				transition={{ delay: 0.5 }}
			>
				<div className="flex items-center space-x-2">
					<motion.div
						className="w-3 h-3 bg-[#26de81] rounded-full"
						animate={{
							boxShadow: [
								"0 0 5px #26de81",
								"0 0 20px #26de81",
								"0 0 5px #26de81"
							]
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
						}}
					/>
					<span className="text-xs text-[#26de81] font-mono">COMMS ACTIVE</span>
				</div>
			</motion.div>

			{/* Signal strength indicator */}
			<motion.div
				className="absolute top-4 right-4 z-20 flex space-x-1"
				initial={{ opacity: 0, x: 20 }}
				animate={isInView ? { opacity: 1, x: 0 } : {}}
				transition={{ delay: 0.7 }}
			>
				{[...Array(5)].map((_, i) => (
					<motion.div
						key={i}
						className="w-1 bg-[#00d4ff] rounded-full"
						style={{ height: `${8 + i * 3}px` }}
						animate={{
							opacity: [0.3, 1, 0.3],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							delay: i * 0.1,
						}}
					/>
				))}
			</motion.div>

			{/* Contact content */}
			<motion.div variants={commVariants}>
				{children}
			</motion.div>

			{/* Transmission lines */}
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent"
					style={{ top: `${10 + i * 10}%` }}
					initial={{ opacity: 0, scaleX: 0 }}
					animate={isInView ? {
						opacity: [0, 0.6, 0],
						scaleX: [0, 1, 0],
					} : {}}
					transition={{
						duration: 2,
						delay: 1 + i * 0.2,
						ease: "easeInOut",
					}}
				/>
			))}

			{/* Data packets */}
			{[...Array(4)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-2 h-2 bg-[#ff6b6b] rounded-full opacity-60"
					style={{
						left: "10%",
						top: `${30 + i * 15}%`,
					}}
					animate={{
						x: ["0%", "800%"],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						delay: i * 0.7,
						ease: "easeInOut",
					}}
				/>
			))}
		</motion.div>
	);
}