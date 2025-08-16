"use client";

import React from "react";
import { motion } from "framer-motion";
import { Typography, Container } from "@mui/material";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Home, ArrowBack } from "@mui/icons-material";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-mesh-gradient relative overflow-hidden">
			{/* Background Animation */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20"
					animate={{
						x: [0, 100, 0],
						y: [0, -50, 0],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20"
					animate={{
						x: [0, -100, 0],
						y: [0, 50, 0],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>

			<Container maxWidth="md" className="relative z-10">
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
						className="mb-8"
					>
						<Typography
							variant="h1"
							className="text-8xl md:text-9xl font-bold gradient-text mb-4"
						>
							404
						</Typography>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.6 }}
					>
						<Typography
							variant="h2"
							className="text-gray-700 dark:text-gray-300 mb-4 text-2xl md:text-3xl font-medium"
						>
							Page Not Found
						</Typography>
						<Typography
							variant="body1"
							className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto"
						>
							The page you&#39;re looking for seems to have wandered off into
							the digital void.
						</Typography>
					</motion.div>

					<motion.div
						className="flex flex-col sm:flex-row gap-4 justify-center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6 }}
					>
						<Link href="/">
							<Button size="large" className="px-8 py-3">
								<Home className="w-5 h-5 mr-2" />
								Go Home
							</Button>
						</Link>
						<Button
							variant="outlined"
							size="large"
							className="px-8 py-3"
							onClick={() => window.history.back()}
						>
							<ArrowBack className="w-5 h-5 mr-2" />
							Go Back
						</Button>
					</motion.div>
				</motion.div>
			</Container>
		</div>
	);
}
