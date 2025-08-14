'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import EnhancedArcReactor from '@/components/effects/EnhancedArcReactor';

export type EducationProps = SliceComponentProps<Content.EducationSlice>;

interface EducationData {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  status: 'completed' | 'in-progress' | 'ongoing';
  grade?: string;
  description: string;
  achievements: string[];
  type: 'formal' | 'certification' | 'self-study' | 'workshop';
  color: string;
  icon: string;
}

const Education = ({ slice }: EducationProps): JSX.Element => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const educationData: EducationData[] = [
    {
      id: '1',
      institution: 'ADVANCED COMPUTER INSTITUTE',
      degree: 'BACHELOR OF TECHNOLOGY',
      field: 'COMPUTER SCIENCE & ENGINEERING',
      period: '2018 - 2022',
      status: 'completed',
      grade: 'FIRST CLASS HONORS - 8.5/10 CGPA',
      description: 'Specialized in advanced algorithms, data structures, software engineering, and system architecture. Focus on full-stack development and distributed systems.',
      achievements: [
        'Dean\'s List for academic excellence',
        'Led final year project team of 6 developers',
        'Published research on web optimization techniques',
        'Winner of inter-college coding competition'
      ],
      type: 'formal',
      color: '#00d4ff',
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
    },
    {
      id: '2',
      institution: 'AWS CERTIFICATION',
      degree: 'AWS SOLUTIONS ARCHITECT',
      field: 'CLOUD INFRASTRUCTURE',
      period: '2023',
      status: 'completed',
      grade: 'PROFESSIONAL LEVEL',
      description: 'Advanced cloud architecture design, deployment strategies, and scalable infrastructure management across AWS services.',
      achievements: [
        'Passed with 95% score',
        'Implemented 10+ production architectures',
        'Cost optimization expertise gained'
      ],
      type: 'certification',
      color: '#26de81',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    },
    {
      id: '3',
      institution: 'GOOGLE DEVELOPERS',
      degree: 'TENSORFLOW DEVELOPER CERTIFICATE',
      field: 'MACHINE LEARNING',
      period: '2023',
      status: 'completed',
      grade: 'CERTIFIED',
      description: 'Advanced machine learning model development, neural networks, and AI implementation using TensorFlow and related technologies.',
      achievements: [
        'Developed 5 production ML models',
        'Image recognition system implementation',
        'Natural language processing expertise'
      ],
      type: 'certification',
      color: '#26de81',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
    },
    {
      id: '4',
      institution: 'MIT OPENCOURSEWARE',
      degree: 'ADVANCED ALGORITHMS',
      field: 'COMPUTER SCIENCE',
      period: '2022',
      status: 'completed',
      description: 'Self-directed study of advanced algorithmic concepts, complexity theory, and optimization techniques from MIT curriculum.',
      achievements: [
        'Completed all course assignments',
        'Implemented advanced data structures',
        'Algorithm optimization projects'
      ],
      type: 'self-study',
      color: '#ff6b6b',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
    },
    {
      id: '5',
      institution: 'BLOCKCHAIN ACADEMY',
      degree: 'ETHEREUM DEVELOPMENT BOOTCAMP',
      field: 'BLOCKCHAIN TECHNOLOGY',
      period: '2024',
      status: 'ongoing',
      description: 'Intensive program covering smart contracts, DApp development, and decentralized finance protocols.',
      achievements: [
        'Built 3 functional DApps',
        'Smart contract security auditing',
        'DeFi protocol implementation'
      ],
      type: 'workshop',
      color: '#ffa502',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z'
    }
  ];

  const filters = [
    { id: 'all', name: 'ALL MODULES', color: '#00d4ff' },
    { id: 'formal', name: 'FORMAL EDUCATION', color: '#00d4ff' },
    { id: 'certification', name: 'CERTIFICATIONS', color: '#26de81' },
    { id: 'self-study', name: 'SELF-STUDY', color: '#ff6b6b' },
    { id: 'workshop', name: 'WORKSHOPS', color: '#ffa502' }
  ];

  const filteredEducation = activeFilter === 'all' 
    ? educationData 
    : educationData.filter(edu => edu.type === activeFilter);

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
      id="education" 
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="relative py-20 overflow-hidden"
    >
      {/* Background Neural Network Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Cline x1='30' y1='30' x2='45' y2='15'/%3E%3Cline x1='30' y1='30' x2='15' y2='45'/%3E%3Cline x1='30' y1='30' x2='45' y2='45'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

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
                NEURAL LEARNING MATRIX
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />
              <p className="text-cyan-300/60 max-w-2xl mx-auto">
                CONTINUOUS KNOWLEDGE ACQUISITION & SKILL ENHANCEMENT PROTOCOLS
              </p>
            </div>
          </motion.div>

          {/* Learning Modules Filter */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="jarvis-panel p-6">
              <div className="flex items-center gap-2 mb-4">
                <EnhancedArcReactor size="sm" powerLevel={85} className="scale-75" />
                <span className="text-sm jarvis-text text-cyan-400">LEARNING MODULES</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 text-xs jarvis-text transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'holo-card bg-cyan-500/20 border-cyan-400 text-cyan-400'
                        : 'holo-card bg-cyan-500/5 border-cyan-500/30 text-cyan-300/60'
                    }`}
                    style={{
                      borderColor: activeFilter === filter.id ? filter.color : undefined
                    }}
                  >
                    {filter.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-400 opacity-30" />
              
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {filteredEducation.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-start gap-6"
                    >
                      {/* Timeline Node */}
                      <div className="relative z-10">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                          className="w-16 h-16 flex items-center justify-center"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center relative"
                            style={{ backgroundColor: `${edu.color}20`, border: `2px solid ${edu.color}` }}
                          >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill={edu.color}>
                              <path d={edu.icon} />
                            </svg>
                          </div>
                        </motion.div>
                      </div>

                      {/* Education Content */}
                      <motion.div
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex-1 jarvis-panel group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: edu.color }}
                              />
                              <span className="text-xs jarvis-text text-cyan-400">{edu.period}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                edu.status === 'completed' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : edu.status === 'ongoing'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {edu.status.toUpperCase()}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold jarvis-text mb-1" style={{ color: edu.color }}>
                              {edu.degree}
                            </h3>
                            <div className="text-sm text-cyan-300/80 mb-1">{edu.field}</div>
                            <div className="text-sm text-cyan-300/60 mb-3">{edu.institution}</div>
                            {edu.grade && (
                              <div className="text-sm text-yellow-400 mb-3 jarvis-text">
                                📊 {edu.grade}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-cyan-400/60 jarvis-text uppercase">
                              {edu.type}
                            </div>
                          </div>
                        </div>

                        <p className="text-cyan-300/70 mb-4 leading-relaxed">
                          {edu.description}
                        </p>

                        {/* Achievements */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold jarvis-text text-cyan-400">KEY ACHIEVEMENTS:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {edu.achievements.map((achievement, achIndex) => (
                              <motion.div
                                key={achIndex}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: achIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-2"
                              >
                                <div 
                                  className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                  style={{ backgroundColor: edu.color }}
                                />
                                <span className="text-sm text-cyan-300/60">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Learning Statistics */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="jarvis-panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <EnhancedArcReactor size="md" powerLevel={95} className="scale-75" />
                <div>
                  <h3 className="text-xl font-bold jarvis-text text-cyan-400">LEARNING ANALYTICS</h3>
                  <p className="text-sm text-cyan-300/60">Comprehensive knowledge acquisition metrics</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'FORMAL DEGREES', value: '1', color: '#00d4ff' },
                  { label: 'CERTIFICATIONS', value: '8+', color: '#26de81' },
                  { label: 'LEARNING HOURS', value: '2000+', color: '#ff6b6b' },
                  { label: 'SKILL MASTERY', value: '95%', color: '#ffa502' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold jarvis-text mb-2" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-cyan-400/60 jarvis-text">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;