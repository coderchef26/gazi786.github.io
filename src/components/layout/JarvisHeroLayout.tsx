"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoderChefLogo from '@/components/ui/CoderChefLogo';
import CommandCentreReactor from '@/components/navigation/CommandCentreReactor';

export default function JarvisHeroLayout() {
  const [time, setTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 24,
    memoryUsage: 67,
    networkActivity: 43,
    powerLevel: 98,
    temperature: 72
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      // Simulate dynamic system stats
      setSystemStats(prev => ({
        cpuUsage: Math.max(15, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkActivity: Math.max(0, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 20)),
        powerLevel: Math.max(85, Math.min(100, prev.powerLevel + (Math.random() - 0.5) * 2)),
        temperature: Math.max(65, Math.min(85, prev.temperature + (Math.random() - 0.5) * 3))
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const SystemPanel = ({ title, value, unit, color, max = 100 }: {
    title: string;
    value: number;
    unit: string;
    color: string;
    max?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-cyan-400/70 uppercase tracking-wider">{title}</span>
        <span className="text-xs text-cyan-300">{value.toFixed(1)}{unit}</span>
      </div>
      <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: '0%' }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="flex justify-between text-xs text-cyan-500/50 mt-1">
        <span>0</span>
        <span>{max}{unit}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Top status bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <CoderChefLogo size="sm" animate={true} />
            <div className="text-xs text-cyan-400">
              <div className="font-semibold">ATLAS PROTOCOL</div>
              <div className="opacity-70">OPERATIONAL</div>
            </div>
          </div>
          
          <div className="text-right text-xs text-cyan-400">
            <div className="font-mono text-lg">
              {time.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
              })}
            </div>
            <div className="opacity-70">
              {time.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Left system monitoring panel */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-64 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h3 className="text-sm font-semibold text-[#00d4ff] mb-4 uppercase tracking-wider">
            System Monitoring
          </h3>
          <div className="space-y-3">
            <SystemPanel
              title="CPU Usage"
              value={systemStats.cpuUsage}
              unit="%"
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <SystemPanel
              title="Memory"
              value={systemStats.memoryUsage}
              unit="%"
              color="bg-gradient-to-r from-green-400 to-cyan-400"
            />
            <SystemPanel
              title="Network"
              value={systemStats.networkActivity}
              unit="%"
              color="bg-gradient-to-r from-purple-400 to-pink-400"
            />
            <SystemPanel
              title="Core Temp"
              value={systemStats.temperature}
              unit="°C"
              color="bg-gradient-to-r from-orange-400 to-red-400"
              max={100}
            />
          </div>
        </motion.div>

        {/* Neural Network Activity */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h3 className="text-sm font-semibold text-[#00d4ff] mb-3 uppercase tracking-wider">
            Neural Activity
          </h3>
          <div className="space-y-2">
            {['Pattern Recognition', 'Data Processing', 'Learning Algorithm'].map((activity, i) => (
              <div key={activity} className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/80">{activity}</span>
                <motion.div
                  className="w-2 h-2 bg-[#26de81] rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Central Command Centre */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <CommandCentreReactor
            powerLevel={systemStats.powerLevel}
            showNavigation={true}
            className="scale-150 mb-8"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #00d4ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))',
                  fontFamily: 'monospace'
                }}>
              ALSHAFARAZ GAZI
            </h1>
            <p className="text-xl text-cyan-300 tracking-wide">
              FULL-STACK DEVELOPER & SYSTEM ARCHITECT
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <motion.div
                className="w-2 h-2 bg-[#26de81] rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[#26de81] text-sm font-mono">ATLAS CORE ONLINE</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side data streams */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-64 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h3 className="text-sm font-semibold text-[#00d4ff] mb-4 uppercase tracking-wider">
            Active Protocols
          </h3>
          <div className="space-y-2 text-xs font-mono">
            {[
              'REACT.JS FRAMEWORK LOADED',
              'NEXT.JS RUNTIME ACTIVE',
              'TYPESCRIPT COMPILER READY',
              'NODE.JS BACKEND ONLINE',
              'DATABASE CONNECTION STABLE',
              'DEPLOYMENT PIPELINE READY'
            ].map((protocol, i) => (
              <motion.div
                key={protocol}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="text-cyan-400/80 flex items-center"
              >
                <motion.span
                  className="w-1 h-1 bg-[#26de81] rounded-full mr-2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
                {protocol}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Status */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h3 className="text-sm font-semibold text-[#00d4ff] mb-3 uppercase tracking-wider">
            Mission Status
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-cyan-400/80">Projects Completed:</span>
              <span className="text-[#26de81] font-bold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400/80">Technologies Mastered:</span>
              <span className="text-[#26de81] font-bold">15+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400/80">Years Experience:</span>
              <span className="text-[#26de81] font-bold">5+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-400/80">Client Satisfaction:</span>
              <span className="text-[#26de81] font-bold">100%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom action bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="flex space-x-4"
        >
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-sm uppercase tracking-wider">
            VIEW PROJECTS
          </button>
          <button className="px-6 py-3 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 text-sm uppercase tracking-wider">
            DOWNLOAD CV
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </div>
  );
}