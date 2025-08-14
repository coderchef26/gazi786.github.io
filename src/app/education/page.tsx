import { Metadata } from 'next'
import Education from '@/slices/Education'
import { createMockSlice } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'Education - NEURAL UPGRADES | Alshafaraz Gazi',
  description: 'Educational background, certifications, and continuous learning initiatives.',
}

export default function EducationPage() {
  const mockSliceData = createMockSlice('education', {});

  return (
    <div className="min-h-screen p-8">
      <Education slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
    </div>
  );
}