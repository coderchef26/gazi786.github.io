"use client";

/**
 * Command Centre Reactor - Navigation Hub Component
 * Simple, reliable Arc Reactor that displays properly
 */

import { FC } from 'react';
import { motion } from 'framer-motion';

interface CommandCentreReactorProps {
  onClick?: () => void;
  className?: string;
  powerLevel?: number;
}

const CommandCentreReactor: FC<CommandCentreReactorProps> = ({
  onClick,
  className = '',
  powerLevel = 100
}) => {
  const getPowerColor = () => {
    if (powerLevel >= 80) return { from: '#00d4ff', to: '#3b82f6' };
    if (powerLevel >= 60) return { from: '#3b82f6', to: '#00d4ff' };
    if (powerLevel >= 40) return { from: '#fbbf24', to: '#f97316' };
    if (powerLevel >= 20) return { from: '#f97316', to: '#ef4444' };
    return { from: '#ef4444', to: '#dc2626' };
  };

  const colors = getPowerColor();

  return (
    <motion.div
      className={`relative w-32 h-32 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      whileHover={onClick ? { scale: 1.05 } : {}}
    >
      {/* Outer Glow */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${colors.from}40, ${colors.to}20)`
        }}
      />
      
      {/* Rotating Rings */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 opacity-50"
        style={{ borderColor: colors.from }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border-2 opacity-30"
        style={{ borderColor: colors.to }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Main Core */}
      <motion.div
        className="absolute inset-8 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          boxShadow: `0 0 30px ${colors.from}80, 0 0 60px ${colors.from}40`
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Inner Core */}
        <div className="w-3/4 h-3/4 rounded-full bg-white/90 flex items-center justify-center">
          <div 
            className="w-2/3 h-2/3 rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
          />
        </div>
      </motion.div>

      {/* Energy Particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (360 / 8) * i;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: colors.from,
              left: '50%',
              top: '50%',
              transformOrigin: 'center'
            }}
            animate={{
              x: [
                0,
                Math.cos(angle * Math.PI / 180) * 40,
                0
              ],
              y: [
                0,
                Math.sin(angle * Math.PI / 180) * 40,
                0
              ],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        );
      })}

      {/* Power Level Indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-cyan-400 font-mono">
          PWR: {powerLevel}%
        </div>
      </div>

      {/* Pulse Effect for Interactive */}
      {onClick && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{
            scale: [1, 1.8, 2.5],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      )}
    </motion.div>
  );
};

export default CommandCentreReactor;