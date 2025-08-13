import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/lib/prismic'
import { components } from '@/slices'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const client = createClient()
  
  try {
    const page = await client.getByUID('page', params.uid)
    
    return (
      <div>
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    )
  } catch (error) {
    // If page not found, return 404
    notFound()
  }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient()
  
  try {
    const page = await client.getByUID('page', params.uid)
    
    return {
      title: page.data.meta_title || page.data.title || 'Page',
      description: page.data.meta_description || '',
      openGraph: {
        title: page.data.meta_title || page.data.title || 'Page',
        description: page.data.meta_description || '',
        images: page.data.meta_image?.url ? [page.data.meta_image.url] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    }
  }
}

export async function generateStaticParams() {
  const client = createClient()
  
  try {
    const pages = await client.getAllByType('page')
    
    return pages.map((page) => ({
      uid: page.uid,
    }))
  } catch (error) {
    return []
  }
}