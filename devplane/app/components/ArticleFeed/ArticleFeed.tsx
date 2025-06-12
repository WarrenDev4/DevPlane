import styles from './ArticleFeed.module.css';
import { fetchDevToArticles } from '../../../lib/api/devto';

export const revalidate = 86400;

export default async function ArticleFeed() {
  const articles = await fetchDevToArticles();

  return (
    <div className={styles.feedWrapper}>
      <h2 className={styles.header}>Article Feed</h2>
      <div className={styles.feedContainer}>
        {articles.slice(0, 9).map((article: any) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            key={article.id}
          >
            <img
              src={article.social_image}
              alt={article.title}
              className={styles.thumbnail}
            />
            <div className={styles.cardContent}>
              <h3>{article.title}</h3>
              <p>{article.user.name}</p>
              <span className={styles.source}>dev.to</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
