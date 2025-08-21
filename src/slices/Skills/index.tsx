"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import { AnimatedContent } from "./AnimatedContent";

/**
 * Props for `Skills`.
 */
export type SkillsProps = SliceComponentProps<Content.SkillsSlice>;

interface SkillData {
  skill_name: string;
  skill_category: string;
  skill_type: string;
  proficiency_level: string;
  proficiency_percentage: number;
  years_experience: number;
  skill_icon?: string;
  display_order?: number;
  colour_hex?: string;
  is_featured: boolean;
  skill_description: any;
  voice_description?: string;
  skill_keywords?: string;
  importance_rank?: number;
  environment?: string;
}

/**
 * Component for "Skills" Slices - ATLAS Enhanced.
 */
const Skills: FC<SkillsProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Extract skills from Prismic data structure
  useEffect(() => {
    const extractSkillsData = () => {
      const skillsData: SkillData[] = [];
      
      // Handle current individual field structure (temporary until restructure)
      if (slice.primary && 'skill_name' in slice.primary) {
        const primaryData = slice.primary as any;
        if (primaryData.skill_name) {
          skillsData.push({
            skill_name: primaryData.skill_name || '',
            skill_category: primaryData.skill_category || 'General',
            skill_type: primaryData.skill_type || 'Tool',
            proficiency_level: primaryData.proficiency_level || 'Intermediate',
            proficiency_percentage: primaryData.proficiency_percentage || 75,
            years_experience: primaryData.years_experience || 1,
            skill_icon: primaryData.skill_icon,
            display_order: primaryData.display_order || 0,
            colour_hex: primaryData.colour_hex || '#00d4ff',
            is_featured: primaryData.is_featured || false,
            skill_description: primaryData.skill_description,
            voice_description: primaryData.voice_description,
            skill_keywords: primaryData.skill_keywords,
            importance_rank: primaryData.importance_rank || 5,
            environment: primaryData.environment
          });
        }
      }
      
      // Handle future repeatable group structure
      if (slice.primary && 'skill' in slice.primary && Array.isArray(slice.primary.skill)) {
        const skillGroups = slice.primary.skill as any[];
        skillGroups.forEach((skillGroup, index) => {
          if (skillGroup.skill_name) {
            skillsData.push({
              skill_name: skillGroup.skill_name,
              skill_category: skillGroup.skill_category || 'General',
              skill_type: skillGroup.skill_type || 'Tool',
              proficiency_level: skillGroup.proficiency_level || 'Intermediate',
              proficiency_percentage: skillGroup.proficiency_percentage || 75,
              years_experience: skillGroup.years_experience || 1,
              skill_icon: skillGroup.skill_icon,
              display_order: skillGroup.display_order || index,
              colour_hex: skillGroup.colour_hex || '#00d4ff',
              is_featured: skillGroup.is_featured || false,
              skill_description: skillGroup.skill_description,
              voice_description: skillGroup.voice_description,
              skill_keywords: skillGroup.skill_keywords,
              importance_rank: skillGroup.importance_rank || 5,
              environment: skillGroup.environment
            });
          }
        });
      }
      
      // Sort by importance rank and display order
      skillsData.sort((a, b) => {
        const importanceA = a.importance_rank || 5;
        const importanceB = b.importance_rank || 5;
        if (importanceA !== importanceB) {
          return importanceB - importanceA; // Higher importance first
        }
        return (a.display_order || 0) - (b.display_order || 0);
      });
      
      setSkills(skillsData);
      setIsLoading(false);
    };

    extractSkillsData();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && skills.length > 0) {
      const skillCount = skills.length;
      const categories = [...new Set(skills.map(s => s.skill_category))];
      const message = `Skills section loaded. ${skillCount} skills across ${categories.length} categories: ${categories.join(', ')}.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Here are my technical skills and expertise areas. I have ${skillCount} skills across ${categories.length} main categories.`);
      }

      // Register voice commands for skills
      const registerSkillCommands = () => {
        categories.forEach(category => {
          // Voice commands for skill categories
          const commands = [
            `show me ${category} skills`,
            `tell me about ${category}`,
            `${category} expertise`,
            `what ${category} skills do you have`
          ];
        });

        skills.forEach(skill => {
          // Voice commands for individual skills
          const skillCommands = [
            `tell me about ${skill.skill_name}`,
            `how good are you at ${skill.skill_name}`,
            `${skill.skill_name} proficiency`
          ];
        });
      };

      registerSkillCommands();
    }
  }, [isLoading, skills, announce, speak, config.assistant.autoSpeak]);

  // Filter skills by category
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.skill_category === selectedCategory);

  // Get unique categories for filter
  const categories = ['all', ...new Set(skills.map(s => s.skill_category))];

  // Handle skill interaction
  const handleSkillClick = (skill: SkillData) => {
    const voiceMsg = skill.voice_description || 
      `${skill.skill_name}: ${skill.proficiency_level} level with ${skill.years_experience} years experience. ${skill.proficiency_percentage}% proficiency.`;
    
    announce(`Selected ${skill.skill_name}. ${voiceMsg}`);
    
    if (config.assistant.autoSpeak) {
      speak(voiceMsg);
    }
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const message = category === 'all' 
      ? 'Showing all skills'
      : `Filtered to ${category} skills`;
    
    announce(message);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading skills matrix...</span>
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
        className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden"
        aria-labelledby="skills-heading"
      >
        {/* Skip Link */}
        <a 
          href="#projects" 
          className="atlas-skip-link"
          onClick={() => announce('Navigating to projects section')}
        >
          Skip to projects
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
              id="skills-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Skills Matrix
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Technical expertise and proficiency levels across multiple domains
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`Filter skills by ${category === 'all' ? 'all categories' : category}`}
              >
                {category === 'all' ? 'All Skills' : category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${skill.skill_name}-${index}`}
                className={`relative group cursor-pointer ${
                  skill.is_featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                aria-label={`Skill: ${skill.skill_name}. ${skill.proficiency_level} level.`}
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                  {/* Featured Badge */}
                  {skill.is_featured && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}

                  {/* Skill Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 font-orbitron">
                        {skill.skill_name}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded">
                          {skill.skill_category}
                        </span>
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded">
                          {skill.skill_type}
                        </span>
                        {skill.environment && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded">
                            {skill.environment}
                          </span>
                        )}
                      </div>
                    </div>
                    {skill.skill_icon && (
                      <div className="ml-4 text-2xl">
                        {skill.skill_icon}
                      </div>
                    )}
                  </div>

                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>{skill.proficiency_level}</span>
                      <span>{skill.proficiency_percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency_percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="text-sm text-slate-400 mb-4">
                    {skill.years_experience} year{skill.years_experience !== 1 ? 's' : ''} experience
                  </div>

                  {/* Description */}
                  {skill.skill_description && (
                    <div className="text-sm text-slate-300 leading-relaxed">
                      {typeof skill.skill_description === 'string' 
                        ? skill.skill_description
                        : 'Detailed description available'
                      }
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
                No skills found in the {selectedCategory} category.
              </p>
            </motion.div>
          )}

          {/* Section Summary for Screen Readers */}
          <div className="atlas-sr-only" aria-live="polite">
            Showing {filteredSkills.length} skills
            {selectedCategory !== 'all' && ` in ${selectedCategory} category`}.
            Use tab to navigate through skills and press Enter to get detailed information.
          </div>
        </div>
      </section>
    </AnimatedContent>
  );
};

export default Skills;
