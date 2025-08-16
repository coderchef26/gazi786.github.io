/**
 * ATLAS Theme Configuration
 * Centralized theme constants for the ATLAS system
 */

export const atlasTheme = {
	colors: {
		// Primary colors
		primary: '#00d4ff',      // Cyan - main brand color
		primaryDark: '#0099cc',  // Darker cyan
		primaryLight: '#26e5ff', // Lighter cyan
		
		// Status colors
		success: '#26de81',      // Green - online/active
		warning: '#ff6b6b',      // Red - alerts
		info: '#00d4ff',         // Cyan - information
		
		// Background colors
		background: '#0a0a0f',   // Main dark background
		surface: '#1a1a2e',      // Panel backgrounds
		surfaceLight: '#16213e', // Lighter panels
		
		// Text colors
		text: '#00d4ff',         // Primary text
		textSecondary: '#00d4ff80', // 50% opacity
		textMuted: '#00d4ff4d',  // 30% opacity
		
		// Border colors
		border: '#00d4ff30',     // 19% opacity borders
		borderHover: '#00d4ff',  // Full opacity on hover
	},
	
	fonts: {
		display: 'var(--font-orbitron)',
		body: 'var(--font-inter)',
	},
	
	animation: {
		transition: 'all 0.3s ease',
		pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		glow: '0 0 30px',
	},
	
	spacing: {
		xs: '0.5rem',
		sm: '1rem',
		md: '1.5rem',
		lg: '2rem',
		xl: '3rem',
	},
	
	borderRadius: {
		sm: '0.25rem',
		md: '0.5rem',
		lg: '0.75rem',
		full: '9999px',
	},
	
	zIndex: {
		background: 0,
		content: 10,
		overlay: 20,
		modal: 30,
		navigation: 40,
		loader: 50,
		tooltip: 60,
		notification: 70,
	}
} as const;

export type AtlasTheme = typeof atlasTheme;