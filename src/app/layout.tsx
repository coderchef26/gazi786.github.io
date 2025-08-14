import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StarkLayout } from "@/components/layout/StarkLayout";
import StarkEffects from "@/components/effects/StarkEffects";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Alshafaraz Gazi - Full-Stack Developer & Creative Problem Solver",
	description:
		"Portfolio of Alshafaraz Gazi, a passionate full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Creating exceptional user experiences and scalable solutions.",
	keywords: [
		"Alshafaraz Gazi",
		"Full-Stack Developer",
		"React",
		"Next.js",
		"TypeScript",
		"Node.js",
		"Portfolio",
	],
	authors: [{ name: "Alshafaraz Gazi" }],
	creator: "Alshafaraz Gazi",
	publisher: "Alshafaraz Gazi",
	robots: "index, follow",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://gazi786.github.io",
		title: "Alshafaraz Gazi - Full-Stack Developer",
		description:
			"Portfolio showcasing modern web applications and creative solutions",
		siteName: "Alshafaraz Gazi Portfolio",
	},
	twitter: {
		card: "summary_large_image",
		title: "Alshafaraz Gazi - Full-Stack Developer",
		description:
			"Portfolio showcasing modern web applications and creative solutions",
		creator: "@yourusername",
	},
	viewport: "width=device-width, initial-scale=1",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-[#00d4ff] overflow-hidden`}
			>
				<ThemeProvider>
					<div className="h-screen w-screen fixed inset-0">
						<StarkLayout>
							{children}
						</StarkLayout>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
