import type { NextApiRequest, NextApiResponse } from 'next';

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

async function fetchWithRetry(url: string, options = {}, retries = 3, delay = 500): Promise<string> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
    return await res.text();
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
    throw err;
  }
}

export async function fetchFreeCodeCampArticles() {
  const RSS_URL = 'https://www.freecodecamp.org/news/rss/';
  const CATEGORY_KEYWORDS: Record<string, string[]> = {
    'AI/ML': ['ai', 'machine learning', 'deep learning', 'artificial intelligence'],
    'Web Development': [
      'html', 'css', 'javascript', 'react', 'next.js', 'vue.js', 'angular',
      'spring boot', 'flask', 'django', '.net', 'node.js'
    ],
    'CS Concepts': [
      'data structures', 'algorithms', 'computer science',
      'cs concepts', 'big o', 'time complexity'
    ],
    'Career Tips': [
      'career', 'interview', 'resume', 'portfolio',
      'react', 'next.js', 'vue.js', 'angular'
    ],
    'Programming': [
      'programming', 'javascript', 'typescript', 'python', 'java',
      'c++', 'c#', 'ruby', 'go', 'rust', 'php', 'swift', 'kotlin'
    ],
    'Best Practices': ['clean code', 'best practices', 'refactoring'],
  };

  function detectCategory(text: string): string {
    const lowerText = text.toLowerCase();
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return category;
      }
    }
    return 'Programming';
  }

  try {
    const xmlText = await fetchWithRetry(RSS_URL);
    const { DOMParser } = require('xmldom'); 
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    const items = Array.from(xmlDoc.getElementsByTagName('item'));

    return items.map((item: any, index: number) => {
      const title = item.getElementsByTagName('title')[0]?.textContent || '';
      const link = item.getElementsByTagName('link')[0]?.textContent || '';
      const description = item.getElementsByTagName('description')[0]?.textContent || 'No description available.';
      const categories = Array.from(item.getElementsByTagName('category')).map(
        (cat: any) => cat.textContent?.toLowerCase() || ''
      );
      const combinedText = `${title} ${description} ${categories.join(' ')}`;
      const category = detectCategory(combinedText);

      return {
        id: link || index,
        title,
        url: link,
        description,
        source: 'freeCodeCamp',
        category,
      };
    });
  } catch (error) {
    console.error('Error fetching or parsing freeCodeCamp RSS:', error);
    return [];
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      return res.status(500).json({ error: 'Failed to fetch freeCodeCamp articles' });
    }
  }

  res.status(200).json(cachedFCCArticles);
}
