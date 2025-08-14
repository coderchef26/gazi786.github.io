'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category: 'web' | 'mobile' | 'ai' | 'blockchain';
}

const Projects = ({ slice }: ProjectsProps) => {
  const [filter, setFilter] = useState<string>('all');
  const [visibleProjects, setVisibleProjects] = useState(6);

  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'AI-POWERED ANALYTICS PLATFORM',
      description: 'Advanced machine learning dashboard with real-time data processing and predictive analytics capabilities.',
      image: '/images/projects/cms.jpg',
      technologies: ['React', 'Python', 'TensorFlow', 'AWS'],
      githubUrl: 'https://github.com/gazi786',
      liveUrl: 'https://demo.com',
      featured: true,
      category: 'ai'
    },
    {
      id: '2',
      title: 'BLOCKCHAIN TRADING SYSTEM',
      description: 'Decentralized trading platform with smart contracts and real-time market analysis.',
      image: '/images/projects/ecommerce.jpg',
      technologies: ['Next.js', 'Solidity', 'Web3.js', 'Node.js'],
      githubUrl: 'https://github.com/gazi786',
      liveUrl: 'https://demo.com',
      category: 'blockchain'
    },
    {
      id: '3',
      title: 'NEURAL NETWORK VISUALIZER',
      description: 'Interactive tool for visualizing and training neural networks with real-time feedback.',
      image: '/images/projects/taskmanager.jpg',
      technologies: ['React', 'D3.js', 'PyTorch', 'FastAPI'],
      githubUrl: 'https://github.com/gazi786',
      category: 'ai'
    },
    {
      id: '4',
      title: 'QUANTUM COMPUTING SIMULATOR',
      description: 'Web-based quantum circuit simulator with advanced quantum algorithm implementations.',
      image: '/images/projects/components.jpg',
      technologies: ['TypeScript', 'WebAssembly', 'Rust', 'React'],
      githubUrl: 'https://github.com/gazi786',
      category: 'web'
    }
  ];

  const categories = ['all', 'web', 'mobile', 'ai', 'blockchain'];
  
  const filteredProjects = filter === 'all' 
    ? defaultProjects 
    : defaultProjects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="projects" 
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="relative py-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold jarvis-text glow-text mb-4">
                PROJECT ARCHIVES
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <p className="text-cyan-300/60 mt-4 max-w-2xl mx-auto">
                CLASSIFIED DEVELOPMENT PROJECTS SHOWCASING ADVANCED TECHNOLOGIES
              </p>
            </div>
          </motion.div>

          {/* Filter System */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="jarvis-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs jarvis-text text-cyan-400">FILTER MATRIX</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 text-xs jarvis-text transition-all duration-300 ${
                      filter === category
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                        : 'bg-cyan-500/5 border-cyan-500/30 text-cyan-300/60 hover:border-cyan-400/50'
                    } border rounded`}
                  >
                    {category.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="holo-card group cursor-pointer overflow-hidden"
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                      
                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4">
                          <div className="px-2 py-1 bg-cyan-500/20 border border-cyan-400/50 text-xs text-cyan-400 jarvis-text">
                            FEATURED
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold jarvis-text text-cyan-400 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-cyan-300/60 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/80 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Status Indicator */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs text-green-400 jarvis-text">OPERATIONAL</span>
                        </div>
                        <span className="text-xs text-cyan-400/60 jarvis-text">
                          {project.category.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Load More */}
          {filteredProjects.length > visibleProjects && (
            <motion.div 
              variants={itemVariants} 
              className="text-center mt-12"
            >
              <button
                onClick={() => setVisibleProjects(prev => prev + 6)}
                className="arc-reactor-btn"
              >
                LOAD MORE DATA
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;