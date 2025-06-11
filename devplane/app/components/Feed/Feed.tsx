// components/Feed.tsx
import styles from './Feed.module.css';

const testArticles = [
  {
    id: 1,
    title: 'New Features in React 19',
    author: 'Jane Doe',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 2,
    title: 'AI Tools Every Developer Should Know',
    author: 'John Smith',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 3,
    title: 'The Rise of Edge Functions',
    author: 'Alex Green',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 4,
    title: 'Next.js App Router Best Practices',
    author: 'Dev Guru',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 5,
    title: '10 Tips for Clean JavaScript Code',
    author: 'Code Master',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 6,
    title: 'What’s New in TypeScript 5',
    author: 'TS Wizard',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 7,
    title: 'Deploying AI Apps with Vercel + TF.js',
    author: 'AI Dev',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 8,
    title: 'Understanding Async/Await in 2025',
    author: 'Modern Dev',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
  {
    id: 9,
    title: 'Getting Started with React Server Components',
    author: 'Frontend Pro',
    thumbnail: '/DevPlane Background.png',
    url: '#',
  },
];

export default function Feed() {
  return (
    <div className={styles.feedWrapper}>
      <h2 className={styles.header}>What’s new…</h2>
    <div className={styles.feedContainer}>
      {testArticles.slice(0, 9).map((article) => (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
          key={article.id}
        >
          <img
            src={article.thumbnail}
            alt="Thumbnail"
            className={styles.thumbnail}
          />
          <div className={styles.cardContent}>
            <h3>{article.title}</h3>
            <p>{article.author}</p>
          </div>
        </a>
      ))}
    </div>
    </div>
  );
}
