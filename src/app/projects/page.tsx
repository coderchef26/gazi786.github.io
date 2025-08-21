"use client";

import Projects from '@/slices/Projects'
import { createMockSlice } from '@/lib/mockData'
import AtlasProvider from '@/components/atlas/AtlasProvider'

export default function ProjectsPage() {
  const mockSliceData = createMockSlice('projects', {});

  const handleNavigation = (section: string) => {
    if (section && section !== 'projects') {
      window.location.href = `/${section}`;
    }
  };

  return (
    <AtlasProvider onNavigate={handleNavigation}>
      <div className="min-h-screen p-8">
        <Projects slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
      </div>
    </AtlasProvider>
  );
}