import styles from './NotificationsFeed.module.css';
import Sidebar from '../Sidebar/Sidebar';

export default function NotificationsFeed() {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
}