'use client';

import { useState, useEffect } from 'react';
import styles from './LearnDashboard.module.css';

const categories = [
  'Programming',
  'Web Development',
  'CS Concepts',
  'AI/ML',
  'Career Tips',
  'Best Practices',
];

type Article = {
  id: string | number;
  title: string;
  url: string;
  description: string;
  source: string;
  category: string;
};

export default function LearnDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('Programming');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function fetchArticles() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/freecodecamp');
      if (!res.ok) throw new Error('Failed to fetch articles');
      const allArticles = await res.json();

      const filtered = allArticles.filter(
        (article: Article) => article.category === selectedCategory
      );
      setArticles(filtered);
    } catch (err) {
      setError('Something went wrong while loading content.');
    } finally {
      setLoading(false);
    }
  }

  fetchArticles();
}, [selectedCategory]);


  return (
    <main className={styles.learnWrapper}>
      <header className={styles.header}>
        <h2>Learn</h2>
      </header>

      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.tabButton} ${
              selectedCategory === cat ? styles.activeTab : ''
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.articleList}>
        {loading && <p className={styles.message}>Loading...</p>}
        {error && <p className={styles.messageError}>{error}</p>}
        {!loading && !error && articles.length === 0 && (
          <p className={styles.message}>
            No articles found for "{selectedCategory}".
          </p>
        )}

        {!loading &&
          !error &&
          articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              className={styles.articleCard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <span>{article.source}</span>
            </a>
          ))}
      </div>
    </main>
  );
}
