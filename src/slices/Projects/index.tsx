"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import { AnimatedContent } from "./AnimatedContent";
import Link from "next/link";

/**
 * Props for `Projects`.
 */
export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

interface ProjectData {
  project_title: string;
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
 * Component for "Projects" Slices - ATLAS Enhanced.
 */
const Projects: FC<ProjectsProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Extract projects from Prismic data structure
  useEffect(() => {
    const extractProjectsData = () => {
      const projectsData: ProjectData[] = [];
      
      // Handle current individual field structure (temporary until restructure)
      if (slice.primary && 'project_title' in slice.primary) {
        const primaryData = slice.primary as any;
        if (primaryData.project_title) {
          projectsData.push({
            project_title: primaryData.project_title,
            project_slug: primaryData.project_slug,
            project_tagline: primaryData.project_tagline,
            project_description: primaryData.project_description,
            project_status: primaryData.project_status || 'Completed',
            technologies: primaryData.technologies || [],
            live_url: primaryData.live_url,
            github_url: primaryData.github_url,
            featured_image: primaryData.featured_image,
            client_name: primaryData.client_name,
            is_featured: primaryData.is_featured === 'true' || primaryData.is_featured === true,
            display_order: primaryData.display_order || 0,
            color_scheme: primaryData.color_scheme || 'Cyan',
            voice_summary: primaryData.voice_summary,
            ai_keywords: primaryData.ai_keywords
          });
        }
      }
      
      // Handle future repeatable group structure
      if (slice.primary && 'project' in slice.primary && Array.isArray(slice.primary.project)) {
        const projectGroups = slice.primary.project as any[];
        projectGroups.forEach((project, index) => {
          if (project.project_title) {
            projectsData.push({
              project_title: project.project_title,
              project_slug: project.project_slug,
              project_tagline: project.project_tagline,
              project_description: project.project_description,
              project_status: project.project_status || 'Completed',
              technologies: project.technologies || [],
              live_url: project.live_url,
              github_url: project.github_url,
              featured_image: project.featured_image,
              client_name: project.client_name,
              is_featured: project.is_featured === 'true' || project.is_featured === true,
              display_order: project.display_order || index,
              color_scheme: project.color_scheme || 'Cyan',
              voice_summary: project.voice_summary,
              ai_keywords: project.ai_keywords
            });
          }
        });
      }
      
      // Sort by featured status and display order
      projectsData.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        return (a.display_order || 0) - (b.display_order || 0);
      });
      
      setProjects(projectsData);
      setIsLoading(false);
    };

    extractProjectsData();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && projects.length > 0) {
      const projectCount = projects.length;
      const featuredCount = projects.filter(p => p.is_featured).length;
      const message = `Projects portfolio loaded. ${projectCount} projects total${featuredCount > 0 ? `, including ${featuredCount} featured projects` : ''}.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Welcome to the projects showcase. Here you'll find ${projectCount} carefully selected projects that demonstrate my technical expertise and problem-solving abilities.`);
      }

      // Register voice commands for projects
      const registerVoiceCommands = () => {
        projects.forEach((project, index) => {
          // Register project-specific voice commands
          const commands = [
            `show me ${project.project_title}`,
            `tell me about ${project.project_title}`,
            `open ${project.project_title}`,
            `project ${index + 1}`,
            `${project.project_title}`
          ];
          
          // You can add global command listeners here if needed
          // This is a placeholder for potential future voice command registration
        });
      };

      registerVoiceCommands();
    }
  }, [isLoading, projects, announce, speak, config.assistant.autoSpeak]);

  // Handle project interaction
  const handleProjectClick = (project: ProjectData) => {
    const voiceMsg = project.voice_summary || 
      `${project.project_title}: ${project.project_tagline || 'A development project'}. Status: ${project.project_status}.`;
    
    announce(`Selected ${project.project_title}. ${voiceMsg}`);
    
    if (config.assistant.autoSpeak) {
      speak(voiceMsg);
    }
  };

  // Get unique technologies for filtering
  const allTechnologies = [...new Set(
    projects.flatMap(p => p.technologies?.map(t => t.tech_name).filter((name): name is string => !!name) || [])
  )];

  // Filter projects by technology
  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.technologies?.some(tech => tech.tech_name === selectedFilter)
      );

  // Get color scheme for project
  const getColorScheme = (scheme: string) => {
    const schemes = {
      'Cyan': 'from-cyan-500 to-blue-500',
      'Blue': 'from-blue-500 to-indigo-500',
      'Purple': 'from-purple-500 to-pink-500',
      'Green': 'from-green-500 to-emerald-500'
    };
    return schemes[scheme as keyof typeof schemes] || schemes.Cyan;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading project portfolio...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatedContent>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
        aria-labelledby="projects-heading"
      >
        {/* Skip Link */}
        <a 
          href="#skills" 
          className="atlas-skip-link"
          onClick={() => announce('Navigating to skills section')}
        >
          Skip to skills
        </a>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Project Portfolio
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Innovative solutions and technical excellence across diverse domains
            </p>
          </motion.div>

          {/* Technology Filters */}
          {allTechnologies.length > 0 && (
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === 'all'
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                }`}
                aria-pressed={selectedFilter === 'all'}
              >
                All Projects
              </button>
              {allTechnologies.slice(0, 6).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedFilter(tech)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedFilter === tech
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                  }`}
                  aria-pressed={selectedFilter === tech}
                >
                  {tech}
                </button>
              ))}
            </motion.div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.project_title}-${index}`}
                className={`group cursor-pointer ${
                  project.is_featured ? 'lg:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleProjectClick(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Project: ${project.project_title}. ${project.project_tagline || ''}`}
              >
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-sm font-bold px-4 py-2 rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Project Image */}
                  {project.featured_image?.url && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.featured_image.url}
                        alt={project.featured_image.alt || project.project_title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-8">
                    {/* Project Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-3 font-orbitron">
                        {project.project_title}
                      </h3>
                      {project.project_tagline && (
                        <p className="text-cyan-400 text-lg font-medium mb-3">
                          {project.project_tagline}
                        </p>
                      )}
                      
                      {/* Status Badge */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.project_status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          project.project_status === 'In-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          project.project_status === 'Maintained' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {project.project_status}
                        </span>
                        {project.client_name && (
                          <span className="text-slate-400 text-sm">
                            Client: {project.client_name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {project.project_description && (
                      <div className="text-slate-300 leading-relaxed mb-6">
                        {typeof project.project_description === 'string' 
                          ? project.project_description
                          : 'Detailed project description available'
                        }
                      </div>
                    )}

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            tech.tech_name && (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-sm border border-slate-600 hover:border-cyan-500/50 transition-colors"
                              >
                                {tech.tech_name}
                              </span>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {project.live_url?.url && (
                        <Link
                          href={project.live_url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 px-6 py-3 bg-gradient-to-r ${getColorScheme(project.color_scheme || 'Cyan')} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 text-center`}
                          onClick={(e) => {
                            e.stopPropagation();
                            announce(`Opening live demo for ${project.project_title}`);
                          }}
                        >
                          View Live Demo
                        </Link>
                      )}
                      {project.github_url?.url && (
                        <Link
                          href={project.github_url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg transition-all duration-300 hover:border-cyan-500 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            announce(`Opening GitHub repository for ${project.project_title}`);
                          }}
                        >
                          View Code
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getColorScheme(project.color_scheme || 'Cyan')} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-slate-400 text-lg">
                No projects found matching the selected technology filter.
              </p>
              <button
                onClick={() => setSelectedFilter('all')}
                className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                Show All Projects
              </button>
            </motion.div>
          )}

          {/* Section Summary for Screen Readers */}
          <div className="atlas-sr-only" aria-live="polite">
            Showing {filteredProjects.length} projects
            {selectedFilter !== 'all' && ` filtered by ${selectedFilter}`}.
            Use tab to navigate through projects and press Enter for details.
          </div>
        </div>
      </section>
    </AnimatedContent>
  );
};

export default Projects;