"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAtlas } from './AtlasProvider';

interface IslamicGreetingProps {
  onComplete?: () => void;
  autoSpeak?: boolean;
}

/**
 * Beautiful Islamic greeting component for homepage welcome
 * Shows Arabic greeting with English translation
 */
export default function IslamicGreeting({ onComplete, autoSpeak = true }: IslamicGreetingProps) {
  const { speak, announce, config } = useAtlas();
  const [showTranslation, setShowTranslation] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const arabicGreeting = "السلام عليكم ورحمة الله وبركاته";
  const englishTranslation = "May the peace, mercy, and blessings of Almighty God be upon you";
  const welcomeMessage = "Welcome to Alshafaraz's ATLAS Portfolio System";

  useEffect(() => {
    const sequence = async () => {
      // Wait a moment for page load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Announce the greeting for accessibility
      announce(`${arabicGreeting}. ${englishTranslation}. ${welcomeMessage}`);

      // Speak the greeting if enabled
      if (autoSpeak && config.assistant.autoSpeak && config.voice.enabled) {
        await speak(`Assalamualaikum Wa Rahmatullahi Wa Barakatuh. ${englishTranslation}. ${welcomeMessage}. I'm your AI assistant, ready to guide you through this portfolio.`);
      }

      // Show translation after Arabic text appears
      setTimeout(() => {
        setShowTranslation(true);
      }, 2000);

      // Auto-hide after 8 seconds
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 8000);
    };

    sequence();
  }, [autoSpeak, config, announce, speak, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
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
            style={{ fontFamily: 'serif', direction: 'rtl' }}
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
            "{englishTranslation}"
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
            <span className="px-4 text-sm uppercase tracking-wider">Advanced Tactical Logic & Assistance System</span>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1"></div>
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="flex items-center justify-center space-x-3"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
          <span className="text-cyan-400 text-sm">Initializing ATLAS Systems...</span>
        </motion.div>

        {/* Skip button for accessibility */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
          onClick={() => {
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