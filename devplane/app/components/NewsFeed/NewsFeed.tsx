'use client';

import { useEffect, useState } from "react";
import styles from "./NewsFeed.module.css";
import { fetchTopHackerNewsArticles } from "@/lib/api/hackernews";

type FeedItem = {
  title: string;
  link: string;
  source: string;
};

export default function NewsFeed() {
  const [allUpdates, setAllUpdates] = useState<FeedItem[]>([]);
  const [displayedUpdates, setDisplayedUpdates] = useState<FeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const articles = await fetchTopHackerNewsArticles(35);
        setAllUpdates(articles);
        setDisplayedUpdates([articles[0]]);
        setCurrentIndex(1);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (allUpdates.length === 0) return;

    const interval = setInterval(() => {
      setDisplayedUpdates((prev) => [
        allUpdates[currentIndex],
        ...prev.slice(0, 34),
      ]);

      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % allUpdates.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [allUpdates, currentIndex]);

  useEffect(() => {
  async function load() {
    try {
      const articles = await fetchTopHackerNewsArticles(100);

      const keywords = [
        "javascript", "react", "python", "coding", "programming",
        "developer", "software", "web", "api", "github", "open source",
        "typescript", "node.js", "backend", "frontend", "framework",
        "cloud", "devops", "ai", "machine learning", "data science",
      ];

      const filtered = articles.filter(article =>
        keywords.some(keyword =>
          article.title.toLowerCase().includes(keyword)
        )
      );

      let finalList = filtered;
      if (filtered.length < 10) {
        const additional = articles.filter(a => !filtered.includes(a));
        finalList = [...filtered, ...additional].slice(0, 35);
      }

      setAllUpdates(finalList);
      setDisplayedUpdates([finalList[0]]);
      setCurrentIndex(1);

    } catch (err) {
      console.error(err);
    }
  }
  load();
}, []);

  return (
  <div className={styles.updatesContainer}>
    <div className={styles.header}>News Feed</div>
    <div className={styles.updateFeedScroll}>
      {displayedUpdates.length === 0 ? (
        <div className={styles.loadingMessage}>Loading feed...</div>
      ) : (
        displayedUpdates.map((item, index) => (
          <a
            key={`${item.link}-${index}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.updateItem} ${styles.fadeIn}`}
          >
            <img
              src={`https://www.google.com/s2/favicons?sz=32&domain=${item.source}`}
              alt={`${item.source} logo`}
              className={styles.favicon}
            />
            <div className={styles.cardContent}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.source}>{item.source}</span>
            </div>
          </a>
        ))
      )}
    </div>
  </div>
);
}
