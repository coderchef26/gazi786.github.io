"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import Link from "next/link";

/**
 * Props for `Skills`.
 */
export type SkillsProps =
  SliceComponentProps<Content.SkillsSlice>;

interface SkillItem {
  skill_name?: string;
  skill_category?: string;
  skill_type?: string;
  proficiency_level?: string;
  proficiency_percentage?: number;
  years_experience?: number;
  skill_icon?: string;
  display_order?: number;
  colour_hex?: string;
  is_featured?: boolean;
  skill_description?: any;
  use_cases?: any;
  certifications?: string;
  certification_url?: any;
  projects_count?: number;
  related_projects?: Array<{ project_name?: string; project_link?: any }>;
  professional_usage?: any;
  learning_source?: string;
  currently_learning?: boolean;
  next_milestone?: string;
  voice_description?: string;
  skill_keywords?: string;
  importance_rank?: number;
  skill_aliases?: string;
  environment?: string;
}

/**
 * Component for "SkillsCollection" Slices - Collection of Skills with Repeatable Zones.
 */
const Skills: FC<SkillsProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [skills, setSkills] = useState<SkillCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract skills from Prismic repeatable zones
  useEffect(() => {
    const extractSkillsFromCollection = () => {
      const skillsData: SkillCollectionItem[] = [];
      
      // Handle repeatable zones (items array)
      if (slice.items && Array.isArray(slice.items)) {
        slice.items.forEach((item: any, index) => {
          if (item.skill_name) {
            skillsData.push({
              skill_name: item.skill_name,
              skill_category: item.skill_category,
              skill_type: item.skill_type,
              proficiency_level: item.proficiency_level,
              proficiency_percentage: item.proficiency_percentage,
              years_experience: item.years_experience,
              skill_icon: item.skill_icon,
              display_order: item.display_order || index,
              colour_hex: item.colour_hex,
              is_featured: item.is_featured === true,
              skill_description: item.skill_description,
              use_cases: item.use_cases,
              certifications: item.certifications,
              certification_url: item.certification_url,
              projects_count: item.projects_count,
              related_projects: item.related_projects || [],
              professional_usage: item.professional_usage,
              learning_source: item.learning_source,
              currently_learning: item.currently_learning === true,
              next_milestone: item.next_milestone,
              voice_description: item.voice_description,
              skill_keywords: item.skill_keywords,
              importance_rank: item.importance_rank,
              skill_aliases: item.skill_aliases,
              environment: item.environment
            });
          }
        });
      }
      
      // Sort by featured status, importance rank, and display order
      skillsData.sort((a, b) => {
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        if ((a.importance_rank || 0) !== (b.importance_rank || 0)) {
          return (b.importance_rank || 0) - (a.importance_rank || 0);
        }
        return (a.display_order || 0) - (b.display_order || 0);
      });
      
      setSkills(skillsData);
      setIsLoading(false);
    };

    extractSkillsFromCollection();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && skills.length > 0) {
      const skillCount = skills.length;
      const featuredCount = skills.filter(s => s.is_featured).length;
      const categories = [...new Set(skills.map(s => s.skill_category))].filter(Boolean);
      const message = `Skills collection loaded. ${skillCount} skills across ${categories.length} categories${featuredCount > 0 ? `, including ${featuredCount} featured skills` : ''}.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Skills collection showcasing ${skillCount} technical competencies across ${categories.length} different categories including ${categories.slice(0, 3).join(', ')}.`);
      }

      // Register voice commands for collection skills
      skills.forEach((skill, index) => {
        const commands = [
          `show me ${skill.skill_name}`,
          `tell me about ${skill.skill_name}`,
          `skill ${index + 1}`,
        ];
        if (skill.skill_aliases) {
          commands.push(`show me ${skill.skill_aliases}`);
        }
      });
    }
  }, [isLoading, skills, announce, speak, config.assistant.autoSpeak]);

  // Handle skill interaction
  const handleSkillClick = (skill: SkillCollectionItem) => {
    const voiceMsg = skill.voice_description || 
      `${skill.skill_name}: ${skill.proficiency_level || 'Skilled'} level with ${skill.years_experience || 'extensive'} years experience.`;
    
    announce(`Selected ${skill.skill_name} from skills collection. ${voiceMsg}`);
    
    if (config.assistant.autoSpeak) {
      speak(voiceMsg);
    }
  };

  // Get unique categories for filtering
  const allCategories = [...new Set(skills.map(s => s.skill_category))].filter(Boolean);

  // Filter skills by category
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.skill_category === selectedCategory);

  // Get proficiency color
  const getProficiencyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'from-green-500 to-emerald-500';
      case 'advanced': return 'from-blue-500 to-cyan-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'beginner': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      'Frontend': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Backend': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Database': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Dev-Ops': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Tools': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Design': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Soft-skills': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading skills collection...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden"
      aria-labelledby="skills-collection-heading"
    >
      {/* Skip Link */}
      <a 
        href="#next-section" 
        className="atlas-skip-link"
        onClick={() => announce('Navigating to next section')}
      >
        Skip skills collection
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
            id="skills-collection-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills Collection
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive collection of technical competencies and professional expertise
          </p>
        </motion.div>

        {/* Category Filters */}
        {allCategories.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
              }`}
              aria-pressed={selectedCategory === 'all'}
            >
              All Skills ({skills.length})
            </button>
            {allCategories.map((category) => {
              const categoryCount = skills.filter(s => s.skill_category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category || 'all')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category} ({categoryCount})
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Skills Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`skill-collection-${skill.skill_name}-${index}`}
              className={`group cursor-pointer ${skill.is_featured ? 'md:col-span-2 xl:col-span-2' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleSkillClick(skill)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSkillClick(skill);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Skill: ${skill.skill_name}. Proficiency: ${skill.proficiency_level}`}
            >
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden h-full transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/10">
                {/* Featured Badge */}
                {skill.is_featured && (
                  <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}

                {/* Currently Learning Badge */}
                {skill.currently_learning && (
                  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Learning
                  </div>
                )}

                {/* Skill Content */}
                <div className="p-6">
                  {/* Skill Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-white font-orbitron">
                        {skill.skill_name}
                      </h3>
                      {skill.skill_icon && (
                        <span className="text-2xl">{skill.skill_icon}</span>
                      )}
                    </div>
                    
                    {/* Category and Type */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {skill.skill_category && (
                        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(skill.skill_category)}`}>
                          {skill.skill_category}
                        </span>
                      )}
                      {skill.skill_type && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-md text-xs border border-slate-600">
                          {skill.skill_type}
                        </span>
                      )}
                      {skill.environment && (
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-400 rounded-md text-xs border border-slate-600">
                          {skill.environment}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Proficiency Level */}
                  {skill.proficiency_level && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">Proficiency</span>
                        <span className={`px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-r ${getProficiencyColor(skill.proficiency_level)} text-white`}>
                          {skill.proficiency_level}
                        </span>
                      </div>
                      {skill.proficiency_percentage && (
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getProficiencyColor(skill.proficiency_level)} transition-all duration-500`}
                            style={{ width: `${skill.proficiency_percentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Experience and Projects */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    {skill.years_experience && (
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xl font-bold text-cyan-400">{skill.years_experience}</div>
                        <div className="text-xs text-slate-400">Years</div>
                      </div>
                    )}
                    {skill.projects_count && (
                      <div className="bg-slate-700/30 rounded-lg p-3">
                        <div className="text-xl font-bold text-cyan-400">{skill.projects_count}</div>
                        <div className="text-xs text-slate-400">Projects</div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {skill.skill_description && (
                    <div className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {typeof skill.skill_description === 'string' 
                        ? skill.skill_description
                        : 'Detailed skill description available'
                      }
                    </div>
                  )}

                  {/* Related Projects */}
                  {skill.related_projects && skill.related_projects.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                        Related Projects
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {skill.related_projects.slice(0, 3).map((project, projectIndex) => (
                          project.project_name && (
                            <span
                              key={projectIndex}
                              className="px-2 py-1 bg-slate-700/30 text-slate-300 rounded-md text-xs"
                            >
                              {project.project_name}
                            </span>
                          )
                        ))}
                        {skill.related_projects.length > 3 && (
                          <span className="px-2 py-1 bg-slate-700/30 text-slate-400 rounded-md text-xs">
                            +{skill.related_projects.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certification Link */}
                  {skill.certification_url?.url && (
                    <Link
                      href={skill.certification_url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                      onClick={(e) => {
                        e.stopPropagation();
                        announce(`Opening certification for ${skill.skill_name}`);
                      }}
                    >
                      View Certification
                    </Link>
                  )}

                  {/* Next Milestone */}
                  {skill.next_milestone && (
                    <div className="mt-4 p-3 bg-slate-700/20 rounded-lg border border-slate-600/50">
                      <div className="text-xs font-semibold text-slate-400 mb-1">Next Milestone</div>
                      <div className="text-sm text-slate-300">{skill.next_milestone}</div>
                    </div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getProficiencyColor(skill.proficiency_level || 'Intermediate')} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 text-lg">
              No skills found in this collection matching the selected category.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Show All Collection Skills
            </button>
          </motion.div>
        )}

        {/* Collection Summary for Screen Readers */}
        <div className="atlas-sr-only" aria-live="polite">
          Skills collection showing {filteredSkills.length} skills
          {selectedCategory !== 'all' && ` in ${selectedCategory} category`}.
          Use tab to navigate through skills and press Enter for details.
        </div>
      </div>
    </section>
  );
};

export default Skills;
