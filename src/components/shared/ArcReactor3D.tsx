"use client";

/**
 * Enhanced 3D Arc Reactor Component
 * Improved visual impact with 3D effects and enhanced animations
 */

import { FC, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { themeColors, themeEffects } from '@/lib/theme/colors';

interface ArcReactor3DProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  powerLevel?: number; // 0-100
  interactive?: boolean;
  showParticles?: boolean;
  showEnergyRings?: boolean;
  onClick?: () => void;
  className?: string;
}

const ArcReactor3D: FC<ArcReactor3DProps> = ({
  size = 'md',
  powerLevel = 100,
  interactive = false,
  showParticles = true,
  showEnergyRings = true,
  onClick,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Size mappings
  const sizeMap = {
    sm: { container: 'w-24 h-24', inner: 'w-20 h-20', core: 'w-10 h-10' },
    md: { container: 'w-32 h-32', inner: 'w-28 h-28', core: 'w-14 h-14' },
    lg: { container: 'w-48 h-48', inner: 'w-44 h-44', core: 'w-20 h-20' },
    xl: { container: 'w-64 h-64', inner: 'w-60 h-60', core: 'w-28 h-28' }
  };

  const sizes = sizeMap[size];

  // Energy particles based on power level
  const particleCount = Math.floor((powerLevel / 100) * 12);
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    angle: (360 / particleCount) * i,
    delay: i * 0.15,
    radius: 30 + (i % 3) * 15
  }));

  // Power level color
  const getPowerColor = () => {
    if (powerLevel >= 80) return 'from-cyan-400 to-blue-500';
    if (powerLevel >= 60) return 'from-blue-400 to-cyan-500';
    if (powerLevel >= 40) return 'from-yellow-400 to-orange-500';
    if (powerLevel >= 20) return 'from-orange-400 to-red-500';
    return 'from-red-500 to-red-700';
  };

  // Pulse based on power level
  const pulseIntensity = Math.max(0.5, powerLevel / 100);

  useEffect(() => {
    if (interactive) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity }
      });
    }
  }, [interactive, controls]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${sizes.container} ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
      onClick={interactive ? onClick : undefined}
      style={{ 
        cursor: interactive ? 'pointer' : 'default',
        transformStyle: 'preserve-3d'
      }}
      whileHover={interactive ? { scale: 1.1 } : {}}
    >
      {/* Outer Glow - Multiple layers for 3D effect */}
      <div className="absolute inset-0 rounded-full">
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getPowerColor()} opacity-30 blur-2xl animate-pulse`} />
        <div className={`absolute inset-2 rounded-full bg-gradient-to-r ${getPowerColor()} opacity-20 blur-xl animate-pulse`} style={{ animationDelay: '0.5s' }} />
        <div className={`absolute inset-4 rounded-full bg-gradient-to-r ${getPowerColor()} opacity-10 blur-lg animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Container with 3D perspective */}
      <div className={`relative ${sizes.container} rounded-full flex items-center justify-center`} style={{ transform: 'rotateX(5deg) rotateY(5deg)' }}>
        
        {/* Energy Rings */}
        {showEnergyRings && (
          <>
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={`ring-${index}`}
                className={`absolute rounded-full border-2 border-cyan-400/40`}
                style={{
                  width: `${100 - index * 12}%`,
                  height: `${100 - index * 12}%`,
                  boxShadow: `0 0 ${20 - index * 2}px rgba(0, 212, 255, ${0.6 - index * 0.1})`
                }}
                animate={{
                  rotate: index % 2 === 0 ? 360 : -360,
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  rotate: { duration: 20 + index * 5, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }
                }}
              />
            ))}
          </>
        )}

        {/* 3D Ring Structure */}
        <div className="absolute inset-0 rounded-full" style={{ transform: 'rotateX(60deg)' }}>
          <div className="w-full h-full border-2 border-cyan-500/50 rounded-full" />
        </div>
        <div className="absolute inset-2 rounded-full" style={{ transform: 'rotateX(-60deg)' }}>
          <div className="w-full h-full border-2 border-blue-500/50 rounded-full" />
        </div>

        {/* Energy Particles */}
        {showParticles && (
          <div className={`absolute ${sizes.inner} rounded-full`}>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center'
                }}
                animate={{
                  x: [
                    0,
                    Math.cos(particle.angle * Math.PI / 180) * particle.radius,
                    Math.cos((particle.angle + 120) * Math.PI / 180) * particle.radius,
                    Math.cos((particle.angle + 240) * Math.PI / 180) * particle.radius,
                    0
                  ],
                  y: [
                    0,
                    Math.sin(particle.angle * Math.PI / 180) * particle.radius,
                    Math.sin((particle.angle + 120) * Math.PI / 180) * particle.radius,
                    Math.sin((particle.angle + 240) * Math.PI / 180) * particle.radius,
                    0
                  ],
                  opacity: [0, 1, 1, 1, 0],
                  scale: [0, 1.5, 1, 1.5, 0]
                }}
                transition={{
                  duration: 4,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )}

        {/* Core Reactor */}
        <motion.div
          className={`relative ${sizes.core} rounded-full flex items-center justify-center overflow-hidden`}
          style={{
            background: `radial-gradient(circle, ${getPowerColor().replace('from-', '').replace(' to-', ', ')})`,
            boxShadow: `0 0 ${size === 'xl' ? '60px' : '40px'} rgba(0, 212, 255, ${pulseIntensity})`
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.9, 1, 0.9],
            boxShadow: [
              `0 0 20px rgba(0, 212, 255, ${pulseIntensity})`,
              `0 0 40px rgba(0, 212, 255, ${pulseIntensity + 0.2})`,
              `0 0 20px rgba(0, 212, 255, ${pulseIntensity})`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Inner Core Patterns */}
          <div className="absolute inset-2 rounded-full bg-white/90 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400" />
          </div>
          
          {/* Core Energy Lines */}
          <div className="absolute inset-0">
            {[0, 45, 90, 135].map(angle => (
              <div
                key={angle}
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
                style={{
                  top: '50%',
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Power Level Indicator */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2">
            <div className="text-xs text-cyan-400 font-mono">PWR</div>
            <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getPowerColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${powerLevel}%` }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            </div>
            <div className="text-xs text-cyan-400 font-mono">{powerLevel}%</div>
          </div>
        </div>

        {/* Interactive Pulse Effect */}
        {interactive && (
          <motion.div
            className={`absolute ${sizes.container} rounded-full border-2 border-cyan-400/50`}
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.5, 0.2, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
        )}

        {/* Energy Discharge Effects */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-4 bg-gradient-to-t from-cyan-400 to-transparent"
              style={{
                left: '50%',
                top: '10%',
                transformOrigin: '50% 200%'
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ArcReactor3D;