import styles from './AppCard.module.css';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../NewsFeed/NewsFeed';
import QuickFeed from '../QuickFeed/QuickFeed';

export default function AppCard() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <NewsFeed />
      <QuickFeed />
    </div>
  );
}