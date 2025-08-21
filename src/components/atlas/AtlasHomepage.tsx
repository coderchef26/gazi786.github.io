"use client";

import { useState } from 'react';
import { Content } from '@prismicio/client';
import AtlasProvider from './AtlasProvider';
import AtlasPageWrapper from './AtlasPageWrapper';
import AtlasAssistant from './AtlasAssistant';
import IslamicGreeting from './IslamicGreeting';

interface AtlasHomepageProps {
  children: React.ReactNode;
  pageData: Content.HomeDocument;
}

/**
 * Homepage component that integrates Islamic greeting with ATLAS system
 */
export default function AtlasHomepage({ children, pageData }: AtlasHomepageProps) {
  const [showGreeting, setShowGreeting] = useState(true);

  const handleGreetingComplete = () => {
    setShowGreeting(false);
  };

  return (
    <AtlasProvider>
      <AtlasPageWrapper pageData={pageData} className="min-h-screen">
        {/* Islamic Greeting Overlay */}
        {showGreeting && (
          <IslamicGreeting 
            onComplete={handleGreetingComplete}
            autoSpeak={true}
          />
        )}
        
        {/* Main Content */}
        <div className={`transition-opacity duration-1000 ${showGreeting ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </div>
        
        {/* ATLAS Assistant - Available after greeting completes */}
        {!showGreeting && <AtlasAssistant />}
      </AtlasPageWrapper>
    </AtlasProvider>
  );
}