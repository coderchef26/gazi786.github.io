'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Typography, Container, Grid, Box } from '@mui/material'
import { Card, CardContent } from '@/components/ui/Card'
import { Code, Palette, Rocket, Users } from 'lucide-react'

export interface AboutSliceProps {
  title?: string
  description?: string[]
  highlights?: Array<{
    icon: React.ReactNode
    title: string
    description: string
  }>
}

export const AboutSlice: React.FC<AboutSliceProps> = ({
  title = "About Me",
  description = [
    "I'm a passionate full-stack developer with over 5 years of experience in creating modern web applications. My journey in technology started with a curiosity about how things work on the internet, and it has evolved into a deep love for crafting digital experiences.",
    "I specialize in React, Next.js, Node.js, and modern web technologies. I believe in writing clean, maintainable code and creating user-centric applications that solve real-world problems.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community."
  ],
  highlights = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code following best practices."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Focus",
      description: "Creating beautiful, intuitive user interfaces with attention to user experience."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Performance",
      description: "Optimizing applications for speed, accessibility, and search engine visibility."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "Working effectively in teams and communicating technical concepts clearly."
    }
  ]
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Typography variant="h2" className="gradient-text mb-6">
              {title}
            </Typography>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants} className="space-y-6">
                {description.map((paragraph, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                  >
                    {paragraph}
                  </Typography>
                ))}
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={6}>
              <motion.div variants={itemVariants}>
                <Grid container spacing={3}>
                  {highlights.map((highlight, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card hover className="h-full">
                        <CardContent className="p-6 text-center">
                          <Box className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 text-blue-600 dark:text-blue-400">
                            {highlight.icon}
                          </Box>
                          <Typography variant="h6" className="font-semibold mb-3 text-gray-900 dark:text-white">
                            {highlight.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {highlight.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>

          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-8 p-8 glass-effect rounded-2xl">
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 dark:text-blue-400">
                  5+
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  Years Experience
                </Typography>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 dark:text-blue-400">
                  50+
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  Projects Completed
                </Typography>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 dark:text-blue-400">
                  10+
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  Technologies
                </Typography>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}