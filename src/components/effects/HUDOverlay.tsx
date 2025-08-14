'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HUDOverlay() {
  const [time, setTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('ONLINE');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top Left - System Status */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-4 z-50 pointer-events-none"
      >
        <div className="jarvis-panel jarvis-text text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus === 'ONLINE' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className="text-cyan-400">SYSTEM: {systemStatus}</span>
          </div>
          <div className="text-cyan-300 opacity-70">
            ATLAS v2.0
          </div>
        </div>
      </motion.div>

      {/* Top Right - Time Display */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50 pointer-events-none"
      >
        <div className="jarvis-text text-cyan-400 text-right">
          <div className="text-2xl font-bold glow-text">
            {time.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
          </div>
          <div className="text-xs opacity-70">
            {time.toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </motion.div>

      {/* Corner Brackets */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-12 left-12"
        >
          <svg width="60" height="60" className="text-cyan-400 opacity-30">
            <path
              d="M 0 20 L 0 0 L 20 0"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-12 right-12"
        >
          <svg width="60" height="60" className="text-cyan-400 opacity-30">
            <path
              d="M 40 0 L 60 0 L 60 20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-12 left-12"
        >
          <svg width="60" height="60" className="text-cyan-400 opacity-30">
            <path
              d="M 0 40 L 0 60 L 20 60"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-12 right-12"
        >
          <svg width="60" height="60" className="text-cyan-400 opacity-30">
            <path
              d="M 40 60 L 60 60 L 60 40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>

      {/* Scanning Line */}
      <div className="scan-line" />
      
      {/* Grid Overlay */}
      <div className="hud-grid" />
      
      {/* Hexagon Grid */}
      <div className="hex-grid" />
    </>
  );
}