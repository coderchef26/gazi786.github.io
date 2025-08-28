"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  glowColor?: string;
  variant?: 'default' | 'elevated' | 'minimal' | 'data';
}

export default function HolographicCard({ 
  children, 
  className = '', 
  title,
  subtitle,
  glowColor = '#00d4ff',
  variant = 'default'
}: HolographicCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(45, 45, 45, 0.9) 0%, 
              rgba(25, 25, 25, 0.95) 50%, 
              rgba(35, 35, 35, 0.9) 100%
            )
          `,
          border: `1px solid rgba(0, 212, 255, ${isHovered ? '0.8' : '0.4'})`,
          boxShadow: `
            0 0 ${isHovered ? '40px' : '20px'} rgba(0, 212, 255, 0.3),
            inset 0 0 ${isHovered ? '30px' : '20px'} rgba(0, 212, 255, 0.1),
            0 ${isHovered ? '16px' : '8px'} 32px rgba(0, 0, 0, 0.5)
          `
        };
      case 'minimal':
        return {
          background: `
            linear-gradient(135deg, 
              rgba(40, 40, 40, 0.7) 0%, 
              rgba(20, 20, 20, 0.8) 100%
            )
          `,
          border: `1px solid rgba(0, 212, 255, ${isHovered ? '0.6' : '0.3'})`,
          boxShadow: `
            0 0 ${isHovered ? '20px' : '10px'} rgba(0, 212, 255, 0.2),
            inset 0 0 ${isHovered ? '20px' : '10px'} rgba(0, 212, 255, 0.05)
          `
        };
      case 'data':
        return {
          background: `
            linear-gradient(145deg, 
              rgba(30, 30, 30, 0.95) 0%, 
              rgba(45, 45, 45, 0.9) 50%, 
              rgba(25, 25, 25, 0.95) 100%
            )
          `,
          border: `2px solid rgba(64, 224, 255, ${isHovered ? '0.8' : '0.5'})`,
          boxShadow: `
            0 0 ${isHovered ? '30px' : '15px'} rgba(64, 224, 255, 0.4),
            inset 0 0 ${isHovered ? '25px' : '15px'} rgba(64, 224, 255, 0.08)
          `
        };
      default:
        return {
          background: `
            linear-gradient(135deg, 
              rgba(40, 40, 40, 0.85) 0%, 
              rgba(30, 30, 30, 0.9) 50%, 
              rgba(35, 35, 35, 0.85) 100%
            )
          `,
          border: `1px solid rgba(0, 212, 255, ${isHovered ? '0.7' : '0.4'})`,
          boxShadow: `
            0 0 ${isHovered ? '30px' : '15px'} rgba(0, 212, 255, 0.25),
            inset 0 0 ${isHovered ? '25px' : '15px'} rgba(0, 212, 255, 0.08)
          `
        };
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg backdrop-blur-md ${className}`}
      style={getVariantStyles()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Smart Glass Reflection Layer */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 40%, 
              rgba(0, 212, 255, 0.05) 60%, 
              transparent 100%
            )
          `
        }}
      />

      {/* Holographic Border Glow */}
      <div 
        className="absolute inset-0 rounded-lg opacity-60 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              rgba(0, 212, 255, 0.3) 50%, 
              transparent 100%
            )
          `,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor'
        }}
      />

      {/* Header Section */}
      {(title || subtitle) && (
        <div className="relative p-6 border-b border-cyan-400/20">
          {title && (
            <h3 className="text-lg font-bold text-cyan-300 font-mono uppercase tracking-wider mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-cyan-100/70 font-mono">
              {subtitle}
            </p>
          )}
          
          {/* Header Scanning Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ 
              width: isHovered ? '100%' : '0%',
              opacity: isHovered ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Content Area */}
      <div className="relative p-6">
        {children}
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60" />

      {/* Holographic Scanning Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '100%', opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent 0%, 
                rgba(0, 212, 255, 0.3) 50%, 
                transparent 100%
              )
            `,
            height: '20%'
          }}
        />
      )}
    </motion.div>
  );
}