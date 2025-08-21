"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import Link from "next/link";

/**
 * Props for `ProjectsCollection`.
 */
export type ProjectsCollectionProps =
  SliceComponentProps<Content.ProjectsCollectionSlice>;

interface ProjectCollectionItem {
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
 * Component for "ProjectsCollection" Slices - Collection of Projects with Repeatable Zones.
 */
const ProjectsCollection: FC<ProjectsCollectionProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [projects, setProjects] = useState<ProjectCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Extract projects from Prismic repeatable zones
  useEffect(() => {
    const extractProjectsFromCollection = () => {
      const projectsData: ProjectCollectionItem[] = [];
      
      // Handle repeatable zones (items array)
      if (slice.items && Array.isArray(slice.items)) {
        slice.items.forEach((item: any, index) => {
          if (item.project_title) {
            projectsData.push({
              project_title: item.project_title,
              project_slug: item.project_slug,
              project_tagline: item.project_tagline,
              project_description: item.project_description,
              project_status: item.project_status || 'Completed',
              technologies: item.technologies || [],
              live_url: item.live_url,
              github_url: item.github_url,
              featured_image: item.featured_image,
              client_name: item.client_name,
              is_featured: item.is_featured === 'true' || item.is_featured === true,
              display_order: item.display_order || index,
              color_scheme: item.color_scheme || 'Cyan',
              voice_summary: item.voice_summary,
              ai_keywords: item.ai_keywords
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

    extractProjectsFromCollection();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && projects.length > 0) {
      const projectCount = projects.length;
      const featuredCount = projects.filter(p => p.is_featured).length;
      const message = `Projects collection loaded. ${projectCount} projects in this collection${featuredCount > 0 ? `, including ${featuredCount} featured projects` : ''}.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Projects collection showcasing ${projectCount} carefully curated projects that demonstrate technical expertise across various domains.`);
      }

      // Register voice commands for collection projects
      projects.forEach((project, index) => {
        const commands = [
          `show me ${project.project_title}`,
          `tell me about ${project.project_title}`,
          `collection project ${index + 1}`,
        ];
      });
    }
  }, [isLoading, projects, announce, speak, config.assistant.autoSpeak]);

  // Handle project interaction
  const handleProjectClick = (project: ProjectCollectionItem) => {
    const voiceMsg = project.voice_summary || 
      `${project.project_title}: ${project.project_tagline || 'A development project'}. Status: ${project.project_status}.`;
    
    announce(`Selected ${project.project_title} from collection. ${voiceMsg}`);
    
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
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading projects collection...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
      aria-labelledby="projects-collection-heading"
    >
      {/* Skip Link */}
      <a 
        href="#next-section" 
        className="atlas-skip-link"
        onClick={() => announce('Navigating to next section')}
      >
        Skip projects collection
      </a>

      <div className="container mx-auto px-4">
        {/* Collection Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            id="projects-collection-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects Collection
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A curated collection of standout projects showcasing innovation and technical mastery
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

        {/* Projects Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`collection-${project.project_title}-${index}`}
              className={`group cursor-pointer ${
                project.is_featured ? 'md:col-span-2 xl:col-span-2' : ''
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
              aria-label={`Collection project: ${project.project_title}. ${project.project_tagline || ''}`}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden h-full transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                {/* Featured Badge */}
                {project.is_featured && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-sm font-bold px-4 py-2 rounded-full">
                    Featured
                  </div>
                )}

                {/* Project Image */}
                {project.featured_image?.url && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.featured_image.url}
                      alt={project.featured_image.alt || project.project_title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6">
                  {/* Project Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                      {project.project_title}
                    </h3>
                    {project.project_tagline && (
                      <p className="text-cyan-400 text-sm font-medium mb-2">
                        {project.project_tagline}
                      </p>
                    )}
                    
                    {/* Status & Client */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.project_status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        project.project_status === 'In-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                        project.project_status === 'Maintained' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {project.project_status}
                      </span>
                      {project.client_name && (
                        <span className="text-slate-400 text-xs">
                          {project.client_name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {project.project_description && (
                    <div className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {typeof project.project_description === 'string' 
                        ? project.project_description
                        : 'Detailed project description available'
                      }
                    </div>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          tech.tech_name && (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-md text-xs border border-slate-600"
                            >
                              {tech.tech_name}
                            </span>
                          )
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-md text-xs">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {project.live_url?.url && (
                      <Link
                        href={project.live_url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 px-4 py-2 bg-gradient-to-r ${getColorScheme(project.color_scheme || 'Cyan')} text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 text-center`}
                        onClick={(e) => {
                          e.stopPropagation();
                          announce(`Opening live demo for ${project.project_title}`);
                        }}
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.github_url?.url && (
                      <Link
                        href={project.github_url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-slate-600 text-slate-300 text-sm font-semibold rounded-lg transition-all duration-300 hover:border-cyan-500 hover:text-cyan-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          announce(`Opening GitHub repository for ${project.project_title}`);
                        }}
                      >
                        Code
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
              No projects found in this collection matching the selected filter.
            </p>
            <button
              onClick={() => setSelectedFilter('all')}
              className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Show All Collection Projects
            </button>
          </motion.div>
        )}

        {/* Collection Summary for Screen Readers */}
        <div className="atlas-sr-only" aria-live="polite">
          Projects collection showing {filteredProjects.length} projects
          {selectedFilter !== 'all' && ` filtered by ${selectedFilter}`}.
          Use tab to navigate through collection items and press Enter for details.
        </div>
      </div>
    </section>
  );
};

export default ProjectsCollection;
