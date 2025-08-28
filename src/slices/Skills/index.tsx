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
import HolographicCard from "@/components/ui/HolographicCard";
import HolographicText from "@/components/ui/HolographicText";

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
        skill_description: sliceHelpers.extractRichText(item.skill_description) || '',
        use_cases: sliceHelpers.extractRichText(item.use_cases) || '',
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
        title="TECHNICAL SKILL MATRIX"
        subtitle="ANALYZING TECHNOLOGICAL CAPABILITIES AND SYSTEM PROFICIENCIES"
        isEmpty={skills.length === 0}
        emptyStateConfig={{
          title: 'NO SKILLS DATA DETECTED',
          description: 'SKILL ANALYSIS PROTOCOLS AWAITING DATA INPUT'
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

        {/* Holographic Skills Matrix */}
        <div className="space-y-12">
          {Object.entries(skillsByType).map(([type, typeSkills]) => (
            <motion.div
              key={type}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animationPresets.sliceSection.container}
            >
              {/* Holographic Type Header */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent blur-sm" />
                <div className="relative p-4 border border-cyan-400/30 bg-slate-900/50 backdrop-blur-sm">
                  <HolographicText variant="heading" className="text-2xl">
                    {type.toUpperCase()} SYSTEMS
                  </HolographicText>
                  <HolographicText variant="data" className="mt-2">
                    ACTIVE PROTOCOLS: {typeSkills.length} | STATUS: OPERATIONAL
                  </HolographicText>
                </div>
              </div>

              {/* Holographic Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeSkills.map((skill, index) => (
                  <motion.div
                    key={`skill-${index}`}
                    variants={animationPresets.cardGrid.card}
                    custom={index}
                    className={`relative group ${skill.is_featured ? 'lg:col-span-2' : ''}`}
                  >
                    <HolographicCard
                      variant={skill.is_featured ? "elevated" : "default"}
                      title={skill.skill_name}
                      subtitle={`SKILL ANALYSIS PROTOCOL ${index + 1}`}
                      className="h-full group"
                    >
                      {/* Tony Stark Style Featured Badge */}
                      {skill.is_featured && (
                        <div className="absolute top-2 right-2 z-30">
                          <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50 animate-pulse" />
                            <span className="relative flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 border border-yellow-300">
                              <FaStar className="w-3 h-3" />
                              <HolographicText variant="command" className="text-slate-900">
                                PRIMARY
                              </HolographicText>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Holographic Skill Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-3">
                          {skill.skill_icon && (
                            <div className="relative">
                              <div 
                                className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl border-2"
                                style={{ 
                                  backgroundColor: `${skill.colour_hex}10`, 
                                  color: skill.colour_hex,
                                  borderColor: `${skill.colour_hex}40`,
                                  boxShadow: `0 0 20px ${skill.colour_hex}30`
                                }}
                              >
                                {skill.skill_icon}
                              </div>
                              <div 
                                className="absolute inset-0 rounded-lg animate-pulse"
                                style={{ 
                                  boxShadow: `inset 0 0 10px ${skill.colour_hex}20`
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <HolographicText variant="heading" className="text-xl mb-1">
                              {skill.skill_name?.toUpperCase()}
                            </HolographicText>
                            {skill.skill_category && (
                              <HolographicText variant="data" className="text-sm">
                                CLASSIFICATION: {skill.skill_category.toUpperCase()}
                              </HolographicText>
                            )}
                          </div>
                        </div>

                        {skill.currently_learning && (
                          <div className="flex items-center gap-2 mt-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                            <HolographicText variant="caption" className="text-purple-400">
                              ACTIVE LEARNING PROTOCOL
                            </HolographicText>
                          </div>
                        )}
                      </div>

                      {/* Tony Stark Style Proficiency Analysis */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <HolographicText variant="data">
                            PROFICIENCY LEVEL
                          </HolographicText>
                          <div className="flex items-center gap-2">
                            <HolographicText variant="command" className="text-cyan-400">
                              {skill.proficiency_percentage}%
                            </HolographicText>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          </div>
                        </div>
                        
                        {/* Holographic Progress Bar */}
                        <div className="relative">
                          <div className="h-3 bg-slate-800/50 border border-slate-600/50 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency_percentage}%` }}
                              transition={{ duration: 2, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${getProficiencyStyle(skill.proficiency_percentage || 0).color} relative`}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                            </motion.div>
                          </div>
                          <div 
                            className="absolute top-0 h-3 bg-gradient-to-r from-cyan-400/20 to-transparent animate-pulse"
                            style={{ width: `${skill.proficiency_percentage}%` }}
                          />
                        </div>
                        
                        <HolographicText variant="caption" className="mt-2">
                          STATUS: {getProficiencyStyle(skill.proficiency_percentage || 0).label.toUpperCase()}
                        </HolographicText>
                      </div>

                      {/* Tony Stark Style Skill Analytics */}
                      <div className="space-y-4 border-t border-cyan-400/20 pt-4">
                        {skill.years_experience && (
                          <div className="flex items-center justify-between py-2 border-l-2 border-cyan-400/40 pl-3">
                            <HolographicText variant="data">
                              OPERATIONAL TIME
                            </HolographicText>
                            <HolographicText variant="command" className="text-cyan-300">
                              {skill.years_experience} {skill.years_experience === 1 ? 'YEAR' : 'YEARS'}
                            </HolographicText>
                          </div>
                        )}

                        {skill.projects_count && skill.projects_count > 0 && (
                          <div className="flex items-center justify-between py-2 border-l-2 border-blue-400/40 pl-3">
                            <HolographicText variant="data">
                              PROJECT DEPLOYMENTS
                            </HolographicText>
                            <HolographicText variant="command" className="text-blue-300">
                              {skill.projects_count} COMPLETED
                            </HolographicText>
                          </div>
                        )}

                        {skill.certifications && (
                          <div className="flex items-center gap-2 py-2 border-l-2 border-yellow-400/40 pl-3">
                            <FaCertificate className="w-4 h-4 text-yellow-400" />
                            {skill.certification_url ? (
                              <motion.a 
                                href={skill.certification_url.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 group"
                                whileHover={{ scale: 1.05 }}
                              >
                                <HolographicText variant="command" className="text-yellow-300 group-hover:text-yellow-200">
                                  {skill.certifications.toUpperCase()}
                                </HolographicText>
                                <FaExternalLinkAlt className="w-3 h-3 text-yellow-400 group-hover:text-yellow-200" />
                              </motion.a>
                            ) : (
                              <HolographicText variant="command" className="text-yellow-300">
                                {skill.certifications.toUpperCase()}
                              </HolographicText>
                            )}
                          </div>
                        )}

                        {skill.learning_source && (
                          <div className="flex items-center gap-2 py-2 border-l-2 border-green-400/40 pl-3">
                            <FaGraduationCap className="w-4 h-4 text-green-400" />
                            <HolographicText variant="data">
                              SOURCE: {skill.learning_source.toUpperCase()}
                            </HolographicText>
                          </div>
                        )}

                        {skill.next_milestone && skill.currently_learning && (
                          <div className="py-2 border-l-2 border-purple-400/40 pl-3">
                            <HolographicText variant="data" className="mb-2">
                              NEXT OBJECTIVE
                            </HolographicText>
                            <HolographicText variant="body" className="text-purple-300">
                              {skill.next_milestone.toUpperCase()}
                            </HolographicText>
                          </div>
                        )}

                        {skill.skill_description && (
                          <div className="py-2 border-l-2 border-slate-400/40 pl-3 mt-4">
                            <HolographicText variant="body" className="line-clamp-3">
                              {skill.skill_description}
                            </HolographicText>
                          </div>
                        )}
                      </div>

                      {/* Related Projects - Tony Stark Style */}
                      {skill.related_projects && skill.related_projects.length > 0 && skill.is_featured && (
                        <div className="mt-6 pt-4 border-t border-cyan-400/20">
                          <HolographicText variant="data" className="mb-3">
                            DEPLOYED IN SYSTEMS
                          </HolographicText>
                          <div className="grid grid-cols-2 gap-2">
                            {skill.related_projects.slice(0, 4).map((project: any, pIndex: number) => (
                              <div
                                key={pIndex}
                                className="px-3 py-2 bg-slate-800/50 border border-cyan-400/30 text-center"
                              >
                                <HolographicText variant="command" className="text-xs">
                                  {project.project_name?.toUpperCase()}
                                </HolographicText>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </HolographicCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tony Stark Style System Analytics Dashboard */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationPresets.sliceSection.item}
          className="mt-12"
        >
          <HolographicCard variant="elevated" title="SYSTEM ANALYSIS REPORT" subtitle="COMPREHENSIVE CAPABILITY ASSESSMENT">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Total Skills */}
              <div className="relative text-center group">
                <div className="absolute inset-0 bg-cyan-400/10 blur-md group-hover:bg-cyan-400/20 transition-colors" />
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-cyan-400 mb-2 font-mono"
                  >
                    {skills.length}
                  </motion.div>
                  <HolographicText variant="data">
                    TOTAL SYSTEMS
                  </HolographicText>
                  <div className="w-8 h-0.5 bg-cyan-400 mx-auto mt-2" />
                </div>
              </div>

              {/* Expert Level */}
              <div className="relative text-center group">
                <div className="absolute inset-0 bg-blue-400/10 blur-md group-hover:bg-blue-400/20 transition-colors" />
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-bold text-blue-400 mb-2 font-mono"
                  >
                    {skills.filter(s => s.proficiency_percentage && s.proficiency_percentage >= 80).length}
                  </motion.div>
                  <HolographicText variant="data">
                    EXPERT LEVEL
                  </HolographicText>
                  <div className="w-8 h-0.5 bg-blue-400 mx-auto mt-2" />
                </div>
              </div>

              {/* Certified */}
              <div className="relative text-center group">
                <div className="absolute inset-0 bg-yellow-400/10 blur-md group-hover:bg-yellow-400/20 transition-colors" />
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-4xl font-bold text-yellow-400 mb-2 font-mono"
                  >
                    {skills.filter(s => s.certifications).length}
                  </motion.div>
                  <HolographicText variant="data">
                    CERTIFIED
                  </HolographicText>
                  <div className="w-8 h-0.5 bg-yellow-400 mx-auto mt-2" />
                </div>
              </div>

              {/* Learning */}
              <div className="relative text-center group">
                <div className="absolute inset-0 bg-purple-400/10 blur-md group-hover:bg-purple-400/20 transition-colors" />
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-4xl font-bold text-purple-400 mb-2 font-mono"
                  >
                    {skills.filter(s => s.currently_learning).length}
                  </motion.div>
                  <HolographicText variant="data">
                    LEARNING
                  </HolographicText>
                  <div className="w-8 h-0.5 bg-purple-400 mx-auto mt-2" />
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-8 pt-6 border-t border-cyan-400/20 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <HolographicText variant="command" className="text-green-400">
                  ALL SYSTEMS OPERATIONAL
                </HolographicText>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <HolographicText variant="caption">
                SKILL MATRIX ANALYSIS COMPLETE | {new Date().toLocaleString('en-NZ').toUpperCase()}
              </HolographicText>
            </div>
          </HolographicCard>
        </motion.div>
      </SliceContainer>
    </section>
  );
};

export default Skills;