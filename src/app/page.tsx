import { Metadata } from 'next'
import { createClient } from '@/lib/prismic'
import dynamic from 'next/dynamic'

const ArcReactorHub = dynamic(() => import('@/components/navigation/ArcReactorHub'), {
  ssr: false
})

export default async function Home() {
  return <ArcReactorHub />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  
  try {
    const homepage = await client.getSingle('homepage')
    
    return {
      title: homepage.data.meta_title || 'Alshafaraz Gazi - Full-Stack Developer',
      description: homepage.data.meta_description || 'Full-Stack Developer & Creative Problem Solver',
      openGraph: {
        title: homepage.data.meta_title || 'Alshafaraz Gazi - Full-Stack Developer',
        description: homepage.data.meta_description || 'Full-Stack Developer & Creative Problem Solver',
        url: 'https://gazi786.github.io',
        images: homepage.data.meta_image?.url ? [homepage.data.meta_image.url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Alshafaraz Gazi - Full-Stack Developer',
      description: 'Full-Stack Developer & Creative Problem Solver',
      openGraph: {
        title: 'Alshafaraz Gazi - Full-Stack Developer',
        description: 'Full-Stack Developer & Creative Problem Solver',
        url: 'https://gazi786.github.io',
      },
    }
  }
}