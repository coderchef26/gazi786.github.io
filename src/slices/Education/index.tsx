"use client";

import { FC, useState, useMemo } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaTrophy, FaBook, FaAward } from "react-icons/fa";

import SliceContainer from "@/components/slice-internals/SliceContainer";
import FilterButtons from "@/components/slice-internals/FilterButtons";
import { useSliceAtlas } from "@/hooks/useSliceAtlas";
import { componentStyles } from "@/lib/theme/components";
import { themeColors, themeEffects } from "@/lib/theme/colors";
import { animationPresets } from "@/lib/animations/slice-animations";
import { sliceHelpers } from "@/lib/utils/slice-helpers";

/**
 * Props for `Education`.
 */
export type EducationProps = SliceComponentProps<Content.EducationSlice>;

interface EducationItem {
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
 * Component for "Education" Slices - Collection of Education with Repeatable Zones.
 */
const Education: FC<EducationProps> = ({ slice }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const { announceSlice } = useSliceAtlas();

  // Extract education items from Prismic
  const education = useMemo(() => {
    if (!slice?.items) return [];
    
    return slice.items
      .filter((item: any) => item.institution_name)
      .map((item: any) => ({
        institution_name: sliceHelpers.extractText(item.institution_name),
        institution_logo: sliceHelpers.extractImage(item.institution_logo),
        institution_location: sliceHelpers.extractText(item.institution_location),
        degree_type: sliceHelpers.extractText(item.degree_type),
        degree_tilte: sliceHelpers.extractText(item.degree_tilte),
        field_of_study: sliceHelpers.extractText(item.field_of_study),
        start_date: sliceHelpers.extractText(item.start_date),
        end_date: sliceHelpers.extractText(item.end_date),
        is_current: item.is_current === true,
        graduation_year: sliceHelpers.extractText(item.graduation_year),
        gpa_score: sliceHelpers.extractText(item.gpa_score),
        thesis_title: sliceHelpers.extractText(item.thesis_title),
        thesis_description: sliceHelpers.extractRichText(item.thesis_description),
        relevant_coursework: sliceHelpers.extractText(item.relevant_coursework),
        key_achievements: sliceHelpers.extractRichText(item.key_achievements),
        extracurriculars: sliceHelpers.extractRichText(item.extracurriculars)
      }))
      .sort((a, b) => {
        // Sort by end date (recent first), then by current status
        if (a.is_current && !b.is_current) return -1;
        if (!a.is_current && b.is_current) return 1;
        const dateA = new Date(a.end_date || a.graduation_year || '');
        const dateB = new Date(b.end_date || b.graduation_year || '');
        return dateB.getTime() - dateA.getTime();
      });
  }, [slice]);

  // Get degree types for filtering
  const degreeTypes = useMemo(() => {
    const types = sliceHelpers.extractCategories(education, 'degree_type');
    return ['all', ...types];
  }, [education]);

  // Filter education based on selected type
  const filteredEducation = useMemo(() => {
    if (selectedType === 'all') return education;
    return education.filter(edu => edu.degree_type === selectedType);
  }, [education, selectedType]);

  // Announce slice load for accessibility
  if (typeof window !== 'undefined' && education.length > 0) {
    announceSlice(`Education section loaded with ${education.length} qualifications`);
  }

  // Get type color using shared helper
  const getTypeColor = (type?: string) => {
    return sliceHelpers.getCategoryColor(type || '', {
      'Bachelor': 'blue',
      'Master': 'purple',
      'PhD': 'red',
      'Diploma': 'green',
      'Certificate': 'yellow',
      'Bootcamp': 'orange',
      'Course': 'pink'
    });
  };

  // Format date range
  const formatDateRange = (startDate?: string, endDate?: string, isCurrent?: boolean) => {
    return sliceHelpers.formatDateRange(startDate || '', endDate || '', isCurrent || false, 'en-NZ', { yearOnly: true });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceContainer
        title="Educational Journey"
        subtitle="Academic qualifications and continuous learning achievements"
        isEmpty={education.length === 0}
        emptyStateConfig={{
          title: 'No Education Data',
          description: 'Education information will appear here once added.'
        }}
      >
        {/* Filter Buttons */}
        {degreeTypes.length > 2 && (
          <FilterButtons
            categories={degreeTypes}
            activeFilter={selectedType}
            onFilterChange={setSelectedType}
          />
        )}

        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />

          <div className="space-y-12">
            {filteredEducation.map((edu, index) => (
              <motion.div
                key={`edu-${index}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={animationPresets.sliceSection.item}
                className="relative pl-20"
              >
                {/* Timeline Node */}
                <div className="absolute left-5 w-6 h-6 bg-slate-900 border-2 border-cyan-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                </div>

                {/* Education Card */}
                <div className={`p-6 rounded-xl bg-gradient-to-br ${themeColors.cardBg} ${themeEffects.backdropBlur} ${themeColors.border} border ${themeEffects.transition} hover:${themeColors.borderHover} hover:shadow-lg hover:shadow-cyan-500/10`}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Institution Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className={`${componentStyles.subheading} mb-1`}>
                            {edu.degree_tilte || edu.degree_type || 'Degree'}
                          </h3>
                          <p className={`${themeColors.primary} text-lg`}>
                            {edu.field_of_study}
                          </p>
                        </div>
                        
                        {edu.degree_type && (
                          <span className={`px-3 py-1 text-sm rounded-full bg-${getTypeColor(edu.degree_type)}-500/20 text-${getTypeColor(edu.degree_type)}-400 border border-${getTypeColor(edu.degree_type)}-500/30`}>
                            {edu.degree_type}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className={`flex items-center gap-2 ${themeColors.secondary}`}>
                          <FaGraduationCap className="w-4 h-4" />
                          <span>{edu.institution_name}</span>
                        </div>
                        
                        {edu.institution_location && (
                          <div className={`flex items-center gap-2 ${themeColors.secondary}`}>
                            <FaMapMarkerAlt className="w-4 h-4" />
                            <span>{edu.institution_location}</span>
                          </div>
                        )}
                        
                        <div className={`flex items-center gap-2 ${themeColors.secondary}`}>
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{formatDateRange(edu.start_date, edu.end_date, edu.is_current)}</span>
                          {edu.is_current && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Academic Details Grid */}
                      {(edu.gpa_score || edu.thesis_title) && (
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
                      )}

                      {/* Achievements */}
                      {edu.key_achievements && (
                        <div className="mb-4">
                          <div className={`flex items-center gap-2 mb-2 ${themeColors.primary}`}>
                            <FaTrophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Key Achievements</span>
                          </div>
                          <div className={`${themeColors.secondary} text-sm pl-6`}>
                            {edu.key_achievements}
                          </div>
                        </div>
                      )}

                      {/* Relevant Coursework */}
                      {edu.relevant_coursework && (
                        <div className="mb-4">
                          <div className={`flex items-center gap-2 mb-2 ${themeColors.primary}`}>
                            <FaBook className="w-4 h-4" />
                            <span className="text-sm font-medium">Relevant Coursework</span>
                          </div>
                          <div className={`${themeColors.secondary} text-sm pl-6`}>
                            {edu.relevant_coursework}
                          </div>
                        </div>
                      )}

                      {/* Extracurriculars */}
                      {edu.extracurriculars && (
                        <div>
                          <div className={`flex items-center gap-2 mb-2 ${themeColors.primary}`}>
                            <FaAward className="w-4 h-4" />
                            <span className="text-sm font-medium">Extracurricular Activities</span>
                          </div>
                          <div className={`${themeColors.secondary} text-sm pl-6`}>
                            {edu.extracurriculars}
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

export default Education;