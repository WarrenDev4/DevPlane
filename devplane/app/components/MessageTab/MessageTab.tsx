'use client';

import { useState } from 'react';
import styles from './MessageTab.module.css';

type User = {
  id: string;
  name: string;
};


export default function MessageTab() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className={styles.pageWrapper}>

      <header className={styles.header}>
        <h2>Messages</h2>
      </header>

      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.menuHeader}>
            <h3 className={styles.userLabel}>Your Inbox</h3>
            <button className={styles.newMessageButton} onClick={() => setSelectedUser({ id: 'new', name: 'New User' })}>
              + New
            </button>
          </div>
          <div className={styles.searchSection}>
            <input
              type="text"
              placeholder="Search messages or users..."
              className={styles.searchInput}
            />
          </div>
          <div className={styles.messageList}>
            <div className={styles.messageItem}>Jane Doe</div>
            <div className={styles.messageItem}>John Smith</div>
            <div className={styles.messageItem}>Another User</div>
          </div>
        </div>
        <div className={styles.chatArea}>
          {selectedUser ? (
            <div className={styles.chatContent}>
              <h4 className={styles.chatTitle}>Start a conversation</h4>
              <textarea
                className={styles.messageInput}
                placeholder="Write your message..."
                rows={4}
              />
              <button className={styles.sendButton}>Send</button>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Select or start a conversation to begin messaging.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
