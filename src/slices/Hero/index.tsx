'use client'

import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicRichText } from '@prismicio/react'
import { motion } from 'framer-motion'
import { Typography, Container, Box } from '@mui/material'
import { ArrowDownward, GitHub, LinkedIn, Mail } from '@mui/icons-material'
import { Button } from '@/components/ui/Button'

export type HeroProps = SliceComponentProps<Content.HeroSlice>

const Hero = ({ slice }: HeroProps): JSX.Element => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
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
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden"
    >
      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6"
            >
              {slice.primary.title || "Alshafaraz Gazi"}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-light max-w-4xl mx-auto"
            >
              {slice.primary.subtitle || "Full-Stack Developer & Creative Problem Solver"}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {slice.primary.description ? (
                <PrismicRichText field={slice.primary.description} />
              ) : (
                <p>I craft modern web applications with cutting-edge technologies, focusing on user experience and scalable solutions.</p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="large"
              href={slice.primary.cta_link?.url || "#projects"}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {slice.primary.cta_text || "View My Work"}
            </Button>
            
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="pt-12"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block"
            >
              <ArrowDownward className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}

export default Hero