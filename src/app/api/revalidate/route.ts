import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { createClient } from '@/lib/prismic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify the webhook secret if you have one
    const secret = request.headers.get('repository-name')
    if (secret !== 'gazi-portfolio') {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }
    
    // Revalidate all Prismic content
    revalidateTag('prismic')
    
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}