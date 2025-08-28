"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HolographicCard from '../ui/HolographicCard';
import HolographicText from '../ui/HolographicText';
import StarkArcReactor from '../navigation/StarkArcReactor';

export default function HolographicHero() {
  const [activeDataStream, setActiveDataStream] = useState(0);
  const [systemStats, setSystemStats] = useState({
    cpu: 87,
    memory: 62,
    network: 94,
    power: 100
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        cpu: Math.max(50, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(70, Math.min(100, prev.network + (Math.random() - 0.5) * 6)),
        power: Math.max(85, Math.min(100, prev.power + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const dataStreams = [
    { label: 'PERSONAL_DATA', value: 'ALSHAFARAZ GAZI' },
    { label: 'DESIGNATION', value: 'FULL-STACK ARCHITECT' },
    { label: 'LOCATION', value: 'NEW ZEALAND' },
    { label: 'STATUS', value: 'AVAILABLE' },
    { label: 'CLEARANCE', value: 'LEVEL 7' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center p-8">
      {/* Main Content Grid - Tony Stark Phone Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Panel - System Information */}
        <div className="lg:col-span-3 space-y-6">
          <HolographicCard variant="data" title="SYSTEM STATUS">
            <div className="space-y-4">
              {Object.entries(systemStats).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <HolographicText variant="caption" className="uppercase">
                      {key}
                    </HolographicText>
                    <HolographicText variant="data">
                      {Math.round(value)}%
                    </HolographicText>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        value > 80 ? 'bg-green-400' : value > 50 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </HolographicCard>

          <HolographicCard variant="minimal">
            <div className="space-y-3">
              <HolographicText variant="data">
                ACTIVE PROTOCOLS
              </HolographicText>
              {['ATLAS', 'JARVIS', 'FRIDAY'].map((protocol, index) => (
                <div key={protocol} className="flex items-center space-x-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.3 
                    }}
                  />
                  <HolographicText variant="caption">
                    {protocol}
                  </HolographicText>
                </div>
              ))}
            </div>
          </HolographicCard>
        </div>

        {/* Center - Arc Reactor & Main Identity */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-8">
          
          {/* Arc Reactor Navigation */}
          <div className="relative">
            <StarkArcReactor size={320} powerLevel={100} />
          </div>

          {/* Main Identity Display */}
          <div className="text-center space-y-6">
            <HolographicText 
              variant="heading" 
              glowEffect 
              typewriter
              className="mb-4"
            >
              ALSHAFARAZ GAZI
            </HolographicText>
            
            <HolographicText 
              variant="subheading"
              className="mb-6"
            >
              FULL-STACK DEVELOPER & SYSTEM ARCHITECT
            </HolographicText>

            <HolographicCard variant="elevated" className="max-w-md mx-auto">
              <HolographicText variant="body" className="text-center">
                Advanced software engineering protocols activated. 
                Specializing in Next.js, React, TypeScript, and distributed systems architecture.
              </HolographicText>
            </HolographicCard>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono font-semibold rounded-lg uppercase tracking-wider"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(0, 212, 255, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <HolographicText variant="command">
                  View Projects
                </HolographicText>
              </motion.button>
              
              <motion.button
                className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-mono font-semibold rounded-lg uppercase tracking-wider hover:bg-cyan-400/10"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: '#00d4ff',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <HolographicText variant="command">
                  Download CV
                </HolographicText>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Panel - Data Streams */}
        <div className="lg:col-span-3 space-y-6">
          <HolographicCard variant="data" title="DATA STREAMS">
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDataStream}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-2"
                >
                  <HolographicText variant="data">
                    {dataStreams[activeDataStream].label}
                  </HolographicText>
                  <HolographicText variant="body" glowEffect>
                    {dataStreams[activeDataStream].value}
                  </HolographicText>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex space-x-1 justify-center pt-4">
                {dataStreams.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDataStream(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeDataStream ? 'bg-cyan-400' : 'bg-cyan-400/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </HolographicCard>

          <HolographicCard variant="minimal">
            <div className="space-y-4">
              <HolographicText variant="data">
                NETWORK STATUS
              </HolographicText>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <HolographicText variant="caption">UPTIME</HolographicText>
                  <HolographicText variant="data" glowEffect>99.9%</HolographicText>
                </div>
                <div className="text-center">
                  <HolographicText variant="caption">LATENCY</HolographicText>
                  <HolographicText variant="data" glowEffect>12ms</HolographicText>
                </div>
              </div>
            </div>
          </HolographicCard>
        </div>
      </div>

      {/* Background Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${20 + (i * 15) % 60}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </section>
  );
}