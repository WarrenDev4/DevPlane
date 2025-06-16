'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './CommunityFeed.module.css';

export default function CommunityFeed() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]); 

  return (
     <main className={styles.pageWrapper}>
      <header className={styles.header}>
        <h2>Community</h2>      
        </header>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      <section className={styles.content}>
   
        <div className={styles.createPost}>
          <textarea
            placeholder="What's on your mind?"
            rows={3}
            className={styles.textArea}
          />
          <div className={styles.postActions}>
            <button className={styles.attachButton}>Attach Image</button>
            <button className={styles.postButton}>Create Post</button>
          </div>
        </div>

    
        <div className={styles.feed}>
          {posts.map((post: any) => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <Link href={`/profile/${post.userId}`}>
                  <img
                    src={post.profilePictureUrl}
                    alt="User"
                    className={styles.profilePic}
                  />
                </Link>
                <Link href={`/profile/${post.userId}`} className={styles.username}>
                  {post.firstName} {post.lastName}
                </Link>
              </div>
              <div className={styles.postContent}>
                <p>{post.text}</p>
                {post.mediaUrl && (
                  <img
                    src={post.mediaUrl}
                    className={styles.postMedia}
                    alt="Post media"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
