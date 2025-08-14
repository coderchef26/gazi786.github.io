'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import EnhancedArcReactor from '@/components/effects/EnhancedArcReactor';

export type SkillsProps = SliceComponentProps<Content.SkillsSlice>;

interface SkillData {
  name: string;
  level: number;
  category: 'primary' | 'secondary' | 'auxiliary' | 'experimental';
  description: string;
  icon: string;
  color: string;
}

const Skills = ({ slice }: SkillsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const skillsData: SkillData[] = [
    // Primary Systems
    { name: 'REACT.JS', level: 95, category: 'primary', description: 'Advanced component architecture', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#00d4ff' },
    { name: 'NEXT.JS', level: 92, category: 'primary', description: 'Full-stack React framework', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#00d4ff' },
    { name: 'TYPESCRIPT', level: 90, category: 'primary', description: 'Type-safe JavaScript', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#00d4ff' },
    { name: 'NODE.JS', level: 88, category: 'primary', description: 'Server-side JavaScript runtime', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#00d4ff' },
    
    // Secondary Systems
    { name: 'PYTHON', level: 85, category: 'secondary', description: 'AI/ML development', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', color: '#26de81' },
    { name: 'POSTGRESQL', level: 82, category: 'secondary', description: 'Advanced database systems', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', color: '#26de81' },
    { name: 'DOCKER', level: 78, category: 'secondary', description: 'Containerization platform', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', color: '#26de81' },
    { name: 'AWS', level: 75, category: 'secondary', description: 'Cloud infrastructure', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', color: '#26de81' },
    
    // Auxiliary Systems
    { name: 'GRAPHQL', level: 72, category: 'auxiliary', description: 'Query language for APIs', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#ff6b6b' },
    { name: 'MONGODB', level: 70, category: 'auxiliary', description: 'NoSQL database', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#ff6b6b' },
    { name: 'REDIS', level: 68, category: 'auxiliary', description: 'In-memory data store', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#ff6b6b' },
    { name: 'FIGMA', level: 65, category: 'auxiliary', description: 'UI/UX design platform', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#ff6b6b' },
    
    // Experimental Systems
    { name: 'BLOCKCHAIN', level: 60, category: 'experimental', description: 'Decentralized technologies', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z', color: '#ffa502' },
    { name: 'AI/ML', level: 58, category: 'experimental', description: 'Machine learning algorithms', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z', color: '#ffa502' },
    { name: 'WEBASSEMBLY', level: 55, category: 'experimental', description: 'High-performance web apps', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z', color: '#ffa502' },
    { name: 'QUANTUM', level: 45, category: 'experimental', description: 'Quantum computing concepts', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z', color: '#ffa502' },
  ];

  const categories = [
    { id: 'all', name: 'ALL SYSTEMS', color: '#00d4ff' },
    { id: 'primary', name: 'PRIMARY', color: '#00d4ff' },
    { id: 'secondary', name: 'SECONDARY', color: '#26de81' },
    { id: 'auxiliary', name: 'AUXILIARY', color: '#ff6b6b' },
    { id: 'experimental', name: 'EXPERIMENTAL', color: '#ffa502' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

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
      id="skills" 
      data-slice-type={slice?.slice_type}
      data-slice-variation={slice?.variation}
      className="relative py-20 overflow-hidden"
    >
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='1'%3E%3Cpath d='M40 20l20 20-20 20-20-20z'/%3E%3Cpath d='M20 40h40M40 20v40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
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
                POWER ALLOCATION MATRIX
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />
              <p className="text-cyan-300/60 max-w-2xl mx-auto">
                ADVANCED TECHNOLOGY SYSTEMS & OPERATIONAL CAPABILITIES
              </p>
            </div>
          </motion.div>

          {/* System Categories Filter */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="jarvis-panel p-6">
              <div className="flex items-center gap-2 mb-4">
                <EnhancedArcReactor size="sm" powerLevel={100} className="scale-75" />
                <span className="text-sm jarvis-text text-cyan-400">SYSTEM CATEGORIES</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 text-xs jarvis-text transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'holo-card bg-cyan-500/20 border-cyan-400 text-cyan-400'
                        : 'holo-card bg-cyan-500/5 border-cyan-500/30 text-cyan-300/60'
                    }`}
                    style={{
                      borderColor: activeCategory === category.id ? category.color : undefined
                    }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="wait">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="jarvis-panel group cursor-pointer relative"
                  >
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 relative">
                          <div 
                            className="absolute inset-0 rounded-full blur-lg group-hover:blur-xl transition-all"
                            style={{ backgroundColor: `${skill.color}40` }}
                          />
                          <svg className="w-full h-full relative z-10" viewBox="0 0 24 24" fill={skill.color}>
                            <path d={skill.icon} />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold jarvis-text" style={{ color: skill.color }}>
                            {skill.name}
                          </h3>
                          <p className="text-xs text-cyan-300/40">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-lg font-bold jarvis-text" style={{ color: skill.color }}>
                        {skill.level}%
                      </div>
                    </div>

                    {/* Power Bar */}
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-cyan-900/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`
                          }}
                        />
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-1">
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: skill.color }}
                          />
                          <span className="text-cyan-400/60 jarvis-text">OPERATIONAL</span>
                        </div>
                        <span className="text-cyan-400/40 jarvis-text uppercase">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* System Summary */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="jarvis-panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <EnhancedArcReactor size="md" powerLevel={92} className="scale-75" />
                <div>
                  <h3 className="text-xl font-bold jarvis-text text-cyan-400">OVERALL SYSTEM EFFICIENCY</h3>
                  <p className="text-sm text-cyan-300/60">Aggregate performance across all operational systems</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(1).map((category, index) => {
                  const categorySkills = skillsData.filter(skill => skill.category === category.id);
                  const avgLevel = Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length);
                  
                  return (
                    <div key={category.id} className="text-center">
                      <div className="text-2xl font-bold jarvis-text mb-1" style={{ color: category.color }}>
                        {avgLevel}%
                      </div>
                      <div className="text-xs text-cyan-400/60 jarvis-text">
                        {category.name} SYSTEMS
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;