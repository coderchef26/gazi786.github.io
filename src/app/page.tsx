import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/lib/prismic'
import { components } from '@/slices'
import Hero from '@/slices/Hero'
import About from '@/slices/About'
import Projects from '@/slices/Projects'
import Skills from '@/slices/Skills'
import Education from '@/slices/Education'
import Contact from '@/slices/Contact'

export default async function Home() {
  const client = createClient()
  const homepage = await client.getSingle('homepage').catch(() => null);

  if (homepage) {
    return <SliceZone slices={homepage.data.slices} components={components} />
  }

  // Fallback to static slices if Prismic not available
  return (
    <div>
      <Hero slice={createMockSlice('hero')} index={0} slices={[]} context={{}} />
      <About slice={createMockSlice('about')} index={1} slices={[]} context={{}} />
      <Projects slice={createMockSlice('projects')} index={2} slices={[]} context={{}} />
      <Skills slice={createMockSlice('skills')} index={3} slices={[]} context={{}} />
      <Education slice={createMockSlice('education')} index={4} slices={[]} context={{}} />
      <Contact slice={createMockSlice('contact')} index={5} slices={[]} context={{}} />
    </div>
  )
}

function createMockSlice(sliceType: string) {
  const baseSlice = {
    slice_type: sliceType,
    slice_label: null,
    id: `${sliceType}-1`,
    primary: {},
    items: [],
    variation: 'default'
  }

  if (sliceType === 'hero') {
    return {
      ...baseSlice,
      primary: {
        title: 'ALSHAFARAZ GAZI',
        subtitle: 'FULL-STACK DEVELOPER & SYSTEM ARCHITECT',
        description: null,
        cta_text: 'ACCESS PROJECTS',
        cta_link: { url: '#projects' }
      }
    }
  }

  return baseSlice
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