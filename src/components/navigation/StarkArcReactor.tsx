"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Link from 'next/link';
import { 
  FaProjectDiagram, 
  FaUser, 
  FaBolt, 
  FaBrain, 
  FaBriefcase 
} from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';

interface StarkArcReactorProps {
  className?: string;
  size?: number;
  powerLevel?: number;
}

interface NavigationItem {
  n_id: string;
  label: string;
  component: string;
  description: string;
  icon?: string;
}

export default function StarkArcReactor({
  className = '',
  size = 320,
  powerLevel = 100
}: StarkArcReactorProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [hologramOpacity, setHologramOpacity] = useState(0.8);
  const animationRef = useRef<number | undefined>(undefined);

  // Fetch navigation from Prismic settings
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const client = createClient();
        const settings = await client.getSingle<Content.SettingsDocument>('settings');
        
        if (settings.data.navigation && settings.data.navigation.length > 0) {
          const navItems = settings.data.navigation.map((item: any) => ({
            n_id: item.n_id || '',
            label: item.label || '',
            component: item.component || '',
            description: item.description || '',
            icon: item.icon || ''
          }));
          setNavigationItems(navItems);
        } else {
          // Fallback navigation - Tony Stark style
          setNavigationItems([
            {
              n_id: "projects",
              label: "MISSION ARCHIVE", 
              component: "/projects",
              description: "Completed missions and deployments",
              icon: "target"
            },
            {
              n_id: "about",
              label: "PERSONNEL FILE",
              component: "/about", 
              description: "Complete profile analysis",
              icon: "user"
            },
            {
              n_id: "skills",
              label: "POWER MATRIX",
              component: "/skills",
              description: "Technical capabilities", 
              icon: "bolt"
            },
            {
              n_id: "education", 
              label: "NEURAL UPGRADES",
              component: "/education",
              description: "Learning protocols",
              icon: "brain"
            },
            {
              n_id: "experience",
              label: "MISSION HISTORY", 
              component: "/experience", 
              description: "Operational history",
              icon: "briefcase"
            }
          ]);
        }
        setIsLoaded(true);
      } catch (error) {
        // Minimal fallback
        setNavigationItems([
          {
            n_id: "projects",
            label: "PROJECTS", 
            component: "/projects",
            description: "View my work",
            icon: "target"
          },
          {
            n_id: "about", 
            label: "ABOUT",
            component: "/about",
            description: "About me",
            icon: "user"
          }
        ]);
        setIsLoaded(true);
      }
    };

    fetchNavigation();
  }, []);

  // Advanced holographic animations
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.002;
      const fastTime = Date.now() * 0.01;
      
      // Core pulsing with more complexity
      setPulseIntensity(1 + Math.sin(time) * 0.3 + Math.sin(time * 2.5) * 0.1);
      
      // Scanning line movement
      setScanlinePosition((prev) => (prev + 2) % 360);
      
      // Layer depth cycling for 3D effect
      setActiveLayer(Math.floor((time * 0.5) % 3));
      
      // Hologram opacity breathing
      setHologramOpacity(0.6 + Math.sin(fastTime * 0.3) * 0.2);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Render appropriate icon
  const renderIcon = (iconName: string, size = 16) => {
    const iconProps = { size, className: "text-cyan-300" };

    switch (iconName?.toLowerCase()) {
      case "target":
      case "🎯":
      case "projects":
        return <BiTargetLock {...iconProps} />;
      case "user":
      case "👤":
      case "about":
        return <FaUser {...iconProps} />;
      case "bolt":
      case "⚡":
      case "skills":
        return <FaBolt {...iconProps} />;
      case "brain":
      case "🧠":
      case "education":
        return <FaBrain {...iconProps} />;
      case "briefcase":
      case "🏢":
      case "experience":
        return <FaBriefcase {...iconProps} />;
      default:
        return <FaProjectDiagram {...iconProps} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-400 animate-spin border-t-transparent"></div>
          <div className="absolute inset-2 w-12 h-12 rounded-full border border-cyan-500 animate-pulse"></div>
        </div>
      </div>
    );
  }

  const centerX = size / 2;
  const centerY = size / 2;
  const coreRadius = size * 0.12;
  const innerRingRadius = size * 0.18;
  const middleRingRadius = size * 0.28;
  const outerRingRadius = size * 0.38;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 animate-pulse"
        style={{
          background: `radial-gradient(circle, #00d4ff20 0%, #0099cc15 40%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      
      {/* Advanced Holographic Display System */}
      <div className="relative w-full h-full">
        {/* Multi-layer holographic SVG system */}
        <svg width={size} height={size} className="absolute inset-0" style={{ opacity: hologramOpacity }}>
          <defs>
            {/* Advanced holographic filters */}
            <filter id="hologramGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" values="0 0.8 1 0 0  0 0.4 0.8 0 0  0 0.2 0.6 0 0  0 0 0 1 0"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Smart glass effect */}
            <filter id="smartGlass" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="blur"/>
              <feColorMatrix in="blur" type="matrix" values="0.2 0.8 1 0 0  0.1 0.6 0.9 0 0  0 0.4 0.8 0 0  0 0 0 0.7 0"/>
              <feComposite in="SourceGraphic" in2="blur" operator="screen"/>
            </filter>
            
            {/* Layered hologram gradients */}
            <radialGradient id="layer1Gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={activeLayer === 0 ? "0.9" : "0.3"} />
              <stop offset="100%" stopColor="#0099cc" stopOpacity={activeLayer === 0 ? "0.5" : "0.1"} />
            </radialGradient>
            
            <radialGradient id="layer2Gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#40e0ff" stopOpacity={activeLayer === 1 ? "0.8" : "0.2"} />
              <stop offset="100%" stopColor="#00b3d6" stopOpacity={activeLayer === 1 ? "0.4" : "0.1"} />
            </radialGradient>

            <radialGradient id="layer3Gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#80f0ff" stopOpacity={activeLayer === 2 ? "0.7" : "0.2"} />
              <stop offset="100%" stopColor="#00ccf0" stopOpacity={activeLayer === 2 ? "0.3" : "0.1"} />
            </radialGradient>
            
            {/* Enhanced core gradient */}
            <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="20%" stopColor="#00d4ff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0099cc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#006699" stopOpacity="0.2" />
            </radialGradient>

            {/* Scanning line pattern */}
            <pattern id="scanPattern" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
              <rect width="2" height="1" fill="#00d4ff" opacity="0.3"/>
              <rect y="1" width="2" height="1" fill="transparent"/>
            </pattern>
          </defs>
          
          {/* Multi-layer holographic ring system */}
          
          {/* Layer 1 - Outer Holographic Ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={outerRingRadius}
            fill="none"
            stroke="url(#layer1Gradient)"
            strokeWidth="3"
            filter="url(#hologramGlow)"
            opacity={0.8}
          />
          
          {/* Layer 2 - Middle Ring with smart glass effect */}
          <circle
            cx={centerX}
            cy={centerY}
            r={middleRingRadius}
            fill="none"
            stroke="url(#layer2Gradient)"
            strokeWidth="2"
            filter="url(#smartGlass)"
            strokeDasharray="8,4"
            opacity={0.6}
          />
          
          {/* Layer 3 - Inner Ring with scanning pattern */}
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRingRadius}
            fill="none"
            stroke="url(#layer3Gradient)"
            strokeWidth="2"
            filter="url(#hologramGlow)"
            opacity={0.9}
          />

          {/* Advanced scanning lines system */}
          <g opacity={0.7}>
            {/* Primary scanning line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + outerRingRadius * Math.cos((scanlinePosition * Math.PI) / 180)}
              y2={centerY + outerRingRadius * Math.sin((scanlinePosition * Math.PI) / 180)}
              stroke="#00d4ff"
              strokeWidth="2"
              opacity="0.8"
              filter="url(#hologramGlow)"
            />
            
            {/* Secondary scanning line (opposite) */}
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + outerRingRadius * Math.cos(((scanlinePosition + 180) * Math.PI) / 180)}
              y2={centerY + outerRingRadius * Math.sin(((scanlinePosition + 180) * Math.PI) / 180)}
              stroke="#40e0ff"
              strokeWidth="1"
              opacity="0.4"
              filter="url(#smartGlass)"
            />
          </g>

          {/* Holographic data points */}
          {[0, 72, 144, 216, 288].map((angle, index) => (
            <circle
              key={`datapoint-${index}`}
              cx={centerX + (middleRingRadius + 10) * Math.cos((angle * Math.PI) / 180)}
              cy={centerY + (middleRingRadius + 10) * Math.sin((angle * Math.PI) / 180)}
              r={2 + Math.sin((Date.now() * 0.003) + index) * 1}
              fill="#00d4ff"
              opacity={0.6 + Math.sin((Date.now() * 0.004) + index) * 0.3}
              filter="url(#hologramGlow)"
            />
          ))}
          
          {/* Pulsing Core */}
          <circle
            cx={centerX}
            cy={centerY}
            r={coreRadius * pulseIntensity}
            fill="url(#coreGradient)"
            filter="url(#glow)"
          />
          
          {/* Navigation segments on outer ring */}
          {navigationItems.map((item, index) => {
            const angle = (index * 360) / navigationItems.length - 90; // Start from top
            const angleRad = (angle * Math.PI) / 180;
            const segmentRadius = outerRingRadius + 20;
            const x = centerX + segmentRadius * Math.cos(angleRad);
            const y = centerY + segmentRadius * Math.sin(angleRad);
            const isHovered = hoveredSegment === index;
            
            return (
              <g key={item.n_id}>
                {/* Navigation node */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 12 : 8}
                  fill={isHovered ? "#00d4ff" : "#00d4ff60"}
                  stroke={isHovered ? "#ffffff" : "#00d4ff"}
                  strokeWidth={isHovered ? 2 : 1}
                  filter="url(#glow)"
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  onClick={() => {
                    if (item.component) {
                      window.location.href = item.component;
                    }
                  }}
                />
                
                {/* Connection line to core */}
                <line
                  x1={centerX + (innerRingRadius + 5) * Math.cos(angleRad)}
                  y1={centerY + (innerRingRadius + 5) * Math.sin(angleRad)}
                  x2={x - 8 * Math.cos(angleRad)}
                  y2={y - 8 * Math.sin(angleRad)}
                  stroke={isHovered ? "#00d4ff" : "#00d4ff40"}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray="3,3"
                  opacity={isHovered ? 1 : 0.6}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
          
          {/* Rotating scanning line */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY - outerRingRadius}
            stroke="#00d4ff"
            strokeWidth="1"
            opacity="0.8"
            filter="url(#glow)"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: `${centerX}px ${centerY}px` }}
          />
        </svg>

        {/* Navigation Icons */}
        {navigationItems.map((item, index) => {
          const angle = (index * 360) / navigationItems.length - 90;
          const angleRad = (angle * Math.PI) / 180;
          const segmentRadius = outerRingRadius + 20;
          const x = centerX + segmentRadius * Math.cos(angleRad);
          const y = centerY + segmentRadius * Math.sin(angleRad);
          const isHovered = hoveredSegment === index;
          
          return (
            <motion.div
              key={`icon-${item.n_id}`}
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: x - 10,
                top: y - 10,
                width: 20,
                height: 20
              }}
              animate={{
                scale: isHovered ? 1.3 : 1,
                filter: isHovered ? 'drop-shadow(0 0 8px #00d4ff)' : 'none'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {renderIcon(item.icon || item.n_id, 14)}
            </motion.div>
          );
        })}
      </div>
      
      {/* Advanced Holographic Information Display System */}
      <AnimatePresence>
        {hoveredSegment !== null && navigationItems[hoveredSegment] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30, rotateX: -20 }}
            className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{ 
              top: size + 40,
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              {/* Multi-layer holographic background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 border border-cyan-400/60 rounded-xl backdrop-blur-md" 
                   style={{ 
                     boxShadow: `
                       0 0 40px rgba(0, 212, 255, 0.4), 
                       inset 0 0 30px rgba(0, 212, 255, 0.15),
                       0 8px 32px rgba(0, 212, 255, 0.2)
                     `,
                     transform: 'translateZ(-10px)'
                   }}>
              </div>

              {/* Smart glass overlay layer */}
              <div className="absolute inset-0 rounded-xl opacity-30"
                   style={{
                     background: `
                       linear-gradient(135deg, 
                         rgba(0, 212, 255, 0.1) 0%, 
                         transparent 50%, 
                         rgba(0, 212, 255, 0.05) 100%)
                     `,
                     transform: 'translateZ(-5px)'
                   }}>
              </div>
              
              {/* Advanced Content Layout */}
              <div className="relative p-6 min-w-[280px]" style={{ transform: 'translateZ(0px)' }}>
                {/* Header with status indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-cyan-300 font-bold text-base uppercase tracking-wider font-mono">
                    {navigationItems[hoveredSegment].label}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                  </div>
                </div>

                {/* Description with enhanced typography */}
                <div className="text-cyan-100/90 text-sm mb-4 leading-relaxed">
                  {navigationItems[hoveredSegment].description}
                </div>

                {/* Holographic data visualization */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="text-center">
                      <div className="text-xs text-cyan-400/60 mb-1">NODE-{item}</div>
                      <motion.div
                        className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        animate={{ scaleX: [0.5, 1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: item * 0.2 }}
                      />
                    </div>
                  ))}
                </div>

                {/* Interactive elements suggestion */}
                <div className="text-xs text-cyan-400/80 font-mono uppercase tracking-wide text-center">
                  ← SWIPE TO NAVIGATE →
                </div>
                
                {/* Multiple holographic scan lines */}
                <motion.div
                  className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  animate={{ 
                    y: [0, 60, 0],
                    opacity: [0.8, 0.3, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div
                  className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"
                  animate={{ 
                    y: [10, 70, 10],
                    opacity: [0.6, 0.2, 0.6]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                />
              </div>

              {/* Corner indicators */}
              {[
                { position: 'top-2 left-2', angle: '0deg' },
                { position: 'top-2 right-2', angle: '90deg' },
                { position: 'bottom-2 left-2', angle: '270deg' },
                { position: 'bottom-2 right-2', angle: '180deg' }
              ].map((corner, index) => (
                <div
                  key={index}
                  className={`absolute ${corner.position} w-3 h-3 border-l-2 border-t-2 border-cyan-400/60`}
                  style={{
                    transform: `rotate(${corner.angle})`
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Power Level Display */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-cyan-400/60 font-mono uppercase tracking-wider">
        Power: {powerLevel}%
      </div>
      
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}