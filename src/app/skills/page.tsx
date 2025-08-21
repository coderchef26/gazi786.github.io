"use client";

import Skills from '@/slices/Skills'
import { createMockSlice } from '@/lib/mockData'
import AtlasProvider from '@/components/atlas/AtlasProvider'

export default function SkillsPage() {
  const mockSliceData = createMockSlice('skills', {});

  const handleNavigation = (section: string) => {
    if (section && section !== 'skills') {
      window.location.href = `/${section}`;
    }
  };

  return (
    <AtlasProvider onNavigate={handleNavigation}>
      <div className="min-h-screen p-8">
        <Skills slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
      </div>
    </AtlasProvider>
  );
}