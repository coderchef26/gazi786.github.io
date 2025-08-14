'use client';

import dynamic from 'next/dynamic';

const ArcReactorHub = dynamic(() => import('./ArcReactorHub'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-[#00d4ff] mx-auto mb-4"></div>
        <p className="text-[#00d4ff] text-sm">ATLAS INITIALIZING...</p>
      </div>
    </div>
  )
});

export default function ArcReactorClientWrapper() {
  return <ArcReactorHub />;
}