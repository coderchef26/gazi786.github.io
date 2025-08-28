"use client";

/**
 * Arc Reactor Loader Component
 * Loading animation using the unified Arc Reactor
 */

import { FC } from 'react';
import { motion } from 'framer-motion';
import ArcReactor from '@/components/shared/ArcReactor';
import { themeColors } from '@/lib/theme/colors';

interface ArcReactorLoaderProps {
  text?: string;
  subText?: string;
  className?: string;
}

const ArcReactorLoader: FC<ArcReactorLoaderProps> = ({
  text = "Initializing ATLAS System",
  subText = "Loading portfolio experience...",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}
    >
      {/* Arc Reactor Loader */}
      <ArcReactor
        variant="loader"
        size="xl"
        showParticles={true}
        showPulse={true}
        showGlow={true}
        showRotation={true}
        className="mb-8"
      />

      {/* Loading Text */}
      <motion.h2
        className={`text-2xl font-bold ${themeColors.primary} mb-2`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.h2>

      {/* Sub Text */}
      {subText && (
        <motion.p
          className={`${themeColors.secondary} text-sm`}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {subText}
        </motion.p>
      )}

      {/* Loading Bar */}
      <div className="w-64 h-1 bg-slate-800 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default ArcReactorLoader;