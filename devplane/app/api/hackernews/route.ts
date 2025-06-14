
import { NextResponse } from 'next/server';
import { fetchTopHackerNewsArticles } from '../../../lib/fetchHackerNews';

let cachedArticles: any[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 10 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (!cachedArticles || now - lastFetch > CACHE_DURATION) {
    try {
      cachedArticles = await fetchTopHackerNewsArticles();
      lastFetch = now;
    } catch (err) {
      console.error('Failed to fetch Hacker News:', err);
      return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
    }
  }

  return NextResponse.json(cachedArticles);
}
