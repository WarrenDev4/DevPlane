'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import styles from './CommunityFeed.module.css';

export default function CommunityFeed() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]); 
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setProfilePicUrl(userData.profilePictureUrl || null);
        }
      }
    };

    fetchUserProfile();
  }, []);

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
          <img
            src={profilePicUrl || '/default-profile.png'}
            alt="Profile"
            className={styles.profilePic}
          />
          <input
            type="text"
            placeholder="Create a post..."
            className={styles.postInput}
          />
          <div className={styles.postIcons}>
            <button className={styles.iconButton} title="Upload Media">📎</button>
            <button className={styles.iconButton} title="Upload Image">🖼️</button>
            <button className={styles.iconButton} title="Upload Video">🎥</button>
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
