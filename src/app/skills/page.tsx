import { Metadata } from 'next'
import Skills from '@/slices/Skills'
import { createMockSlice } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'Skills - POWER MATRIX | Alshafaraz Gazi',
  description: 'Comprehensive analysis of technical skills, programming languages, and system proficiencies.',
}

export default function SkillsPage() {
  const mockSliceData = createMockSlice('skills', {});

  return (
    <div className="min-h-screen p-8">
      <Skills slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
    </div>
  );
}