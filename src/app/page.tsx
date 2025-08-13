import { HeroSlice, AboutSlice, ProjectsSlice, SkillsSlice, EducationSlice, ContactSlice } from '@/slices'

export default function Home() {
  return (
    <div>
      <HeroSlice />
      <AboutSlice />
      <ProjectsSlice />
      <SkillsSlice />
      <EducationSlice />
      <ContactSlice />
    </div>
  );
}
