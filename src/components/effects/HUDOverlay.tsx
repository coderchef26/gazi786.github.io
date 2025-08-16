'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HUDOverlay() {
  const [time, setTime] = useState(new Date());
  const [systemStatus] = useState('ONLINE');
  const [powerLevel] = useState(98);
  const [temperature] = useState(72);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Iron Man Style Curved HUD Elements */}
      
      {/* Top Arc Display */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] pointer-events-none z-40">
        <svg width="600" height="150" className="absolute">
          <motion.path
            d="M 50 100 Q 300 20 550 100"
            stroke="rgba(0, 212, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Tick marks along arc */}
          {[...Array(11)].map((_, i) => (
            <motion.line
              key={i}
              x1={60 + i * 48}
              y1={100 - (i === 5 ? 75 : 70)}
              x2={60 + i * 48}
              y2={100 - (i === 5 ? 85 : 75)}
              stroke="rgba(0, 212, 255, 0.5)"
              strokeWidth={i === 5 ? "2" : "1"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
            />
          ))}
        </svg>
        
        {/* Center Top Display */}
        <motion.div 
          className="absolute top-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-[#00d4ff] text-xs font-mono opacity-70">ATLAS PROTOCOL</div>
          <div className="text-[#00d4ff] text-2xl font-bold glow-text">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </motion.div>
      </div>

      {/* Left Side Panel - System Metrics */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-1/2 left-8 -translate-y-1/2 z-40 pointer-events-none"
      >
        <div className="space-y-6">
          {/* Power Meter */}
          <div className="relative">
            <svg width="120" height="120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(0, 212, 255, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="#00d4ff"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${Math.PI * 100 * (powerLevel / 100)} ${Math.PI * 100}`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                initial={{ strokeDasharray: "0 314" }}
                animate={{ strokeDasharray: `${Math.PI * 100 * (powerLevel / 100)} ${Math.PI * 100}` }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[#00d4ff] text-2xl font-bold">{powerLevel}%</div>
                <div className="text-[#00d4ff] text-[10px] opacity-60">POWER</div>
              </div>
            </div>
          </div>

          {/* Temperature Gauge */}
          <div className="w-32">
            <div className="flex justify-between text-[10px] text-cyan-400/60 mb-1">
              <span>TEMP</span>
              <span>{temperature}°F</span>
            </div>
            <div className="h-1 bg-cyan-900/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(temperature / 100) * 100}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>

          {/* Status Indicators */}
          <div className="space-y-2">
            {['NEURAL NET', 'DEFENSE', 'TARGETING'].map((system, i) => (
              <motion.div
                key={system}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="w-2 h-2 bg-[#26de81] rounded-full animate-pulse" />
                <span className="text-[10px] text-cyan-400/80">{system}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side Panel - Targeting Reticle */}
      <motion.div
        className="fixed top-1/2 right-8 -translate-y-1/2 z-40 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-32 h-32">
          {/* Rotating outer ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg width="128" height="128">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="rgba(0, 212, 255, 0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="10 5"
              />
            </svg>
          </motion.div>
          
          {/* Crosshair */}
          <svg width="128" height="128" className="absolute inset-0">
            <line x1="64" y1="20" x2="64" y2="40" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
            <line x1="64" y1="88" x2="64" y2="108" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
            <line x1="20" y1="64" x2="40" y2="64" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
            <line x1="88" y1="64" x2="108" y2="64" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
            <circle cx="64" cy="64" r="3" fill="#00d4ff" opacity="0.8" />
          </svg>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-cyan-400/60 whitespace-nowrap">
            TARGET LOCKED
          </div>
        </div>
      </motion.div>

      {/* Bottom Status Bar - Iron Man Style */}
      <div className="fixed bottom-0 left-0 right-0 h-24 pointer-events-none z-40">
        <svg width="100%" height="96" className="absolute">
          {/* Bottom curve */}
          <motion.path
            d="M 0 60 Q 50% 20 100% 60"
            stroke="rgba(0, 212, 255, 0.2)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
        
        {/* Bottom Center Info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-[10px] text-cyan-400/60">ALTITUDE</div>
            <div className="text-sm text-[#00d4ff] font-mono">5,280 FT</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-[10px] text-cyan-400/60">VELOCITY</div>
            <div className="text-sm text-[#00d4ff] font-mono">MACH 0.85</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-[10px] text-cyan-400/60">G-FORCE</div>
            <div className="text-sm text-[#00d4ff] font-mono">1.2G</div>
          </motion.div>
        </div>
      </div>

      {/* Corner Brackets - Iron Man Style */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Top Left */}
        <motion.svg 
          width="100" 
          height="100" 
          className="absolute top-8 left-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <path
            d="M 20 40 L 20 20 L 40 20"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="20" cy="20" r="2" fill="#00d4ff" opacity="0.8" />
        </motion.svg>

        {/* Top Right */}
        <motion.svg 
          width="100" 
          height="100" 
          className="absolute top-8 right-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <path
            d="M 60 20 L 80 20 L 80 40"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="80" cy="20" r="2" fill="#00d4ff" opacity="0.8" />
        </motion.svg>

        {/* Bottom Left */}
        <motion.svg 
          width="100" 
          height="100" 
          className="absolute bottom-8 left-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <path
            d="M 20 60 L 20 80 L 40 80"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="20" cy="80" r="2" fill="#00d4ff" opacity="0.8" />
        </motion.svg>

        {/* Bottom Right */}
        <motion.svg 
          width="100" 
          height="100" 
          className="absolute bottom-8 right-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <path
            d="M 60 80 L 80 80 L 80 60"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="80" cy="80" r="2" fill="#00d4ff" opacity="0.8" />
        </motion.svg>
      </div>

      {/* Animated Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <motion.div
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          initial={{ y: "0%" }}
          animate={{ y: "100vh" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          initial={{ x: "0%" }}
          animate={{ x: "100vw" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </>
  );
}