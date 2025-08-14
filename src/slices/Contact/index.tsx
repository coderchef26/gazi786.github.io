'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, Container, Grid, TextField, Alert, Snackbar } from '@mui/material'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Mail, Phone, MapPin, Send, GitHub, LinkedIn, Twitter } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type ContactForm = z.infer<typeof contactSchema>

export interface ContactSliceProps {
  title?: string
  subtitle?: string
  contactInfo?: {
    email: string
    phone: string
    location: string
  }
  socialLinks?: {
    github: string
    linkedin: string
    twitter: string
  }
}

const ContactSlice: React.FC<ContactSliceProps> = ({
  title = "Let's Work Together",
  subtitle = "I'm always interested in new opportunities and exciting projects. Let's discuss how we can collaborate!",
  contactInfo = {
    email: "alshafaraz.gazi@gmail.com",
    phone: "Available on request",
    location: "Available globally (Remote)"
  },
  socialLinks = {
    github: "https://github.com/gazi786",
    linkedin: "https://linkedin.com/in/alshafaraz-gazi",
    twitter: "https://twitter.com/yourusername"
  }
}) => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      // Using Formspree for free form handling
      // You can also use EmailJS, Netlify Forms, or Vercel Forms
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      })

      if (response.ok) {
        setAlertType('success')
        setAlertMessage('Message sent successfully! I\'ll get back to you soon.')
        reset()
      } else {
        throw new Error('Failed to send message')
      }
      
      setShowAlert(true)
    } catch (error) {
      console.error('Form submission error:', error)
      setAlertType('error')
      setAlertMessage('Failed to send message. Please try again or contact me directly.')
      setShowAlert(true)
    }
  }

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

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: contactInfo.location,
      href: "#"
    }
  ]

  const socialPlatforms = [
    {
      icon: <GitHub className="w-6 h-6" />,
      label: "GitHub",
      href: socialLinks.github
    },
    {
      icon: <LinkedIn className="w-6 h-6" />,
      label: "LinkedIn",
      href: socialLinks.linkedin
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: "Twitter",
      href: socialLinks.twitter
    }
  ]

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-800">
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

          <Grid container spacing={6}>
            <Grid item xs={12} lg={8}>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent className="p-8">
                    <Typography variant="h5" className="font-semibold mb-6 text-gray-900 dark:text-white">
                      Send me a message
                    </Typography>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            {...register('name')}
                            label="Full Name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            {...register('email')}
                            label="Email Address"
                            type="email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            {...register('subject')}
                            label="Subject"
                            fullWidth
                            error={!!errors.subject}
                            helperText={errors.subject?.message}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            {...register('message')}
                            label="Message"
                            multiline
                            rows={4}
                            fullWidth
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg"
                          />
                        </Grid>
                      </Grid>
                      
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          size="large"
                          disabled={isSubmitting}
                          className="px-8 py-3 min-w-[140px]"
                        >
                          {isSubmitting ? 'Sending...' : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={4}>
              <div className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Contact Information
                      </Typography>
                      <div className="space-y-4">
                        {contactMethods.map((method, index) => (
                          <motion.a
                            key={index}
                            href={method.href}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                              {method.icon}
                            </div>
                            <div>
                              <Typography variant="body2" className="font-medium text-gray-900 dark:text-white">
                                {method.label}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                                {method.value}
                              </Typography>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                        Follow Me
                      </Typography>
                      <div className="flex space-x-4">
                        {socialPlatforms.map((platform, index) => (
                          <motion.a
                            key={index}
                            href={platform.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {platform.icon}
                          </motion.a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={alertType}
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </section>
  )
}

export default ContactSlice;