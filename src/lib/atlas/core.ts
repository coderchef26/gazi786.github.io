/**
 * ATLAS Core System - Production Implementation
 * Advanced Tactical Logic & Assistance System
 */

export interface AtlasConfig {
	voice: {
		enabled: boolean;
		preferredVoice: string;
		rate: number;
		pitch: number;
		volume: number;
	};
	accessibility: {
		screenReader: boolean;
		highContrast: boolean;
		reducedMotion: boolean;
		fontSize: number;
		keyboardNav: boolean;
	};
	assistant: {
		enabled: boolean;
		autoSpeak: boolean;
		welcomeMessage: boolean;
	};
	ui: {
		theme: "jarvis" | "atlas" | "stark";
		effects: boolean;
		hud: boolean;
		particles: boolean;
	};
}

export const defaultAtlasConfig: AtlasConfig = {
	voice: {
		enabled: true,
		preferredVoice: "",
		rate: 0.85,
		pitch: 0.8,
		volume: 0.9,
	},
	accessibility: {
		screenReader: false,
		highContrast: false,
		reducedMotion: false,
		fontSize: 16,
		keyboardNav: true,
	},
	assistant: {
		enabled: true,
		autoSpeak: true,
		welcomeMessage: true,
	},
	ui: {
		theme: "jarvis",
		effects: true,
		hud: true,
		particles: true,
	},
};

export class AtlasCore {
	private static instance: AtlasCore;
	private config: AtlasConfig;
	private listeners: Map<string, Function[]> = new Map();

	private constructor() {
		this.config = this.loadConfig();
	}

	public static getInstance(): AtlasCore {
		if (!AtlasCore.instance) {
			AtlasCore.instance = new AtlasCore();
		}
		return AtlasCore.instance;
	}

	public getConfig(): AtlasConfig {
		return { ...this.config };
	}

	public updateConfig(updates: Partial<AtlasConfig>): void {
		this.config = { ...this.config, ...updates };
		this.saveConfig();
		this.emit("config:updated", this.config);
	}

	public updateNestedConfig<K extends keyof AtlasConfig>(
		section: K,
		updates: Partial<AtlasConfig[K]>
	): void {
		this.config[section] = { ...this.config[section], ...updates };
		this.saveConfig();
		this.emit("config:updated", this.config);
	}

	private loadConfig(): AtlasConfig {
		if (typeof window === "undefined") return defaultAtlasConfig;

		try {
			const saved = localStorage.getItem("atlas-config");
			if (saved) {
				const parsed = JSON.parse(saved);
				return { ...defaultAtlasConfig, ...parsed };
			}
		} catch (error) {
			// Failed to load ATLAS config
		}

		return defaultAtlasConfig;
	}

	private saveConfig(): void {
		if (typeof window === "undefined") return;

		try {
			localStorage.setItem("atlas-config", JSON.stringify(this.config));
		} catch (error) {
			// Failed to save ATLAS config
		}
	}

	public on(event: string, callback: Function): void {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}
		this.listeners.get(event)!.push(callback);
	}

	public off(event: string, callback: Function): void {
		const callbacks = this.listeners.get(event);
		if (callbacks) {
			const index = callbacks.indexOf(callback);
			if (index > -1) {
				callbacks.splice(index, 1);
			}
		}
	}

	private emit(event: string, data?: any): void {
		const callbacks = this.listeners.get(event);
		if (callbacks) {
			callbacks.forEach((callback) => callback(data));
		}
	}

	public announce(
		message: string,
		priority: "polite" | "assertive" = "polite"
	): void {
		this.emit("announce", { message, priority });
	}

	public navigate(section: string): void {
		this.emit("navigate", section);
		this.announce(`Navigating to ${section} section`);
	}

	public speak(text: string): void {
		if (!this.config.voice.enabled) return;
		this.emit("speak", { text, config: this.config.voice });
	}

	public reset(): void {
		this.config = defaultAtlasConfig;
		this.saveConfig();
		this.emit("config:reset");
	}
}

export const atlas = AtlasCore.getInstance();
