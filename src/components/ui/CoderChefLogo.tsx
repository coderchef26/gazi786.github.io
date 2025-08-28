"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CoderChefLogoProps {
  size?: number;
  color?: string;
  animated?: boolean;
  className?: string;
  glowEffect?: boolean;
}

export default function CoderChefLogo({
  size = 200,
  color = "#00d4ff",
  animated = true,
  className = "",
  glowEffect = true
}: CoderChefLogoProps) {
  const logoVariants = {
    hidden: { 
      opacity: 0,
      pathLength: 0,
      fill: "transparent"
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: color,
      transition: {
        duration: 2,
        ease: "easeInOut",
        fill: { delay: 1.5, duration: 0.5 }
      }
    }
  };

  const lineVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <motion.svg
        width={size}
        height={size * 0.4}
        viewBox="0 0 400 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        className={glowEffect ? "drop-shadow-2xl" : ""}
        style={{
          filter: glowEffect ? `drop-shadow(0 0 20px ${color}40)` : undefined
        }}
      >
        {/* Glow effect background */}
        {glowEffect && (
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="pulseGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}

        {/* CODERCHEF text - top */}
        <motion.text
          x="200"
          y="50"
          textAnchor="middle"
          fill={animated ? "transparent" : color}
          stroke={color}
          strokeWidth="0.5"
          fontSize="28"
          fontFamily="'Orbitron', 'Rajdhani', monospace"
          fontWeight="400"
          letterSpacing="8px"
          variants={animated ? logoVariants : undefined}
          filter={glowEffect ? "url(#glow)" : undefined}
        >
          CODERCHEF
        </motion.text>

        {/* Stark Industries style horizontal line */}
        <motion.line
          x1="80"
          y1="80"
          x2="320"
          y2="80"
          stroke={color}
          strokeWidth="2"
          variants={animated ? lineVariants : undefined}
          filter={glowEffect ? "url(#glow)" : undefined}
        />

        {/* 26 text - bottom */}
        <motion.text
          x="200"
          y="110"
          textAnchor="middle"
          fill={animated ? "transparent" : color}
          stroke={color}
          strokeWidth="0.3"
          fontSize="18"
          fontFamily="'Orbitron', 'Rajdhani', monospace"
          fontWeight="400"
          letterSpacing="12px"
          variants={animated ? logoVariants : undefined}
          filter={glowEffect ? "url(#glow)" : undefined}
        >
          26
        </motion.text>

        {/* Line end caps */}
        <motion.circle
          cx="80"
          cy="80"
          r="2"
          fill={color}
          variants={animated ? lineVariants : undefined}
          filter={glowEffect ? "url(#glow)" : undefined}
        />
        
        <motion.circle
          cx="320"
          cy="80"
          r="2"
          fill={color}
          variants={animated ? lineVariants : undefined}
          filter={glowEffect ? "url(#glow)" : undefined}
        />

        {/* Central power core indicator */}
        <motion.circle
          cx="200"
          cy="80"
          r="3"
          fill={color}
          variants={animated ? {
            hidden: { scale: 0, opacity: 0 },
            visible: { 
              scale: 1, 
              opacity: 1,
              transition: { delay: 2, duration: 0.5 }
            }
          } : undefined}
          filter={glowEffect ? "url(#pulseGlow)" : undefined}
        />

        {/* Pulsing energy ring */}
        {animated && (
          <motion.circle
            cx="200"
            cy="80"
            r="6"
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.4"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.1, 0.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 2.5,
              ease: "easeInOut"
            }}
            filter={glowEffect ? "url(#glow)" : undefined}
          />
        )}

        {/* Small corner dots */}
        <motion.circle 
          cx="35" cy="25" r="1" 
          fill={color} 
          opacity="0.7"
          variants={animated ? lineVariants : undefined}
        />
        <motion.circle 
          cx="365" cy="25" r="1" 
          fill={color} 
          opacity="0.7"
          variants={animated ? lineVariants : undefined}
        />
        <motion.circle 
          cx="365" cy="135" r="1" 
          fill={color} 
          opacity="0.7"
          variants={animated ? lineVariants : undefined}
        />
        <motion.circle 
          cx="35" cy="135" r="1" 
          fill={color} 
          opacity="0.7"
          variants={animated ? lineVariants : undefined}
        />

        {/* Side status indicators */}
        <motion.rect 
          x="25" y="78" width="8" height="4" 
          fill="none" 
          stroke={color} 
          strokeWidth="0.5" 
          opacity="0.5"
          variants={animated ? lineVariants : undefined}
        />
        <motion.rect 
          x="367" y="78" width="8" height="4" 
          fill="none" 
          stroke={color} 
          strokeWidth="0.5" 
          opacity="0.5"
          variants={animated ? lineVariants : undefined}
        />

      </motion.svg>
    </div>
  );
}

// Export variants for different use cases
export const CoderChefLogoMinimal = (props: Partial<CoderChefLogoProps>) => (
  <CoderChefLogo
    size={150}
    animated={false}
    glowEffect={false}
    {...props}
  />
);

export const CoderChefLogoAnimated = (props: Partial<CoderChefLogoProps>) => (
  <CoderChefLogo
    size={250}
    animated={true}
    glowEffect={true}
    color="#00d4ff"
    {...props}
  />
);

export const CoderChefLogoBrand = (props: Partial<CoderChefLogoProps>) => (
  <CoderChefLogo
    size={300}
    animated={true}
    glowEffect={true}
    color="#00d4ff"
    className="hover:scale-105 transition-transform duration-300"
    {...props}
  />
);