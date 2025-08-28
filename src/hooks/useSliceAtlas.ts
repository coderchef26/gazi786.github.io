/**
 * Shared Hook for Slice ATLAS Integration
 * Simplified version that works with our slice implementations
 */

import { useCallback } from 'react';

interface UseSliceAtlasReturn {
  announceSlice: (message: string) => void;
  generateVoiceCommand: (command: string, handler: () => void) => void;
  speak: (text: string) => void;
}

export function useSliceAtlas(): UseSliceAtlasReturn {
  
  // Simple announce function for slice loading
  const announceSlice = useCallback((message: string) => {
    // In a real implementation, this would integrate with screen readers
    if (process.env.NODE_ENV === 'development') {
      // ATLAS announcement
    }
  }, []);

  // Generate voice commands (simplified for now)
  const generateVoiceCommand = useCallback((command: string, handler: () => void) => {
    // In a real implementation, this would register with speech recognition
    if (process.env.NODE_ENV === 'development') {
      // Voice command registered
    }
    
    // Store the handler for potential future use
    if (typeof window !== 'undefined') {
      (window as any).atlasVoiceCommands = (window as any).atlasVoiceCommands || {};
      (window as any).atlasVoiceCommands[command] = handler;
    }
  }, []);

  // Simple speak function
  const speak = useCallback((text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    announceSlice,
    generateVoiceCommand,
    speak
  };
}

// Legacy support for the old interface (if needed elsewhere)
interface UseSliceAtlasConfig {
  sliceType?: string;
  items?: any[];
  onItemSelect?: (item: any) => void;
}

export function useSliceAtlasLegacy(config?: UseSliceAtlasConfig) {
  const { announceSlice, generateVoiceCommand, speak } = useSliceAtlas();
  
  return {
    speak,
    announce: announceSlice,
    registerVoiceCommands: () => {},
    announceItemCount: () => {
      if (config?.items) {
        announceSlice(`${config.sliceType || 'Section'} contains ${config.items.length} items`);
      }
    },
    announceFilterChange: (filter: string, count: number) => {
      announceSlice(`Filtered by ${filter}, showing ${count} items`);
    }
  };
}