import styles from './AppCard.module.css';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../ArticleFeed/ArticleFeed';
import QuickFeed from '../NewsFeed/NewsFeed';

export default function AppCard() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <NewsFeed />
      <QuickFeed />
    </div>
  );
}