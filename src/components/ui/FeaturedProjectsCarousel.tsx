'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconButton, Typography, Box } from '@mui/material'
import { ChevronLeft, ChevronRight, GitHub } from '@mui/icons-material'
import { Card, CardContent } from './Card'
import { Button } from './Button'
import Image from 'next/image'
import type { Project } from '@/slices/Projects'

interface FeaturedProjectsCarouselProps {
  projects: Project[]
  autoPlay?: boolean
  interval?: number
}

export const FeaturedProjectsCarousel: React.FC<FeaturedProjectsCarouselProps> = ({
  projects,
  autoPlay = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const featuredProjects = projects.filter(project => project.featured)

  useEffect(() => {
    if (!isPlaying || featuredProjects.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, featuredProjects.length, interval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? featuredProjects.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === featuredProjects.length - 1 ? 0 : currentIndex + 1)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  if (featuredProjects.length === 0) return null

  const currentProject = featuredProjects[currentIndex]

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(autoPlay)}
    >
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                goToNext()
              } else if (swipe > swipeConfidenceThreshold) {
                goToPrevious()
              }
            }}
            className="absolute w-full h-full"
          >
            <Card className="w-full h-full overflow-hidden">
              <div className="relative h-60 md:h-80">
                <Image
                  src={currentProject.image}
                  alt={currentProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    {currentProject.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 flex-1">
                <Typography variant="h4" className="font-bold mb-3 text-gray-900 dark:text-white">
                  {currentProject.title}
                </Typography>
                <Typography variant="body1" className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {currentProject.description}
                </Typography>
                
                <div className="flex items-center gap-4">
                  {currentProject.liveUrl && (
                    <Button
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Live
                    </Button>
                  )}
                  {currentProject.githubUrl && (
                    <Button
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="large"
                    >
                      <GitHub className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {featuredProjects.length > 1 && (
        <>
          <IconButton
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm text-white hover:bg-white/30 dark:hover:bg-gray-900/30 z-10"
            size="large"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm text-white hover:bg-white/30 dark:hover:bg-gray-900/30 z-10"
            size="large"
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {/* Indicators */}
      {featuredProjects.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {featuredProjects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-400 dark:bg-gray-600 hover:bg-blue-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}