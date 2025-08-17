"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  fontSize: number;
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: any) => void;
  announceToScreenReader: (message: string) => void;
  currentFocus: string | null;
  setCurrentFocus: (focus: string | null) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export default function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    fontSize: 16,
    colorBlindMode: 'none'
  });

  const [currentFocus, setCurrentFocus] = useState<string | null>(null);

  useEffect(() => {
    // Load accessibility settings from localStorage
    const savedSettings = localStorage.getItem('atlas-accessibility');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings(prev => ({ ...prev, highContrast: true }));
    }

    // Add keyboard navigation listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab navigation announcements
      if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        if (activeElement) {
          const ariaLabel = activeElement.getAttribute('aria-label');
          const title = activeElement.getAttribute('title');
          const text = activeElement.textContent;
          
          const announcement = ariaLabel || title || text || 'Interactive element';
          announceToScreenReader(`Focused on: ${announcement}`);
        }
      }

      // Skip links (accessibility feature)
      if (e.key === 'Enter' && e.target instanceof HTMLElement) {
        const skipTo = e.target.getAttribute('data-skip-to');
        if (skipTo) {
          const targetElement = document.getElementById(skipTo);
          if (targetElement) {
            targetElement.focus();
            announceToScreenReader(`Skipped to ${skipTo} section`);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('atlas-accessibility', JSON.stringify(settings));

    // Apply CSS classes based on settings
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    if (settings.colorBlindMode !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlindMode}`);
    } else {
      root.classList.remove('colorblind-deuteranopia', 'colorblind-protanopia', 'colorblind-tritanopia');
    }

    // Apply font size
    root.style.fontSize = `${settings.fontSize}px`;

  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Announce changes to screen readers
    announceToScreenReader(`${key} ${value ? 'enabled' : 'disabled'}`);
  };

  const announceToScreenReader = (message: string) => {
    // Create a live region for screen reader announcements
    let liveRegion = document.getElementById('atlas-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'atlas-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-10000px';
      liveRegion.style.width = '1px';
      liveRegion.style.height = '1px';
      liveRegion.style.overflow = 'hidden';
      document.body.appendChild(liveRegion);
    }

    // Clear and set new message
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion!.textContent = message;
    }, 100);
  };

  const contextValue: AccessibilityContextType = {
    settings,
    updateSetting,
    announceToScreenReader,
    currentFocus,
    setCurrentFocus
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      
      {/* Accessibility CSS */}
      <style jsx global>{`
        /* High Contrast Mode */
        .high-contrast {
          --bg-primary: #000000;
          --bg-secondary: #111111;
          --text-primary: #ffffff;
          --text-secondary: #ffff00;
          --accent-color: #00ffff;
          --border-color: #ffffff;
        }

        .high-contrast * {
          background-color: var(--bg-primary) !important;
          color: var(--text-primary) !important;
          border-color: var(--border-color) !important;
        }

        .high-contrast button,
        .high-contrast a,
        .high-contrast [role="button"] {
          background-color: var(--bg-secondary) !important;
          color: var(--text-secondary) !important;
          border: 2px solid var(--border-color) !important;
        }

        /* Large Text Mode */
        .large-text {
          font-size: 1.25em !important;
        }

        .large-text h1 { font-size: 3em !important; }
        .large-text h2 { font-size: 2.5em !important; }
        .large-text h3 { font-size: 2em !important; }
        .large-text p, .large-text div { font-size: 1.25em !important; }

        /* Reduced Motion */
        .reduced-motion *,
        .reduced-motion *::before,
        .reduced-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        /* Color Blind Support */
        .colorblind-deuteranopia {
          filter: url('#deuteranopia-filter');
        }

        .colorblind-protanopia {
          filter: url('#protanopia-filter');
        }

        .colorblind-tritanopia {
          filter: url('#tritanopia-filter');
        }

        /* Focus Indicators */
        *:focus {
          outline: 3px solid #00d4ff !important;
          outline-offset: 2px !important;
        }

        /* Skip Links */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #00d4ff;
          color: #000;
          padding: 8px;
          text-decoration: none;
          z-index: 1000;
          border-radius: 4px;
        }

        .skip-link:focus {
          top: 6px;
        }

        /* Screen Reader Only */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Keyboard Navigation Indicators */
        .keyboard-nav-active {
          outline: 2px solid #00d4ff;
          outline-offset: 2px;
        }
      `}</style>

      {/* SVG Filters for Color Blind Support */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/>
          </filter>
        </defs>
      </svg>
    </AccessibilityContext.Provider>
  );
}