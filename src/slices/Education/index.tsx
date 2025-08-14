'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Typography, Container, Grid, Box } from '@mui/material'
import { Card, CardContent } from '@/components/ui/Card'
import { School, Award, Event } from '@mui/icons-material'

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  period: string
  description?: string
  achievements?: string[]
  grade?: string
}

export interface EducationSliceProps {
  title?: string
  subtitle?: string
  education?: Education[]
}

const defaultEducation: Education[] = [
  {
    id: '1',
    institution: 'University of Technology',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    period: '2018 - 2022',
    grade: 'First Class Honours',
    description: 'Focused on software engineering, algorithms, and data structures. Specialized in web development and modern programming paradigms.',
    achievements: [
      'Dean\'s List for 3 consecutive years',
      'Led development team for final year project',
      'Published research paper on web optimization'
    ]
  },
  {
    id: '2',
    institution: 'Tech Institute',
    degree: 'Diploma',
    field: 'Web Development',
    period: '2017 - 2018',
    grade: 'Distinction',
    description: 'Intensive program covering modern web technologies, including React, Node.js, and database management.',
    achievements: [
      'Best Student Award',
      'Completed 5 major projects',
      'Mentored junior students'
    ]
  }
]

const EducationSlice: React.FC<EducationSliceProps> = ({
  title = "Education & Learning",
  subtitle = "My academic journey and continuous learning path",
  education = defaultEducation
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
    <section id="education" className="section-padding bg-white dark:bg-gray-800">
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

          <motion.div variants={itemVariants}>
            <Grid container spacing={4}>
              {education.map((edu, index) => (
                <Grid item xs={12} md={6} key={edu.id}>
                  <motion.div
                    initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card hover className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Box className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                              <School className="text-blue-600 dark:text-blue-400" />
                            </div>
                          </Box>
                          
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-2">
                              <Event className="text-gray-500 text-sm" />
                              <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                                {edu.period}
                              </Typography>
                            </div>
                            
                            <Typography variant="h6" className="font-semibold text-gray-900 dark:text-white mb-1">
                              {edu.degree} in {edu.field}
                            </Typography>
                            
                            <Typography variant="body2" className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                              {edu.institution}
                            </Typography>
                            
                            {edu.grade && (
                              <div className="flex items-center gap-2 mb-3">
                                <Award className="text-yellow-500 text-sm" />
                                <Typography variant="body2" className="text-yellow-600 dark:text-yellow-400 font-medium">
                                  {edu.grade}
                                </Typography>
                              </div>
                            )}
                            
                            {edu.description && (
                              <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-4">
                                {edu.description}
                              </Typography>
                            )}
                            
                            {edu.achievements && edu.achievements.length > 0 && (
                              <div>
                                <Typography variant="body2" className="font-medium text-gray-900 dark:text-white mb-2">
                                  Key Achievements:
                                </Typography>
                                <ul className="space-y-1">
                                  {edu.achievements.map((achievement, achIndex) => (
                                    <li key={achIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-8 p-8 glass-effect rounded-2xl">
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 dark:text-blue-400">
                  4.0
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  GPA
                </Typography>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 dark:text-blue-400">
                  15+
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  Certifications
                </Typography>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div className="text-center">
                <Typography variant="h4" className="font-bold text-blue-600 dark:text-blue-400">
                  100+
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                  Hours Learning
                </Typography>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default EducationSlice;
export type { EducationSliceProps, Education }