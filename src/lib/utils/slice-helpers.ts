/**
 * Slice Helper Utilities
 * Common data extraction and manipulation functions for all slice types
 * Eliminates repeated utility code across slice components
 */

import { isFilled } from '@prismicio/client';

// Common data extraction patterns
export const sliceHelpers = {
  /**
   * Safely extract text from Prismic fields
   */
  extractText: (field: any): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (isFilled.keyText(field)) return field;
    return '';
  },

  /**
   * Safely extract rich text as plain text
   */
  extractRichText: (field: any): string => {
    try {
      if (!field) return '';
      
      // Handle array rich text (Prismic format)
      if (Array.isArray(field) && isFilled.richText(field)) {
        return field.map((block: any) => block?.text || '').join(' ');
      }
      
      // Handle string fields
      if (typeof field === 'string') {
        return field;
      }
      
      // Handle object with text property
      if (field && typeof field === 'object' && field.text) {
        return field.text;
      }
      
      return '';
    } catch (error) {
      console.warn('Error extracting rich text:', error);
      return '';
    }
  },

  /**
   * Extract image with fallback
   */
  extractImage: (field: any) => {
    if (!field || !isFilled.image(field)) return null;
    return {
      src: field.url,
      alt: field.alt || 'Image',
      width: field.dimensions?.width,
      height: field.dimensions?.height,
    };
  },

  /**
   * Extract link with fallback
   */
  extractLink: (field: any) => {
    if (!field || !isFilled.link(field)) return null;
    return {
      url: field.url,
      target: '_blank', // Always open in new tab for external links
      text: 'Learn More',
    };
  },

  /**
   * Extract date and format it
   */
  extractDate: (field: any): { raw: string; formatted: string } | null => {
    if (!field || !isFilled.date(field)) return null;
    const date = new Date(field);
    return {
      raw: field,
      formatted: date.toLocaleDateString('en-NZ', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      }),
    };
  },

  /**
   * Create unique categories from items
   */
  extractCategories: <T>(
    items: T[], 
    categoryKey: keyof T,
    transform?: (value: any) => string
  ): string[] => {
    const categories = items
      .map(item => item[categoryKey])
      .filter(Boolean)
      .map(cat => transform ? transform(cat) : sliceHelpers.extractText(cat))
      .filter(Boolean);
    
    return [...new Set(categories)].sort();
  },

  /**
   * Filter items by category
   */
  filterByCategory: <T>(
    items: T[],
    categoryKey: keyof T,
    filterValue: string,
    transform?: (value: any) => string
  ): T[] => {
    if (filterValue === 'all') return items;
    
    return items.filter(item => {
      const categoryValue = item[categoryKey];
      const processed = transform ? transform(categoryValue) : sliceHelpers.extractText(categoryValue);
      return processed === filterValue;
    });
  },

  /**
   * Create category color mapping for education/experience types
   */
  getCategoryColor: (category: string, colorMap?: Record<string, string>): string => {
    const defaultColors: Record<string, string> = {
      'Bachelor': 'from-blue-500 to-blue-600',
      'Master': 'from-purple-500 to-purple-600', 
      'PhD': 'from-red-500 to-red-600',
      'Certificate': 'from-green-500 to-green-600',
      'Diploma': 'from-orange-500 to-orange-600',
      'Full-time': 'from-blue-500 to-blue-600',
      'Part-time': 'from-green-500 to-green-600',
      'Contract': 'from-orange-500 to-orange-600',
      'Freelance': 'from-purple-500 to-purple-600',
      'Internship': 'from-cyan-500 to-cyan-600',
      'default': 'from-slate-500 to-slate-600',
    };
    
    const colors = { ...defaultColors, ...colorMap };
    return colors[category] || colors.default;
  },

  /**
   * Create technology color mapping
   */
  getTechnologyColor: (tech: string): string => {
    const colorMap: Record<string, string> = {
      'React': 'from-blue-500 to-cyan-500',
      'Next.js': 'from-gray-800 to-gray-900',
      'TypeScript': 'from-blue-600 to-blue-800',
      'JavaScript': 'from-yellow-400 to-yellow-600',
      'Python': 'from-green-500 to-blue-600',
      'Node.js': 'from-green-600 to-green-800',
      'Vue.js': 'from-green-400 to-green-600',
      'Angular': 'from-red-500 to-red-700',
      'PHP': 'from-indigo-500 to-purple-600',
      'Java': 'from-orange-500 to-red-600',
      'C#': 'from-purple-500 to-purple-700',
      'Go': 'from-cyan-500 to-blue-500',
      'Rust': 'from-orange-600 to-red-600',
      'Swift': 'from-orange-400 to-red-500',
      'Kotlin': 'from-purple-400 to-indigo-600',
      'default': 'from-slate-500 to-slate-700',
    };
    
    return colorMap[tech] || colorMap.default;
  },

  /**
   * Create skill level mapping
   */
  getSkillLevel: (level: string): { label: string; width: string; color: string } => {
    const levels: Record<string, { label: string; width: string; color: string }> = {
      'Beginner': { label: 'Beginner', width: '25%', color: 'from-red-500 to-orange-500' },
      'Intermediate': { label: 'Intermediate', width: '50%', color: 'from-orange-500 to-yellow-500' },
      'Advanced': { label: 'Advanced', width: '75%', color: 'from-yellow-500 to-green-500' },
      'Expert': { label: 'Expert', width: '100%', color: 'from-green-500 to-cyan-500' },
    };
    
    return levels[level] || levels.Beginner;
  },

  /**
   * Format date range for display
   */
  formatDateRange: (
    startDate: string, 
    endDate: string, 
    isCurrent: boolean = false, 
    locale: string = 'en-NZ', 
    options: { yearOnly?: boolean } = {}
  ): string => {
    if (!startDate) return '';
    
    const formatOptions: Intl.DateTimeFormatOptions = options.yearOnly 
      ? { year: 'numeric' }
      : { year: 'numeric', month: 'short' };
    
    const start = new Date(startDate).toLocaleDateString(locale, formatOptions);
    
    if (isCurrent) {
      return `${start} - Present`;
    }
    
    if (!endDate) return start;
    
    const end = new Date(endDate).toLocaleDateString(locale, formatOptions);
    return `${start} - ${end}`;
  },

  /**
   * Format duration (for experience/education)
   */
  formatDuration: (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  },

  /**
   * Check if item is recent (within last 2 years)
   */
  isRecent: (date: string): boolean => {
    const itemDate = new Date(date);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    return itemDate > twoYearsAgo;
  },

  /**
   * Sort items by date (newest first)
   */
  sortByDate: <T>(items: T[], dateKey: keyof T): T[] => {
    return [...items].sort((a, b) => {
      const dateA = new Date(String(a[dateKey]));
      const dateB = new Date(String(b[dateKey]));
      return dateB.getTime() - dateA.getTime();
    });
  },
};