/**
 * ATLAS Prismic Data Adapter
 * Transforms Prismic CMS data into ATLAS Assistant format
 */

import { Content } from "@prismicio/client";
import { PortfolioData } from "./assistant";

export interface PrismicSkillData {
  skill_name?: string;
  skill_category?: string;
  skill_type?: string;
  proficiency_level?: string;
  proficiency_percentage?: number;
  years_experience?: number;
  skill_description?: any;
  voice_description?: string;
  skill_keywords?: string;
  importance_rank?: number;
  environment?: string;
  is_featured?: boolean;
}

export interface PrismicProjectData {
  project_title?: string;
  project_slug?: string;
  project_tagline?: string;
  project_description?: any;
  project_status?: string;
  technologies?: Array<{
    tech_name?: string;
    tech_category?: string;
  }>;
  live_url?: any;
  github_url?: any;
  voice_summary?: string;
  ai_keywords?: string;
  is_featured?: string;
}

export interface PrismicExperienceData {
  company_name?: string;
  job_title?: string;
  work_type?: string;
  work_model?: string;
  seniority_level?: string;
  startdate?: string;
  enddate?: string;
  is_current?: boolean;
  role_summary?: any;
  voice_summary?: string;
  role_keywords?: string;
  impact_score?: number;
}

export interface PrismicEducationData {
  institution_name?: string;
  degree_title?: string;
  field_of_study?: string;
  degree_type?: string;
  graduation_year?: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  thesis_title?: string;
  thesis_description?: any;
}

export class PrismicDataAdapter {
  /**
   * Transform Prismic skills data to ATLAS format
   */
  static transformSkills(skillsSlice: Content.SkillsSlice): PortfolioData['skills'] {
    const skills: PortfolioData['skills'] = [];
    const categoryMap = new Map<string, string[]>();

    try {
      // Handle current individual field structure
      if (skillsSlice.primary && 'skill_name' in skillsSlice.primary) {
        const skill = skillsSlice.primary as any;
        if (skill.skill_name) {
          const category = skill.skill_category || 'General';
          const skillName = skill.skill_name;
          
          if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
          }
          categoryMap.get(category)!.push(skillName);
        }
      }

      // Handle future repeatable group structure
      if (skillsSlice.primary && 'skill' in skillsSlice.primary && Array.isArray(skillsSlice.primary.skill)) {
        const skillGroups = skillsSlice.primary.skill as PrismicSkillData[];
        
        skillGroups.forEach((skill) => {
          if (skill.skill_name) {
            const category = skill.skill_category || 'General';
            const skillName = skill.skill_name;
            
            if (!categoryMap.has(category)) {
              categoryMap.set(category, []);
            }
            categoryMap.get(category)!.push(skillName);
          }
        });
      }

      // Convert map to array format
      categoryMap.forEach((items, category) => {
        skills.push({
          category,
          items
        });
      });

      return skills;
    } catch (error) {
      console.warn('Error transforming skills data:', error);
      return [{ category: 'General', items: ['Various technical skills'] }];
    }
  }

  /**
   * Transform Prismic projects data to ATLAS format
   */
  static transformProjects(projectsSlice: Content.ProjectsSlice): PortfolioData['projects'] {
    const projects: PortfolioData['projects'] = [];

    try {
      // Handle current individual field structure
      if (projectsSlice.primary && 'project_title' in projectsSlice.primary) {
        const project = projectsSlice.primary as any;
        if (project.project_title) {
          const technologies = project.technologies 
            ? project.technologies.map((tech: any) => tech.tech_name).filter(Boolean)
            : [];

          projects.push({
            id: project.project_slug || project.project_title.toLowerCase().replace(/\s+/g, '-'),
            name: project.project_title,
            description: project.project_tagline || this.extractTextFromStructuredField(project.project_description) || 'No description available',
            technologies,
            url: project.live_url?.url,
            github: project.github_url?.url
          });
        }
      }

      // Handle future repeatable group structure
      if (projectsSlice.primary && 'project' in projectsSlice.primary && Array.isArray(projectsSlice.primary.project)) {
        const projectGroups = projectsSlice.primary.project as PrismicProjectData[];
        
        projectGroups.forEach((project) => {
          if (project.project_title) {
            const technologies = project.technologies 
              ? project.technologies.map(tech => tech.tech_name).filter(Boolean)
              : [];

            projects.push({
              id: project.project_slug || project.project_title.toLowerCase().replace(/\s+/g, '-'),
              name: project.project_title,
              description: project.project_tagline || this.extractTextFromStructuredField(project.project_description) || 'No description available',
              technologies: technologies.filter((tech): tech is string => tech !== undefined),
              url: project.live_url?.url,
              github: project.github_url?.url
            });
          }
        });
      }

      return projects;
    } catch (error) {
      console.warn('Error transforming projects data:', error);
      return [];
    }
  }

  /**
   * Transform Prismic experience data to ATLAS format
   */
  static transformExperience(experienceSlice: Content.ExperienceSlice): PortfolioData['experience'] {
    const experience: PortfolioData['experience'] = [];

    try {
      // Handle current individual field structure
      if (experienceSlice.primary && 'company_name' in experienceSlice.primary) {
        const exp = experienceSlice.primary as any;
        if (exp.company_name) {
          const duration = this.formatDateRange(exp.startdate, exp.enddate, exp.is_current);
          
          experience.push({
            company: exp.company_name,
            position: exp.job_title || 'Developer',
            duration,
            description: this.extractTextFromStructuredField(exp.role_summary) || 'Professional experience in software development'
          });
        }
      }

      // Handle future repeatable group structure
      if (experienceSlice.primary && 'experience' in experienceSlice.primary && Array.isArray(experienceSlice.primary.experience)) {
        const expGroups = experienceSlice.primary.experience as PrismicExperienceData[];
        
        expGroups.forEach((exp) => {
          if (exp.company_name) {
            const duration = this.formatDateRange(exp.startdate, exp.enddate, exp.is_current);
            
            experience.push({
              company: exp.company_name,
              position: exp.job_title || 'Developer',
              duration,
              description: this.extractTextFromStructuredField(exp.role_summary) || 'Professional experience in software development'
            });
          }
        });
      }

      return experience;
    } catch (error) {
      console.warn('Error transforming experience data:', error);
      return [];
    }
  }

  /**
   * Transform Prismic education data to ATLAS format
   */
  static transformEducation(educationSlice: Content.EducationSlice): PortfolioData['education'] {
    const education: PortfolioData['education'] = [];

    try {
      // Handle current individual field structure
      if (educationSlice.primary && 'institution_name' in educationSlice.primary) {
        const edu = educationSlice.primary as any;
        if (edu.institution_name) {
          education.push({
            institution: edu.institution_name,
            degree: edu.degree_title || edu.field_of_study || 'Degree',
            year: edu.graduation_year || this.formatDateRange(edu.start_date, edu.end_date, edu.is_current),
            description: this.extractTextFromStructuredField(edu.thesis_description) || edu.thesis_title
          });
        }
      }

      // Handle future repeatable group structure
      if (educationSlice.primary && 'education' in educationSlice.primary && Array.isArray(educationSlice.primary.education)) {
        const eduGroups = educationSlice.primary.education as PrismicEducationData[];
        
        eduGroups.forEach((edu) => {
          if (edu.institution_name) {
            education.push({
              institution: edu.institution_name,
              degree: edu.degree_title || edu.field_of_study || 'Degree',
              year: edu.graduation_year || this.formatDateRange(edu.start_date, edu.end_date, edu.is_current),
              description: this.extractTextFromStructuredField(edu.thesis_description) || edu.thesis_title
            });
          }
        });
      }

      return education;
    } catch (error) {
      console.warn('Error transforming education data:', error);
      return [];
    }
  }

  /**
   * Extract plain text from Prismic structured text field
   */
  private static extractTextFromStructuredField(field: any): string {
    if (!field) return '';
    
    if (typeof field === 'string') {
      return field;
    }
    
    if (Array.isArray(field)) {
      return field.map(block => {
        if (block.type === 'paragraph' && block.text) {
          return block.text;
        }
        return '';
      }).filter(Boolean).join(' ');
    }
    
    return '';
  }

  /**
   * Format date range for display
   */
  private static formatDateRange(startDate?: string, endDate?: string, isCurrent?: boolean): string {
    const formatDate = (dateStr?: string) => {
      if (!dateStr) return '';
      try {
        const date = new Date(dateStr);
        return date.getFullYear().toString();
      } catch {
        return dateStr;
      }
    };

    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);

    if (start && end) {
      return `${start} - ${end}`;
    } else if (start) {
      return start;
    } else if (end && end !== 'Present') {
      return end;
    }

    return 'Date range not specified';
  }

  /**
   * Transform complete page data to ATLAS portfolio format
   */
  static transformPageData(pageData: Content.PageDocument): Partial<PortfolioData> {
    const transformedData: Partial<PortfolioData> = {};

    if (pageData.data.slices) {
      pageData.data.slices.forEach((slice) => {
        switch (slice.slice_type) {
          case 'skills':
            transformedData.skills = this.transformSkills(slice as Content.SkillsSlice);
            break;
          case 'projects':
            transformedData.projects = this.transformProjects(slice as Content.ProjectsSlice);
            break;
          case 'experience':
            transformedData.experience = this.transformExperience(slice as Content.ExperienceSlice);
            break;
          case 'education':
            transformedData.education = this.transformEducation(slice as Content.EducationSlice);
            break;
        }
      });
    }

    return transformedData;
  }

  /**
   * Extract voice commands and keywords from Prismic data
   */
  static extractVoiceCommands(pageData: Content.PageDocument): string[] {
    const commands: string[] = [];

    if (pageData.data.slices) {
      pageData.data.slices.forEach((slice) => {
        switch (slice.slice_type) {
          case 'skills':
            const skillsSlice = slice as Content.SkillsSlice;
            if (skillsSlice.primary && 'skill_keywords' in skillsSlice.primary) {
              const keywords = (skillsSlice.primary as any).skill_keywords;
              if (keywords) {
                commands.push(...keywords.split(',').map((k: string) => k.trim()));
              }
            }
            break;
          case 'projects':
            const projectsSlice = slice as Content.ProjectsSlice;
            if (projectsSlice.primary && 'ai_keywords' in projectsSlice.primary) {
              const keywords = (projectsSlice.primary as any).ai_keywords;
              if (keywords) {
                commands.push(...keywords.split(',').map((k: string) => k.trim()));
              }
            }
            break;
        }
      });
    }

    return [...new Set(commands)]; // Remove duplicates
  }
}