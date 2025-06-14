import { NextResponse } from 'next/server';
import { fetchFreeCodeCampArticles } from '../../../lib/fetchFreeCodeCamp';

const CACHE_DURATION_15M = 15 * 60 * 1000;
const CACHE_DURATION_30M = 30 * 60 * 1000;
const CACHE_DURATION_60M = 60 * 60 * 1000;

let cachedFCCArticles: any[] | null = null;
let lastFetchFCC = 0;

let requestCount = 0;
let lastResetTime = Date.now();

function resetRequestCountIfNeeded() {
  const now = Date.now();
  if (now - lastResetTime > 60 * 60 * 1000) {
    requestCount = 0;
    lastResetTime = now;
  }
}

function getCacheDuration() {
  if (requestCount < 100) return CACHE_DURATION_15M;
  if (requestCount < 500) return CACHE_DURATION_30M;
  return CACHE_DURATION_60M;
}

export async function GET() {
  resetRequestCountIfNeeded();
  requestCount++;

  const now = Date.now();
  const cacheDuration = getCacheDuration();

  if (!cachedFCCArticles || now - lastFetchFCC > cacheDuration) {
    try {
      cachedFCCArticles = await fetchFreeCodeCampArticles();
      lastFetchFCC = now;
    } catch (error) {
      console.error('Error fetching freeCodeCamp:', error);
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
  }

  return NextResponse.json(cachedFCCArticles);
}
