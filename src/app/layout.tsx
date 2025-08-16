import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AzmaraLayout } from "@/components/layout/AzmaraLayout";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const orbitron = Orbitron({
	subsets: ["latin"],
	variable: "--font-orbitron",
	weight: ["400", "700", "900"],
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

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
	icons: {
		icon: "/favicon/favicon.ico",
		shortcut: "/favicon/favicon-16x16.png",
		apple: "/favicon/apple-touch-icon.png",
		other: [
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				url: "/favicon/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				url: "/favicon/favicon-16x16.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-[#0a0a0f] text-[#00d4ff]`}
				suppressHydrationWarning
			>
				<ThemeProvider>
					<AzmaraLayout>{children}</AzmaraLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}
