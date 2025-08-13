'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography, Container, Grid, Chip, IconButton, Box } from '@mui/material'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FeaturedProjectsCarousel } from '@/components/ui/FeaturedProjectsCarousel'
import { GitHub, ExternalLink, Filter } from '@mui/icons-material'
import Image from 'next/image'

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  category: 'web' | 'mobile' | 'desktop' | 'other'
}

export interface ProjectsSliceProps {
  title?: string
  subtitle?: string
  projects?: Project[]
  showFilters?: boolean
}

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'MUI Carousel Component',
    description: 'A modern, customizable carousel component for React Material-UI with TypeScript support and comprehensive demo examples.',
    image: '/images/projects/components.svg',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Next.js', 'CSS-in-JS'],
    githubUrl: 'https://github.com/gazi786/mui-carousel',
    liveUrl: 'https://gazi786.github.io/mui-carousel/',
    featured: true,
    category: 'web'
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js, featuring real-time inventory, payment integration, and admin dashboard.',
    image: '/images/projects/ecommerce.svg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/gazi786/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    category: 'web'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/images/projects/taskmanager.svg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    githubUrl: 'https://github.com/gazi786/task-manager',
    liveUrl: 'https://taskmanager-demo.netlify.app',
    featured: true,
    category: 'web'
  },
  {
    id: '3',
    title: 'Portfolio CMS',
    description: 'A headless CMS built with Strapi for managing portfolio content, with a beautiful admin interface and RESTful API.',
    image: '/images/projects/cms.svg',
    technologies: ['Strapi', 'React', 'PostgreSQL', 'AWS S3', 'Docker'],
    githubUrl: 'https://github.com/gazi786/portfolio-cms',
    featured: false,
    category: 'web'
  },
  {
    id: '4',
    title: 'React Component Library',
    description: 'A comprehensive component library with TypeScript support, Storybook documentation, and npm package distribution.',
    image: '/images/projects/components.svg',
    technologies: ['React', 'TypeScript', 'Storybook', 'Jest', 'Rollup'],
    githubUrl: 'https://github.com/gazi786/react-components',
    liveUrl: 'https://components.gazi786.dev',
    featured: false,
    category: 'other'
  }
]

export const ProjectsSlice: React.FC<ProjectsSliceProps> = ({
  title = "Featured Projects",
  subtitle = "Some of my recent work that I'm proud to share",
  projects = defaultProjects,
  showFilters = true
}) => {
  const [filter, setFilter] = useState<string>('all')
  const [visibleProjects, setVisibleProjects] = useState(6)

  const categories = ['all', 'web', 'mobile', 'desktop', 'other']
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-800">
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Typography variant="h2" className="gradient-text mb-4">
              {title}
            </Typography>
            <Typography variant="body1" className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              {subtitle}
            </Typography>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Featured Projects Carousel */}
          {projects.filter(p => p.featured).length > 0 && (
            <motion.div variants={itemVariants} className="mb-20">
              <Typography variant="h3" className="text-center mb-8 font-semibold text-gray-900 dark:text-white">
                Featured Projects
              </Typography>
              <FeaturedProjectsCarousel projects={projects} />
            </motion.div>
          )}

          {/* All Projects Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Typography variant="h3" className="font-semibold text-gray-900 dark:text-white mb-4">
              All Projects
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
              Explore my complete portfolio of work
            </Typography>
          </motion.div>

          {showFilters && (
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  onClick={() => setFilter(category)}
                  color={filter === category ? "primary" : "default"}
                  variant={filter === category ? "filled" : "outlined"}
                  className="cursor-pointer transition-all duration-300 hover:scale-105"
                />
              ))}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Grid container spacing={4}>
              <AnimatePresence mode="wait">
                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <Grid item xs={12} md={6} lg={4} key={project.id}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <Card hover className="h-full group">
                        <div className="relative overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex space-x-4">
                              {project.githubUrl && (
                                <IconButton
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                >
                                  <GitHub />
                                </IconButton>
                              )}
                              {project.liveUrl && (
                                <IconButton
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                >
                                  <ExternalLink />
                                </IconButton>
                              )}
                            </div>
                          </div>
                          {project.featured && (
                            <Chip
                              label="Featured"
                              size="small"
                              className="absolute top-4 left-4 bg-blue-600 text-white"
                            />
                          )}
                        </div>
                        
                        <CardContent className="p-6">
                          <Typography variant="h6" className="font-semibold mb-2 text-gray-900 dark:text-white">
                            {project.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                            {project.description}
                          </Typography>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <Chip
                                key={techIndex}
                                label={tech}
                                size="small"
                                variant="outlined"
                                className="text-xs"
                              />
                            ))}
                            {project.technologies.length > 3 && (
                              <Chip
                                label={`+${project.technologies.length - 3}`}
                                size="small"
                                variant="outlined"
                                className="text-xs"
                              />
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <Button variant="text" size="small">
                              Learn More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </motion.div>

          {filteredProjects.length > visibleProjects && (
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Button
                onClick={() => setVisibleProjects(prev => prev + 6)}
                variant="outlined"
                size="large"
              >
                Load More Projects
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}