import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url') ?? '/'
  
  // Clear the preview mode
  const response = new Response('', {
    status: 302,
    headers: {
      Location: url,
      'Set-Cookie': '__prerender_bypass=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  })
  
  return response
}