import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/lib/prismic'
import { components } from '@/slices'
import { HeroSlice, AboutSlice, ProjectsSlice, SkillsSlice, EducationSlice, ContactSlice } from '@/slices'

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
    
    return (
      <div>
        <HeroSlice />
        <AboutSlice />
        <ProjectsSlice />
        <SkillsSlice />
        <EducationSlice />
        <ContactSlice />
      </div>
    )
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  
  try {
    const homepage = await client.getSingle('homepage')
    
    return {
      title: homepage.data.meta_title || 'Alshafaraz Gazi - CoderChef',
      description: homepage.data.meta_description || 'Full-Stack Developer & Creative Problem Solver',
      openGraph: {
        title: homepage.data.meta_title || 'Alshafaraz Gazi - CoderChef',
        description: homepage.data.meta_description || 'Full-Stack Developer & Creative Problem Solver',
        url: 'https://coderchef.dev',
        images: homepage.data.meta_image?.url ? [homepage.data.meta_image.url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Alshafaraz Gazi - CoderChef',
      description: 'Full-Stack Developer & Creative Problem Solver',
      openGraph: {
        title: 'Alshafaraz Gazi - CoderChef',
        description: 'Full-Stack Developer & Creative Problem Solver',
        url: 'https://coderchef.dev',
      },
    }
  }
}
