import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const res = await fetch('https://github.com/Christophermathai.atom', {
      headers: {
        'User-Agent': 'Portfolio-App'
      }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch feed: ${res.status}`);
    }
    
    const text = await res.text();
    
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    });
  } catch (error) {
    return new NextResponse('Error fetching feed', { status: 500 });
  }
}
