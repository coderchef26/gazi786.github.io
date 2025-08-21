"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedContentProps {
	children: React.ReactNode;
}

export default function AnimatedContent({ children }: AnimatedContentProps) {
	const container = useRef(null);
	const isInView = useInView(container, { once: true, margin: "-100px" });

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.2,
			},
		},
	};

	const slideUpVariants = {
		hidden: { y: 60, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	const glitchVariants = {
		hidden: { x: 0 },
		visible: {
			x: [0, -2, 2, 0],
			transition: {
				duration: 0.3,
				repeat: 2,
				delay: 0.5,
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
			{/* Holographic grid background */}
			<div className="absolute inset-0 -z-10 opacity-20">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ff]/10 to-transparent" />
				<motion.div
					className="absolute inset-0"
					style={{
						backgroundImage: `
							linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
						`,
						backgroundSize: "20px 20px",
					}}
					animate={{
						backgroundPosition: ["0 0", "20px 20px"],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>

			{/* Digital glitch effect */}
			<motion.div variants={glitchVariants} className="relative">
				<motion.div variants={slideUpVariants}>
					{children}
				</motion.div>
			</motion.div>

			{/* Data stream lines */}
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-[1px] h-20 bg-gradient-to-b from-[#00d4ff] to-transparent"
						initial={{ y: -100, x: 100 + i * 150 }}
						animate={{ y: "100vh" }}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: i * 1.5,
							ease: "linear",
						}}
					/>
				))}
			</div>
		</motion.div>
	);
}