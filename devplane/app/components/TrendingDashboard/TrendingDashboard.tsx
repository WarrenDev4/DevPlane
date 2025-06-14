'use client';

import React, { useState, useEffect } from 'react';
import styles from './TrendingDashboard.module.css';

type Article = {
  id: number;
  tag_list?: string[];
  tags?: string;
  social_image?: string;
  imageUrl?: string;
  title: string;
  description?: string;
};

export default function TrendingDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [trendingTags, setTrendingTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/devto', { cache: 'no-cache' });

        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data: Article[] = await res.json();
        setArticles(data);
        const allTags = data.flatMap(article => {
          if (article.tag_list) return article.tag_list;
          if (article.tags) return article.tags.split(',').map(t => t.trim());
          return [];
        });

        const tagFrequency: Record<string, number> = {};
        allTags.forEach(tag => {
          const normalized = tag.toLowerCase();
          tagFrequency[normalized] = (tagFrequency[normalized] || 0) + 1;
        });

        const topTags = Object.entries(tagFrequency)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([tag]) => tag);

        setTrendingTags(topTags);
      } catch (err) {
        setError('Unable to load articles.');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  const filteredArticles = selectedTag
    ? articles.filter(article => {
        const tags = article.tag_list
          ? article.tag_list.map(t => t.toLowerCase())
          : article.tags
          ? article.tags.split(',').map(t => t.trim().toLowerCase())
          : [];
        return tags.includes(selectedTag.toLowerCase());
      })
    : articles;

  return (
    <main className={styles.trendWrapper}>
      <header className={styles.header}>
        <h2>Trending</h2>
      </header>

      <section className={styles.content}>
        <div className={styles.trendingTags}>
          {trendingTags.map(tag => (
            <button
              key={tag}
              className={`${styles.tagButton} ${
                selectedTag === tag ? styles.activeTag : ''
              }`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              #{tag}
            </button>
          ))}
          {selectedTag && (
            <button className={styles.clearButton} onClick={() => setSelectedTag(null)}>
              Clear Filter
            </button>
          )}
        </div>

        <div className={styles.grid}>
          {loading && <p>Loading articles...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && filteredArticles.length === 0 && (
            <p>No articles found for this tag.</p>
          )}
          {!loading &&
            !error &&
            filteredArticles.map(article => (
              <div key={article.id} className={styles.card}>
                <img
                  src={article.social_image || article.imageUrl || ''}
                  alt={article.title}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>
                    #
                    {(
                      article.tag_list?.[0] ||
                      article.tags?.split(',')[0] ||
                      'general'
                    ).toLowerCase()}
                  </span>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  <p className={styles.cardDescription}>{article.description || ''}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
