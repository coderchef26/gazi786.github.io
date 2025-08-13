'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Typography, Container, Box } from '@mui/material'
import { ArrowDownward, GitHub, LinkedIn, Mail } from '@mui/icons-material'
import { Button } from '@/components/ui/Button'

export interface HeroSliceProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaLink?: string
}

export const HeroSlice: React.FC<HeroSliceProps> = ({
  title = "Alshafaraz Gazi",
  subtitle = "Full-Stack Developer & Creative Problem Solver",
  description = "I craft modern web applications with cutting-edge technologies, focusing on user experience and scalable solutions.",
  ctaText = "View My Work",
  ctaLink = "#projects"
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-mesh-gradient relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              className="gradient-text mb-6 font-extrabold text-5xl md:text-7xl"
            >
              {title}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              className="text-gray-700 dark:text-gray-300 mb-8 text-xl md:text-2xl font-medium"
            >
              {subtitle}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-400 mb-12 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </Typography>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              size="large"
              className="px-8 py-3 text-lg"
              href={ctaLink}
            >
              {ctaText}
            </Button>
            
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://github.com/gazi786"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass-effect text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <GitHub fontSize="large" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/alshafaraz-gazi"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass-effect text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LinkedIn fontSize="large" />
              </motion.a>
              <motion.a
                href="mailto:alshafaraz.gazi@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass-effect text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail fontSize="large" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.a
              href="#about"
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowDownward fontSize="large" />
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}