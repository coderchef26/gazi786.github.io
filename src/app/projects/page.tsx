import { Metadata } from 'next'
import Projects from '@/slices/Projects'
import { createMockSlice } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'Projects - MISSION ARCHIVE | Alshafaraz Gazi',
  description: 'Completed missions and active deployments. Advanced systems and cutting-edge solutions.',
}

export default function ProjectsPage() {
  const mockSliceData = createMockSlice('projects', {});

  return (
    <div className="min-h-screen p-8">
      <Projects slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
    </div>
  );
}