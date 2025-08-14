import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/lib/prismic'
import { components } from '@/slices'
import { Container, Typography, Grid, Chip, IconButton } from '@mui/material'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GitHub, ArrowBack } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'

// Fallback data for when Prismic is not available
const fallbackProjects = {
  'mui-carousel': {
    title: 'MUI Carousel Component',
    description: 'A modern, customizable carousel component for React Material-UI with TypeScript support and comprehensive demo examples.',
    longDescription: `A powerful and flexible carousel component built specifically for React Material-UI applications. This open-source project provides a highly customizable carousel with smooth animations, touch/swipe support, and comprehensive theming options.

The component is designed with developer experience in mind, offering TypeScript support, extensive customization options, and excellent documentation. It integrates seamlessly with Material-UI's theming system and follows Material Design principles.

Key features include:
- Full TypeScript support with comprehensive type definitions
- Material-UI theming integration
- Touch and swipe gesture support
- Customizable indicators and navigation
- Auto-play functionality with pause on hover
- Responsive design for all screen sizes
- Accessibility features (WCAG compliant)
- Comprehensive demo showcase

The project includes a complete demo application showcasing various configuration options and use cases. The demo is built with Next.js and deployed on GitHub Pages, demonstrating real-world implementation examples.`,
    image: '/images/projects/components.jpg',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Next.js', 'CSS-in-JS', 'GitHub Pages'],
    githubUrl: 'https://github.com/gazi786/mui-carousel',
    liveUrl: 'https://gazi786.github.io/mui-carousel/',
    category: 'Open Source Component',
    duration: '6 months',
    role: 'Lead Developer & Maintainer',
    challenges: [
      'Creating smooth touch/swipe interactions across different devices',
      'Ensuring compatibility with various Material-UI theme configurations',
      'Building comprehensive TypeScript definitions for all props',
      'Optimizing performance for large numbers of carousel items',
      'Maintaining accessibility standards while preserving visual appeal'
    ],
    outcomes: [
      'Successfully used in production applications',
      'Comprehensive demo with 10+ example configurations',
      'Full TypeScript support with zero runtime errors',
      'Touch-friendly interface with smooth gesture handling',
      'Active community feedback and feature requests'
    ]
  },
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js, featuring real-time inventory, payment integration, and admin dashboard.',
    longDescription: `This comprehensive e-commerce platform showcases modern web development practices with a focus on performance, user experience, and scalability. 

Built with Next.js 13+ and TypeScript, the platform features server-side rendering for optimal SEO and performance. The frontend utilizes Tailwind CSS for responsive design and Framer Motion for smooth animations.

Key features include:
- Real-time inventory management
- Stripe payment integration
- Admin dashboard with analytics
- Product search and filtering
- User authentication and profiles
- Order tracking and management
- Responsive design for all devices

The backend is powered by Prisma with PostgreSQL, providing type-safe database operations and efficient data management. The application is deployed on Vercel with automatic deployments from the main branch.`,
    image: '/images/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/gazi786/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    category: 'Full-Stack Web Application',
    duration: '3 months',
    role: 'Full-Stack Developer',
    challenges: [
      'Implementing real-time inventory updates across multiple user sessions',
      'Creating a secure payment flow with proper error handling',
      'Optimizing database queries for large product catalogs',
      'Building a responsive admin dashboard with complex data visualizations'
    ],
    outcomes: [
      'Achieved 95+ Lighthouse performance score',
      'Reduced page load times by 40% through optimization',
      'Successfully processed 1000+ test transactions',
      'Implemented comprehensive error handling and user feedback'
    ]
  },
  'task-management-app': {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription: `A feature-rich task management application designed for modern teams and individuals who need efficient project coordination and productivity tracking.

The application provides intuitive drag-and-drop functionality using React DnD, allowing users to easily organize tasks across different stages of completion. Real-time collaboration is enabled through Socket.io, ensuring team members see updates instantly.

Core functionality includes:
- Kanban-style task boards
- Real-time collaborative editing
- Task assignment and tracking
- Team management and permissions
- File attachments and comments
- Due date notifications
- Progress analytics and reporting
- Dark/light theme support

The backend API is built with Node.js and Express, utilizing MongoDB for flexible data storage. The real-time features are powered by Socket.io, providing seamless collaboration experiences.`,
    image: '/images/projects/taskmanager.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI', 'Express', 'JWT'],
    githubUrl: 'https://github.com/gazi786/task-manager',
    liveUrl: 'https://taskmanager-demo.netlify.app',
    category: 'Real-time Web Application',
    duration: '2 months',
    role: 'Full-Stack Developer',
    challenges: [
      'Implementing real-time synchronization across multiple users',
      'Building complex drag-and-drop interactions',
      'Managing state consistency in real-time collaborative environment',
      'Optimizing performance for large task datasets'
    ],
    outcomes: [
      'Successfully handles 100+ concurrent users',
      'Achieved sub-100ms real-time update latency',
      'Implemented comprehensive offline support',
      'Created intuitive user experience with high user satisfaction'
    ]
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = fallbackProjects[slug as keyof typeof fallbackProjects]
  
  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: `${project.title} - Alshafaraz Gazi`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `https://gazi786.github.io/projects/${params.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const client = createClient()
  
  try {
    // Try to get project from Prismic first
    const project = await client.getByUID('project', slug)
    
    return (
      <div>
        <SliceZone slices={project.data.slices} components={components} />
      </div>
    )
  } catch (error) {
    // Fallback to static data if Prismic is not available
    const fallbackProject = fallbackProjects[slug as keyof typeof fallbackProjects]
    
    if (!fallbackProject) {
      notFound()
    }

    // Render fallback project UI with Arc Reactor styling
    return (
      <div className="min-h-screen relative">
        {/* Background Tech Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <Container maxWidth="lg" className="relative z-10 py-12">
          <div className="mb-8">
            <Link href="/#projects" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors arc-reactor-btn">
              <ArrowBack className="w-4 h-4 mr-2" />
              <span>Back to Projects</span>
            </Link>
          </div>

          {/* System Status */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs jarvis-text text-cyan-400">PROJECT LOADED</span>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <div className="relative overflow-hidden">
                <Image
                  src={fallbackProject.image}
                  alt={fallbackProject.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Chip label={fallbackProject.category} className="bg-blue-600 text-white" />
                </div>
              </div>
              <CardContent className="p-8">
                <Typography variant="h3" className="font-bold mb-4 text-gray-900 dark:text-white">
                  {fallbackProject.title}
                </Typography>
                <Typography variant="body1" className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {fallbackProject.description}
                </Typography>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {fallbackProject.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      variant="outlined"
                      size="small"
                      className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {fallbackProject.githubUrl && (
                    <Button
                      href={fallbackProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<GitHub />}
                    >
                      View Code
                    </Button>
                  )}
                  {fallbackProject.liveUrl && (
                    <Button
                      href={fallbackProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>}
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <Typography variant="h5" className="font-semibold mb-6 text-gray-900 dark:text-white">
                  Project Details
                </Typography>
                <div className="prose dark:prose-invert max-w-none">
                  {fallbackProject.longDescription.split('\n\n').map((paragraph, index) => (
                    <Typography key={index} variant="body1" className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </Typography>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                      Challenges
                    </Typography>
                    <ul className="space-y-2">
                      {fallbackProject.challenges.map((challenge, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          • {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                      Outcomes
                    </Typography>
                    <ul className="space-y-2">
                      {fallbackProject.outcomes.map((outcome, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          • {outcome}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                  Project Info
                </Typography>
                <div className="space-y-3">
                  <div>
                    <Typography variant="body2" className="font-medium text-gray-500 dark:text-gray-400">
                      Duration
                    </Typography>
                    <Typography variant="body1" className="text-gray-900 dark:text-white">
                      {fallbackProject.duration}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className="font-medium text-gray-500 dark:text-gray-400">
                      Role
                    </Typography>
                    <Typography variant="body1" className="text-gray-900 dark:text-white">
                      {fallbackProject.role}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className="font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </Typography>
                    <Typography variant="body1" className="text-gray-900 dark:text-white">
                      {fallbackProject.category}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                  Technologies
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {fallbackProject.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Typography variant="h6" className="font-semibold mb-4 text-gray-900 dark:text-white">
                  Interested in Similar Work?
                </Typography>
                <Typography variant="body2" className="text-gray-700 dark:text-gray-300 mb-4">
                  I'm always open to discussing new projects and opportunities.
                </Typography>
                <Button variant="outlined" fullWidth href="/#contact">
                  Get in Touch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </Container>
      </div>
  )
  }
}

export async function generateStaticParams() {
  const client = createClient()
  
  try {
    // Try to get projects from Prismic first
    const projects = await client.getAllByType('project')
    return projects.map((project) => ({
      slug: project.uid,
    }))
  } catch (error) {
    // Fallback to static project keys
    return Object.keys(fallbackProjects).map((slug) => ({
      slug,
    }))
  }
}