"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Link from 'next/link';
import { 
  FaProjectDiagram, 
  FaUser, 
  FaBolt, 
  FaBrain, 
  FaBriefcase, 
  FaRocket, 
  FaCode, 
  FaGraduationCap 
} from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';

interface ArcReactorPieNavigationProps {
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
  color?: string;
}

export default function ArcReactorPieNavigation({
  className = '',
  size = 240,
  powerLevel = 100
}: ArcReactorPieNavigationProps) {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
            icon: item.icon || '',
            color: item.color || generateColor(item.n_id)
          }));
          setNavigationItems(navItems);
        } else {
          // Fallback navigation with theme colors
          setNavigationItems([
            {
              n_id: "projects",
              label: "PROJECTS", 
              component: "/projects",
              description: "View my work",
              icon: "target",
              color: "#e74c3c"
            },
            {
              n_id: "about",
              label: "ABOUT",
              component: "/about", 
              description: "Learn about me",
              icon: "user",
              color: "#3498db"
            },
            {
              n_id: "skills",
              label: "SKILLS",
              component: "/skills",
              description: "My capabilities", 
              icon: "bolt",
              color: "#f39c12"
            },
            {
              n_id: "education", 
              label: "EDUCATION",
              component: "/education",
              description: "Academic background",
              icon: "brain",
              color: "#2ecc71"
            },
            {
              n_id: "experience",
              label: "EXPERIENCE", 
              component: "/experience", 
              description: "Work history",
              icon: "briefcase",
              color: "#9b59b6"
            }
          ]);
        }
        setIsLoaded(true);
      } catch (error) {
        // Use minimal fallback on error
        setNavigationItems([
          {
            n_id: "projects",
            label: "PROJECTS", 
            component: "/projects",
            description: "View my work",
            icon: "target",
            color: "#00d4ff"
          },
          {
            n_id: "about", 
            label: "ABOUT",
            component: "/about",
            description: "Learn about me",
            icon: "user",
            color: "#00d4ff"
          }
        ]);
        setIsLoaded(true);
      }
    };

    fetchNavigation();
  }, []);

  // Generate color based on item id
  const generateColor = (id: string): string => {
    const colors = [
      '#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#9b59b6', 
      '#e67e22', '#1abc9c', '#34495e', '#f1c40f', '#e91e63'
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Render appropriate icon
  const renderIcon = (iconName: string, size = 20) => {
    const iconProps = { size, className: "text-current" };

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
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyan-400 border-t-transparent"></div>
      </div>
    );
  }

  const radius = size * 0.4;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Background glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 animate-pulse"
        style={{
          background: `radial-gradient(circle, #00d4ff40 0%, transparent 70%)`,
        }}
      />
      
      {/* SVG Pie Chart */}
      <svg width={size} height={size} className="relative z-10">
        {/* 3D Shadow effect */}
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {navigationItems.map((item, index) => {
          const segmentAngle = 360 / navigationItems.length;
          const startAngle = index * segmentAngle - 90; // Start from top
          const endAngle = (index + 1) * segmentAngle - 90;
          const isHovered = hoveredSegment === index;
          const currentRadius = isHovered ? radius * 1.15 : radius;
          
          // Calculate path for pie segment
          const startAngleRad = (startAngle * Math.PI) / 180;
          const endAngleRad = (endAngle * Math.PI) / 180;
          
          const x1 = centerX + currentRadius * Math.cos(startAngleRad);
          const y1 = centerY + currentRadius * Math.sin(startAngleRad);
          const x2 = centerX + currentRadius * Math.cos(endAngleRad);
          const y2 = centerY + currentRadius * Math.sin(endAngleRad);
          
          const largeArcFlag = segmentAngle > 180 ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`, // Move to center
            `L ${x1} ${y1}`, // Line to start point
            `A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc
            'Z' // Close path
          ].join(' ');
          
          return (
            <motion.path
              key={item.n_id}
              d={pathData}
              fill={item.color}
              stroke={isHovered ? "#ffffff" : "#ffffff20"}
              strokeWidth={isHovered ? 2 : 1}
              filter={isHovered ? "url(#glow)" : "url(#shadow)"}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
              onClick={() => {
                if (item.component) {
                  window.location.href = item.component;
                }
              }}
              animate={{
                opacity: isHovered ? 0.9 : 0.8,
              }}
              whileHover={{
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          );
        })}
        
        {/* Center Core */}
        <circle
          cx={centerX}
          cy={centerY}
          r={size * 0.08}
          fill="url(#coreGradient)"
          filter="url(#glow)"
        />
        
        {/* Core gradient definition */}
        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="70%" stopColor="#0099cc" />
            <stop offset="100%" stopColor="#006699" />
          </radialGradient>
        </defs>
      </svg>

      {/* Segment Icons and Labels */}
      {navigationItems.map((item, index) => {
        const segmentAngle = 360 / navigationItems.length;
        const midAngle = (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
        const iconRadius = radius * 0.7;
        const x = centerX + iconRadius * Math.cos(midAngle);
        const y = centerY + iconRadius * Math.sin(midAngle);
        const isHovered = hoveredSegment === index;
        
        return (
          <motion.div
            key={`icon-${item.n_id}`}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{
              left: x - 15,
              top: y - 15,
              width: 30,
              height: 30
            }}
            animate={{
              scale: isHovered ? 1.4 : 1,
              rotate: isHovered ? 360 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <div 
              className="text-white drop-shadow-lg"
              style={{ 
                filter: isHovered ? `drop-shadow(0 0 8px ${item.color})` : 'none'
              }}
            >
              {renderIcon(item.icon || item.n_id, isHovered ? 18 : 14)}
            </div>
          </motion.div>
        );
      })}
      
      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredSegment !== null && navigationItems[hoveredSegment] && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{ top: size + 15 }}
          >
            <div 
              className="bg-slate-900/95 border rounded-lg p-3 backdrop-blur-sm min-w-[180px] text-center shadow-2xl"
              style={{ 
                borderColor: navigationItems[hoveredSegment].color + '50',
                boxShadow: `0 0 20px ${navigationItems[hoveredSegment].color}30`
              }}
            >
              <div 
                className="font-bold text-sm mb-1"
                style={{ color: navigationItems[hoveredSegment].color }}
              >
                {navigationItems[hoveredSegment].label}
              </div>
              <div className="text-slate-300 text-xs">
                {navigationItems[hoveredSegment].description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Power Level Indicator */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-cyan-400/60 font-mono">
        PWR: {powerLevel}%
      </div>
    </div>
  );
}