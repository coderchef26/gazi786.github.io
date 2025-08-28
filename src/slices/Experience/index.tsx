"use client";

import { FC, useState, useMemo } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaTrophy, FaLink, FaClock } from "react-icons/fa";

import SliceContainer from "@/components/slice-internals/SliceContainer";
import FilterButtons from "@/components/slice-internals/FilterButtons";
import { useSliceAtlas } from "@/hooks/useSliceAtlas";
import { componentStyles } from "@/lib/theme/components";
import { themeColors, themeEffects } from "@/lib/theme/colors";
import { animationPresets } from "@/lib/animations/slice-animations";
import { sliceHelpers } from "@/lib/utils/slice-helpers";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

interface ExperienceItem {
  company_name?: string;
  company_logo?: any;
  company_website?: any;
  company_location?: string;
  work_type?: string;
  work_model?: string;
  job_title?: string;
  department?: string;
  seniority_level?: string;
  startdate?: string;
  enddate?: string;
  is_current?: boolean;
  role_summary?: any;
  key_achievements?: Array<{
    achievement_title?: string;
    achievement_description?: any;
    metric_value?: string;
    impact_area?: string;
  }>;
  projects_delivered?: number;
  skills?: any;
  voice_summary?: string;
  role_keyowords?: string;
  impact_score?: number;
}

/**
 * Component for "Experience" Slices - Professional Experience Timeline.
 */
const Experience: FC<ExperienceProps> = ({ slice }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const { announceSlice, generateVoiceCommand } = useSliceAtlas();

  // Extract experience items from Prismic
  const experiences = useMemo(() => {
    if (!slice?.items) return [];
    
    return slice.items
      .filter((item: any) => item.company_name)
      .map((item: any) => ({
        company_name: sliceHelpers.extractText(item.company_name),
        company_logo: sliceHelpers.extractImage(item.company_logo),
        company_website: sliceHelpers.extractText(item.company_website),
        company_location: sliceHelpers.extractText(item.company_location),
        work_type: sliceHelpers.extractText(item.work_type),
        work_model: sliceHelpers.extractText(item.work_model),
        job_title: sliceHelpers.extractText(item.job_title),
        department: sliceHelpers.extractText(item.department),
        seniority_level: sliceHelpers.extractText(item.seniority_level),
        startdate: sliceHelpers.extractText(item.startdate),
        enddate: sliceHelpers.extractText(item.enddate),
        is_current: item.is_current === true,
        role_summary: sliceHelpers.extractRichText(item.role_summary),
        key_achievements: item.key_achievements || [],
        projects_delivered: item.projects_delivered,
        skills: sliceHelpers.extractRichText(item.skills),
        voice_summary: sliceHelpers.extractText(item.voice_summary),
        role_keyowords: sliceHelpers.extractText(item.role_keyowords),
        impact_score: item.impact_score || 5
      }))
      .sort((a, b) => {
        // Sort by current status first, then by end date
        if (a.is_current && !b.is_current) return -1;
        if (!a.is_current && b.is_current) return 1;
        const dateA = new Date(a.enddate || a.startdate || '');
        const dateB = new Date(b.enddate || b.startdate || '');
        return dateB.getTime() - dateA.getTime();
      });
  }, [slice]);

  // Get work types for filtering
  const workTypes = useMemo(() => {
    const types = [...new Set(experiences.map(exp => exp.work_type).filter(Boolean))];
    return ['all', ...types];
  }, [experiences]);

  // Filter experiences based on selected type
  const filteredExperiences = useMemo(() => {
    if (selectedType === 'all') return experiences;
    return experiences.filter(exp => exp.work_type === selectedType);
  }, [experiences, selectedType]);

  // Announce slice load for accessibility
  if (typeof window !== 'undefined' && experiences.length > 0) {
    announceSlice(`Experience section loaded with ${experiences.length} roles`);
    
    // Voice command for current role
    generateVoiceCommand("what is my current role", () => {
      const currentRole = experiences.find(exp => exp.is_current);
      if (currentRole && currentRole.voice_summary) {
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(currentRole.voice_summary);
          window.speechSynthesis.speak(utterance);
        }
      }
    });
  }

  // Get work type color
  const getWorkTypeColor = (type?: string) => {
    return sliceHelpers.getCategoryColor(type || '', {
      'Full-time': 'blue',
      'Part-time': 'green',
      'Self-employed': 'purple',
      'Freelance': 'orange',
      'Contract': 'yellow',
      'Internship': 'pink',
      'Apprenticeship': 'indigo',
      'Volunteer': 'cyan'
    });
  };

  // Format date range and calculate duration
  const formatDateRange = (startDate?: string, endDate?: string, isCurrent?: boolean) => {
    return sliceHelpers.formatDateRange(startDate || '', endDate || '', isCurrent || false, 'en-NZ');
  };

  const calculateDuration = (startDate?: string, endDate?: string, isCurrent?: boolean) => {
    return sliceHelpers.formatDuration(startDate || '', endDate || '');
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceContainer
        title="Professional Experience"
        subtitle="Career journey and professional achievements"
        isEmpty={experiences.length === 0}
        emptyStateConfig={{
          title: 'No Experience Data',
          description: 'Professional experience will appear here once added.'
        }}
      >
        {/* Filter Buttons */}
        {workTypes.length > 2 && (
          <FilterButtons
            categories={workTypes}
            activeFilter={selectedType}
            onFilterChange={setSelectedType}
          />
        )}

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />

          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={`exp-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={animationPresets.sliceSection.item}
                className="relative pl-20"
              >
                {/* Timeline Node */}
                <div className="absolute left-5 w-6 h-6 bg-slate-900 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                  <div className={`w-2 h-2 ${exp.is_current ? 'bg-green-400 animate-pulse' : 'bg-cyan-400'} rounded-full`} />
                </div>

                {/* Experience Card */}
                <div className={`p-6 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border ${themeEffects.transition} hover:${themeColors.borderHover} hover:shadow-lg hover:shadow-cyan-500/10`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Company Info & Role */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`${componentStyles.subheading} mb-1`}>
                            {exp.job_title}
                          </h3>
                          <div className="flex items-center gap-3">
                            <p className={`${themeColors.primary} text-lg font-medium`}>
                              {exp.company_name}
                            </p>
                            {exp.company_website && (
                              <a 
                                href={exp.company_website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${themeColors.secondary} hover:${themeColors.primary} ${themeEffects.transition}`}
                              >
                                <FaLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          {exp.work_type && (
                            <span className={`px-3 py-1 text-sm rounded-full bg-${getWorkTypeColor(exp.work_type)}-500/20 text-${getWorkTypeColor(exp.work_type)}-400 border border-${getWorkTypeColor(exp.work_type)}-500/30`}>
                              {exp.work_type}
                            </span>
                          )}
                          {exp.is_current && (
                            <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {exp.company_location && (
                          <div className={`flex items-center gap-2 ${themeColors.secondary} text-sm`}>
                            <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" />
                            <span>{exp.company_location}</span>
                          </div>
                        )}
                        
                        <div className={`flex items-center gap-2 ${themeColors.secondary} text-sm`}>
                          <FaCalendarAlt className="w-4 h-4 flex-shrink-0" />
                          <span>{formatDateRange(exp.startdate, exp.enddate, exp.is_current)}</span>
                        </div>
                        
                        {exp.startdate && (
                          <div className={`flex items-center gap-2 ${themeColors.secondary} text-sm`}>
                            <FaClock className="w-4 h-4 flex-shrink-0" />
                            <span>{calculateDuration(exp.startdate, exp.enddate, exp.is_current)}</span>
                          </div>
                        )}
                        
                        {exp.department && (
                          <div className={`flex items-center gap-2 ${themeColors.secondary} text-sm`}>
                            <FaBuilding className="w-4 h-4 flex-shrink-0" />
                            <span>{exp.department}</span>
                          </div>
                        )}
                        
                        {exp.work_model && (
                          <div className={`flex items-center gap-2 ${themeColors.secondary} text-sm`}>
                            <FaBriefcase className="w-4 h-4 flex-shrink-0" />
                            <span>{exp.work_model}</span>
                          </div>
                        )}
                        
                        {exp.seniority_level && (
                          <div className={`px-3 py-1 text-xs rounded-full bg-slate-700/50 ${themeColors.secondary} border border-slate-600`}>
                            {exp.seniority_level}
                          </div>
                        )}
                      </div>

                      {/* Role Summary */}
                      {exp.role_summary && (
                        <div className={`mb-4 ${themeColors.secondary} text-sm leading-relaxed`}>
                          {exp.role_summary}
                        </div>
                      )}

                      {/* Projects Delivered */}
                      {exp.projects_delivered && exp.projects_delivered > 0 && (
                        <div className="mb-4 p-3 bg-slate-700/20 rounded-lg inline-block">
                          <div className="text-xs text-slate-400 mb-1">Projects Delivered</div>
                          <div className="text-2xl font-bold text-cyan-400">{exp.projects_delivered}</div>
                        </div>
                      )}

                      {/* Key Achievements */}
                      {exp.key_achievements && exp.key_achievements.length > 0 && (
                        <div className="space-y-3">
                          <div className={`flex items-center gap-2 ${themeColors.primary}`}>
                            <FaTrophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Key Achievements</span>
                          </div>
                          <div className="grid gap-3">
                            {exp.key_achievements.slice(0, 3).map((achievement: any, achIndex: number) => (
                              <div key={achIndex} className="bg-slate-700/20 rounded-lg p-4 border border-slate-700/50">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    {achievement.achievement_title && (
                                      <h5 className={`${themeColors.white} font-medium mb-1`}>
                                        {achievement.achievement_title}
                                      </h5>
                                    )}
                                    {achievement.achievement_description && (
                                      <div className={`${themeColors.secondary} text-sm`}>
                                        {achievement.achievement_description}
                                      </div>
                                    )}
                                  </div>
                                  {achievement.metric_value && (
                                    <div className="text-right ml-4">
                                      <div className="text-cyan-400 font-bold text-lg">
                                        {achievement.metric_value}
                                      </div>
                                      {achievement.impact_area && (
                                        <div className="text-slate-400 text-xs">
                                          {achievement.impact_area}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                            {exp.key_achievements.length > 3 && (
                              <div className="text-center">
                                <span className={`${themeColors.muted} text-sm`}>
                                  +{exp.key_achievements.length - 3} more achievements
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SliceContainer>
    </section>
  );
};

export default Experience;