"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AtlasNavigator from '@/components/layout/AtlasNavigator';
import HolographicInterface from '@/components/effects/HolographicInterface';
import AzmaraEffects from '@/components/effects/AzmaraEffects';
import CommandCentreReactor from '@/components/navigation/CommandCentreReactor';
import ArcReactorLoader from '@/components/effects/ArcReactorLoader';
import JarvisHeroLayout from '@/components/layout/JarvisHeroLayout';
import CoderChefLogo from '@/components/ui/CoderChefLogo';
import AtlasAssistant from '@/components/assistant/AtlasAssistant';

export default function TestPage() {
  const [activeTest, setActiveTest] = useState<string>('jarvis');
  const [showEffects, setShowEffects] = useState(true);

  const testComponents = {
    holographic: {
      name: 'Holographic Interface',
      component: (
        <HolographicInterface isActive={true}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-[#00d4ff] azmara-text">
                HOLOGRAPHIC INTERFACE TEST
              </h1>
              <p className="text-cyan-300">Testing holographic overlay effects</p>
            </div>
          </div>
        </HolographicInterface>
      )
    },
    navigator: {
      name: 'Atlas Navigator (Single Page Design)',
      component: (
        <div className="fixed inset-0 bg-[#0a0a0f]">
          <AtlasNavigator />
        </div>
      )
    },
    fullscreen: {
      name: 'Full Single Page Experience',
      component: (
        <div className="fixed inset-0 bg-[#0a0a0f] overflow-hidden">
          {showEffects && <AzmaraEffects />}
          <HolographicInterface isActive={true}>
            <AtlasNavigator />
          </HolographicInterface>
        </div>
      )
    },
    effects: {
      name: 'Azmara Effects',
      component: (
        <div className="relative min-h-screen bg-[#0a0a0f]">
          <AzmaraEffects />
          <div className="relative z-50 flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-[#00d4ff] azmara-text">
                AZMARA EFFECTS TEST
              </h1>
              <p className="text-cyan-300">Testing particle field + HUD overlay</p>
            </div>
          </div>
        </div>
      )
    },
    reactor: {
      name: 'Command Centre Reactor',
      component: (
        <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold text-[#00d4ff] azmara-text">
              COMMAND CENTRE REACTOR TEST
            </h1>
            <CommandCentreReactor 
              powerLevel={100} 
              showNavigation={true}
              className="scale-150"
            />
            <p className="text-cyan-300">Testing reactor navigation hub</p>
          </div>
        </div>
      )
    },
    loader: {
      name: 'Arc Reactor Loader',
      component: (
        <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold text-[#00d4ff] azmara-text mb-8">
              ARC REACTOR LOADER TEST
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <ArcReactorLoader size="sm" text="SMALL SIZE" />
              </div>
              <div className="text-center">
                <ArcReactorLoader size="md" text="MEDIUM SIZE" />
              </div>
              <div className="text-center">
                <ArcReactorLoader size="lg" text="LARGE SIZE" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    jarvis: {
      name: 'JARVIS Hero Layout',
      component: (
        <div className="fixed inset-0">
          <JarvisHeroLayout />
          <AtlasAssistant onNavigate={(section) => console.log('Navigate to:', section)} />
        </div>
      )
    },
    assistant: {
      name: 'ATLAS AI Assistant',
      component: (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#00d4ff] azmara-text">
              AI ASSISTANT TEST
            </h1>
            <p className="text-cyan-300">Click the floating assistant button to interact</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-4xl">
              {['Projects', 'Skills', 'About', 'Education', 'Experience', 'Contact'].map((section) => (
                <div key={section} className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded">
                  <h3 className="text-cyan-400 font-bold mb-2">{section}</h3>
                  <p className="text-cyan-300/70 text-sm">Sample content for {section.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
          <AtlasAssistant onNavigate={(section) => console.log('Navigate to:', section)} />
        </div>
      )
    },
    logo: {
      name: 'CoderChef Logo Test',
      component: (
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <CoderChefLogo size="sm" animate={true} />
              <p className="text-cyan-400 mt-4 text-sm">Small</p>
            </div>
            <div className="text-center">
              <CoderChefLogo size="md" animate={true} />
              <p className="text-cyan-400 mt-4 text-sm">Medium</p>
            </div>
            <div className="text-center">
              <CoderChefLogo size="lg" animate={true} />
              <p className="text-cyan-400 mt-4 text-sm">Large</p>
            </div>
            <div className="text-center">
              <CoderChefLogo size="xl" animate={true} />
              <p className="text-cyan-400 mt-4 text-sm">Extra Large</p>
            </div>
          </div>
        </div>
      )
    },
    responsive: {
      name: 'Responsive Test',
      component: (
        <div className="relative min-h-screen bg-[#0a0a0f] p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold text-[#00d4ff] azmara-text text-center mb-8">
              RESPONSIVE TEST
            </h1>
            
            {/* Breakpoint indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <div className="block sm:hidden p-4 bg-red-500/20 border border-red-500 rounded text-center">
                <div className="text-red-400 font-bold">XS</div>
                <div className="text-xs text-red-300">&lt; 640px</div>
              </div>
              <div className="hidden sm:block md:hidden p-4 bg-yellow-500/20 border border-yellow-500 rounded text-center">
                <div className="text-yellow-400 font-bold">SM</div>
                <div className="text-xs text-yellow-300">640px - 768px</div>
              </div>
              <div className="hidden md:block lg:hidden p-4 bg-green-500/20 border border-green-500 rounded text-center">
                <div className="text-green-400 font-bold">MD</div>
                <div className="text-xs text-green-300">768px - 1024px</div>
              </div>
              <div className="hidden lg:block p-4 bg-blue-500/20 border border-blue-500 rounded text-center">
                <div className="text-blue-400 font-bold">LG</div>
                <div className="text-xs text-blue-300">&gt; 1024px</div>
              </div>
            </div>

            {/* Component scaling test */}
            <div className="space-y-8">
              <div className="text-center">
                <CommandCentreReactor 
                  powerLevel={85} 
                  showNavigation={false}
                  className="scale-50 sm:scale-75 md:scale-100 lg:scale-125"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded"
                  >
                    <h3 className="text-cyan-400 font-bold mb-2">Test Card {i}</h3>
                    <p className="text-cyan-300/70 text-sm">Responsive grid testing</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Test Controls */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        <div className="bg-[#1a1a2e]/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 space-y-2">
          <h2 className="text-sm font-bold text-[#00d4ff] mb-2">UI TEST CONTROLS</h2>
          
          {Object.entries(testComponents).map(([key, test]) => (
            <button
              key={key}
              onClick={() => setActiveTest(key)}
              className={`w-full px-3 py-2 text-xs rounded transition-all ${
                activeTest === key
                  ? 'bg-[#00d4ff] text-black font-bold'
                  : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30'
              }`}
            >
              {test.name}
            </button>
          ))}
          
          <div className="border-t border-cyan-500/30 pt-2 mt-4">
            <label className="flex items-center space-x-2 text-xs text-cyan-400">
              <input
                type="checkbox"
                checked={showEffects}
                onChange={(e) => setShowEffects(e.target.checked)}
                className="rounded"
              />
              <span>Background Effects</span>
            </label>
          </div>
        </div>

        {/* Screen Size Indicator */}
        <div className="bg-[#1a1a2e]/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2">
          <div className="text-xs text-cyan-400">
            <div className="block sm:hidden">📱 Mobile (&lt;640px)</div>
            <div className="hidden sm:block md:hidden">📟 Tablet (640-768px)</div>
            <div className="hidden md:block lg:hidden">💻 Desktop (768-1024px)</div>
            <div className="hidden lg:block">🖥️ Large (&gt;1024px)</div>
          </div>
        </div>
      </div>

      {/* Background Effects Toggle */}
      {showEffects && activeTest !== 'effects' && activeTest !== 'holographic' && (
        <AzmaraEffects />
      )}

      {/* Active Test Component */}
      <motion.div
        key={activeTest}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {testComponents[activeTest].component}
      </motion.div>

      {/* Test Info */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-[#1a1a2e]/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3">
          <div className="text-xs text-cyan-400">
            <div className="font-bold">{testComponents[activeTest].name}</div>
            <div className="opacity-70">Press F12 for DevTools</div>
          </div>
        </div>
      </div>
    </div>
  );
}