'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'EDUCATION', href: '#education' },
  { name: 'CONTACT', href: '#contact' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center"
            >
              <Link href="/" className="group flex items-center gap-3">
                {/* Arc Reactor Logo */}
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors" />
                  <div className="absolute inset-1 rounded-full bg-black" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
                  <div className="absolute inset-0 rounded-full animate-pulse">
                    <div className="w-full h-full rounded-full border border-cyan-400/50" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold jarvis-text glow-text">
                    ALSHAFARAZ GAZI
                  </h1>
                  <p className="text-xs text-cyan-400/70 jarvis-text">FULL-STACK DEVELOPER</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setActiveSection(item.name)}
                    className="relative group"
                  >
                    <span className={`jarvis-text text-sm tracking-wider transition-colors ${
                      activeSection === item.name 
                        ? 'text-cyan-400' 
                        : 'text-cyan-300/70 hover:text-cyan-400'
                    }`}>
                      {item.name}
                    </span>
                    {/* Hover effect */}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                    {/* Active indicator */}
                    {activeSection === item.name && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-2 left-0 w-full h-px bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <button className="arc-reactor-btn">
                  INITIALIZE
                </button>
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={handleDrawerToggle}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 8 : 0,
                  }}
                  className="w-full h-0.5 bg-cyan-400 origin-left transition-all"
                />
                <motion.span
                  animate={{
                    opacity: mobileOpen ? 0 : 1,
                    x: mobileOpen ? -20 : 0,
                  }}
                  className="w-full h-0.5 bg-cyan-400 transition-all"
                />
                <motion.span
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -8 : 0,
                  }}
                  className="w-full h-0.5 bg-cyan-400 origin-left transition-all"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Scanning line effect */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDrawerToggle}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-cyan-500/20 z-50 md:hidden"
            >
              <div className="p-6">
                {/* Close button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={handleDrawerToggle}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors"
                  >
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          setActiveSection(item.name);
                          handleDrawerToggle();
                        }}
                        className="block py-3 px-4 jarvis-text text-cyan-300/70 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all rounded-lg border border-transparent hover:border-cyan-500/20"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <button className="w-full arc-reactor-btn">
                    INITIALIZE SYSTEM
                  </button>
                </motion.div>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};