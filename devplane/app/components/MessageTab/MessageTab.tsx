'use client';

import { useState } from 'react';
import styles from './MessageTab.module.css';

type User = {
  id: string;
  name: string;
};

export default function MessageTab() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending:", message);
    setMessage('');
  };

  return (
    <main className={styles.pageWrapper}>
      <header className={styles.header}>
        <h2>Messages</h2>
      </header>

      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <div className={styles.menuHeader}>
            <h3 className={styles.userLabel}>Chat</h3>
            <button
              className={styles.newMessageButton}
              onClick={() => setSelectedUser({ id: 'new', name: 'New User' })}
            >
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
        </div>

        <div className={styles.chatArea}>
          {selectedUser ? (
            <>
              <div className={styles.chatHeader}>{selectedUser.name}</div>

              <div className={styles.messages}>
                <div className={`${styles.messageBubble} ${styles.incoming}`}>
                  Hi there! 👋
                </div>
                <div className={`${styles.messageBubble} ${styles.outgoing}`}>
                  Hello! How can I help?
                </div>
              </div>

              <div className={styles.messageInputWrapper}>
                <button className={styles.iconButton}>😊</button>
                <button className={styles.iconButton}>📎</button>
                <textarea
                  className={styles.messageInput}
                  placeholder="Text message"
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button className={styles.sendButton}>➤</button>
              </div>
            </>
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