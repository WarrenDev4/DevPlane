'use client';

import { useEffect, useState } from "react";
import styles from "./QuickFeed.module.css";
import { fetchTopHackerNewsArticles } from "@/lib/api/hackernews";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type FeedItem = {
  title: string;
  link: string;
  source: string;
};

export default function QuickFeed() {
  const [updates, setUpdates] = useState<FeedItem[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const articles = await fetchTopHackerNewsArticles(35);
        setUpdates(articles);
      } catch (err) {
        console.error("Error loading Hacker News articles:", err);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    if (updates.length === 0) return;

    const interval = setInterval(() => {
      setUpdates((prev) => {
        const next = [...prev.slice(1), prev[0]]; 
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [updates]);

  return (
    <div className={styles.updatesContainer}>
      <div className={styles.header}>Quick Feed</div>
      <div className={styles.updateFeedScroll}>
        {updates.map((item, index) => (
          <div key={index} className={styles.animatedUpdate}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.updateItem}
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
          </div>
        ))}
      </div>
    </div>
  );
}
