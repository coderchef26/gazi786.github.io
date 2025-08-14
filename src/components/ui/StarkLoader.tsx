'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StarkLoaderProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export const StarkLoader = ({ isLoading, onLoadingComplete }: StarkLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initializing' | 'loading' | 'complete'>('initializing');

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setPhase('complete');
          setTimeout(() => {
            onLoadingComplete?.();
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const phaseTimeout = setTimeout(() => {
      setPhase('loading');
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimeout);
    };
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0a0a0f] flex items-center justify-center"
      >
        <div className="absolute inset-0 stark-grid opacity-20" />
        <div className="absolute inset-0 circuit-pattern opacity-10" />

        <div className="relative z-10 flex flex-col items-center space-y-8">
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full border-4 border-[#00d4ff] relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0099cc] energy-core" />
              
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-[#00d4ff] opacity-60"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute inset-6 rounded-full border border-[#00d4ff] opacity-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>

            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 border border-[#00d4ff] rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${160 + i * 32}px`,
                  height: `${160 + i * 32}px`,
                  borderColor: '#00d4ff',
                  opacity: (30 - i * 10) / 100
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          <motion.div
            className="text-center space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2 
              className="text-2xl font-bold stark-text"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {phase === 'initializing' && 'INITIALIZING STARK INTERFACE...'}
              {phase === 'loading' && 'LOADING SYSTEMS...'}
              {phase === 'complete' && 'SYSTEMS ONLINE'}
            </motion.h2>
            
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00d4ff] to-[#ff6b6b]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.p 
              className="text-sm text-[#00d4ff] opacity-70 font-mono"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.round(progress)}% COMPLETE
            </motion.p>
          </motion.div>

          <div className="flex space-x-6">
            {['NEURAL LINK', 'HOLOGRAM', 'REPULSORS'].map((system, i) => (
              <motion.div
                key={system}
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > (i + 1) * 25 ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className={`w-2 h-2 rounded-full ${
                    progress > (i + 1) * 25 ? 'bg-[#26de81]' : 'bg-gray-600'
                  }`} 
                />
                <span className="text-xs text-[#00d4ff] font-mono">{system}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(transparent 0%, rgba(0, 212, 255, 0.05) 50%, transparent 100%)',
            height: '2px'
          }}
          animate={{ y: [0, typeof window !== 'undefined' ? window.innerHeight : 800] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};