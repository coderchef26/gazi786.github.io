"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";
import Link from "next/link";

/**
 * Props for `ExperienceCollection`.
 */
export type ExperienceCollectionProps =
  SliceComponentProps<Content.ExperienceCollectionSlice>;

interface ExperienceCollectionItem {
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
  role_keyowords?: string; // Note: typo in model but keeping for consistency
  impact_score?: number;
}

/**
 * Component for "ExperienceCollection" Slices - Collection of Experience with Repeatable Zones.
 */
const ExperienceCollection: FC<ExperienceCollectionProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [experiences, setExperiences] = useState<ExperienceCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Extract experiences from Prismic repeatable zones
  useEffect(() => {
    const extractExperiencesFromCollection = () => {
      const experiencesData: ExperienceCollectionItem[] = [];
      
      // Handle repeatable zones (items array)
      if (slice.items && Array.isArray(slice.items)) {
        slice.items.forEach((item: any, index) => {
          if (item.company_name) {
            experiencesData.push({
              company_name: item.company_name,
              company_logo: item.company_logo,
              company_website: item.company_website,
              company_location: item.company_location,
              work_type: item.work_type,
              work_model: item.work_model,
              job_title: item.job_title,
              department: item.department,
              seniority_level: item.seniority_level,
              startdate: item.startdate,
              enddate: item.enddate,
              is_current: item.is_current === true,
              role_summary: item.role_summary,
              key_achievements: item.key_achievements || [],
              projects_delivered: item.projects_delivered,
              skills: item.skills,
              voice_summary: item.voice_summary,
              role_keyowords: item.role_keyowords,
              impact_score: item.impact_score || 5
            });
          }
        });
      }
      
      // Sort by start date (most recent first) and impact score
      experiencesData.sort((a, b) => {
        if (a.is_current && !b.is_current) return -1;
        if (!a.is_current && b.is_current) return 1;
        if ((a.impact_score || 0) !== (b.impact_score || 0)) {
          return (b.impact_score || 0) - (a.impact_score || 0);
        }
        if (a.startdate && b.startdate) {
          return new Date(b.startdate).getTime() - new Date(a.startdate).getTime();
        }
        return 0;
      });
      
      setExperiences(experiencesData);
      setIsLoading(false);
    };

    extractExperiencesFromCollection();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && experiences.length > 0) {
      const expCount = experiences.length;
      const types = [...new Set(experiences.map(e => e.work_type))].filter(Boolean);
      const message = `Experience collection loaded. ${expCount} work experiences across ${types.length} different employment types.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Experience collection showcasing ${expCount} professional roles including ${types.slice(0, 3).join(', ')}.`);
      }

      // Register voice commands for collection experiences
      experiences.forEach((exp, index) => {
        const commands = [
          `show me ${exp.company_name}`,
          `tell me about ${exp.company_name}`,
          `experience ${index + 1}`,
        ];
        if (exp.job_title) {
          commands.push(`show me ${exp.job_title}`);
        }
      });
    }
  }, [isLoading, experiences, announce, speak, config.assistant.autoSpeak]);

  // Handle experience interaction
  const handleExperienceClick = (exp: ExperienceCollectionItem) => {
    const voiceMsg = exp.voice_summary || 
      `${exp.job_title} at ${exp.company_name}. ${exp.is_current ? 'Currently working there.' : 'Previous role.'}`;
    
    announce(`Selected ${exp.company_name} from experience collection. ${voiceMsg}`);
    
    if (config.assistant.autoSpeak) {
      speak(voiceMsg);
    }
  };

  // Get unique work types for filtering
  const allTypes = [...new Set(experiences.map(e => e.work_type))].filter(Boolean);

  // Filter experiences by type
  const filteredExperiences = selectedType === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.work_type === selectedType);

  // Get work type color
  const getWorkTypeColor = (type: string) => {
    const colors = {
      'Full-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Part-time': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Self-employed': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Freelance': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Contract': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Internship': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Apprenticeship': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Volunteer': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  // Get work model icon
  const getWorkModelIcon = (model: string) => {
    switch (model) {
      case 'Remote': return '🏠';
      case 'Hybrid': return '🔄';
      case 'Onsite': return '🏢';
      default: return '💼';
    }
  };

  // Format date range
  const formatDateRange = (startDate: string, endDate: string, isCurrent: boolean) => {
    const start = startDate ? new Date(startDate).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' }) : '';
    const end = isCurrent ? 'Present' : endDate ? new Date(endDate).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' }) : '';
    return `${start} - ${end}`;
  };

  // Calculate duration
  const calculateDuration = (startDate: string, endDate: string, isCurrent: boolean) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    } else if (years > 0) {
      return `${years}y`;
    } else {
      return `${remainingMonths}m`;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading experience collection...</span>
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
      aria-labelledby="experience-collection-heading"
    >
      {/* Skip Link */}
      <a 
        href="#next-section" 
        className="atlas-skip-link"
        onClick={() => announce('Navigating to next section')}
      >
        Skip experience collection
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
            id="experience-collection-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Professional Experience Collection
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive collection of professional roles and career achievements
          </p>
        </motion.div>

        {/* Type Filters */}
        {allTypes.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedType === 'all'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
              }`}
              aria-pressed={selectedType === 'all'}
            >
              All Experience ({experiences.length})
            </button>
            {allTypes.map((type) => {
              const typeCount = experiences.filter(e => e.work_type === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type || 'all')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-cyan-400'
                  }`}
                  aria-pressed={selectedType === type}
                >
                  {type} ({typeCount})
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Experience Collection Timeline */}
        <div className="space-y-8">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={`experience-collection-${exp.company_name}-${index}`}
              className="group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleExperienceClick(exp)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleExperienceClick(exp);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Experience: ${exp.job_title} at ${exp.company_name}`}
            >
              <div className="relative pl-8 pb-8">
                {/* Timeline line */}
                {index < filteredExperiences.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-full bg-slate-600 group-hover:bg-cyan-500/50 transition-colors duration-300" />
                )}
                
                {/* Timeline dot */}
                <div className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  exp.is_current 
                    ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/50' 
                    : 'bg-slate-800 border-slate-600 group-hover:border-cyan-500 group-hover:bg-cyan-500/20'
                }`} />

                {/* Experience Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/10">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        {exp.company_logo?.url && (
                          <img
                            src={exp.company_logo.url}
                            alt={exp.company_name}
                            className="w-16 h-16 object-contain rounded-lg bg-white/10"
                          />
                        )}
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white font-orbitron mb-1">
                            {exp.job_title}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            {exp.company_website?.url ? (
                              <Link
                                href={exp.company_website.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {exp.company_name}
                              </Link>
                            ) : (
                              <span className="text-cyan-400 font-medium">{exp.company_name}</span>
                            )}
                          </div>
                          
                          {exp.company_location && (
                            <p className="text-slate-400 text-sm mb-2">
                              {exp.company_location}
                            </p>
                          )}
                          
                          {/* Department and Level */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {exp.department && (
                              <span className="text-slate-300 text-sm">
                                {exp.department}
                              </span>
                            )}
                            {exp.seniority_level && (
                              <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-md text-xs">
                                {exp.seniority_level}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Date and Duration */}
                      <div className="text-right">
                        <div className="text-slate-300 font-medium">
                          {formatDateRange(exp.startdate!, exp.enddate!, exp.is_current!)}
                        </div>
                        {exp.startdate && (
                          <div className="text-slate-400 text-sm">
                            {calculateDuration(exp.startdate, exp.enddate!, exp.is_current!)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Work Type and Model */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {exp.work_type && (
                        <span className={`px-3 py-1 rounded-md text-sm font-medium border ${getWorkTypeColor(exp.work_type)}`}>
                          {exp.work_type}
                        </span>
                      )}
                      {exp.work_model && (
                        <span className="px-3 py-1 rounded-md text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
                          {getWorkModelIcon(exp.work_model)} {exp.work_model}
                        </span>
                      )}
                      {exp.is_current && (
                        <span className="px-3 py-1 rounded-md text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                          Current Role
                        </span>
                      )}
                    </div>

                    {/* Role Summary */}
                    {exp.role_summary && (
                      <div className="mb-4 p-3 bg-slate-700/20 rounded-lg">
                        <div className="text-slate-300 text-sm">
                          {typeof exp.role_summary === 'string' 
                            ? exp.role_summary
                            : 'Detailed role description available'
                          }
                        </div>
                      </div>
                    )}

                    {/* Key Achievements */}
                    {exp.key_achievements && exp.key_achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {exp.key_achievements.slice(0, 3).map((achievement, achIndex) => (
                            <div key={achIndex} className="bg-slate-700/20 rounded-lg p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="text-white font-medium mb-1">
                                    {achievement.achievement_title}
                                  </h5>
                                  {achievement.achievement_description && (
                                    <div className="text-slate-300 text-sm">
                                      {typeof achievement.achievement_description === 'string' 
                                        ? achievement.achievement_description
                                        : 'Achievement details'
                                      }
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
                              <span className="text-slate-400 text-sm">
                                +{exp.key_achievements.length - 3} more achievements
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Projects Delivered */}
                    {exp.projects_delivered && (
                      <div className="bg-slate-700/30 rounded-lg p-3 text-center mb-4">
                        <div className="text-2xl font-bold text-cyan-400">{exp.projects_delivered}</div>
                        <div className="text-sm text-slate-400">Projects Delivered</div>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredExperiences.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 text-lg">
              No experience found in this collection matching the selected type.
            </p>
            <button
              onClick={() => setSelectedType('all')}
              className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Show All Collection Experience
            </button>
          </motion.div>
        )}

        {/* Collection Summary for Screen Readers */}
        <div className="atlas-sr-only" aria-live="polite">
          Experience collection showing {filteredExperiences.length} roles
          {selectedType !== 'all' && ` of type ${selectedType}`}.
          Use tab to navigate through experience items and press Enter for details.
        </div>
      </div>
    </section>
  );
};

export default ExperienceCollection;
