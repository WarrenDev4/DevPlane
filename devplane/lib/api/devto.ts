export async function fetchDevToArticles() {
  const res = await fetch('https://dev.to/api/articles?top=30', {
    next: { revalidate: 86400 }, 
  });
  return res.json();
}

export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  social_image: string;
  user: {
    name: string;
  };
}