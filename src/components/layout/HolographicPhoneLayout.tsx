"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HolographicPhoneLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicPhoneLayout({ 
  children, 
  className = '' 
}: HolographicPhoneLayoutProps) {
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [hologramStatic, setHologramStatic] = useState(0.1);
  const animationRef = useRef<number | undefined>(undefined);

  // Advanced holographic animations
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Continuous scanning line
      setScanlinePosition((prev) => (prev + 1.5) % 100);
      
      // Random glitch effects
      if (Math.random() < 0.005) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }
      
      // Hologram static variation
      setHologramStatic(0.05 + Math.sin(time * 3) * 0.03);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Tony Stark Phone UI Background System */}
      <div className="fixed inset-0 z-0">
        {/* Charcoal Gray Smart Glass Base */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, 
                rgba(45, 45, 45, 0.95) 0%, 
                rgba(25, 25, 25, 0.98) 50%, 
                rgba(15, 15, 15, 1) 100%
              )
            `
          }}
        />
        
        {/* Holographic Glass Overlay */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(0, 212, 255, 0.08) 0%, 
                transparent 25%, 
                rgba(0, 212, 255, 0.04) 50%, 
                transparent 75%, 
                rgba(0, 212, 255, 0.06) 100%
              )
            `,
            backdropFilter: 'blur(0.5px)',
          }}
        />

        {/* Smart Glass Reflection Effects */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(45deg, 
                transparent 30%, 
                rgba(255, 255, 255, 0.02) 50%, 
                transparent 70%
              )
            `
          }}
        />

        {/* Holographic Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Scanning Line System */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent ${scanlinePosition - 1}%, 
                rgba(0, 212, 255, 0.6) ${scanlinePosition}%, 
                transparent ${scanlinePosition + 1}%
              )
            `,
            filter: 'blur(0.5px)'
          }}
        />

        {/* Secondary Scanning Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: `
              linear-gradient(45deg, 
                transparent ${(scanlinePosition * 1.3) % 100 - 0.5}%, 
                rgba(64, 224, 255, 0.4) ${(scanlinePosition * 1.3) % 100}%, 
                transparent ${(scanlinePosition * 1.3) % 100 + 0.5}%
              )
            `
          }}
        />

        {/* Holographic Static/Noise */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 212, 255, ${hologramStatic}) 2px,
                rgba(0, 212, 255, ${hologramStatic}) 4px
              )
            `
          }}
        />
      </div>

      {/* Glitch Effect Overlay */}
      <AnimatePresence>
        {glitchEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: `
                linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(0, 212, 255, 0.1) 50%, 
                  transparent 100%
                )
              `,
              filter: 'blur(1px)'
            }}
          />
        )}
      </AnimatePresence>

      {/* HUD Corner Indicators */}
      <div className="fixed top-4 left-4 z-40">
        <div className="w-8 h-8 border-l-2 border-t-2 border-cyan-400 opacity-60" />
      </div>
      <div className="fixed top-4 right-4 z-40">
        <div className="w-8 h-8 border-r-2 border-t-2 border-cyan-400 opacity-60" />
      </div>
      <div className="fixed bottom-4 left-4 z-40">
        <div className="w-8 h-8 border-l-2 border-b-2 border-cyan-400 opacity-60" />
      </div>
      <div className="fixed bottom-4 right-4 z-40">
        <div className="w-8 h-8 border-r-2 border-b-2 border-cyan-400 opacity-60" />
      </div>

      {/* Status Bar - Tony Stark Style */}
      <div className="fixed top-0 left-0 right-0 z-30 p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider">
              ATLAS PROTOCOL ACTIVE
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-cyan-400/60 font-mono">
              {new Date().toLocaleTimeString()}
            </span>
            <div className="w-16 h-1 bg-cyan-400/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Holographic Container */}
      <div className="relative z-10 pt-16">
        {children}
      </div>

      {/* Bottom HUD Information */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center">
            <div className="text-xs text-cyan-400/60 font-mono uppercase tracking-wider">
              JARVIS INTERFACE v2.1.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}