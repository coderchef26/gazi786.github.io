'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AzmaraEffects from './AzmaraEffects';

interface HolographicInterfaceProps {
  isActive?: boolean;
  children?: React.ReactNode;
}

export default function HolographicInterface({ isActive = true, children }: HolographicInterfaceProps) {
  const [mounted, setMounted] = useState(false);
  const [scanlines] = useState<number[]>(Array.from({ length: 20 }, (_, i) => i * 5));
  const [dataStreams] = useState<Array<{ id: number; text: string; delay: number }>>([
    'SYSTEM STATUS: OPERATIONAL',
    'NEURAL LINK: ESTABLISHED',
    'POWER CORE: 100% CAPACITY',
    'DEFENSE GRID: ACTIVE',
    'TARGETING SYSTEM: ONLINE',
    'ARC REACTOR: STABLE',
    'AI ASSISTANT: ATLAS READY',
    'SECURITY PROTOCOLS: ENGAGED'
  ].map((text, i) => ({
    id: i,
    text,
    delay: i * 2
  })));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isActive) return <>{children}</>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Iron Man Style AzmaraEffects */}
      <AzmaraEffects />
      
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridPulse 4s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* Scanning lines */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        {scanlines.map((position) => (
          <motion.div
            key={position}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: position * 0.1,
              ease: "easeInOut"
            }}
            className="absolute h-px bg-cyan-400/50 left-0 right-0"
            style={{ top: `${position}%` }}
          />
        ))}
      </div>

      {/* Floating holographic elements */}
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-[6]">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${20 + i * 15}%`,
                y: `${10 + i * 12}%`,
                opacity: 0 
              }}
              animate={{ 
                x: [`${20 + i * 15}%`, `${60 + i * 10}%`, `${20 + i * 15}%`],
                y: [`${10 + i * 12}%`, `${70 + i * 8}%`, `${10 + i * 12}%`],
                opacity: [0, 0.6, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                delay: i * 3,
                ease: "linear"
              }}
              className="absolute w-8 h-8 border border-cyan-400/30"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          ))}
        </div>
      )}

      {/* Data streams */}
      <div className="fixed left-4 top-1/4 pointer-events-none z-[7]">
        <AnimatePresence>
          {dataStreams.map((stream) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                x: [-50, 0, 0, 50]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: stream.delay,
                ease: "easeInOut"
              }}
              className="text-xs jarvis-text text-cyan-400/60 mb-1"
            >
              &gt; {stream.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Corner HUD elements */}
      <div className="fixed top-4 left-4 pointer-events-none z-[8]">
        <div className="w-20 h-20 border-l-2 border-t-2 border-cyan-400/50" />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full"
        />
      </div>
      
      <div className="fixed top-4 right-4 pointer-events-none z-[8]">
        <div className="w-20 h-20 border-r-2 border-t-2 border-cyan-400/50" />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"
        />
      </div>

      <div className="fixed bottom-4 left-4 pointer-events-none z-[8]">
        <div className="w-20 h-20 border-l-2 border-b-2 border-cyan-400/50" />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-400 rounded-full"
        />
      </div>

      <div className="fixed bottom-4 right-4 pointer-events-none z-[8]">
        <div className="w-20 h-20 border-r-2 border-b-2 border-cyan-400/50" />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 rounded-full"
        />
      </div>

      {/* Central Arc Reactor pulse */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-96 h-96 rounded-full border border-cyan-400/20"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
          className="absolute inset-8 rounded-full border border-cyan-400/30"
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-20">
        {children}
      </div>

      <style jsx>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}