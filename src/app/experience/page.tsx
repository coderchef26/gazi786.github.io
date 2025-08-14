import { Metadata } from 'next'
import { createMockSlice } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'Experience - MISSION HISTORY | Alshafaraz Gazi',
  description: 'Detailed record of previous assignments, responsibilities, and achievements.',
}

// Create a simple Experience component for now
function ExperienceComponent({ slice, index, slices, context }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold stark-text text-[#00d4ff] mb-4">
            MISSION HISTORY
          </h1>
          <p className="text-lg text-cyan-400/80">
            Operational Timeline & Achievements
          </p>
        </div>

        <div className="space-y-6">
          <div className="hud-element p-6 text-left">
            <h3 className="text-xl font-semibold text-[#00d4ff] mb-2">Senior Full-Stack Developer</h3>
            <p className="text-cyan-400/80 mb-2">Tech Innovations Ltd • 2022 - Present</p>
            <p className="text-sm text-cyan-400/60">
              Leading development of enterprise applications using React, Next.js, and cloud technologies.
              Architected scalable systems serving 100K+ users daily.
            </p>
          </div>

          <div className="hud-element p-6 text-left">
            <h3 className="text-xl font-semibold text-[#00d4ff] mb-2">Full-Stack Developer</h3>
            <p className="text-cyan-400/80 mb-2">Digital Solutions Co. • 2020 - 2022</p>
            <p className="text-sm text-cyan-400/60">
              Developed responsive web applications and RESTful APIs. 
              Collaborated with cross-functional teams to deliver high-quality software solutions.
            </p>
          </div>

          <div className="hud-element p-6 text-left">
            <h3 className="text-xl font-semibold text-[#00d4ff] mb-2">Junior Developer</h3>
            <p className="text-cyan-400/80 mb-2">StartUp Ventures • 2019 - 2020</p>
            <p className="text-sm text-cyan-400/60">
              Built modern web interfaces using JavaScript frameworks. 
              Gained expertise in agile development methodologies and version control.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  const mockSliceData = createMockSlice('experience', {});

  return (
    <div className="min-h-screen p-8">
      <ExperienceComponent slice={mockSliceData} index={0} slices={[mockSliceData]} context={{}} />
    </div>
  );
}