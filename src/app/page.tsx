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
  
  try {
    // Try to get homepage from Prismic
    const homepage = await client.getSingle('homepage')
    
    return (
      <div>
        <SliceZone slices={homepage.data.slices} components={components} />
      </div>
    )
  } catch (error) {
    // Fallback to static content if Prismic is not available
    console.log('Prismic not available, using static content:', error)
    
    // Create mock slice data for static fallback
    const mockHeroSlice = {
      slice_type: 'hero',
      slice_label: null,
      id: 'hero-1',
      primary: {
        title: 'ALSHAFARAZ GAZI',
        subtitle: 'FULL-STACK DEVELOPER & SYSTEM ARCHITECT',
        description: null,
        cta_text: 'ACCESS PROJECTS',
        cta_link: { url: '#projects' }
      },
      items: [],
      variation: 'default'
    }

    const mockAboutSlice = {
      slice_type: 'about',
      slice_label: null,
      id: 'about-1',
      primary: {},
      items: [],
      variation: 'default'
    }

    const mockProjectsSlice = {
      slice_type: 'projects',
      slice_label: null,
      id: 'projects-1',
      primary: {},
      items: [],
      variation: 'default'
    }

    const mockSkillsSlice = {
      slice_type: 'skills',
      slice_label: null,
      id: 'skills-1',
      primary: {},
      items: [],
      variation: 'default'
    }

    const mockEducationSlice = {
      slice_type: 'education',
      slice_label: null,
      id: 'education-1',
      primary: {},
      items: [],
      variation: 'default'
    }

    const mockContactSlice = {
      slice_type: 'contact',
      slice_label: null,
      id: 'contact-1',
      primary: {},
      items: [],
      variation: 'default'
    }
    
    return (
      <div>
        <Hero slice={mockHeroSlice} index={0} slices={[]} context={{}} />
        <About slice={mockAboutSlice} index={1} slices={[]} context={{}} />
        <Projects slice={mockProjectsSlice} index={2} slices={[]} context={{}} />
        <Skills slice={mockSkillsSlice} index={3} slices={[]} context={{}} />
        <Education slice={mockEducationSlice} index={4} slices={[]} context={{}} />
        <Contact slice={mockContactSlice} index={5} slices={[]} context={{}} />
      </div>
    )
  }
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