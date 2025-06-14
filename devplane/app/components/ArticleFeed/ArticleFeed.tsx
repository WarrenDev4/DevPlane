import styles from './ArticleFeed.module.css';

export default async function ArticleFeed() {
  const res = await fetch('https://dev.to/api/articles?per_page=30&sort_by=latest', {
      next: { revalidate: 86400 }, 
    });

  const articles = await res.json();

  return (
    <div className={styles.feedWrapper}>
      <h2 className={styles.header}>Article Feed</h2>
      <p className={styles.description}>
        Curated articles from the developer community on Dev.to.
      </p>
      <div className={styles.feedContainer}>
        {articles.slice(0, 9).map((article: any) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
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
