"use client";

import React from 'react';
import AtlasProvider from '@/components/atlas/AtlasProvider';
import AtlasHero from '@/components/atlas/AtlasHero';
import AtlasAssistant from '@/components/assistant/AtlasAssistant';
import AzmaraEffects from '@/components/effects/AzmaraEffects';

export default function AtlasPortfolio() {
  const handleNavigation = (section: string) => {
    // Handle navigation to different sections
    
    // You can implement routing logic here
    // For now, we'll use the existing routing structure
    if (section && section !== 'hero') {
      window.location.href = `/${section}`;
    }
  };

  return (
    <AtlasProvider onNavigate={handleNavigation}>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Effects */}
        <AzmaraEffects />
        
        {/* Main Hero Interface */}
        <AtlasHero />
        
        {/* AI Assistant */}
        <AtlasAssistant onNavigate={handleNavigation} />
        
        {/* Hidden heading for SEO and accessibility */}
        <h1 className="atlas-sr-only">
          Alshafaraz Gazi - Full-Stack Developer Portfolio powered by ATLAS AI Assistant
        </h1>
        
        {/* Meta description for SEO */}
        <div className="atlas-sr-only">
          Explore Alshafaraz Gazi&apos;s portfolio featuring modern web development projects, 
          AI-powered accessibility, and interactive JARVIS-style interface. 
          Specializing in React, Node.js, TypeScript, and full-stack development.
        </div>
      </div>
    </AtlasProvider>
  );
}