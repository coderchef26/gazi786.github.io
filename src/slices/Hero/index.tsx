'use client';

<<<<<<< HEAD
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ArcReactorLoader from '@/components/effects/ArcReactorLoader';
=======
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { motion } from 'framer-motion'
import { ArrowDownward, GitHub, LinkedIn, Mail, FlashOn } from '@mui/icons-material'
import { useEffect, useRef } from 'react'
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
<<<<<<< HEAD
  const [isInitialized, setIsInitialized] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullTitle = slice.primary.title || "ALSHAFARAZ GAZI";
  const subtitle = slice.primary.subtitle || "FULL-STACK DEVELOPER & SYSTEM ARCHITECT";

  useEffect(() => {
    // Simulate initialization
    setTimeout(() => setIsInitialized(true), 2000);
  }, []);

  useEffect(() => {
    if (isInitialized && typedText.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullTitle.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isInitialized, typedText, fullTitle]);

=======
  const heroRef = useRef<HTMLElement>(null)
  
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
<<<<<<< HEAD
        staggerChildren: 0.1
=======
        staggerChildren: 0.3
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
<<<<<<< HEAD
        duration: 0.5,
=======
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const glitchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { name: 'GITHUB', href: 'https://github.com/gazi786', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'LINKEDIN', href: 'https://linkedin.com/in/alshafaraz-gazi', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'CONTACT', href: 'mailto:alshafaraz.gazi@gmail.com', icon: 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z' },
  ];

  if (!isInitialized) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <ArcReactorLoader size="lg" text="SYSTEM INITIALIZING..." />
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
<<<<<<< HEAD
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black, transparent 70%)'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
=======
      <div className="max-w-7xl mx-auto px-6 relative z-10">
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
<<<<<<< HEAD
          className="text-center space-y-8 max-w-5xl mx-auto"
        >
          {/* System Status */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs jarvis-text text-cyan-400">SYSTEM ONLINE</span>
=======
          className="text-center space-y-12"
        >
          {/* Power Core Display */}
          <motion.div 
            variants={glitchVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#00d4ff] relative energy-core">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-2 border-[#00d4ff] opacity-60"
                />
                <FlashOn className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00d4ff] text-2xl" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-[#00d4ff] opacity-30"
              />
            </div>
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
          </motion.div>

          {/* Main Title with typing effect */}
          <motion.div variants={itemVariants}>
<<<<<<< HEAD
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold jarvis-text">
              <span className="glow-text">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <div className="relative inline-block">
              <h2 className="text-xl md:text-2xl lg:text-3xl jarvis-text text-cyan-300/80">
                {subtitle}
              </h2>
              <div className="absolute -inset-x-20 -inset-y-2 bg-cyan-500/5 blur-xl" />
            </div>
          </motion.div>

          {/* Description in HUD panel */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <div className="jarvis-panel p-6">
              <div className="text-cyan-300/70 leading-relaxed">
                {slice.primary.description ? (
                  <PrismicRichText field={slice.primary.description} />
                ) : (
                  <p className="jarvis-text text-sm md:text-base">
                    ENGINEERING NEXT-GENERATION WEB APPLICATIONS WITH CUTTING-EDGE TECHNOLOGIES. 
                    SPECIALIZING IN SCALABLE ARCHITECTURES AND EXCEPTIONAL USER EXPERIENCES.
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={slice.primary.cta_link?.url || "#projects"}
              className="arc-reactor-btn group"
            >
              <span className="relative z-10">{slice.primary.cta_text || "ACCESS PROJECTS"}</span>
            </a>
            
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
=======
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold stark-text mb-6">
              {slice.primary.title || "ALSHAFARAZ.GAZI"}
            </h1>
            <motion.div
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#00d4ff] to-[#ff6b6b] mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl stark-text font-orbitron font-light">
                {slice.primary.subtitle || "SYSTEMS ARCHITECT & NEURAL ENGINEER"}
              </h2>
              <div className="flex justify-center space-x-4 text-sm stark-text">
                <span className="hud-element px-3 py-1">REACT.JS</span>
                <span className="hud-element px-3 py-1">NODE.JS</span>
                <span className="hud-element px-3 py-1">NEXT.JS</span>
                <span className="hud-element px-3 py-1">AI/ML</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <div className="stark-panel p-6 text-lg stark-text leading-relaxed">
              {slice.primary.description ? (
                <PrismicRichText field={slice.primary.description} />
              ) : (
                <p>Engineering next-generation web architectures with quantum-level precision. Specializing in neural network integration and holographic interface design.</p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href={slice.primary.cta_link?.url || "#projects"}
              className="holographic-border px-8 py-4 stark-text font-orbitron font-bold text-lg hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00d4ff" }}
              whileTap={{ scale: 0.95 }}
            >
              {slice.primary.cta_text || "INITIALIZE PORTFOLIO"}
            </motion.a>
            
            <div className="flex space-x-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
<<<<<<< HEAD
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group relative"
                >
                  <div className="w-12 h-12 flex items-center justify-center holo-card">
                    <svg className="w-5 h-5 fill-cyan-400" viewBox="0 0 24 24">
                      <path d={link.icon} />
                    </svg>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap jarvis-text">
                    {link.name}
                  </span>
=======
                  className="hud-element p-3 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="text-xl" />
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <motion.div
<<<<<<< HEAD
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <div className="w-6 h-10 rounded-full border-2 border-cyan-400/50 flex justify-center">
                <motion.div
                  animate={{ y: [2, 8, 2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                />
=======
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <div className="hud-element p-2 stark-text">
                <ArrowDownward className="text-2xl" />
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
              </div>
            </motion.div>
            <div className="mt-4 text-xs stark-text opacity-70 font-mono">
              SCROLL TO EXPLORE
            </div>
          </motion.div>
        </motion.div>
      </div>

<<<<<<< HEAD
      {/* Holographic decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <div className="w-full h-full border border-cyan-500/30 rotate-45 animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-20">
        <div className="w-full h-full border border-cyan-500/30 rotate-45 animate-pulse" />
=======
      {/* Holographic Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Data Streams */}
        <div className="absolute top-20 left-10 w-1 h-32 bg-gradient-to-b from-[#00d4ff] to-transparent opacity-60 animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-24 bg-gradient-to-b from-[#ff6b6b] to-transparent opacity-40 animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1 h-20 bg-gradient-to-b from-[#26de81] to-transparent opacity-50 animate-pulse" />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#00d4ff] rounded-full opacity-60"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
>>>>>>> 19444ce963dc766351e4bf7d45356453f39d7a3e
      </div>
    </section>
  );
};

export default Hero;