"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CoderChefLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
}

export default function CoderChefLogo({ 
  size = 'md', 
  animate = true, 
  className = '' 
}: CoderChefLogoProps) {
  const sizes = {
    sm: { width: 120, height: 60, text: 'text-sm' },
    md: { width: 200, height: 100, text: 'text-base' },
    lg: { width: 300, height: 150, text: 'text-lg' },
    xl: { width: 400, height: 200, text: 'text-xl' }
  };

  const { width, height, text } = sizes[size];

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width, height }}
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 200"
        className="absolute inset-0"
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="logoGlow" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.3)" />
            <stop offset="70%" stopColor="rgba(0, 212, 255, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#0099cc" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx="200"
          cy="100"
          r="90"
          fill="url(#logoGlow)"
          opacity="0.5"
        />

        {/* Outer hexagon ring */}
        <motion.polygon
          points="200,20 260,55 260,145 200,180 140,145 140,55"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeDasharray="10,5"
          initial={animate ? { pathLength: 0, opacity: 0 } : {}}
          animate={animate ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
        />

        {/* Inner geometric design */}
        <g filter="url(#glow)">
          {/* Central diamond */}
          <motion.polygon
            points="200,60 230,100 200,140 170,100"
            fill="rgba(0, 212, 255, 0.2)"
            stroke="#00d4ff"
            strokeWidth="2"
            initial={animate ? { scale: 0, opacity: 0 } : {}}
            animate={animate ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Tech lines */}
          <motion.g
            initial={animate ? { opacity: 0 } : {}}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <line x1="170" y1="70" x2="230" y2="70" stroke="#00d4ff" strokeWidth="1" opacity="0.7" />
            <line x1="170" y1="100" x2="230" y2="100" stroke="#00d4ff" strokeWidth="2" />
            <line x1="170" y1="130" x2="230" y2="130" stroke="#00d4ff" strokeWidth="1" opacity="0.7" />
          </motion.g>

          {/* Corner accents */}
          <motion.g
            initial={animate ? { opacity: 0, scale: 0 } : {}}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <circle cx="160" cy="80" r="3" fill="#00d4ff" />
            <circle cx="240" cy="80" r="3" fill="#00d4ff" />
            <circle cx="160" cy="120" r="3" fill="#00d4ff" />
            <circle cx="240" cy="120" r="3" fill="#00d4ff" />
          </motion.g>
        </g>

        {/* Rotating energy ring */}
        {animate && (
          <motion.circle
            cx="200"
            cy="100"
            r="75"
            fill="none"
            stroke="rgba(0, 212, 255, 0.3)"
            strokeWidth="1"
            strokeDasharray="5,10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 100px" }}
          />
        )}
      </svg>

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={animate ? { opacity: 0, y: 20 } : {}}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <div 
            className={`font-bold ${text} tracking-wider`}
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))',
              fontFamily: 'monospace'
            }}
          >
            CODER
          </div>
          <div 
            className={`font-bold ${text} tracking-wider mt-1`}
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))',
              fontFamily: 'monospace'
            }}
          >
            CHEF
          </div>
          <motion.div 
            className="text-xs text-cyan-400/70 mt-1 tracking-widest"
            initial={animate ? { opacity: 0 } : {}}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 3 }}
            style={{ fontFamily: 'monospace' }}
          >
            ATLAS DIVISION
          </motion.div>
        </motion.div>
      </div>

      {/* Pulse effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 rounded-full border border-cyan-400/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}