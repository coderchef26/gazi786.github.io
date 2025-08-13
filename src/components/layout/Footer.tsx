import React from 'react'
import { Typography, Container, Grid, IconButton } from '@mui/material'
import { GitHub, LinkedIn, Mail, Heart } from '@mui/icons-material'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 mt-20">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="font-bold mb-4 text-gray-900 dark:text-white">
              Alshafaraz Gazi
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-4">
              Full-stack developer passionate about creating innovative solutions 
              and building exceptional user experiences.
            </Typography>
            <div className="flex space-x-2">
              <IconButton
                href="https://github.com/gazi786"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <GitHub />
              </IconButton>
              <IconButton
                href="https://linkedin.com/in/alshafaraz-gazi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="mailto:alshafaraz.gazi@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <Mail />
              </IconButton>
            </div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="font-bold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </Typography>
            <div className="grid grid-cols-2 gap-2">
              <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Projects
              </a>
              <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Skills
              </a>
              <a href="#education" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Education
              </a>
              <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
          </Grid>
        </Grid>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
              © {currentYear} Alshafaraz Gazi. All rights reserved.
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400 flex items-center mt-4 md:mt-0">
              Made with <Heart className="text-red-500 mx-1 text-sm" /> using Next.js & TypeScript
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  )
}