export async function fetchTopHackerNewsIDs(): Promise<number[]> {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  if (!res.ok) throw new Error('Failed to fetch Hacker News IDs');
  return res.json();
}

export async function fetchHackerNewsArticle(id: number): Promise<any> {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  if (!res.ok) throw new Error(`Failed to fetch Hacker News item ${id}`);
  return res.json();
}

/**
 * Fetches the top N Hacker News articles that include a valid URL.
 * Stops once it reaches the desired count.
 */
export async function fetchTopHackerNewsArticles(limit: number = 35): Promise<{
  title: string;
  link: string;
  source: string;
}[]> {
  const ids = await fetchTopHackerNewsIDs();

  const articles: {
    title: string;
    link: string;
    source: string;
  }[] = [];

  for (const id of ids) {
    if (articles.length >= limit) break;
    try {
      const story = await fetchHackerNewsArticle(id);
      if (story?.url) {
        articles.push({
          title: story.title,
          link: story.url,
          source: new URL(story.url).hostname,
        });
      }
    } catch (err) {
      console.warn(`Skipping story ID ${id} due to fetch error.`);
    }
  }

  return articles;
}
