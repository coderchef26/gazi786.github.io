'use client'

import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { motion } from 'framer-motion'
import { ArrowDownward, GitHub, LinkedIn, Mail, FlashOn } from '@mui/icons-material'
import { useEffect, useRef } from 'react'

export type HeroProps = SliceComponentProps<Content.HeroSlice>

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const heroRef = useRef<HTMLElement>(null)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
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
        ease: "easeOut"
      }
    }
  }

  const socialLinks = [
    { icon: GitHub, href: 'https://github.com/gazi786', label: 'GitHub' },
    { icon: LinkedIn, href: 'https://linkedin.com/in/alshafaraz-gazi', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:alshafaraz.gazi@gmail.com', label: 'Email' },
  ]

  return (
    <section
      ref={heroRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-element p-3 stark-text hover:bg-[#00d4ff] hover:text-[#0a0a0f] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <div className="hud-element p-2 stark-text">
                <ArrowDownward className="text-2xl" />
              </div>
            </motion.div>
            <div className="mt-4 text-xs stark-text opacity-70 font-mono">
              SCROLL TO EXPLORE
            </div>
          </motion.div>
        </motion.div>
      </div>

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
      </div>
    </section>
  )
}

export default Hero