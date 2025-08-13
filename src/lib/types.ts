import { Content, KeyTextField, RichTextField, ImageField, LinkField } from "@prismicio/client";

export interface ProjectDocument {
  uid: string;
  data: {
    title: KeyTextField;
    description: RichTextField;
    image: ImageField;
    github_link: LinkField;
    demo_link: LinkField;
    technologies: KeyTextField[];
    featured: boolean;
  };
}

export interface PageDocument {
  uid: string;
  data: {
    title: KeyTextField;
    slices: Content.AllSlices[];
  };
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}