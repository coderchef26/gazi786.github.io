"use client";

import { FC, useState, useMemo } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaStar, FaUser } from "react-icons/fa";

import SliceContainer from "@/components/slice-internals/SliceContainer";
import FilterButtons from "@/components/slice-internals/FilterButtons";
import { useSliceAtlas } from "@/hooks/useSliceAtlas";
import { componentStyles } from "@/lib/theme/components";
import { themeColors, themeEffects } from "@/lib/theme/colors";
import { animationPresets } from "@/lib/animations/slice-animations";
import { sliceHelpers } from "@/lib/utils/slice-helpers";
import HolographicCard from "@/components/ui/HolographicCard";
import HolographicText from "@/components/ui/HolographicText";

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

interface ProjectItem {
  project_title?: string;
  project_slug?: string;
  project_tagline?: string;
  project_description?: any;
  project_status?: string;
  technologies?: Array<{ tech_name?: string; tech_category?: string }>;
  live_url?: any;
  github_url?: any;
  featured_image?: any;
  client_name?: string;
  is_featured?: boolean;
  display_order?: number;
  color_scheme?: string;
  voice_summary?: string;
  ai_keywords?: string;
}

/**
 * Component for "Projects" Slices - Portfolio Projects Showcase.
 */
const Projects: FC<ProjectsProps> = ({ slice }) => {
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const { announceSlice, generateVoiceCommand } = useSliceAtlas();

  // Extract projects from Prismic
  const projects = useMemo(() => {
    if (!slice?.items) return [];
    
    return slice.items
      .filter((item: any) => item.project_title)
      .map((item: any, index: number) => ({
        project_title: sliceHelpers.extractText(item.project_title),
        project_slug: sliceHelpers.extractText(item.project_slug),
        project_tagline: sliceHelpers.extractText(item.project_tagline),
        project_description: sliceHelpers.extractRichText(item.project_description),
        project_status: sliceHelpers.extractText(item.project_status) || 'Completed',
        technologies: item.technologies || [],
        live_url: item.live_url,
        github_url: item.github_url,
        featured_image: sliceHelpers.extractImage(item.featured_image),
        client_name: sliceHelpers.extractText(item.client_name),
        is_featured: item.is_featured === true,
        display_order: item.display_order || index,
        color_scheme: sliceHelpers.extractText(item.color_scheme) || 'cyan',
        voice_summary: sliceHelpers.extractText(item.voice_summary),
        ai_keywords: sliceHelpers.extractText(item.ai_keywords)
      }))
      .sort((a, b) => {
        // Featured projects first, then by display order
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return (a.display_order || 0) - (b.display_order || 0);
      });
  }, [slice]);

  // Get unique technologies for filtering
  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies?.forEach((tech: any) => {
        if (tech.tech_name) techSet.add(tech.tech_name);
      });
    });
    return ['all', ...Array.from(techSet)];
  }, [projects]);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (selectedTech === 'all') return projects;
    return projects.filter(project => 
      project.technologies?.some((tech: any) => tech.tech_name === selectedTech)
    );
  }, [projects, selectedTech]);

  // Announce slice load for accessibility
  if (typeof window !== 'undefined' && projects.length > 0) {
    announceSlice(`Projects section loaded with ${projects.length} projects`);
    
    // Voice command for featured projects
    generateVoiceCommand("show featured projects", () => {
      const featured = projects.filter(p => p.is_featured);
      const message = `Found ${featured.length} featured projects: ${featured.map(p => p.project_title).join(', ')}`;
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      }
    });
  }

  // Get status badge color
  const getStatusColor = (status?: string) => {
    const statusMap: Record<string, string> = {
      'Completed': 'green',
      'In Progress': 'yellow',
      'Maintained': 'blue',
      'Archived': 'gray',
      'Beta': 'orange',
      'Production': 'green'
    };
    return statusMap[status || 'Completed'] || 'blue';
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceContainer
        title="Featured Projects"
        subtitle="Showcasing innovative solutions and technical excellence"
        isEmpty={projects.length === 0}
        emptyStateConfig={{
          title: 'No Projects Data',
          description: 'Projects will appear here once added.'
        }}
      >
        {/* Technology Filters */}
        {technologies.length > 2 && (
          <FilterButtons
            categories={technologies}
            activeFilter={selectedTech}
            onFilterChange={setSelectedTech}
          />
        )}

        {/* Holographic Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`project-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationPresets.cardGrid.card}
              custom={index}
              className={`group relative ${project.is_featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <HolographicCard
                variant={project.is_featured ? "elevated" : "default"}
                title={project.project_title}
                subtitle={project.project_tagline}
                className="h-full group"
              >
                {/* Featured Badge */}
                {project.is_featured && (
                  <div className="absolute top-2 right-2 z-30">
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900">
                      <FaStar className="w-3 h-3" />
                      <HolographicText variant="data" className="text-slate-900 font-mono">
                        FEATURED
                      </HolographicText>
                    </span>
                  </div>
                )}

                {/* Holographic Project Image */}
                {project.featured_image && (
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                    <img 
                      src={project.featured_image.src || '/placeholder.jpg'} 
                      alt={project.featured_image.alt || project.project_title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Holographic Overlay on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <div className="w-20 h-20 rounded-full bg-cyan-500/20 animate-pulse backdrop-blur-sm border-2 border-cyan-400/50 flex items-center justify-center">
                        <FaRocket className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Status & Info */}
                <div className="flex items-center justify-between mb-4">
                  <HolographicText variant="data">
                    PROJECT STATUS
                  </HolographicText>
                  <span className={`px-2 py-1 text-xs rounded-full bg-${getStatusColor(project.project_status)}-500/20 text-${getStatusColor(project.project_status)}-400 border border-${getStatusColor(project.project_status)}-500/30`}>
                    <HolographicText variant="caption">
                      {project.project_status}
                    </HolographicText>
                  </span>
                </div>

                {/* Project Description */}
                {project.project_description && (
                  <div className="mb-4">
                    <HolographicText variant="body" className="line-clamp-3">
                      {project.project_description}
                    </HolographicText>
                  </div>
                )}

                {/* Client Info */}
                {project.client_name && (
                  <div className="flex items-center gap-2 mb-4">
                    <FaUser className="w-3 h-3 text-cyan-400" />
                    <HolographicText variant="caption">
                      CLIENT: {project.client_name.toUpperCase()}
                    </HolographicText>
                  </div>
                )}

                {/* Technologies - Holographic Tags */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4">
                    <HolographicText variant="data" className="mb-2">
                      TECH STACK
                    </HolographicText>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech: any, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded-md bg-slate-700/50 text-cyan-300 border border-cyan-400/30 font-mono uppercase tracking-wide"
                        >
                          {tech.tech_name}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-slate-600/50 text-cyan-400/60 font-mono">
                          +{project.technologies.length - 5} MORE
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Holographic Action Links */}
                <div className="flex gap-3 pt-4 border-t border-cyan-400/30">
                  {project.live_url && (
                    <motion.a
                      href={project.live_url.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-mono font-semibold uppercase tracking-wider transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 25px rgba(0, 212, 255, 0.6)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      <HolographicText variant="command" className="text-slate-900">
                        VIEW LIVE
                      </HolographicText>
                    </motion.a>
                  )}

                  {project.github_url && (
                    <motion.a
                      href={project.github_url.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border-2 border-cyan-400 text-cyan-400 font-mono font-semibold uppercase tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: '#00d4ff',
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="w-3 h-3" />
                      <HolographicText variant="command">
                        SOURCE CODE
                      </HolographicText>
                    </motion.a>
                  )}
                  
                  {!project.live_url && !project.github_url && project.project_slug && (
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-cyan-400/60 text-cyan-400 font-mono font-semibold uppercase tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: '#00d4ff',
                        boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaRocket className="w-3 h-3" />
                      <HolographicText variant="command">
                        VIEW DETAILS
                      </HolographicText>
                    </motion.button>
                  )}
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* Show More Projects (if many) */}
        {projects.length > 6 && filteredProjects.length === projects.length && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationPresets.sliceSection.item}
            className="text-center mt-12"
          >
            <button className={`px-8 py-3 rounded-lg bg-gradient-to-r ${themeColors.primaryGradient} text-slate-900 font-semibold ${themeEffects.transition} hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105`}>
              <FaCode className="inline-block mr-2" />
              View All {projects.length} Projects
            </button>
          </motion.div>
        )}
      </SliceContainer>
    </section>
  );
};

export default Projects;