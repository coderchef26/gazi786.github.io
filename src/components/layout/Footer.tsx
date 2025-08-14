'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/gazi786', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/alshafaraz-gazi', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'Email', href: 'mailto:alshafaraz.gazi@gmail.com', icon: 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative mt-20 border-t border-cyan-500/20 bg-black/50 backdrop-blur-lg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 glow-text jarvis-text">
              Alshafaraz Gazi
            </h3>
            <p className="text-cyan-300/70 mb-6 max-w-md">
              Full-stack developer passionate about creating innovative solutions 
              and building exceptional user experiences with cutting-edge technology.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group relative"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/5 transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                    <svg className="w-5 h-5 fill-cyan-400" viewBox="0 0 24 24">
                      <path d={link.icon} />
                    </svg>
                  </div>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap jarvis-text">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Section - Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:text-right"
          >
            <h3 className="text-xl font-bold mb-4 text-cyan-400 jarvis-text">
              Quick Access
            </h3>
            <div className="flex flex-col gap-2 md:items-end">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative inline-flex items-center gap-2 text-cyan-300/70 hover:text-cyan-400 transition-colors jarvis-text text-sm"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-cyan-500/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cyan-300/50 text-sm jarvis-text">
              © {currentYear} Alshafaraz Gazi. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-cyan-300/50 text-sm">
              <span className="jarvis-text">Powered by</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
                <span className="text-cyan-400 jarvis-text">Arc Reactor</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </footer>
  );
};