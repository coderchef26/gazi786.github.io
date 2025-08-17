/**
 * ATLAS AI Assistant - Production Implementation
 * Natural Language Portfolio Assistant
 */

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    experience: string;
    location: string;
    summary: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
    description?: string;
  }[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    website: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Alshafaraz Gazi",
    title: "Full-Stack Developer & System Architect",
    experience: "5+ years",
    location: "Available worldwide",
    summary: "Passionate full-stack developer specializing in React, Node.js, and modern web technologies with a focus on creating scalable, user-friendly applications."
  },
  skills: [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend", 
      items: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      category: "DevOps",
      items: ["AWS", "Docker", "Git", "CI/CD", "Vercel"]
    },
    {
      category: "Tools",
      items: ["VS Code", "Figma", "Postman", "Jest", "Prisma"]
    }
  ],
  projects: [
    {
      id: "ecommerce",
      name: "E-commerce Platform",
      description: "Full-featured e-commerce solution with payment processing, inventory management, and admin dashboard",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"]
    },
    {
      id: "taskmanager", 
      name: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"]
    },
    {
      id: "chatapp",
      name: "Real-time Chat Application", 
      description: "Secure messaging platform with end-to-end encryption and multimedia support",
      technologies: ["React", "Express.js", "Socket.io", "MongoDB", "JWT"]
    }
  ],
  experience: [
    {
      company: "TechCorp Solutions",
      position: "Senior Full-Stack Developer",
      duration: "2022 - Present",
      description: "Lead development of enterprise web applications serving 10,000+ users"
    },
    {
      company: "StartupHub",
      position: "Full-Stack Developer", 
      duration: "2020 - 2022",
      description: "Built scalable web applications from concept to deployment"
    }
  ],
  education: [
    {
      institution: "University of Technology",
      degree: "Bachelor's in Computer Science",
      year: "2018-2022",
      description: "Graduated with honors, specializing in software engineering"
    },
    {
      institution: "Code Academy",
      degree: "Full-Stack Web Development Certification",
      year: "2022"
    }
  ],
  contact: {
    email: "alshafaraz@example.com",
    linkedin: "linkedin.com/in/alshafaraz-gazi",
    github: "github.com/gazi786",
    website: "alshafaraz.dev"
  }
};

export class AtlasAssistant {
  private static instance: AtlasAssistant;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): AtlasAssistant {
    if (!AtlasAssistant.instance) {
      AtlasAssistant.instance = new AtlasAssistant();
    }
    return AtlasAssistant.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Warm up the assistant
    await this.loadKnowledgeBase();
    this.isInitialized = true;
  }

  private async loadKnowledgeBase(): Promise<void> {
    // Simulate loading time for knowledge base
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  public processQuery(query: string): {
    response: string;
    action?: 'navigate' | 'speak' | 'search';
    target?: string;
    suggestions?: string[];
  } {
    const normalizedQuery = query.toLowerCase().trim();

    // Navigation intents
    const navigationMatches = this.matchNavigation(normalizedQuery);
    if (navigationMatches) return navigationMatches;

    // Information queries
    const infoMatches = this.matchInformation(normalizedQuery);
    if (infoMatches) return infoMatches;

    // Help and assistance
    const helpMatches = this.matchHelp(normalizedQuery);
    if (helpMatches) return helpMatches;

    // Accessibility commands
    const accessibilityMatches = this.matchAccessibility(normalizedQuery);
    if (accessibilityMatches) return accessibilityMatches;

    // Default response
    return {
      response: "I'd be happy to help you explore Alshafaraz's portfolio! You can ask me about his projects, skills, experience, or ask me to navigate to any section. Try saying 'show me the projects' or 'tell me about his skills'.",
      suggestions: [
        "Show me the projects",
        "What are his skills?", 
        "Tell me about his experience",
        "Navigate to contact section"
      ]
    };
  }

  private matchNavigation(query: string) {
    const navigationMap = {
      'projects': ['project', 'work', 'portfolio', 'build', 'created'],
      'skills': ['skill', 'technology', 'tech', 'programming', 'language', 'framework'],
      'about': ['about', 'profile', 'background', 'bio', 'personal'],
      'experience': ['experience', 'work', 'job', 'career', 'employment'],
      'education': ['education', 'study', 'university', 'degree', 'learning'],
      'contact': ['contact', 'reach', 'connect', 'email', 'linkedin']
    };

    for (const [section, keywords] of Object.entries(navigationMap)) {
      if (keywords.some(keyword => query.includes(keyword)) && 
          (query.includes('show') || query.includes('go') || query.includes('navigate') || query.includes('take'))) {
        return {
          response: `I'm taking you to the ${section} section. ${this.getSectionDescription(section)}`,
          action: 'navigate' as const,
          target: section
        };
      }
    }

    return null;
  }

  private matchInformation(query: string) {
    // Skills query
    if (query.includes('skill') || query.includes('technology') || query.includes('tech')) {
      const skills = portfolioData.skills.map(cat => 
        `${cat.category}: ${cat.items.slice(0, 3).join(', ')}`
      ).join('. ');
      
      return {
        response: `Alshafaraz's technical skills include: ${skills}. Would you like me to show you the full skills section?`,
        suggestions: ["Show me all skills", "What about his projects?"]
      };
    }

    // Experience query
    if (query.includes('experience') || query.includes('work') || query.includes('job')) {
      return {
        response: `Alshafaraz has ${portfolioData.personal.experience} of professional experience. He's currently a ${portfolioData.experience[0].position} at ${portfolioData.experience[0].company}. Would you like to see his full work history?`,
        suggestions: ["Show me his experience", "What projects has he worked on?"]
      };
    }

    // Projects query
    if (query.includes('project') || query.includes('build') || query.includes('created')) {
      const projects = portfolioData.projects.slice(0, 2).map(p => p.name).join(' and ');
      return {
        response: `Some of Alshafaraz's notable projects include ${projects}. These showcase his skills in modern web development. Would you like to explore his project portfolio?`,
        action: 'navigate' as const,
        target: 'projects'
      };
    }

    return null;
  }

  private matchHelp(query: string) {
    if (query.includes('help') || query.includes('assist') || query.includes('guide')) {
      return {
        response: "I'm ATLAS, your AI guide through Alshafaraz's portfolio. I can: 1) Navigate to different sections, 2) Answer questions about his work, 3) Read content aloud, 4) Provide accessibility support. What would you like to explore?",
        suggestions: [
          "Show me his projects",
          "What are his skills?",
          "Tell me about his experience",
          "Read the about section"
        ]
      };
    }

    return null;
  }

  private matchAccessibility(query: string) {
    if (query.includes('read') || query.includes('speak') || query.includes('aloud')) {
      return {
        response: "I can read any content on the page aloud. Just specify what you'd like me to read, like 'read the about section' or 'read his project descriptions'. I can also adjust my voice settings if needed.",
        action: 'speak' as const,
        suggestions: [
          "Read the about section",
          "Read his skills",
          "Read project descriptions"
        ]
      };
    }

    return null;
  }

  private getSectionDescription(section: string): string {
    const descriptions = {
      projects: "Here you'll find detailed information about his development projects and technical implementations.",
      skills: "This section showcases his technical expertise across frontend, backend, and DevOps technologies.",
      about: "Learn more about his background, experience, and passion for development.",
      experience: "Explore his professional journey and career achievements.",
      education: "Discover his educational background and continuous learning path.",
      contact: "Find all the ways to connect with him for opportunities and collaborations."
    };

    return descriptions[section as keyof typeof descriptions] || "";
  }

  public getWelcomeMessage(): string {
    return `Hello! I'm ATLAS, your AI assistant for exploring ${portfolioData.personal.name}'s portfolio. I can help you navigate, answer questions about his work, and provide accessibility support. How can I assist you today?`;
  }

  public getSuggestions(): string[] {
    return [
      "Show me his projects",
      "What technologies does he know?",
      "Tell me about his experience", 
      "Navigate to contact section",
      "Read the about section aloud"
    ];
  }
}

export const assistant = AtlasAssistant.getInstance();