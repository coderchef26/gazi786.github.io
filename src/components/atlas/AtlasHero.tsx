"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtlas } from './AtlasProvider';
import CoderChefLogo from '@/components/ui/CoderChefLogo';
import CommandCentreReactor from '@/components/navigation/CommandCentreReactor';
import { FaAccessibleIcon, FaVolumeUp, FaMicrophone } from 'react-icons/fa';

interface SystemMetric {
  label: string;
  value: number;
  unit: string;
  color: string;
  description: string;
}

export default function AtlasHero() {
  const { 
    config, 
    speak, 
    announce, 
    navigate, 
    isInitialized,
    setAssistantOpen,
    currentSection 
  } = useAtlas();
  
  const [time, setTime] = useState(new Date());
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { label: 'CPU Usage', value: 24, unit: '%', color: 'from-cyan-500 to-blue-500', description: 'System processing load' },
    { label: 'Memory', value: 67, unit: '%', color: 'from-green-400 to-cyan-400', description: 'RAM utilization' },
    { label: 'Network', value: 43, unit: '%', color: 'from-purple-400 to-pink-400', description: 'Data transmission' },
    { label: 'Core Temp', value: 72, unit: '°C', color: 'from-orange-400 to-red-400', description: 'Processor temperature' }
  ]);

  const [protocols] = useState([
    'REACT.JS FRAMEWORK LOADED',
    'NEXT.JS RUNTIME ACTIVE', 
    'TYPESCRIPT COMPILER READY',
    'NODE.JS BACKEND ONLINE',
    'DATABASE CONNECTION STABLE',
    'DEPLOYMENT PIPELINE READY'
  ]);

  const [missionStats] = useState({
    'Projects Completed': '24',
    'Technologies Mastered': '15+',
    'Years Experience': '5+',
    'Client Satisfaction': '100%'
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      
      // Simulate dynamic metrics
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(10, Math.min(95, 
          metric.value + (Math.random() - 0.5) * (metric.label === 'Network' ? 20 : 10)
        ))
      })));
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Welcome announcement when initialized
  useEffect(() => {
    if (isInitialized && config.assistant.welcomeMessage) {
      setTimeout(() => {
        announce("ATLAS protocol initialized. Welcome to Alshafaraz Gazi's portfolio command center.");
      }, 1000);
    }
  }, [isInitialized, config.assistant.welcomeMessage, announce]);

  const MetricPanel = ({ metric }: { metric: SystemMetric }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 cursor-pointer"
      onClick={() => speak(`${metric.label}: ${metric.value.toFixed(1)}${metric.unit}. ${metric.description}`)}
      role="button"
      tabIndex={0}
      aria-label={`${metric.label}: ${metric.value.toFixed(1)}${metric.unit}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          speak(`${metric.label}: ${metric.value.toFixed(1)}${metric.unit}. ${metric.description}`);
        }
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-cyan-400/70 uppercase tracking-wider">{metric.label}</span>
        <span className="text-xs text-cyan-300 font-mono">{metric.value.toFixed(1)}{metric.unit}</span>
      </div>
      
      <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
          initial={{ width: '0%' }}
          animate={{ width: `${metric.value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-cyan-500/50 mt-1">
        <span>0</span>
        <span>{metric.unit === '°C' ? '100°C' : '100%'}</span>
      </div>
    </motion.div>
  );

  const AccessibilityControls = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 flex space-x-2"
    >
      {/* Skip Link */}
      <a
        href="#main-content"
        className="atlas-skip-link bg-[#00d4ff] text-black px-3 py-2 rounded text-sm font-bold"
        onFocus={() => announce("Skip to main content link focused")}
      >
        Skip to Main Content
      </a>
      
      {/* Accessibility Toggle */}
      <button
        onClick={() => setAssistantOpen(true)}
        className="bg-[#00d4ff] text-black p-2 rounded-full hover:bg-cyan-400 transition-colors"
        aria-label="Open ATLAS accessibility assistant"
        title="Open AI Assistant for accessibility support"
      >
        <FaAccessibleIcon />
      </button>
    </motion.div>
  );

  const NavigationHint = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
    >
      <p className="text-xs text-cyan-400/60 mb-2">
        {config.voice.enabled ? "Try voice commands or hover/click reactor for navigation" : "Hover or click reactor for navigation"}
      </p>
      {config.voice.enabled && (
        <p className="text-xs text-cyan-400/40">
          Say: "Show me projects" or "Tell me about skills"
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] relative overflow-hidden">
      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Animated background grid */}
      {!config.accessibility.reducedMotion && (
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '40px 40px'] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
      )}

      {/* Top status bar */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4" role="banner">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <CoderChefLogo size="sm" animate={!config.accessibility.reducedMotion} />
            <div className="text-xs text-cyan-400">
              <div className="font-semibold">ATLAS PROTOCOL</div>
              <div className="opacity-70" role="status" aria-live="polite">
                {isInitialized ? 'OPERATIONAL' : 'INITIALIZING...'}
              </div>
            </div>
          </div>
          
          <div className="text-right text-xs text-cyan-400">
            <time 
              className="font-mono text-lg block"
              dateTime={time.toISOString()}
              aria-label={`Current time: ${time.toLocaleTimeString()}`}
            >
              {time.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
              })}
            </time>
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
      </header>

      {/* Left system monitoring panel */}
      <aside 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-64 space-y-4"
        aria-label="System monitoring panel"
      >
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h2 className="text-sm font-semibold text-[#00d4ff] mb-4 uppercase tracking-wider">
            System Monitoring
          </h2>
          <div className="space-y-3" role="group" aria-label="System metrics">
            {metrics.map((metric) => (
              <MetricPanel key={metric.label} metric={metric} />
            ))}
          </div>
        </motion.section>

        {/* Neural Network Activity */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h2 className="text-sm font-semibold text-[#00d4ff] mb-3 uppercase tracking-wider">
            Neural Activity
          </h2>
          <div className="space-y-2" role="list" aria-label="Active neural processes">
            {['Pattern Recognition', 'Data Processing', 'Learning Algorithm'].map((activity, i) => (
              <div key={activity} className="flex items-center justify-between text-xs" role="listitem">
                <span className="text-cyan-400/80">{activity}</span>
                <motion.div
                  className="w-2 h-2 bg-[#26de81] rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  aria-label="Active indicator"
                />
              </div>
            ))}
          </div>
        </motion.section>
      </aside>

      {/* Central Command Centre */}
      <main 
        id="main-content"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        role="main"
        aria-label="Portfolio command center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center"
        >
          <div 
            className="mb-8"
            role="button"
            tabIndex={0}
            aria-label="Command center reactor - click or use arrow keys to navigate portfolio sections"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                announce("Reactor activated. Navigation options available.");
              }
            }}
          >
            <CommandCentreReactor
              powerLevel={Math.min(...metrics.map(m => m.value))}
              showNavigation={false}
              className={`scale-125 md:scale-150 ${!config.accessibility.reducedMotion ? 'transition-transform duration-300' : ''}`}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="space-y-4"
          >
            <h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))',
                fontFamily: 'monospace'
              }}
            >
              ALSHAFARAZ GAZI
            </h1>
            
            <p className="text-lg md:text-xl text-cyan-300 tracking-wide max-w-2xl">
              FULL-STACK DEVELOPER & SYSTEM ARCHITECT
            </p>
            
            <div className="flex items-center justify-center space-x-2 mt-6">
              <motion.div
                className="w-2 h-2 bg-[#26de81] rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <span className="text-[#26de81] text-sm font-mono" role="status" aria-live="polite">
                ATLAS CORE {isInitialized ? 'ONLINE' : 'INITIALIZING'}
              </span>
            </div>
          </motion.div>
        </motion.div>

        <NavigationHint />
      </main>

      {/* Right side data streams */}
      <aside 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-64 space-y-4"
        aria-label="System status and mission data"
      >
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h2 className="text-sm font-semibold text-[#00d4ff] mb-4 uppercase tracking-wider">
            Active Protocols
          </h2>
          <div className="space-y-2 text-xs font-mono" role="list" aria-label="System protocols">
            {protocols.map((protocol, i) => (
              <motion.div
                key={protocol}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="text-cyan-400/80 flex items-center"
                role="listitem"
              >
                <motion.span
                  className="w-1 h-1 bg-[#26de81] rounded-full mr-2"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  aria-hidden="true"
                />
                {protocol}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Status */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-[#0a0a0f]/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4"
        >
          <h2 className="text-sm font-semibold text-[#00d4ff] mb-3 uppercase tracking-wider">
            Mission Status
          </h2>
          <div className="space-y-2 text-xs" role="list" aria-label="Portfolio statistics">
            {Object.entries(missionStats).map(([label, value]) => (
              <div key={label} className="flex justify-between" role="listitem">
                <span className="text-cyan-400/80">{label}:</span>
                <span className="text-[#26de81] font-bold">{value}</span>
              </div>
            ))}
          </div>
        </motion.section>
      </aside>

      {/* Bottom action bar */}
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
        >
          <button 
            onClick={() => navigate('projects')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="View portfolio projects"
          >
            VIEW PROJECTS
          </button>
          <button 
            onClick={() => navigate('contact')}
            className="px-6 py-3 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300 text-sm uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Download CV or contact information"
          >
            DOWNLOAD CV
          </button>
        </motion.div>
      </footer>
    </div>
  );
}