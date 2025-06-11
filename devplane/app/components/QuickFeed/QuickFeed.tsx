import styles from './QuickFeed.module.css';

const updates = [
  {
    title: "React 19 Beta Released",
    link: "https://reactjs.org/blog/2024/05/14/react-19-beta.html",
    source: "reactjs.org",
  },
  {
    title: "Next.js 15 Released",
    link: "https://nextjs.org/blog/next-15",
    source: "nextjs.org",
  },
];

export default function QuickFeed() {
  return (
    <div className={styles.updatesContainer}>
      <div className={styles.header}>Quick Feed</div>
      <div className={styles.updateFeed}>
        {updates.map((item, index) => (
          <div key={index}>
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
            {index < updates.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  );
}
