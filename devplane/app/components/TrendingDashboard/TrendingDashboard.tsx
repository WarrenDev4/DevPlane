import styles from './TrendingDashboard.module.css';
import { fetchDevToArticles } from '../../../lib/api/devto';

const articles = await fetchDevToArticles();
const trendingTags = ['#AI', '#NextJS', '#WebDev', '#Security', '#OpenSource'];

export default function TrendingDashboard() {
  return (
    <main className={styles.trendWrapper}>
      <header className={styles.header}>
        <h2>Trending</h2>
      </header>

      <section className={styles.content}>
        <div className={styles.trendingTags}>
          {trendingTags.map(tag => (
            <button key={tag} className={styles.tagButton}>
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {articles.map((article: any) => (
            <div key={article.id} className={styles.card}>
              <img src={article.imageUrl} alt={article.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <span className={styles.cardTag}>#{article.tag || 'General'}</span>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardDescription}>{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
