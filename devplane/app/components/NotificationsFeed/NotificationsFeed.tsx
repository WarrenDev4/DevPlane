import styles from './NotificationsFeed.module.css';
import Sidebar from '../Sidebar/Sidebar';
import NotificationsBar from '../NotificationsBar/NotificationsBar';

export default function NotificationsFeed() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <NotificationsBar />
    </div>
  );
}