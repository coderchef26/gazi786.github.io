'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { StarkLoader } from '@/components/ui/StarkLoader';

interface StarkLayoutProps {
  children: React.ReactNode;
}

export const StarkLayout = ({ children }: StarkLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showInterface, setShowInterface] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowInterface(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Base Grid */}
        <div className="absolute inset-0 stark-grid opacity-10" />
        
        {/* Circuit Pattern */}
        <div className="absolute inset-0 circuit-pattern opacity-5" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d4ff] rounded-full opacity-5 blur-[100px] animate-blob" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#ff6b6b] rounded-full opacity-5 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#26de81] rounded-full opacity-5 blur-[110px] animate-blob animation-delay-4000" />
      </div>

      {/* Holographic Scan Lines */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30"
          animate={{ y: [0, window.innerHeight || 800] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent opacity-20"
          animate={{ y: [0, window.innerHeight || 800] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      {/* Loader */}
      <StarkLoader 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />

      {/* Main Interface */}
      {showInterface && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 min-h-screen flex flex-col"
        >
          {/* Static Outer Container */}
          <div className="fixed inset-0 pointer-events-none z-[1]">
            {/* Top HUD Elements */}
            <div className="absolute top-4 left-4 hud-element p-2 pointer-events-auto">
              <div className="w-12 h-2 bg-[#26de81] opacity-60" />
              <div className="text-xs stark-text mt-1">PWR: 100%</div>
            </div>
            
            <div className="absolute top-4 right-4 hud-element p-2 pointer-events-auto">
              <div className="w-16 h-2 bg-[#00d4ff] opacity-60" />
              <div className="text-xs stark-text mt-1">SYS: ONLINE</div>
            </div>

            {/* Corner UI Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#00d4ff] opacity-40" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#00d4ff] opacity-40" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#00d4ff] opacity-40" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#00d4ff] opacity-40" />

            {/* Side Panels */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent opacity-60" />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent opacity-60" />
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden">
            {/* Content Container with padding to avoid HUD overlap */}
            <div className="min-h-screen p-8 pt-20 pb-20">
              {children}
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] border-t border-[#00d4ff] z-[2]">
            <div className="h-full flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-[#26de81] rounded-full animate-pulse" />
                <span className="text-xs stark-text">JARVIS PROTOCOL ACTIVE</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-xs stark-text">NEURAL INTERFACE: STABLE</div>
                <div className="text-xs stark-text">ENERGY: OPTIMAL</div>
                <div className="text-xs stark-text">DEFENSE: READY</div>
              </div>
              
              <div className="text-xs stark-text">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};