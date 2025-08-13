'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Typography, Container, Grid, Box, LinearProgress } from '@mui/material'
import { Card, CardContent } from '@/components/ui/Card'

export interface Skill {
  name: string
  level: number
  icon?: React.ReactNode
}

export interface SkillCategory {
  title: string
  skills: Skill[]
  color: string
}

export interface SkillsSliceProps {
  title?: string
  subtitle?: string
  categories?: SkillCategory[]
}

const defaultCategories: SkillCategory[] = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Material-UI", level: 80 },
      { name: "Framer Motion", level: 75 }
    ]
  },
  {
    title: "Backend",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 75 },
      { name: "Redis", level: 70 }
    ]
  },
  {
    title: "DevOps & Tools",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS", level: 75 },
      { name: "Git", level: 95 },
      { name: "CI/CD", level: 70 },
      { name: "Linux", level: 80 },
      { name: "Nginx", level: 65 }
    ]
  },
  {
    title: "Design & Others",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Figma", level: 70 },
      { name: "Adobe XD", level: 65 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
      { name: "Jest", level: 80 },
      { name: "Agile", level: 85 }
    ]
  }
]

export const SkillsSlice: React.FC<SkillsSliceProps> = ({
  title = "Skills & Technologies",
  subtitle = "Technologies I work with and tools I use to bring ideas to life",
  categories = defaultCategories
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

  const skillVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  }

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-900">
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

          <Grid container spacing={4}>
            {categories.map((category, categoryIndex) => (
              <Grid item xs={12} md={6} key={categoryIndex}>
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-6">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color} mr-3`} />
                        <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </Typography>
                      </div>
                      
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.1 }}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <Typography variant="body2" className="font-medium text-gray-800 dark:text-gray-200">
                                {skill.name}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600 dark:text-gray-400 font-medium">
                                {skill.level}%
                              </Typography>
                            </div>
                            
                            <div className="relative">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${category.color} rounded-full origin-left`}
                                  initial={{ scaleX: 0 }}
                                  whileInView={{ scaleX: skill.level / 100 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 1.5, 
                                    ease: "easeOut",
                                    delay: skillIndex * 0.1 + 0.3
                                  }}
                                />
                              </div>
                              
                              <motion.div
                                className="absolute -top-8 bg-gray-800 dark:bg-white text-white dark:text-gray-800 text-xs px-2 py-1 rounded shadow-lg"
                                style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: skillIndex * 0.1 + 1.8
                                }}
                              >
                                {skill.level}%
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800 dark:border-t-white" />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-4 p-6 glass-effect rounded-2xl">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Git'].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full border border-blue-200 dark:border-blue-800"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Typography variant="body2" className="font-medium text-gray-700 dark:text-gray-300">
                    {tech}
                  </Typography>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}