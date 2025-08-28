"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HolographicTextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'data' | 'command';
  className?: string;
  glowEffect?: boolean;
  typewriter?: boolean;
  glitchEffect?: boolean;
  scanline?: boolean;
}

export default function HolographicText({
  children,
  variant = 'body',
  className = '',
  glowEffect = false,
  typewriter = false,
  glitchEffect = false,
  scanline = false
}: HolographicTextProps) {
  const [displayedText, setDisplayedText] = useState(typewriter ? '' : children?.toString() || '');
  const [isGlitching, setIsGlitching] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (typewriter && children) {
      const text = children.toString();
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [children, typewriter]);

  // Glitch effect
  useEffect(() => {
    if (glitchEffect) {
      const glitchTimer = setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 100);
        }
      }, 100);
      return () => clearInterval(glitchTimer);
    }
  }, [glitchEffect]);

  const getVariantStyles = () => {
    const baseStyles = {
      fontFamily: '"Orbitron", "Rajdhani", ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
      letterSpacing: '0.05em',
    };

    switch (variant) {
      case 'heading':
        return {
          ...baseStyles,
          fontSize: 'clamp(1.875rem, 4vw, 3rem)',
          fontWeight: '700',
          color: '#00d4ff',
          textShadow: glowEffect ? '0 0 20px rgba(0, 212, 255, 0.8), 0 0 40px rgba(0, 212, 255, 0.4)' : 'none',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
        };
      case 'subheading':
        return {
          ...baseStyles,
          fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
          fontWeight: '600',
          color: '#40e0ff',
          textShadow: glowEffect ? '0 0 15px rgba(64, 224, 255, 0.6)' : 'none',
          textTransform: 'uppercase' as const,
        };
      case 'body':
        return {
          ...baseStyles,
          fontSize: '1rem',
          fontWeight: '400',
          color: '#a0d4ff',
          lineHeight: '1.6',
        };
      case 'caption':
        return {
          ...baseStyles,
          fontSize: '0.875rem',
          fontWeight: '400',
          color: '#60b4d6',
          letterSpacing: '0.05em',
        };
      case 'data':
        return {
          ...baseStyles,
          fontSize: '0.75rem',
          fontWeight: '500',
          color: '#00d4ff',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          textShadow: glowEffect ? '0 0 10px rgba(0, 212, 255, 0.8)' : 'none',
        };
      case 'command':
        return {
          ...baseStyles,
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#26de81',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          textShadow: glowEffect ? '0 0 12px rgba(38, 222, 129, 0.8)' : 'none',
        };
      default:
        return baseStyles;
    }
  };

  const text = typewriter ? displayedText : children;

  return (
    <div className={`relative ${className}`}>
      {/* Main Text */}
      <motion.div
        style={getVariantStyles()}
        animate={isGlitching ? {
          x: [0, -2, 2, -1, 1, 0],
          textShadow: [
            '0 0 10px rgba(255, 0, 0, 0.8)',
            '2px 0 0 rgba(0, 255, 0, 0.8)',
            '-2px 0 0 rgba(0, 0, 255, 0.8)',
            '0 0 10px rgba(0, 212, 255, 0.8)'
          ]
        } : {}}
        transition={{ duration: 0.1 }}
      >
        {text}
        {typewriter && variant === 'heading' && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        )}
      </motion.div>

      {/* Scanline effect */}
      {scanline && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `
              linear-gradient(to bottom, 
                transparent 0%, 
                rgba(0, 212, 255, 0.3) 50%, 
                transparent 100%
              )
            `,
            height: '2px'
          }}
        />
      )}

      {/* Background glow for certain variants */}
      {glowEffect && (variant === 'heading' || variant === 'subheading') && (
        <motion.div
          className="absolute inset-0 -z-10 blur-xl opacity-30"
          style={{
            color: variant === 'heading' ? '#00d4ff' : '#40e0ff',
            fontSize: 'inherit',
            fontWeight: 'inherit',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {text}
        </motion.div>
      )}
    </div>
  );
}