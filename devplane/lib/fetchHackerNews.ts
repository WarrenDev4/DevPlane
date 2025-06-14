import pLimit from 'p-limit';

let cachedHackerNewsArticles: {
  title: string;
  link: string;
  source: string;
}[] | null = null;

let lastFetchHN = 0;
const CACHE_DURATION_HN = 10 * 60 * 1000;

const limitConcurrency = 5; 
const limit = pLimit(limitConcurrency);

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

export async function fetchTopHackerNewsIDs(): Promise<number[]> {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  if (!res.ok) throw new Error('Failed to fetch Hacker News IDs');
  return res.json();
}

export async function fetchHackerNewsArticle(id: number): Promise<any> {
  return fetchWithRetry(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
}

export async function fetchTopHackerNewsArticles(limitNum: number = 35) {
  const ids = await fetchTopHackerNewsIDs();

  const articles: {
    title: string;
    link: string;
    source: string;
  }[] = [];

  const promises = ids.map(id =>
    limit(async () => {
      if (articles.length >= limitNum) return null;
      try {
        const story = await fetchHackerNewsArticle(id);
        if (story?.url) {
          return {
            title: story.title,
            link: story.url,
            source: new URL(story.url).hostname,
          };
        }
      } catch (err) {
        console.warn(`Skipping story ID ${id} due to fetch error.`);
      }
      return null;
    })
  );

  const results = await Promise.all(promises);

  return results.filter(Boolean).slice(0, limitNum) as typeof articles;
}

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now();

  if (!cachedHackerNewsArticles || now - lastFetchHN > CACHE_DURATION_HN) {
    try {
      cachedHackerNewsArticles = await fetchTopHackerNewsArticles();
      lastFetchHN = now;
    } catch (error) {
      console.error('Error fetching Hacker News:', error);
      return res.status(500).json({ error: 'Failed to fetch Hacker News' });
    }
  }

  res.status(200).json(cachedHackerNewsArticles);
}
