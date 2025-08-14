'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import type { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

export type AboutProps = SliceComponentProps<Content.AboutSlice>;

const About = ({ slice }: AboutProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const highlights = [
    {
      icon: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z',
      title: 'SECURE SYSTEMS',
      description: 'Building robust, secure applications with advanced encryption protocols'
    },
    {
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      title: 'OPTIMIZED PERFORMANCE',
      description: 'Creating lightning-fast applications with cutting-edge optimization'
    },
    {
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      title: 'AI INTEGRATION',
      description: 'Implementing advanced AI and machine learning solutions'
    },
    {
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
      title: 'SCALABLE ARCHITECTURE',
      description: 'Designing systems that grow with your business needs'
    }
  ];

  const stats = [
    { value: '500+', label: 'PROJECTS DEPLOYED' },
    { value: '99.9%', label: 'UPTIME GUARANTEE' },
    { value: '50M+', label: 'LINES OF CODE' },
    { value: '24/7', label: 'SYSTEM MONITORING' }
  ];

  return (
    <section 
      id="about" 
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="relative py-20 overflow-hidden"
    >
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30h30v30h-30z M0 0h30v30h-30z' stroke='%2300d4ff' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold jarvis-text glow-text mb-4">
                SYSTEM PROFILE
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="jarvis-panel p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm jarvis-text text-cyan-400">BIOGRAPHY MODULE</span>
                </div>
                
                <p className="text-cyan-300/80 leading-relaxed mb-4">
                  SPECIALIZED IN ARCHITECTING NEXT-GENERATION WEB APPLICATIONS WITH FOCUS ON 
                  SCALABILITY, SECURITY, AND PERFORMANCE. EXTENSIVE EXPERIENCE IN FULL-STACK 
                  DEVELOPMENT UTILIZING CUTTING-EDGE TECHNOLOGIES.
                </p>
                
                <p className="text-cyan-300/60 leading-relaxed mb-4">
                  CORE EXPERTISE INCLUDES REACT ECOSYSTEM, NODE.JS RUNTIME, CLOUD INFRASTRUCTURE, 
                  AND AI/ML INTEGRATION. PROVEN TRACK RECORD OF DELIVERING MISSION-CRITICAL 
                  APPLICATIONS FOR ENTERPRISE CLIENTS.
                </p>

                <p className="text-cyan-300/60 leading-relaxed">
                  CONTINUOUS LEARNER AND INNOVATION ADVOCATE, ACTIVELY CONTRIBUTING TO OPEN-SOURCE 
                  PROJECTS AND ADVANCING WEB TECHNOLOGY STANDARDS.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="holo-card text-center"
                  >
                    <div className="text-2xl font-bold glow-text jarvis-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-cyan-400/60 jarvis-text mt-1">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Capabilities */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="holo-card group cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 mb-3 relative">
                        <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg group-hover:bg-cyan-400/30 transition-colors" />
                        <svg className="w-full h-full text-cyan-400 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                          <path d={highlight.icon} />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold jarvis-text text-cyan-400 mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-xs text-cyan-300/50 leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 jarvis-panel p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs jarvis-text text-cyan-400">SYSTEM STATUS</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 jarvis-text">OPERATIONAL</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {['CREATIVITY MODULE', 'LOGIC PROCESSOR', 'INNOVATION ENGINE'].map((module, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs text-cyan-300/60 jarvis-text">{module}</span>
                      <div className="w-32 h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${85 + idx * 5}%` }}
                          transition={{ duration: 1, delay: 1 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;