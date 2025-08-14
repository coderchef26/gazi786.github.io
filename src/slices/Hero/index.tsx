'use client';

import type { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ArcReactorLoader from '@/components/effects/ArcReactorLoader';

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullTitle = slice.primary.title || "ALSHAFARAZ GAZI";
  const subtitle = slice.primary.subtitle || "FULL-STACK DEVELOPER & SYSTEM ARCHITECT";

  useEffect(() => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8 max-w-5xl mx-auto"
        >
          {/* System Status */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs jarvis-text text-cyan-400">SYSTEM ONLINE</span>
          </motion.div>

          {/* Main Title with typing effect */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold jarvis-text">
              <span className="glow-text">{typedText}</span>
              <span className="animate-pulse">|</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl md:text-2xl text-cyan-300 jarvis-text tracking-wider">
              {subtitle}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <div className="holo-card p-6">
              {slice.primary.description ? (
                <div className="text-gray-300">
                  <PrismicRichText field={slice.primary.description} />
                </div>
              ) : (
                <p className="text-gray-300">
                  Architecting next-generation web solutions with precision and innovation. 
                  Specializing in full-stack development, system design, and creating 
                  exceptional digital experiences.
                </p>
              )}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={slice.primary.cta_link?.url || "#projects"}
              className="arc-reactor-btn group"
            >
              <span className="relative z-10">{slice.primary.cta_text || "ACCESS PROJECTS"}</span>
            </a>
            
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              </div>
            </motion.div>
            <div className="mt-4 text-xs text-cyan-400/70 jarvis-text">
              SCROLL TO EXPLORE
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Holographic decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        <div className="w-full h-full border border-cyan-500/30 rotate-45 animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-20">
        <div className="w-full h-full border border-cyan-500/30 rotate-45 animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;