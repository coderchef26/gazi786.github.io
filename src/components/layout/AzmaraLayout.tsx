"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AzmaraLoader } from "@/components/ui/AzmaraLoader";
import { LeftPanel } from "./LeftPanel";
import { MainContent } from "./MainContent";
import { BottomStatusBar } from "./BottomStatusBar";

interface AzmaraLayoutProps {
	children: React.ReactNode;
}

export const AzmaraLayout = ({ children }: AzmaraLayoutProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [showInterface, setShowInterface] = useState(false);

	const handleLoadingComplete = () => {
		setIsLoading(false);
		setTimeout(() => setShowInterface(true), 500);
	};

	return (
		<div className="h-screen w-screen relative overflow-hidden p-4">
			{/* Background Layers */}
			<div className="fixed inset-0 z-0">
				{/* Base Grid */}
				<div className="absolute inset-0 azmara-grid opacity-10" />

				{/* Circuit Pattern */}
				<div className="absolute inset-0 circuit-pattern opacity-5" />

				{/* Animated Background Elements */}
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d4ff] rounded-full opacity-5 blur-[100px] animate-blob" />
				<div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#ff6b6b] rounded-full opacity-5 blur-[120px] animate-blob animation-delay-2000" />
				<div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#26de81] rounded-full opacity-5 blur-[110px] animate-blob animation-delay-4000" />
			</div>

			{/* Holographic Scan Lines */}
			<div className="fixed inset-0 pointer-events-none z-[2]">
				<motion.div
					className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30"
					animate={{
						y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
					}}
					transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent opacity-20"
					animate={{
						y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "linear",
						delay: 2,
					}}
				/>
			</div>

			{/* Loader */}
			<AzmaraLoader
				isLoading={isLoading}
				onLoadingComplete={handleLoadingComplete}
			/>

			{/* Main Interface */}
			{showInterface && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
					className="relative h-full w-full flex flex-col"
				>
					{/* Main Layout Container */}
					<div className="flex-1 flex h-full w-full overflow-hidden">
						{/* Left Panel */}
						<LeftPanel isActive={true} />

						{/* Right Side Container */}
						<div className="w-[80%] flex flex-col h-full">
							{/* Main Content Area */}
							<div className="flex-1 overflow-hidden">
								<MainContent>{children}</MainContent>
							</div>

							{/* Bottom Status Bar - Stacked with Main Content */}
							<BottomStatusBar />
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};
