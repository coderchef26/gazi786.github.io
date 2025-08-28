"use client";

/**
 * Unified Arc Reactor Component
 * Consolidates all Arc Reactor variants into a single, configurable component
 * Eliminates duplication while maintaining all functionality
 */

import { FC, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themeColors, themeEffects } from '@/lib/theme/colors';

interface ArcReactorProps {
  variant?: 'default' | 'loader' | 'enhanced' | 'mini' | 'hub';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showParticles?: boolean;
  showPulse?: boolean;
  showGlow?: boolean;
  showRotation?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  loadingText?: string;
  centerContent?: React.ReactNode;
}

const ArcReactor: FC<ArcReactorProps> = ({
  variant = 'default',
  size = 'md',
  showParticles = true,
  showPulse = true,
  showGlow = true,
  showRotation = true,
  interactive = false,
  onClick,
  className = '',
  loadingText,
  centerContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Size mappings
  const sizeMap = {
    sm: { container: 'w-20 h-20', inner: 'w-16 h-16', core: 'w-8 h-8' },
    md: { container: 'w-32 h-32', inner: 'w-28 h-28', core: 'w-14 h-14' },
    lg: { container: 'w-48 h-48', inner: 'w-44 h-44', core: 'w-20 h-20' },
    xl: { container: 'w-64 h-64', inner: 'w-60 h-60', core: 'w-28 h-28' }
  };

  const sizes = sizeMap[size];

  // Variant-specific configurations
  const variantConfig = {
    default: {
      rings: 3,
      particleCount: 8,
      rotationSpeed: 20
    },
    loader: {
      rings: 2,
      particleCount: 6,
      rotationSpeed: 10
    },
    enhanced: {
      rings: 4,
      particleCount: 12,
      rotationSpeed: 30
    },
    mini: {
      rings: 2,
      particleCount: 4,
      rotationSpeed: 15
    },
    hub: {
      rings: 5,
      particleCount: 16,
      rotationSpeed: 25
    }
  };

  const config = variantConfig[variant];

  // Generate particles for enhanced variants
  const particles = Array.from({ length: config.particleCount }, (_, i) => ({
    id: i,
    angle: (360 / config.particleCount) * i,
    delay: i * 0.1
  }));

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${sizes.container} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={interactive ? onClick : undefined}
      style={{ cursor: interactive ? 'pointer' : 'default' }}
    >
      {/* Outer Glow Effect */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl animate-pulse" />
      )}

      {/* Main Container */}
      <div className={`relative ${sizes.container} rounded-full flex items-center justify-center`}>
        
        {/* Rotating Rings */}
        {Array.from({ length: config.rings }, (_, index) => (
          <motion.div
            key={`ring-${index}`}
            className="absolute rounded-full border border-cyan-500/30"
            style={{
              width: `${100 - index * 15}%`,
              height: `${100 - index * 15}%`,
            }}
            animate={showRotation ? {
              rotate: index % 2 === 0 ? 360 : -360
            } : {}}
            transition={{
              duration: config.rotationSpeed + index * 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}

        {/* Energy Particles */}
        {showParticles && variant !== 'mini' && (
          <div className={`absolute ${sizes.inner} rounded-full`}>
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center'
                }}
                animate={{
                  x: [0, Math.cos(particle.angle * Math.PI / 180) * 40, 0],
                  y: [0, Math.sin(particle.angle * Math.PI / 180) * 40, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 3,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )}

        {/* Inner Core */}
        <motion.div
          className={`relative ${sizes.core} rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-cyan-300 ${themeEffects.shadow} shadow-cyan-500/50 flex items-center justify-center`}
          animate={showPulse ? {
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* Center Content or Default Glow */}
          {centerContent || (
            <div className="w-3/4 h-3/4 rounded-full bg-white/90" />
          )}
        </motion.div>

        {/* Pulse Rings */}
        {showPulse && (
          <>
            <motion.div
              className={`absolute ${sizes.inner} rounded-full border-2 border-cyan-400/50`}
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
            <motion.div
              className={`absolute ${sizes.inner} rounded-full border-2 border-cyan-400/30`}
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0]
              }}
              transition={{
                duration: 2,
                delay: 0.5,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </>
        )}

        {/* Loading Text for Loader Variant */}
        {variant === 'loader' && loadingText && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
            <motion.p
              className={`${themeColors.primary} text-sm font-medium`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {loadingText}
            </motion.p>
          </div>
        )}
      </div>

      {/* Interactive Hover Effect */}
      {interactive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          whileHover={{
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
          }}
        />
      )}
    </motion.div>
  );
};

export default ArcReactor;

// Export variant presets for easy usage
export const ArcReactorPresets = {
  navigationHub: {
    variant: 'hub' as const,
    size: 'lg' as const,
    showParticles: true,
    showPulse: true,
    interactive: true
  },
  heroLoader: {
    variant: 'loader' as const,
    size: 'xl' as const,
    showParticles: true,
    loadingText: 'Initializing ATLAS...'
  },
  miniIndicator: {
    variant: 'mini' as const,
    size: 'sm' as const,
    showParticles: false,
    showPulse: true
  },
  enhanced: {
    variant: 'enhanced' as const,
    size: 'lg' as const,
    showParticles: true,
    showRotation: true
  }
};