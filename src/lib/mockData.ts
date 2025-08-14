export function createMockSlice(sliceType: string, customData: any = {}) {
  const baseSlice = {
    slice_type: sliceType,
    slice_label: null,
    id: `${sliceType}-1`,
    primary: {},
    items: [],
    variation: 'default',
    ...customData
  };

  switch (sliceType) {
    case 'hero':
      return {
        ...baseSlice,
        primary: {
          title: 'ALSHAFARAZ GAZI',
          subtitle: 'FULL-STACK DEVELOPER & SYSTEM ARCHITECT',
          description: [{ type: 'paragraph', text: 'Arc Reactor Technology Integration Specialist', spans: [] }],
          cta_text: 'ACCESS PROJECTS',
          cta_link: { url: '#projects' },
          ...customData.primary
        }
      };

    case 'about':
      return {
        ...baseSlice,
        primary: {
          title: 'PERSONAL PROFILE',
          subtitle: 'System Analysis & Background',
          description: [
            {
              type: 'paragraph',
              text: 'Advanced full-stack developer with expertise in React, Next.js, and modern web technologies. Specializing in creating scalable applications and intuitive user experiences.',
              spans: []
            }
          ],
          ...customData.primary
        }
      };

    case 'projects':
      return {
        ...baseSlice,
        primary: {
          title: 'MISSION ARCHIVE',
          subtitle: 'Completed Objectives & Deployments',
          ...customData.primary
        },
        items: [
          {
            project_name: 'Arc Reactor Portfolio',
            project_description: 'Tony Stark inspired portfolio with advanced holographic effects',
            project_link: { url: '#' },
            tech_stack: ['Next.js', 'Framer Motion', 'TypeScript']
          },
          {
            project_name: 'Neural Interface',
            project_description: 'AI-powered communication system',
            project_link: { url: '#' },
            tech_stack: ['React', 'Node.js', 'AI/ML']
          },
          ...(customData.items || [])
        ]
      };

    case 'skills':
      return {
        ...baseSlice,
        primary: {
          title: 'POWER ALLOCATION MATRIX',
          subtitle: 'Technical Capabilities & System Specs',
          ...customData.primary
        },
        items: [
          {
            skill_name: 'Frontend Development',
            skill_level: 95,
            skill_description: 'React, Next.js, TypeScript, Tailwind CSS'
          },
          {
            skill_name: 'Backend Development',
            skill_level: 90,
            skill_description: 'Node.js, Express, Database Design'
          },
          {
            skill_name: 'System Architecture',
            skill_level: 85,
            skill_description: 'Scalable solutions, Cloud deployment'
          },
          {
            skill_name: 'UI/UX Design',
            skill_level: 80,
            skill_description: 'User-centered design, Prototyping'
          },
          ...(customData.items || [])
        ]
      };

    case 'education':
      return {
        ...baseSlice,
        primary: {
          title: 'NEURAL LEARNING PROTOCOLS',
          subtitle: 'Knowledge Acquisition & Upgrades',
          ...customData.primary
        },
        items: [
          {
            institution: 'Advanced Technology Institute',
            degree: 'Bachelor of Computer Science',
            duration: '2018 - 2022',
            description: 'Specialized in Software Engineering and AI'
          },
          {
            institution: 'Stark Industries Training',
            degree: 'Arc Reactor Technology Certification',
            duration: '2023',
            description: 'Advanced systems integration'
          },
          ...(customData.items || [])
        ]
      };

    case 'contact':
      return {
        ...baseSlice,
        primary: {
          title: 'COMMUNICATION INTERFACE',
          subtitle: 'Establish Secure Connection',
          description: [
            {
              type: 'paragraph',
              text: 'Ready to collaborate on your next project? Initiate contact protocol below.',
              spans: []
            }
          ],
          ...customData.primary
        }
      };

    default:
      return baseSlice;
  }
}

export const mockLinkedInData = {
  name: 'Alshafaraz Hussain Gazi',
  title: 'Full-Stack Developer & System Architect',
  location: 'Wellington, New Zealand',
  summary: 'Passionate full-stack developer with expertise in modern web technologies, specializing in React, Next.js, and scalable system architecture.',
  experience: [
    {
      company: 'Tech Innovations Ltd',
      position: 'Senior Full-Stack Developer',
      duration: '2022 - Present',
      description: 'Leading development of enterprise applications using React, Next.js, and cloud technologies.'
    }
  ],
  skills: [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'Prismic CMS', 'Tailwind CSS', 'Framer Motion'
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Computer Science',
      duration: '2018 - 2022'
    }
  ]
};