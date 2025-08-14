import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/prismic'

export async function GET(request: NextRequest) {
  const client = createClient()
  
  try {
    const url = await client.resolvePreviewURL({
      linkResolver: (doc) => {
        if (doc.type === 'homepage') return '/'
        if (doc.type === 'project') return `/projects/${doc.uid}`
        return `/${doc.uid}`
      },
      defaultURL: '/',
    })
    
    redirect(url)
  } catch (error) {
    console.error('Preview URL resolution failed:', error)
    redirect('/')
  }
}