import styles from './AppCard.module.css';
import Sidebar from '../Sidebar/Sidebar';
import ArticleFeed from '../ArticleFeed/ArticleFeed';
import NewsFeed from '../NewsFeed/NewsFeed';


export default function AppCard() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <ArticleFeed />
      <NewsFeed />
    </div>
  );
}