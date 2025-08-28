"use client";

import { FC, useState, useMemo } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { FaCode, FaStar, FaCertificate, FaChartLine, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa";

import SliceContainer from "@/components/slice-internals/SliceContainer";
import FilterButtons from "@/components/slice-internals/FilterButtons";
import { useSliceAtlas } from "@/hooks/useSliceAtlas";
import { componentStyles } from "@/lib/theme/components";
import { themeColors, themeEffects } from "@/lib/theme/colors";
import { animationPresets } from "@/lib/animations/slice-animations";
import { sliceHelpers } from "@/lib/utils/slice-helpers";

/**
 * Props for `Skills`.
 */
export type SkillsProps = SliceComponentProps<Content.SkillsSlice>;

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
 * Component for "Skills" Slices - Technical Skills Matrix.
 */
const Skills: FC<SkillsProps> = ({ slice }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { announceSlice, generateVoiceCommand } = useSliceAtlas();

  // Extract skills from Prismic
  const skills = useMemo(() => {
    if (!slice?.items) return [];
    
    return slice.items
      .filter((item: any) => item.skill_name)
      .map((item: any, index: number) => ({
        skill_name: sliceHelpers.extractText(item.skill_name),
        skill_category: sliceHelpers.extractText(item.skill_category),
        skill_type: sliceHelpers.extractText(item.skill_type),
        proficiency_level: sliceHelpers.extractText(item.proficiency_level) || 'Intermediate',
        proficiency_percentage: item.proficiency_percentage || 75,
        years_experience: item.years_experience || 1,
        skill_icon: sliceHelpers.extractText(item.skill_icon),
        display_order: item.display_order || index,
        colour_hex: sliceHelpers.extractText(item.colour_hex) || '#00d4ff',
        is_featured: item.is_featured === true,
        skill_description: sliceHelpers.extractRichText(item.skill_description),
        use_cases: sliceHelpers.extractRichText(item.use_cases),
        certifications: sliceHelpers.extractText(item.certifications),
        certification_url: item.certification_url,
        projects_count: item.projects_count || 0,
        related_projects: item.related_projects || [],
        professional_usage: sliceHelpers.extractRichText(item.professional_usage),
        learning_source: sliceHelpers.extractText(item.learning_source),
        currently_learning: item.currently_learning === true,
        next_milestone: sliceHelpers.extractText(item.next_milestone),
        voice_description: sliceHelpers.extractText(item.voice_description),
        skill_keywords: sliceHelpers.extractText(item.skill_keywords),
        importance_rank: item.importance_rank || 5,
        skill_aliases: sliceHelpers.extractText(item.skill_aliases),
        environment: sliceHelpers.extractText(item.environment)
      }))
      .sort((a, b) => {
        // Featured first, then by importance rank, then by proficiency
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        if (a.importance_rank !== b.importance_rank) {
          return (b.importance_rank || 0) - (a.importance_rank || 0);
        }
        return (b.proficiency_percentage || 0) - (a.proficiency_percentage || 0);
      });
  }, [slice]);

  // Get skill categories for filtering
  const categories = useMemo(() => {
    const cats = [...new Set(skills.map(skill => skill.skill_category).filter(Boolean))];
    return ['all', ...cats];
  }, [skills]);

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return skills;
    return skills.filter(skill => skill.skill_category === selectedCategory);
  }, [skills, selectedCategory]);

  // Group skills by type for better organization
  const skillsByType = useMemo(() => {
    const grouped: Record<string, typeof skills> = {};
    filteredSkills.forEach(skill => {
      const type = skill.skill_type || 'Other';
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(skill);
    });
    return grouped;
  }, [filteredSkills]);

  // Announce slice load for accessibility
  if (typeof window !== 'undefined' && skills.length > 0) {
    announceSlice(`Skills section loaded with ${skills.length} technical skills`);
    
    // Voice command for top skills
    generateVoiceCommand("what are my top skills", () => {
      const topSkills = skills.slice(0, 5).map(s => s.skill_name).join(', ');
      const message = `Your top skills are: ${topSkills}`;
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      }
    });
  }

  // Get proficiency level color
  const getProficiencyColor = (level?: string) => {
    const levelMap: Record<string, string> = {
      'Expert': 'cyan',
      'Advanced': 'blue',
      'Intermediate': 'yellow',
      'Beginner': 'green',
      'Learning': 'purple'
    };
    return levelMap[level || 'Intermediate'] || 'blue';
  };

  // Get proficiency bar width and color
  const getProficiencyStyle = (percentage: number) => {
    if (percentage >= 90) return { color: 'from-cyan-400 to-cyan-500', label: 'Expert' };
    if (percentage >= 75) return { color: 'from-blue-400 to-blue-500', label: 'Advanced' };
    if (percentage >= 60) return { color: 'from-yellow-400 to-yellow-500', label: 'Intermediate' };
    if (percentage >= 40) return { color: 'from-green-400 to-green-500', label: 'Familiar' };
    return { color: 'from-purple-400 to-purple-500', label: 'Learning' };
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceContainer
        title="Technical Skills Matrix"
        subtitle="Comprehensive skillset spanning multiple technologies and domains"
        isEmpty={skills.length === 0}
        emptyStateConfig={{
          title: 'No Skills Data',
          description: 'Skills information will appear here once added.'
        }}
      >
        {/* Category Filters */}
        {categories.length > 2 && (
          <FilterButtons
            categories={categories}
            activeFilter={selectedCategory}
            onFilterChange={setSelectedCategory}
          />
        )}

        {/* Skills by Type Groups */}
        <div className="space-y-12">
          {Object.entries(skillsByType).map(([type, typeSkills]) => (
            <motion.div
              key={type}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationPresets.sliceSection.container}
            >
              {/* Type Header */}
              <h3 className={`${componentStyles.subheading} mb-6 pb-2 border-b ${themeColors.border}`}>
                {type}
                <span className={`ml-3 text-sm ${themeColors.muted}`}>
                  ({typeSkills.length} skills)
                </span>
              </h3>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeSkills.map((skill, index) => (
                  <motion.div
                    key={`skill-${index}`}
                    variants={animationPresets.cardGrid.card}
                    custom={index}
                    className={`relative group ${skill.is_featured ? 'lg:col-span-2' : ''}`}
                  >
                    <div className={`h-full p-6 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border ${themeEffects.transition} hover:${themeColors.borderHover} hover:shadow-lg hover:shadow-cyan-500/10`}>
                      {/* Featured Badge */}
                      {skill.is_featured && (
                        <div className="absolute -top-2 -right-2">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400">
                            <FaStar className="w-4 h-4 text-slate-900" />
                          </span>
                        </div>
                      )}

                      {/* Skill Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {skill.skill_icon && (
                            <div 
                              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                              style={{ backgroundColor: `${skill.colour_hex}20`, color: skill.colour_hex }}
                            >
                              {skill.skill_icon}
                            </div>
                          )}
                          <div>
                            <h4 className={`${themeColors.white} font-semibold text-lg`}>
                              {skill.skill_name}
                            </h4>
                            {skill.skill_category && (
                              <p className={`${themeColors.muted} text-xs`}>
                                {skill.skill_category}
                              </p>
                            )}
                          </div>
                        </div>

                        {skill.currently_learning && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            Learning
                          </span>
                        )}
                      </div>

                      {/* Proficiency Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-sm ${themeColors.secondary}`}>
                            {skill.proficiency_level}
                          </span>
                          <span className={`text-sm font-bold ${themeColors.primary}`}>
                            {skill.proficiency_percentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency_percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full bg-gradient-to-r ${getProficiencyStyle(skill.proficiency_percentage || 0).color}`}
                          />
                        </div>
                      </div>

                      {/* Skill Details */}
                      <div className="space-y-3">
                        {skill.years_experience && (
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${themeColors.muted}`}>Experience</span>
                            <span className={`text-sm ${themeColors.secondary}`}>
                              {skill.years_experience} {skill.years_experience === 1 ? 'year' : 'years'}
                            </span>
                          </div>
                        )}

                        {skill.projects_count && skill.projects_count > 0 && (
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${themeColors.muted}`}>Projects</span>
                            <span className={`text-sm ${themeColors.secondary}`}>
                              {skill.projects_count} completed
                            </span>
                          </div>
                        )}

                        {skill.certifications && (
                          <div className="flex items-center gap-2">
                            <FaCertificate className={`w-4 h-4 ${themeColors.warning}`} />
                            {skill.certification_url ? (
                              <a 
                                href={skill.certification_url.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm ${themeColors.secondary} hover:${themeColors.primary} ${themeEffects.transition}`}
                              >
                                {skill.certifications}
                                <FaExternalLinkAlt className="inline-block w-3 h-3 ml-1" />
                              </a>
                            ) : (
                              <span className={`text-sm ${themeColors.secondary}`}>
                                {skill.certifications}
                              </span>
                            )}
                          </div>
                        )}

                        {skill.learning_source && (
                          <div className="flex items-center gap-2">
                            <FaGraduationCap className={`w-4 h-4 ${themeColors.muted}`} />
                            <span className={`text-sm ${themeColors.secondary}`}>
                              {skill.learning_source}
                            </span>
                          </div>
                        )}

                        {skill.next_milestone && skill.currently_learning && (
                          <div className="pt-3 border-t border-slate-700/50">
                            <p className={`text-xs ${themeColors.muted} mb-1`}>Next Milestone</p>
                            <p className={`text-sm ${themeColors.secondary}`}>
                              {skill.next_milestone}
                            </p>
                          </div>
                        )}

                        {skill.skill_description && (
                          <div className="pt-3 border-t border-slate-700/50">
                            <p className={`text-sm ${themeColors.secondary} line-clamp-2`}>
                              {skill.skill_description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Related Projects (shown on hover/featured) */}
                      {skill.related_projects && skill.related_projects.length > 0 && skill.is_featured && (
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                          <p className={`text-xs ${themeColors.muted} mb-2`}>Used in Projects</p>
                          <div className="flex flex-wrap gap-2">
                            {skill.related_projects.slice(0, 3).map((project: any, pIndex: number) => (
                              <span
                                key={pIndex}
                                className={`px-2 py-1 text-xs rounded-md bg-slate-700/50 ${themeColors.secondary}`}
                              >
                                {project.project_name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationPresets.sliceSection.item}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700"
        >
          <div className="text-center">
            <div className={`text-3xl font-bold ${themeColors.primary} mb-1`}>
              {skills.length}
            </div>
            <div className={`text-sm ${themeColors.secondary}`}>Total Skills</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${themeColors.primary} mb-1`}>
              {skills.filter(s => s.proficiency_percentage && s.proficiency_percentage >= 80).length}
            </div>
            <div className={`text-sm ${themeColors.secondary}`}>Expert Level</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${themeColors.primary} mb-1`}>
              {skills.filter(s => s.certifications).length}
            </div>
            <div className={`text-sm ${themeColors.secondary}`}>Certified</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${themeColors.primary} mb-1`}>
              {skills.filter(s => s.currently_learning).length}
            </div>
            <div className={`text-sm ${themeColors.secondary}`}>Learning</div>
          </div>
        </motion.div>
      </SliceContainer>
    </section>
  );
};

export default Skills;