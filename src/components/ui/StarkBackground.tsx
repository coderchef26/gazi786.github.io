"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import 3D components to avoid SSR issues
const HolographicGrid3D = dynamic(
  () => import('./HolographicGrid3D').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-800/40" />
  }
);

interface StarkBackgroundProps {
  variant?: 'grid' | 'minimal' | 'matrix' | 'hologram';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
}

export default function StarkBackground({
  variant = 'grid',
  intensity = 'medium',
  animated = true,
  className = ""
}: StarkBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIntensityConfig = () => {
    switch (intensity) {
      case 'low':
        return { opacity: 0.15, divisions: 15, particleCount: 8 };
      case 'high':
        return { opacity: 0.4, divisions: 30, particleCount: 20 };
      default:
        return { opacity: 0.25, divisions: 20, particleCount: 12 };
    }
  };

  const config = getIntensityConfig();

  if (!mounted) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-b from-slate-900/20 to-slate-800/40 ${className}`} />
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-800/20 to-slate-900/40" />

      {/* Variant-specific backgrounds */}
      {variant === 'grid' && (
        <div className="absolute inset-0">
          <HolographicGrid3D
            size={25}
            divisions={config.divisions}
            color="#00d4ff"
            opacity={config.opacity}
            animated={animated}
            perspective={true}
          />
        </div>
      )}

      {variant === 'matrix' && (
        <>
          {/* CSS Grid fallback */}
          <div className="absolute inset-0 stark-grid opacity-30" />
          <div className="absolute inset-0">
            <HolographicGrid3D
              size={30}
              divisions={config.divisions + 5}
              color="#00ff41"
              opacity={config.opacity * 0.8}
              animated={animated}
              perspective={false}
            />
          </div>
        </>
      )}

      {variant === 'hologram' && (
        <div className="absolute inset-0">
          <HolographicGrid3D
            size={20}
            divisions={config.divisions}
            color="#00d4ff"
            opacity={config.opacity * 1.2}
            animated={animated}
            perspective={true}
            showLabels={true}
          />
        </div>
      )}

      {variant === 'minimal' && (
        <div className="absolute inset-0 circuit-pattern opacity-20" />
      )}

      {/* Animated overlay effects */}
      {animated && (
        <>
          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.1) 50%, transparent 100%)' }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              backgroundSize: '200% 2px',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {/* Pulsing energy core */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              boxShadow: [
                '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff',
                '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff',
                '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              backgroundColor: '#00d4ff',
              borderRadius: '50%'
            }}
          />
        </>
      )}

      {/* Atmospheric particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: config.particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
            style={{
              filter: 'blur(0.5px)',
              boxShadow: '0 0 4px #00d4ff'
            }}
          />
        ))}
      </div>

      {/* Holographic noise overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 212, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}

// Preset variants for common use cases
export const StarkGridHero = (props: Partial<StarkBackgroundProps>) => (
  <StarkBackground
    variant="hologram"
    intensity="high"
    animated={true}
    className="absolute inset-0 -z-10"
    {...props}
  />
);

export const MinimalStarkBg = (props: Partial<StarkBackgroundProps>) => (
  <StarkBackground
    variant="minimal"
    intensity="low"
    animated={false}
    className="absolute inset-0 -z-10"
    {...props}
  />
);

export const MatrixBackground = (props: Partial<StarkBackgroundProps>) => (
  <StarkBackground
    variant="matrix"
    intensity="medium"
    animated={true}
    className="absolute inset-0 -z-10"
    {...props}
  />
);