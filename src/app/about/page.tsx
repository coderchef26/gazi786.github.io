import { Metadata } from 'next'
import About from '@/slices/About'
import { createMockSlice } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'About - PERSONNEL FILE | Alshafaraz Gazi',
  description: 'Complete profile analysis including capabilities, background, and system specifications.',
}

export default function AboutPage() {
  const mockSliceData = createMockSlice('about', {});

  return (
    <div className="min-h-screen p-8">
      <About slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
    </div>
  );
}