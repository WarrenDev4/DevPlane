import styles from './NotificationsBar.module.css';

export default function NotificationsBar() {
  const notifications = [
    {
      id: 1,
      type: 'system',
      title: 'System Update',
      message: 'A new version of the platform is available. Update now for the latest features and security improvements.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      title: 'Security Alert',
      message: 'Unusual login attempt detected from a new device. If this wasn\'t you, please secure your account.',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Received',
      message: 'Your subscription payment of $9.99 has been processed successfully.',
      time: '3 days ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={styles.feedWrapper}>
      <h2 className={styles.header}>
        Your Notifications
        {unreadCount > 0 && (
          <span className={styles.unreadBadge}>{unreadCount} unread</span>
        )}
      </h2>

      <div className={styles.filterBar}>
        <button className={`${styles.filterButton} ${styles.active}`}>All</button>
        <button className={styles.filterButton}>Unread</button>
        <button className={styles.filterButton}>System</button>
        <button className={styles.filterButton}>Alerts</button>
      </div>

      <div className={styles.notificationsContainer}>
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div key={notification.id} className={`${styles.notificationCard} ${!notification.read ? styles.unread : ''}`}>
              <div className={`${styles.notificationIcon} ${styles[`icon${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}`]}`}>
                {notification.type === 'system' && '⚙️'}
                {notification.type === 'alert' && '⚠️'}
                {notification.type === 'success' && '✓'}
              </div>
              <div className={styles.notificationContent}>
                <h3 className={styles.notificationTitle}>{notification.title}</h3>
                <p className={styles.notificationMessage}>{notification.message}</p>
                <p className={styles.notificationTime}>{notification.time}</p>
              </div>
              <div className={styles.actions}>
                {!notification.read && (
                  <button className={styles.actionButton}>Mark as read</button>
                )}
                <button className={styles.actionButton}>Dismiss</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <p>No notifications yet</p>
            <p>We'll notify you when there's something new</p>
          </div>
        )}
      </div>
    </div>
  );
}