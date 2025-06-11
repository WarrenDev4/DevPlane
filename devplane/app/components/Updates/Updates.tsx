// components/QuickFeed.tsx
import styles from './Updates.module.css';

const quickUpdates = [
  { id: 1, title: 'Node.js 22 Released with Performance Boosts', url: '#' },
  { id: 2, title: 'React 19 RC: New Compiler and Features', url: '#' },
  { id: 3, title: 'Python 3.13 Alpha Adds Performance Enhancements', url: '#' },
  { id: 4, title: 'Tailwind CSS v4 Sneak Peek', url: '#' },
  { id: 5, title: 'GitHub Copilot Adds Workspace Suggestions', url: '#' },
];

export default function Updates() {
  return (
    <div className={styles.updatesContainer}>
      <h3 className={styles.header}>Updates</h3>
      <ul className={styles.feedList}>
        {quickUpdates.map((item) => (
          <li key={item.id} className={styles.feedItem}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
