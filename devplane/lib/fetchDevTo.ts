import { NextResponse } from 'next/server';

const CACHE_DURATION_DEVTO = 12 * 60 * 60 * 1000; 
let cachedDevToArticles: any[] | null = null;
let lastFetchDevTo = 0;

async function fetchWithRetry(url: string, options = {}, retries = 3, delay = 500): Promise<any> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
}

async function fetchDevToArticles() {
  return fetchWithRetry('https://dev.to/api/articles?top=30');
}

export async function GET() {
  const now = Date.now();
  if (!cachedDevToArticles || now - lastFetchDevTo > CACHE_DURATION_DEVTO) {
    try {
      cachedDevToArticles = await fetchDevToArticles();
      lastFetchDevTo = now;
    } catch (error) {
      console.error('Failed to fetch Dev.to articles:', error);
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
  }
  return NextResponse.json(cachedDevToArticles);
}
