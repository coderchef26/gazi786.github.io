"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAtlas } from "./AtlasProvider";

interface IslamicGreetingProps {
	onComplete?: () => void;
	autoSpeak?: boolean;
}

/**
 * Beautiful Islamic greeting component for homepage welcome
 * Shows Arabic greeting with English translation
 */
export default function IslamicGreeting({
	onComplete,
	autoSpeak = true,
}: IslamicGreetingProps) {
	const { speak, announce, config } = useAtlas();
	const [showTranslation, setShowTranslation] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [audioEnabled, setAudioEnabled] = useState(false);
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	const arabicGreeting = "السلام عليكم ورحمة الله وبركاته";
	const englishTranslation =
		"May the peace, mercy, and blessings of Almighty God be upon you";
	const welcomeMessage =
		"Welcome to Alshafaraz's AKA CoderChef's Portfolio System.";

	const playGreeting = async () => {
		setHasUserInteracted(true);
		setAudioEnabled(true);

		// Speak the greeting with improved pronunciation
		if (config.voice.enabled) {
			try {
				// Use more natural phonetic representation
				const phoneticGreeting =
					"Ah-sah-LAH-moo-ah-LAY-koom Wah-RAH-mah-too-LAH-hee Wah-bah-RAH-kah-too";
				const fullMessage = `${phoneticGreeting}. ${englishTranslation}. ${welcomeMessage}. I'm ATLAS, ready to guide you through this portfolio.`;

				// Speak with slower rate and lower pitch for better pronunciation
				await speak(fullMessage, { rate: 0.75, pitch: 0.7 });
			} catch (error) {
				// Speech failed silently
			}
		}
	};

	useEffect(() => {
		const sequence = async () => {
			// Wait a moment for page load
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Announce the greeting for accessibility
			announce(`${arabicGreeting}. ${englishTranslation}. ${welcomeMessage}`);

			// Show translation after Arabic text appears
			setTimeout(() => {
				setShowTranslation(true);
			}, 2000);

			// Auto-hide after 10 seconds (giving more time for user to interact)
			setTimeout(() => {
				setIsVisible(false);
				onComplete?.();
			}, 10000);
		};

		sequence();
	}, [announce, onComplete]);

	if (!isVisible) return null;

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm cursor-pointer"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8 }}
			onClick={() => {
				if (!hasUserInteracted && config.voice.enabled) {
					playGreeting();
				}
			}}
		>
			<div className="text-center space-y-8 max-w-4xl px-6">
				{/* Islamic Greeting in Arabic */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="space-y-2"
				>
					<h1
						className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text"
						style={{ fontFamily: "serif", direction: "rtl" }}
						aria-label="Arabic Islamic greeting"
					>
						{arabicGreeting}
					</h1>

					{/* English Translation */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: showTranslation ? 1 : 0 }}
						transition={{ duration: 0.8 }}
						className="text-xl md:text-2xl text-slate-300 font-light italic"
						aria-live="polite"
					>
						&quot;{englishTranslation}&quot;
					</motion.p>
				</motion.div>

				{/* Welcome Message */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 1.5 }}
					className="space-y-4"
				>
					<h2 className="text-2xl md:text-3xl font-semibold text-white font-orbitron">
						{welcomeMessage}
					</h2>

					<div className="flex items-center justify-center space-x-4 text-slate-400">
						<div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1"></div>
						<span className="px-4 text-sm uppercase tracking-wider">
							Advanced Tactical Logic & Assistance System
						</span>
						<div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1"></div>
					</div>
				</motion.div>

				{/* Audio Control Button */}
				{!hasUserInteracted && config.voice.enabled && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 2.5 }}
						className="flex flex-col items-center justify-center space-y-2"
					>
						<button
							onClick={(e) => {
								e.stopPropagation();
								playGreeting();
							}}
							className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400 transition-all duration-300 flex items-center space-x-3"
							aria-label="Play audio greeting"
						>
							{/* Speaker Icon */}
							<svg
								className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M10 9l6-6v18l-6-6m-6 0h4m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1"
								/>
							</svg>
							<span className="text-cyan-300 font-medium">
								Listen to Greeting
							</span>

							{/* Pulse animation */}
							<span className="absolute inset-0 rounded-lg animate-pulse bg-cyan-400/10"></span>
						</button>
						<p className="text-xs text-slate-500">
							Click to hear the audio greeting
						</p>
					</motion.div>
				)}

				{/* Loading indicator (show when audio is playing) */}
				{(hasUserInteracted || !config.voice.enabled) && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: hasUserInteracted ? 0 : 2.5 }}
						className="flex items-center justify-center space-x-3"
					>
						<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
						<span className="text-cyan-400 text-sm">
							{audioEnabled
								? "Playing greeting..."
								: "Initializing ATLAS Systems..."}
						</span>
					</motion.div>
				)}

				{/* Skip button for accessibility */}
				<motion.button
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 3 }}
					onClick={(e) => {
						e.stopPropagation();
						setIsVisible(false);
						onComplete?.();
					}}
					className="absolute bottom-8 right-8 px-4 py-2 bg-slate-800/50 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:border-cyan-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
					aria-label="Skip greeting and continue to portfolio"
				>
					Skip Greeting
				</motion.button>
			</div>

			{/* Subtle particle effects */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(12)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [-20, -100],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 3,
						}}
					/>
				))}
			</div>
		</motion.div>
	);
}
