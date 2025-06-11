import styles from './AppCard.module.css';
import Sidebar from '../Sidebar/Sidebar';
import NewsFeed from '../Feed/Feed';
import QuickFeed from '../Updates/Updates';

export default function AppCard() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <NewsFeed />
      <QuickFeed />
    </div>
  );
}