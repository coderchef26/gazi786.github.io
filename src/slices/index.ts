import { HeroSlice } from './Hero'
import { AboutSlice } from './About'
import { ProjectsSlice } from './Projects'
import { SkillsSlice } from './Skills'
import { EducationSlice } from './Education'
import { ContactSlice } from './Contact'

// Export components for use in other parts of the app
export { HeroSlice, AboutSlice, ProjectsSlice, SkillsSlice, EducationSlice, ContactSlice }

// Export types
export type { HeroSliceProps } from './Hero'
export type { AboutSliceProps } from './About'
export type { ProjectsSliceProps, Project } from './Projects'
export type { SkillsSliceProps, Skill, SkillCategory } from './Skills'
export type { EducationSliceProps, Education } from './Education'
export type { ContactSliceProps } from './Contact'

// Components object for SliceZone
export const components = {
  hero: HeroSlice,
  about: AboutSlice,
  projects: ProjectsSlice,
  skills: SkillsSlice,
  education: EducationSlice,
  contact: ContactSlice,
}