/**
 * ATLAS Enhanced AI Assistant - Prismic Integration
 * Extends the base assistant with dynamic CMS data support
 */

import { Content } from "@prismicio/client";
import { AtlasAssistant, PortfolioData, assistant } from "./assistant";
import { PrismicDataAdapter } from "./prismic-adapter";

export interface EnhancedAssistantResponse {
  response: string;
  action?: 'navigate' | 'speak' | 'search' | 'showcase';
  target?: string;
  suggestions?: string[];
  data?: any;
}

export class EnhancedAtlasAssistant {
  private static instance: EnhancedAtlasAssistant;
  private dynamicData: Partial<PortfolioData> = {};
  private projectNames: Map<string, string> = new Map();
  private skillCategories: Set<string> = new Set();
  private voiceCommands: string[] = [];
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): EnhancedAtlasAssistant {
    if (!EnhancedAtlasAssistant.instance) {
      EnhancedAtlasAssistant.instance = new EnhancedAtlasAssistant();
    }
    return EnhancedAtlasAssistant.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Initialize base assistant
    await assistant.initialize();
    this.isInitialized = true;
  }

  /**
   * Update knowledge base with Prismic CMS data
   */
  public updateKnowledgeBase(pageData: Content.PageDocument): void {
    try {
      // Transform Prismic data to portfolio format
      const transformedData = PrismicDataAdapter.transformPageData(pageData);
      
      // Merge with existing data
      this.dynamicData = {
        ...this.dynamicData,
        ...transformedData
      };

      // Extract project names for voice commands
      if (transformedData.projects) {
        transformedData.projects.forEach(project => {
          this.projectNames.set(project.name.toLowerCase(), project.id);
          // Also map common variations
          const shortName = project.name.split(' ').slice(0, 2).join(' ').toLowerCase();
          this.projectNames.set(shortName, project.id);
        });
      }

      // Extract skill categories
      if (transformedData.skills) {
        transformedData.skills.forEach(skillGroup => {
          this.skillCategories.add(skillGroup.category.toLowerCase());
        });
      }

      // Extract voice commands from Prismic
      this.voiceCommands = PrismicDataAdapter.extractVoiceCommands(pageData);

      // ATLAS knowledge base updated with Prismic data
    } catch (error) {
      console.warn('Failed to update ATLAS knowledge base:', error);
    }
  }

  /**
   * Process user queries with enhanced CMS data awareness
   */
  public processQuery(query: string): EnhancedAssistantResponse {
    const normalizedQuery = query.toLowerCase().trim();

    // Check for specific project names
    const projectMatch = this.matchProjectByName(normalizedQuery);
    if (projectMatch) return projectMatch;

    // Check for skill category queries
    const skillMatch = this.matchSkillCategory(normalizedQuery);
    if (skillMatch) return skillMatch;

    // Check for voice command keywords from Prismic
    const voiceCommandMatch = this.matchVoiceCommand(normalizedQuery);
    if (voiceCommandMatch) return voiceCommandMatch;

    // Enhanced navigation with CMS data
    const navigationMatch = this.matchEnhancedNavigation(normalizedQuery);
    if (navigationMatch) return navigationMatch;

    // Information queries with dynamic data
    const infoMatch = this.matchDynamicInformation(normalizedQuery);
    if (infoMatch) return infoMatch;

    // Fall back to base assistant
    const baseResponse = assistant.processQuery(query);
    return baseResponse;
  }

  /**
   * Match specific project names from CMS
   */
  private matchProjectByName(query: string): EnhancedAssistantResponse | null {
    // Enhanced patterns for project queries
    const showPatterns = ['show', 'tell', 'about', 'open', 'view', 'display', 'describe'];
    const mePatterns = ['me', 'the'];
    
    const hasShowIntent = showPatterns.some(pattern => query.includes(pattern));
    const hasMeIntent = mePatterns.some(pattern => query.includes(pattern));
    
    if (hasShowIntent || hasMeIntent || query.includes('project')) {
      // First check exact project name matches
      for (const [projectName, projectId] of this.projectNames.entries()) {
        if (query.includes(projectName)) {
          const project = this.dynamicData.projects?.find(p => p.id === projectId);
          if (project) {
            return {
              response: `Opening "${project.name}". ${project.description}. This project uses ${project.technologies.slice(0, 3).join(', ')} and more advanced technologies.`,
              action: 'showcase',
              target: `/projects/${projectId}`,
              data: project,
              suggestions: [
                "View live demo",
                "See GitHub repository", 
                "Show me other projects",
                `Tell me more about ${project.technologies[0]}`
              ]
            };
          }
        }
      }
      
      // Then check for partial matches or technology-based queries
      if (this.dynamicData.projects && this.dynamicData.projects.length > 0) {
        // Technology-specific project matching
        const techKeywords = ['react', 'next', 'node', 'python', 'typescript', 'aws', 'docker', 'prismic', 'tailwind'];
        const matchedTech = techKeywords.find(tech => query.includes(tech));
        
        if (matchedTech) {
          const projectsWithTech = this.dynamicData.projects.filter(p => 
            p.technologies.some(t => t.toLowerCase().includes(matchedTech))
          );
          
          if (projectsWithTech.length > 0) {
            const project = projectsWithTech[0]; // Show first matching project
            return {
              response: `Here's a project using ${matchedTech}: "${project.name}". ${project.description}. It also uses ${project.technologies.filter(t => !t.toLowerCase().includes(matchedTech)).slice(0, 2).join(' and ')}.`,
              action: 'showcase',
              target: `/projects/${project.id}`,
              data: project,
              suggestions: [
                `Show more ${matchedTech} projects`,
                "View live demo",
                "See all projects",
                "Tell me about the tech stack"
              ]
            };
          }
        }
        
        // Generic "show projects" or "latest project"
        if (query.includes('latest') || query.includes('recent') || query.includes('newest')) {
          const latestProject = this.dynamicData.projects[0];
          return {
            response: `My latest project is "${latestProject.name}" - ${latestProject.description}. It showcases ${latestProject.technologies.slice(0, 3).join(', ')} and demonstrates modern development practices.`,
            action: 'showcase',
            target: `/projects/${latestProject.id}`,
            data: latestProject,
            suggestions: [
              "View live demo",
              "See GitHub repository", 
              "Show me other recent projects",
              "What technologies were used?"
            ]
          };
        }
      }
    }

    return null;
  }

  /**
   * Match skill categories from CMS
   */
  private matchSkillCategory(query: string): EnhancedAssistantResponse | null {
    for (const category of this.skillCategories) {
      if (query.includes(category)) {
        const skillGroup = this.dynamicData.skills?.find(
          s => s.category.toLowerCase() === category
        );
        
        if (skillGroup) {
          const skillList = skillGroup.items.join(', ');
          return {
            response: `For ${skillGroup.category}, I have expertise in: ${skillList}. These skills have been applied across various projects in the portfolio.`,
            action: 'navigate',
            target: 'skills',
            suggestions: [
              "Show me projects using these skills",
              "What about other skill categories?",
              "Tell me about experience with " + skillGroup.items[0]
            ]
          };
        }
      }
    }

    return null;
  }

  /**
   * Match voice commands from Prismic keywords
   */
  private matchVoiceCommand(query: string): EnhancedAssistantResponse | null {
    for (const command of this.voiceCommands) {
      if (query.includes(command.toLowerCase())) {
        return {
          response: `I understand you're interested in "${command}". Let me help you explore that.`,
          action: 'search',
          target: command,
          suggestions: [
            `Show me more about ${command}`,
            "Navigate to related projects",
            "Tell me about similar topics"
          ]
        };
      }
    }

    return null;
  }

  /**
   * Enhanced navigation with CMS awareness
   */
  private matchEnhancedNavigation(query: string): EnhancedAssistantResponse | null {
    const hasProjects = this.dynamicData.projects && this.dynamicData.projects.length > 0;
    const hasSkills = this.dynamicData.skills && this.dynamicData.skills.length > 0;
    const hasExperience = this.dynamicData.experience && this.dynamicData.experience.length > 0;

    if ((query.includes('project') || query.includes('work')) && hasProjects) {
      const projectCount = this.dynamicData.projects!.length;
      const featuredProjects = this.dynamicData.projects!.slice(0, 3).map(p => p.name).join(', ');
      
      return {
        response: `I have ${projectCount} projects to show you, including ${featuredProjects}. Each demonstrates different technical skills and solutions.`,
        action: 'navigate',
        target: 'projects',
        suggestions: this.dynamicData.projects!.slice(0, 4).map(p => `Show me ${p.name}`)
      };
    }

    if ((query.includes('skill') || query.includes('technology')) && hasSkills) {
      const categories = this.dynamicData.skills!.map(s => s.category).join(', ');
      return {
        response: `My skills are organized into categories: ${categories}. Which area would you like to explore?`,
        action: 'navigate',
        target: 'skills',
        suggestions: this.dynamicData.skills!.map(s => `Show me ${s.category} skills`)
      };
    }

    if ((query.includes('experience') || query.includes('career')) && hasExperience) {
      const latestRole = this.dynamicData.experience![0];
      return {
        response: `Currently working as ${latestRole.position} at ${latestRole.company}. I have ${this.dynamicData.experience!.length} professional experiences to share.`,
        action: 'navigate',
        target: 'experience',
        suggestions: [
          "Tell me more about current role",
          "Show me career progression",
          "What technologies are used at work?"
        ]
      };
    }

    return null;
  }

  /**
   * Match information queries with dynamic CMS data
   */
  private matchDynamicInformation(query: string): EnhancedAssistantResponse | null {
    // Latest/recent projects
    if (query.includes('latest') || query.includes('recent') || query.includes('new')) {
      if (this.dynamicData.projects && this.dynamicData.projects.length > 0) {
        const latestProject = this.dynamicData.projects[0];
        return {
          response: `My latest project is "${latestProject.name}" - ${latestProject.description}. It showcases ${latestProject.technologies.slice(0, 3).join(', ')} and more.`,
          action: 'showcase',
          target: `/projects/${latestProject.id}`,
          data: latestProject,
          suggestions: [
            `Tell me more about ${latestProject.name}`,
            "Show me other recent projects",
            "What technologies were used?"
          ]
        };
      }
    }

    // Count queries
    if (query.includes('how many')) {
      if (query.includes('project') && this.dynamicData.projects) {
        return {
          response: `I have ${this.dynamicData.projects.length} projects in my portfolio, each demonstrating different aspects of my technical expertise.`,
          action: 'navigate',
          target: 'projects'
        };
      }
      if (query.includes('skill') && this.dynamicData.skills) {
        const totalSkills = this.dynamicData.skills.reduce((acc, cat) => acc + cat.items.length, 0);
        return {
          response: `I have expertise in ${totalSkills} different technologies across ${this.dynamicData.skills.length} categories.`,
          action: 'navigate',
          target: 'skills'
        };
      }
    }

    // Technology-specific queries
    if (query.includes('using') || query.includes('with') || query.includes('built')) {
      const techKeywords = ['react', 'next', 'node', 'python', 'typescript', 'aws', 'docker'];
      const matchedTech = techKeywords.find(tech => query.includes(tech));
      
      if (matchedTech && this.dynamicData.projects) {
        const projectsWithTech = this.dynamicData.projects.filter(p => 
          p.technologies.some(t => t.toLowerCase().includes(matchedTech))
        );
        
        if (projectsWithTech.length > 0) {
          const projectNames = projectsWithTech.slice(0, 3).map(p => p.name).join(', ');
          return {
            response: `I've used ${matchedTech} in ${projectsWithTech.length} project${projectsWithTech.length > 1 ? 's' : ''}: ${projectNames}. Would you like to explore any of these?`,
            suggestions: projectsWithTech.slice(0, 3).map(p => `Show me ${p.name}`)
          };
        }
      }
    }

    return null;
  }

  /**
   * Get welcome message with CMS data awareness
   */
  public getWelcomeMessage(): string {
    const projectCount = this.dynamicData.projects?.length || 0;
    const skillCount = this.dynamicData.skills?.reduce((acc, cat) => acc + cat.items.length, 0) || 0;
    
    if (projectCount > 0 && skillCount > 0) {
      return `Hello! I'm ATLAS, your AI assistant. I can help you explore ${projectCount} projects showcasing ${skillCount} technical skills. What would you like to see first?`;
    }
    
    // Fall back to base welcome message
    return assistant.getWelcomeMessage();
  }

  /**
   * Get contextual suggestions based on CMS data
   */
  public getSuggestions(): string[] {
    const suggestions: string[] = [];
    
    // Add project-specific suggestions
    if (this.dynamicData.projects && this.dynamicData.projects.length > 0) {
      suggestions.push(`Show me ${this.dynamicData.projects[0].name}`);
      suggestions.push("What's your latest project?");
    }
    
    // Add skill-specific suggestions
    if (this.dynamicData.skills && this.dynamicData.skills.length > 0) {
      suggestions.push(`Tell me about ${this.dynamicData.skills[0].category} skills`);
    }
    
    // Add experience suggestions
    if (this.dynamicData.experience && this.dynamicData.experience.length > 0) {
      suggestions.push("What's your current role?");
    }
    
    // Add general suggestions
    suggestions.push("Give me a portfolio tour");
    suggestions.push("How can I contact you?");
    
    return suggestions.slice(0, 5);
  }
}

export const enhancedAssistant = EnhancedAtlasAssistant.getInstance();