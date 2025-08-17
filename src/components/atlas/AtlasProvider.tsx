"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AtlasCore, AtlasConfig } from '@/lib/atlas/core';
import { AtlasAssistant, assistant } from '@/lib/atlas/assistant';
import { AtlasSpeech, AtlasRecognition, speech, recognition } from '@/lib/atlas/speech';

interface AtlasContextType {
  // Core system
  config: AtlasConfig;
  updateConfig: (updates: Partial<AtlasConfig>) => void;
  
  // Assistant
  isAssistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  processQuery: (query: string) => ReturnType<AtlasAssistant['processQuery']>;
  
  // Speech
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  
  // Recognition
  startListening: () => Promise<string>;
  stopListening: () => void;
  isListening: boolean;
  
  // Navigation
  currentSection: string;
  navigate: (section: string) => void;
  
  // Accessibility
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
  
  // Status
  isInitialized: boolean;
}

const AtlasContext = createContext<AtlasContextType | undefined>(undefined);

export const useAtlas = () => {
  const context = useContext(AtlasContext);
  if (!context) {
    throw new Error('useAtlas must be used within AtlasProvider');
  }
  return context;
};

interface AtlasProviderProps {
  children: React.ReactNode;
  onNavigate?: (section: string) => void;
}

export default function AtlasProvider({ children, onNavigate }: AtlasProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [config, setConfig] = useState<AtlasConfig>(() => AtlasCore.getInstance().getConfig());
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initialize ATLAS systems
  useEffect(() => {
    const initializeAtlas = async () => {
      try {
        // Initialize assistant
        await assistant.initialize();
        
        // Set up core listeners
        const core = AtlasCore.getInstance();
        
        const handleConfigUpdate = (newConfig: AtlasConfig) => {
          setConfig(newConfig);
        };

        const handleAnnouncement = ({ message, priority }: { message: string; priority: 'polite' | 'assertive' }) => {
          announce(message, priority);
        };

        const handleNavigation = (section: string) => {
          navigate(section);
        };

        const handleSpeak = ({ text, config: voiceConfig }: { text: string; config: any }) => {
          speak(text);
        };

        core.on('config:updated', handleConfigUpdate);
        core.on('announce', handleAnnouncement);
        core.on('navigate', handleNavigation);
        core.on('speak', handleSpeak);

        // Set up speech listeners
        const speechInstance = AtlasSpeech.getInstance();
        const updateSpeakingStatus = () => {
          setIsSpeaking(speechInstance.isSpeaking());
        };

        // Check speaking status periodically
        const speakingInterval = setInterval(updateSpeakingStatus, 500);

        // Set up recognition listeners
        const recognitionInstance = AtlasRecognition.getInstance();
        recognitionInstance.on('start', () => setIsListening(true));
        recognitionInstance.on('end', () => setIsListening(false));
        recognitionInstance.on('error', () => setIsListening(false));

        setIsInitialized(true);

        // Welcome message if enabled
        if (config.assistant.welcomeMessage && config.assistant.enabled) {
          setTimeout(() => {
            const welcomeMsg = assistant.getWelcomeMessage();
            announce(welcomeMsg);
            if (config.assistant.autoSpeak) {
              speak(welcomeMsg);
            }
          }, 2000);
        }

        return () => {
          clearInterval(speakingInterval);
          core.off('config:updated', handleConfigUpdate);
          core.off('announce', handleAnnouncement);
          core.off('navigate', handleNavigation);
          core.off('speak', handleSpeak);
        };
      } catch (error) {
        console.error('Failed to initialize ATLAS:', error);
        setIsInitialized(true); // Set to true anyway to prevent blocking
      }
    };

    initializeAtlas();
  }, []);

  // Update config
  const updateConfig = useCallback((updates: Partial<AtlasConfig>) => {
    AtlasCore.getInstance().updateConfig(updates);
  }, []);

  // Process assistant queries
  const processQuery = useCallback((query: string) => {
    return assistant.processQuery(query);
  }, []);

  // Speech functions
  const speak = useCallback(async (text: string) => {
    if (!config.voice.enabled) return;
    
    try {
      await speech.speak(text, {
        rate: config.voice.rate,
        pitch: config.voice.pitch,
        volume: config.voice.volume,
        voice: speech.getVoices().find(v => v.name === config.voice.preferredVoice)
      });
    } catch (error) {
      console.warn('Speech failed:', error);
    }
  }, [config.voice]);

  const stopSpeaking = useCallback(() => {
    speech.stop();
  }, []);

  // Recognition functions
  const startListening = useCallback(async () => {
    try {
      return await recognition.start();
    } catch (error) {
      console.warn('Recognition failed:', error);
      throw error;
    }
  }, []);

  const stopListening = useCallback(() => {
    recognition.stop();
  }, []);

  // Navigation
  const navigate = useCallback((section: string) => {
    setCurrentSection(section);
    onNavigate?.(section);
    
    // Update URL if needed
    if (typeof window !== 'undefined') {
      const url = section === 'hero' ? '/' : `/${section}`;
      window.history.pushState({}, '', url);
    }
  }, [onNavigate]);

  // Accessibility announcements
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (typeof window === 'undefined') return;

    // Create or update live region
    let liveRegion = document.getElementById('atlas-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'atlas-live-region';
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }

    // Update aria-live attribute if priority changed
    liveRegion.setAttribute('aria-live', priority);

    // Clear and announce
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion!.textContent = message;
    }, 100);
  }, []);

  // Apply accessibility settings to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // High contrast
    if (config.accessibility.highContrast) {
      root.classList.add('atlas-high-contrast');
    } else {
      root.classList.remove('atlas-high-contrast');
    }

    // Reduced motion
    if (config.accessibility.reducedMotion) {
      root.classList.add('atlas-reduced-motion');
    } else {
      root.classList.remove('atlas-reduced-motion');
    }

    // Font size
    root.style.fontSize = `${config.accessibility.fontSize}px`;

    // Large text
    if (config.accessibility.fontSize > 18) {
      root.classList.add('atlas-large-text');
    } else {
      root.classList.remove('atlas-large-text');
    }
  }, [config.accessibility]);

  const contextValue: AtlasContextType = {
    // Core
    config,
    updateConfig,
    
    // Assistant
    isAssistantOpen,
    setAssistantOpen: setIsAssistantOpen,
    processQuery,
    
    // Speech
    speak,
    stopSpeaking,
    isSpeaking,
    
    // Recognition
    startListening,
    stopListening,
    isListening,
    
    // Navigation
    currentSection,
    navigate,
    
    // Accessibility
    announce,
    
    // Status
    isInitialized
  };

  return (
    <AtlasContext.Provider value={contextValue}>
      {children}
      
      {/* Global accessibility styles */}
      <style jsx global>{`
        /* High Contrast Mode */
        .atlas-high-contrast {
          --bg-primary: #000000 !important;
          --bg-secondary: #111111 !important;
          --text-primary: #ffffff !important;
          --text-secondary: #ffff00 !important;
          --accent-color: #00ffff !important;
          --border-color: #ffffff !important;
        }

        .atlas-high-contrast * {
          background-color: var(--bg-primary) !important;
          color: var(--text-primary) !important;
          border-color: var(--border-color) !important;
        }

        .atlas-high-contrast button,
        .atlas-high-contrast a,
        .atlas-high-contrast [role="button"] {
          background-color: var(--bg-secondary) !important;
          color: var(--text-secondary) !important;
          border: 2px solid var(--border-color) !important;
        }

        /* Large Text Mode */
        .atlas-large-text h1 { font-size: 3em !important; }
        .atlas-large-text h2 { font-size: 2.5em !important; }
        .atlas-large-text h3 { font-size: 2em !important; }
        .atlas-large-text p, 
        .atlas-large-text div { font-size: 1.25em !important; line-height: 1.6 !important; }

        /* Reduced Motion */
        .atlas-reduced-motion *,
        .atlas-reduced-motion *::before,
        .atlas-reduced-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        /* Enhanced Focus Indicators */
        *:focus-visible {
          outline: 3px solid #00d4ff !important;
          outline-offset: 2px !important;
          border-radius: 2px !important;
        }

        /* Skip Links */
        .atlas-skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #00d4ff;
          color: #000;
          padding: 8px 12px;
          text-decoration: none;
          z-index: 9999;
          border-radius: 4px;
          font-weight: bold;
        }

        .atlas-skip-link:focus {
          top: 6px;
        }

        /* Screen Reader Only */
        .atlas-sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }
      `}</style>
    </AtlasContext.Provider>
  );
}