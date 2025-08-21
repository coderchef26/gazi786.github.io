"use client";

import Education from '@/slices/Education'
import { createMockSlice } from '@/lib/mockData'
import AtlasProvider from '@/components/atlas/AtlasProvider'

export default function EducationPage() {
  const mockSliceData = createMockSlice('education', {});

  const handleNavigation = (section: string) => {
    if (section && section !== 'education') {
      window.location.href = `/${section}`;
    }
  };

  return (
    <AtlasProvider onNavigate={handleNavigation}>
      <div className="min-h-screen p-8">
        <Education slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
      </div>
    </AtlasProvider>
  );
}