"use client";

import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { useAtlas } from "@/components/atlas/AtlasProvider";

/**
 * Props for `EducationCollection`.
 */
export type EducationCollectionProps =
  SliceComponentProps<Content.EducationCollectionSlice>;

interface EducationCollectionItem {
  institution_name?: string;
  institution_logo?: any;
  institution_location?: string;
  degree_type?: string;
  degree_tilte?: string; // Note: typo in model but keeping for consistency
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  graduation_year?: string;
  gpa_score?: string;
  thesis_title?: string;
  thesis_description?: any;
  relevant_coursework?: string;
  key_achievements?: any;
  extracurriculars?: any;
}

/**
 * Component for "EducationCollection" Slices - Collection of Education with Repeatable Zones.
 */
const EducationCollection: FC<EducationCollectionProps> = ({ slice }) => {
  const { announce, speak, config } = useAtlas();
  const [education, setEducation] = useState<EducationCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Extract education from Prismic repeatable zones
  useEffect(() => {
    const extractEducationFromCollection = () => {
      const educationData: EducationCollectionItem[] = [];
      
      // Handle repeatable zones (items array)
      if (slice.items && Array.isArray(slice.items)) {
        slice.items.forEach((item: any, index) => {
          if (item.institution_name) {
            educationData.push({
              institution_name: item.institution_name,
              institution_logo: item.institution_logo,
              institution_location: item.institution_location,
              degree_type: item.degree_type,
              degree_tilte: item.degree_tilte,
              field_of_study: item.field_of_study,
              start_date: item.start_date,
              end_date: item.end_date,
              is_current: item.is_current === true,
              graduation_year: item.graduation_year,
              gpa_score: item.gpa_score,
              thesis_title: item.thesis_title,
              thesis_description: item.thesis_description,
              relevant_coursework: item.relevant_coursework,
              key_achievements: item.key_achievements,
              extracurriculars: item.extracurriculars
            });
          }
        });
      }
      
      // Sort by start date (most recent first)
      educationData.sort((a, b) => {
        if (a.start_date && b.start_date) {
          return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
        }
        return 0;
      });
      
      setEducation(educationData);
      setIsLoading(false);
    };

    extractEducationFromCollection();
  }, [slice]);

  // Announce section when loaded and setup voice commands
  useEffect(() => {
    if (!isLoading && education.length > 0) {
      const eduCount = education.length;
      const types = [...new Set(education.map(e => e.degree_type))].filter(Boolean);
      const message = `Education collection loaded. ${eduCount} educational qualifications across ${types.length} different types.`;
      
      announce(message);
      
      if (config.assistant.autoSpeak) {
        speak(`Education collection showcasing ${eduCount} educational qualifications including ${types.slice(0, 3).join(', ')}.`);
      }

      // Register voice commands for collection education
      education.forEach((edu, index) => {
        const commands = [
          `show me ${edu.institution_name}`,
          `tell me about ${edu.institution_name}`,
          `education ${index + 1}`,
        ];
        if (edu.degree_tilte) {
          commands.push(`show me ${edu.degree_tilte}`);
        }
      });
    }
  }, [isLoading, education, announce, speak, config.assistant.autoSpeak]);

  // Handle education interaction
  const handleEducationClick = (edu: EducationCollectionItem) => {
    const voiceMsg = `${edu.degree_tilte || edu.degree_type} in ${edu.field_of_study || 'this field'} from ${edu.institution_name}. ${edu.is_current ? 'Currently studying.' : `Graduated in ${edu.graduation_year || 'unknown year'}.`}`;
    
    announce(`Selected ${edu.institution_name} from education collection. ${voiceMsg}`);
    
    if (config.assistant.autoSpeak) {
      speak(voiceMsg);
    }
  };

  // Get unique types for filtering
  const allTypes = [...new Set(education.map(e => e.degree_type))].filter(Boolean);

  // Filter education by type
  const filteredEducation = selectedType === 'all' 
    ? education 
    : education.filter(edu => edu.degree_type === selectedType);

  // Get type color
  const getTypeColor = (type: string) => {
    const colors = {
      'Bachelor': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Master': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Diploma': 'bg-green-500/20 text-green-400 border-green-500/30',
      'High School': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Bootcamp': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Course': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  // Format date range
  const formatDateRange = (startDate: string, endDate: string, isCurrent: boolean) => {
    const start = startDate ? new Date(startDate).getFullYear() : '';
    const end = isCurrent ? 'Present' : endDate ? new Date(endDate).getFullYear() : '';
    return `${start} - ${end}`;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-4 text-cyan-400">Loading education collection...</span>
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
      aria-labelledby="education-collection-heading"
    >
      {/* Skip Link */}
      <a 
        href="#next-section" 
        className="atlas-skip-link"
        onClick={() => announce('Navigating to next section')}
      >
        Skip education collection
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
            id="education-collection-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Educational Journey Collection
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive collection of educational qualifications and academic achievements
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
              All Education ({education.length})
            </button>
            {allTypes.map((type) => {
              const typeCount = education.filter(e => e.degree_type === type).length;
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

        {/* Education Collection Timeline */}
        <div className="space-y-8">
          {filteredEducation.map((edu, index) => (
            <motion.div
              key={`education-collection-${edu.institution_name}-${index}`}
              className="group cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleEducationClick(edu)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleEducationClick(edu);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Education: ${edu.degree_tilte} from ${edu.institution_name}`}
            >
              <div className="relative pl-8 pb-8">
                {/* Timeline line */}
                {index < filteredEducation.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-full bg-slate-600 group-hover:bg-cyan-500/50 transition-colors duration-300" />
                )}
                
                {/* Timeline dot */}
                <div className={`absolute left-2 top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  edu.is_current 
                    ? 'bg-green-500 border-green-400 shadow-lg shadow-green-500/50' 
                    : 'bg-slate-800 border-slate-600 group-hover:border-cyan-500 group-hover:bg-cyan-500/20'
                }`} />

                {/* Education Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/10">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {edu.institution_logo?.url && (
                            <img
                              src={edu.institution_logo.url}
                              alt={edu.institution_name}
                              className="w-12 h-12 object-contain rounded-lg bg-white/10"
                            />
                          )}
                          <div>
                            <h3 className="text-xl font-bold text-white font-orbitron">
                              {edu.institution_name}
                            </h3>
                            {edu.institution_location && (
                              <p className="text-slate-400 text-sm">
                                {edu.institution_location}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Degree and Field */}
                        <div className="mb-3">
                          {edu.degree_tilte && (
                            <h4 className="text-lg font-semibold text-cyan-400">
                              {edu.degree_tilte}
                            </h4>
                          )}
                          {edu.field_of_study && (
                            <p className="text-slate-300">
                              {edu.field_of_study}
                            </p>
                          )}
                        </div>
                        
                        {/* Type and Status */}
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          {edu.degree_type && (
                            <span className={`px-3 py-1 rounded-md text-sm font-medium border ${getTypeColor(edu.degree_type)}`}>
                              {edu.degree_type}
                            </span>
                          )}
                          {edu.is_current && (
                            <span className="px-3 py-1 rounded-md text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                              Currently Studying
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Date Range */}
                      <div className="text-right">
                        <div className="text-slate-300 font-medium">
                          {formatDateRange(edu.start_date!, edu.end_date!, edu.is_current!)}
                        </div>
                        {edu.graduation_year && !edu.is_current && (
                          <div className="text-slate-400 text-sm">
                            Graduated {edu.graduation_year}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Academic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {edu.gpa_score && (
                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                          <div className="text-sm text-slate-400">GPA/Score</div>
                          <div className="text-lg font-bold text-cyan-400">{edu.gpa_score}</div>
                        </div>
                      )}
                      {edu.thesis_title && (
                        <div className="bg-slate-700/30 rounded-lg p-3 md:col-span-2">
                          <div className="text-sm text-slate-400 mb-1">Thesis/Project</div>
                          <div className="text-white font-medium">{edu.thesis_title}</div>
                        </div>
                      )}
                    </div>

                    {/* Thesis Description */}
                    {edu.thesis_description && (
                      <div className="mb-4 p-3 bg-slate-700/20 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Thesis Description</div>
                        <div className="text-slate-300 text-sm">
                          {typeof edu.thesis_description === 'string' 
                            ? edu.thesis_description
                            : 'Detailed thesis description available'
                          }
                        </div>
                      </div>
                    )}

                    {/* Key Achievements */}
                    {edu.key_achievements && (
                      <div className="mb-4 p-3 bg-slate-700/20 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Key Achievements</div>
                        <div className="text-slate-300 text-sm">
                          {typeof edu.key_achievements === 'string' 
                            ? edu.key_achievements
                            : 'Academic achievements and honors'
                          }
                        </div>
                      </div>
                    )}

                    {/* Extracurriculars */}
                    {edu.extracurriculars && (
                      <div className="p-3 bg-slate-700/20 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Extracurricular Activities</div>
                        <div className="text-slate-300 text-sm">
                          {typeof edu.extracurriculars === 'string' 
                            ? edu.extracurriculars
                            : 'Clubs, societies, and activities'
                          }
                        </div>
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
        {filteredEducation.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-slate-400 text-lg">
              No education found in this collection matching the selected type.
            </p>
            <button
              onClick={() => setSelectedType('all')}
              className="mt-4 px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Show All Collection Education
            </button>
          </motion.div>
        )}

        {/* Collection Summary for Screen Readers */}
        <div className="atlas-sr-only" aria-live="polite">
          Education collection showing {filteredEducation.length} qualifications
          {selectedType !== 'all' && ` of type ${selectedType}`}.
          Use tab to navigate through education items and press Enter for details.
        </div>
      </div>
    </section>
  );
};

export default EducationCollection;
